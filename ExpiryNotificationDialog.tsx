import { useState, useEffect } from 'react';
import { Bell, Clock, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InventoryItem } from '@/types/inventory';

interface ExpiryNotificationDialogProps {
  items: InventoryItem[];
  onUpdateItem: (id: string, updates: Partial<InventoryItem>) => void;
}

export function ExpiryNotificationDialog({ items, onUpdateItem }: ExpiryNotificationDialogProps) {
  const [expiredItems, setExpiredItems] = useState<InventoryItem[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const checkExpiredItems = () => {
      const now = new Date();
      const expired = items.filter(item => {
        if (!item.expiryReminder || item.expiryReminder.type === 'never') return false;
        
        const { expiryReminder } = item;
        let nextReminderDate: Date | null = null;

        if (expiryReminder.type === 'fixed' && expiryReminder.interval) {
          const lastNotified = expiryReminder.lastNotified || item.dateAdded;
          const intervalMonths = {
            '1month': 1,
            '3months': 3,
            '6months': 6,
            '9months': 9,
            '12months': 12
          }[expiryReminder.interval];
          
          nextReminderDate = new Date(lastNotified);
          nextReminderDate.setMonth(nextReminderDate.getMonth() + intervalMonths);
        } else if (expiryReminder.type === 'recurring' && expiryReminder.recurringType) {
          const lastNotified = expiryReminder.lastNotified || item.dateAdded;
          const intervalMonths = expiryReminder.recurringType === 'halfyearly' ? 6 : 12;
          
          nextReminderDate = new Date(lastNotified);
          nextReminderDate.setMonth(nextReminderDate.getMonth() + intervalMonths);
          
          // Check if we've passed the end date
          if (expiryReminder.endDate && nextReminderDate > expiryReminder.endDate) {
            return false;
          }
        }

        return nextReminderDate && now >= nextReminderDate;
      });

      if (expired.length > 0) {
        setExpiredItems(expired);
        setShowDialog(true);
      }
    };

    // Check on mount and then every hour
    checkExpiredItems();
    const interval = setInterval(checkExpiredItems, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [items]);

  const handleSnooze = (itemId: string) => {
    onUpdateItem(itemId, {
      expiryReminder: {
        ...items.find(i => i.id === itemId)?.expiryReminder!,
        lastNotified: new Date()
      }
    });
    setExpiredItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleUpdateStatus = (itemId: string, newStatus: InventoryItem['status']) => {
    onUpdateItem(itemId, { status: newStatus });
    setExpiredItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleDismissAll = () => {
    expiredItems.forEach(item => {
      onUpdateItem(item.id, {
        expiryReminder: {
          ...item.expiryReminder!,
          lastNotified: new Date()
        }
      });
    });
    setShowDialog(false);
    setExpiredItems([]);
  };

  if (!showDialog || expiredItems.length === 0) return null;

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-orange-500" />
            Items Need Your Attention
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {expiredItems.map(item => (
            <div key={item.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <Badge variant="outline" className="mt-1">
                    {item.status}
                  </Badge>
                </div>
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSnooze(item.id)}
                >
                  <Clock className="h-4 w-4 mr-1" />
                  Remind Later
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateStatus(item.id, 'listed')}
                >
                  List for Sale
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateStatus(item.id, 'donated')}
                >
                  Mark for Donation
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateStatus(item.id, 'distributed')}
                >
                  Gift to Someone
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleDismissAll}>
            Dismiss All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
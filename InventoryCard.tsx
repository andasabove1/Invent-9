import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InventoryItem } from '@/types/inventory';
import { Edit, ExternalLink, Gift, Heart, Bell, Clock } from 'lucide-react';

interface InventoryCardProps {
  item: InventoryItem;
  onEdit: (item: InventoryItem) => void;
  onList: (item: InventoryItem) => void;
  onDonate: (item: InventoryItem) => void;
  onDistribute: (item: InventoryItem) => void;
}

export const InventoryCard = ({ item, onEdit, onList, onDonate, onDistribute }: InventoryCardProps) => {
  const statusColors = {
    owned: 'bg-green-100 text-green-800',
    listed: 'bg-blue-100 text-blue-800',
    donated: 'bg-purple-100 text-purple-800',
    distributed: 'bg-orange-100 text-orange-800'
  };

  const getExpiryInfo = () => {
    if (!item.expiryReminder || item.expiryReminder.type === 'never') return null;
    
    const { expiryReminder } = item;
    if (expiryReminder.type === 'fixed' && expiryReminder.interval) {
      return `Reminder: Every ${expiryReminder.interval.replace('months', 'mo').replace('month', 'mo')}`;
    }
    if (expiryReminder.type === 'recurring' && expiryReminder.recurringType) {
      const type = expiryReminder.recurringType === 'halfyearly' ? '6mo' : '12mo';
      const until = expiryReminder.endDate ? ` until ${expiryReminder.endDate.toLocaleDateString()}` : '';
      return `Reminder: Every ${type}${until}`;
    }
    return null;
  };

  const expiryInfo = getExpiryInfo();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <div className="flex gap-1 flex-col items-end">
            <Badge className={statusColors[item.status]}>
              {item.status}
            </Badge>
            {expiryInfo && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Bell className="w-3 h-3" />
                Expiry Set
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {item.photos.length > 0 && (
          <img 
            src={item.photos[0]} 
            alt={item.name}
            className="w-full h-32 object-cover rounded-md mb-3"
          />
        )}
        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
        
        {expiryInfo && (
          <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {expiryInfo}
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        {item.marketplaceLinks && item.marketplaceLinks.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Listed on:</p>
            <div className="flex flex-wrap gap-1">
              {item.marketplaceLinks.map(link => (
                <Badge key={link.id} variant="secondary" className="text-xs">
                  {link.platform}
                  {link.price && ` $${link.price}`}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="outline" onClick={() => onList(item)}>
            <ExternalLink className="w-3 h-3 mr-1" />
            List
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDonate(item)}>
            <Heart className="w-3 h-3 mr-1" />
            Donate
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDistribute(item)}>
            <Gift className="w-3 h-3 mr-1" />
            Give
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
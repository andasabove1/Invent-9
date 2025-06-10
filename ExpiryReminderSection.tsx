import { useState } from 'react';
import { Calendar, Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExpiryReminder } from '@/types/inventory';

interface ExpiryReminderSectionProps {
  reminder?: ExpiryReminder;
  onReminderChange: (reminder: ExpiryReminder | undefined) => void;
}

export function ExpiryReminderSection({ reminder, onReminderChange }: ExpiryReminderSectionProps) {
  const [reminderType, setReminderType] = useState<string>(reminder?.type || 'never');
  const [interval, setInterval] = useState<string>(reminder?.interval || '1month');
  const [recurringType, setRecurringType] = useState<string>(reminder?.recurringType || 'halfyearly');
  const [customDate, setCustomDate] = useState<string>(
    reminder?.customDate ? reminder.customDate.toISOString().split('T')[0] : ''
  );
  const [endDate, setEndDate] = useState<string>(
    reminder?.endDate ? reminder.endDate.toISOString().split('T')[0] : ''
  );

  const handleReminderTypeChange = (type: string) => {
    setReminderType(type);
    if (type === 'never') {
      onReminderChange(undefined);
    } else {
      updateReminder({ type: type as any });
    }
  };

  const updateReminder = (updates: Partial<ExpiryReminder>) => {
    const newReminder: ExpiryReminder = {
      type: reminderType as any,
      interval: interval as any,
      recurringType: recurringType as any,
      customDate: customDate ? new Date(customDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      ...updates
    };
    onReminderChange(newReminder);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Expiry Reminder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Reminder Type</Label>
          <Select value={reminderType} onValueChange={handleReminderTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="fixed">Fixed Intervals</SelectItem>
              <SelectItem value="recurring">Recurring Until Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {reminderType === 'fixed' && (
          <div>
            <Label>Interval</Label>
            <Select value={interval} onValueChange={(val) => { setInterval(val); updateReminder({ interval: val as any }); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">1 Month</SelectItem>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="9months">9 Months</SelectItem>
                <SelectItem value="12months">12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {reminderType === 'recurring' && (
          <>
            <div>
              <Label>Recurring Type</Label>
              <Select value={recurringType} onValueChange={(val) => { setRecurringType(val); updateReminder({ recurringType: val as any }); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="halfyearly">Half Yearly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); updateReminder({ endDate: e.target.value ? new Date(e.target.value) : undefined }); }}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
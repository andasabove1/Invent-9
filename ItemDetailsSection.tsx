import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FileText, Package, DollarSign, Target } from 'lucide-react';

interface ItemDetailsSectionProps {
  name: string;
  category: string;
  estimatedValue: string;
  status: string;
  onNameChange: (name: string) => void;
  onCategoryChange: (category: string) => void;
  onValueChange: (value: string) => void;
  onStatusChange: (status: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ItemDetailsSection = ({
  name,
  category,
  estimatedValue,
  status,
  onNameChange,
  onCategoryChange,
  onValueChange,
  onStatusChange,
  onNext,
  onBack
}: ItemDetailsSectionProps) => {
  const categories = [
    'Electronics',
    'Furniture',
    'Clothing',
    'Books',
    'Collectibles',
    'Jewelry',
    'Art',
    'Kitchen',
    'Sports',
    'Tools',
    'General'
  ];

  const dispositionOptions = [
    { value: 'owned', label: 'Keep in Inventory', description: 'Store in personal inventory' },
    { value: 'listed', label: 'List for Sale', description: 'Prepare for marketplace listing' },
    { value: 'donated', label: 'Mark for Donation', description: 'Set aside for charity donation' },
    { value: 'distributed', label: 'Gift to Someone', description: 'Assign to family or friends' }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Item Details & Disposition (Step 4 of 5)
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Complete the item information and choose what to do with it
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Item Name */}
        <div className="space-y-2">
          <Label htmlFor="itemName" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Item Name *
          </Label>
          <Input
            id="itemName"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter item name..."
            required
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Category
          </Label>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Estimated Value */}
        <div className="space-y-2">
          <Label htmlFor="estimatedValue" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Estimated Value (Optional)
          </Label>
          <Input
            id="estimatedValue"
            type="number"
            step="0.01"
            value={estimatedValue}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="0.00"
          />
        </div>

        {/* Disposition Choices */}
        <div className="space-y-3">
          <Label className="text-base font-medium">What would you like to do with this item?</Label>
          <RadioGroup value={status} onValueChange={onStatusChange}>
            {dispositionOptions.map((option) => (
              <div key={option.value} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="font-medium cursor-pointer">
                    {option.label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button onClick={onBack} variant="outline">
            Back to Tags
          </Button>
          <Button 
            onClick={onNext}
            disabled={!name.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Next: Set Expiry Reminder
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { InventoryItem, MarketplaceLink } from '@/types/inventory';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ListingOptionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: InventoryItem;
  onUpdate: (id: string, updates: Partial<InventoryItem>) => void;
}

export const ListingOptionsDialog = ({ open, onOpenChange, item, onUpdate }: ListingOptionsDialogProps) => {
  const [customSite, setCustomSite] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [price, setPrice] = useState<number | undefined>();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('facebook');

  const defaultPlatforms = [
    { value: 'facebook', label: 'Facebook Marketplace', url: 'https://www.facebook.com/marketplace' },
    { value: 'craigslist', label: 'Craigslist', url: 'https://craigslist.org' },
    { value: 'ebay', label: 'eBay', url: 'https://www.ebay.com' }
  ];

  const handleAddListing = () => {
    if (selectedPlatform === 'custom' && (!customSite || !customUrl)) {
      toast({ title: 'Error', description: 'Please provide both site name and URL', variant: 'destructive' });
      return;
    }

    const newListing: MarketplaceLink = {
      id: crypto.randomUUID(),
      platform: selectedPlatform as any,
      url: selectedPlatform === 'custom' ? customUrl : defaultPlatforms.find(p => p.value === selectedPlatform)?.url || '',
      price,
      datePosted: new Date()
    };

    const updatedLinks = [...(item.marketplaceLinks || []), newListing];
    onUpdate(item.id, { 
      marketplaceLinks: updatedLinks,
      status: 'listed' as const
    });

    toast({ title: 'Success', description: 'Listing added successfully' });
    setCustomSite('');
    setCustomUrl('');
    setPrice(undefined);
  };

  const handleRemoveListing = (linkId: string) => {
    const updatedLinks = item.marketplaceLinks?.filter(link => link.id !== linkId) || [];
    onUpdate(item.id, { 
      marketplaceLinks: updatedLinks,
      status: updatedLinks.length > 0 ? 'listed' : 'owned'
    });
    toast({ title: 'Success', description: 'Listing removed' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>List {item.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Listings */}
          {item.marketplaceLinks && item.marketplaceLinks.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Current Listings</h3>
              <div className="space-y-2">
                {item.marketplaceLinks.map((link) => (
                  <Card key={link.id}>
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{link.platform}</Badge>
                        <span className="text-sm">{link.price ? `$${link.price}` : 'No price set'}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => window.open(link.url, '_blank')}>
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleRemoveListing(link.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Add New Listing */}
          <div>
            <h3 className="font-medium mb-3">Add New Listing</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultPlatforms.map((platform) => (
                      <SelectItem key={platform.value} value={platform.value}>
                        {platform.label}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom Site</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedPlatform === 'custom' && (
                <>
                  <div>
                    <Label htmlFor="customSite">Site Name</Label>
                    <Input
                      id="customSite"
                      value={customSite}
                      onChange={(e) => setCustomSite(e.target.value)}
                      placeholder="e.g., Local Marketplace"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customUrl">Site URL</Label>
                    <Input
                      id="customUrl"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="price">Price (optional)</Label>
                <Input
                  id="price"
                  type="number"
                  value={price || ''}
                  onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Enter price"
                />
              </div>

              <Button onClick={handleAddListing} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Listing
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
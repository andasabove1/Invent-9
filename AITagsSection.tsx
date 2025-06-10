import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tags, RefreshCw, Plus, X, MapPin } from 'lucide-react';

interface AITagsSectionProps {
  photos: string[];
  description: string;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AITagsSection = ({ 
  photos, 
  description, 
  tags, 
  onTagsChange, 
  onNext, 
  onBack 
}: AITagsSectionProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [locationTag, setLocationTag] = useState('');

  // Common location suggestions
  const locationSuggestions = [
    'kitchen', 'bedroom', 'living room', 'garage', 'basement', 'attic',
    'office', 'bathroom', 'dining room', 'closet', 'pantry', 'shed',
    'guest room', 'laundry room', 'study', 'balcony', 'patio'
  ];

  // Simulate AI tag generation
  const generateTags = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock AI-generated tags based on description and photos
    const mockTagSets = [
      ['vintage', 'antique', 'collectible', 'rare', 'classic'],
      ['modern', 'contemporary', 'sleek', 'minimalist', 'stylish'],
      ['handmade', 'artisan', 'unique', 'crafted', 'original'],
      ['functional', 'practical', 'everyday', 'useful', 'durable'],
      ['decorative', 'ornamental', 'beautiful', 'elegant', 'artistic']
    ];
    
    const randomTags = mockTagSets[Math.floor(Math.random() * mockTagSets.length)];
    const selectedTags = randomTags.slice(0, 3 + Math.floor(Math.random() * 3));
    
    setSuggestedTags(selectedTags);
    onTagsChange(selectedTags);
    setIsGenerating(false);
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddCustomTag = () => {
    if (newTag.trim()) {
      addTag(newTag.trim().toLowerCase());
      setNewTag('');
    }
  };

  const handleAddLocationTag = () => {
    if (locationTag.trim()) {
      addTag(`location:${locationTag.trim().toLowerCase()}`);
      setLocationTag('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCustomTag();
    }
  };

  const handleLocationKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddLocationTag();
    }
  };

  useEffect(() => {
    if (description && tags.length === 0) {
      generateTags();
    }
  }, [description]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tags className="w-5 h-5" />
          AI-Generated Tags (Step 3 of 4)
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Tags help categorize and find your items easily. Add location tags to remember where items are stored.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGenerating ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin mr-2" />
            <span>AI is generating relevant tags...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Current Tags */}
            <div>
              <h4 className="font-medium mb-2">Current Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant={tag.startsWith('location:') ? 'default' : 'secondary'} className="flex items-center gap-1">
                    {tag.startsWith('location:') && <MapPin className="w-3 h-3" />}
                    {tag.replace('location:', '')}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
                {tags.length === 0 && (
                  <p className="text-sm text-muted-foreground">No tags added yet</p>
                )}
              </div>
            </div>

            {/* Add Location Tag */}
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Add Location Tag:
              </h4>
              <div className="flex gap-2 mb-2">
                <Input
                  value={locationTag}
                  onChange={(e) => setLocationTag(e.target.value)}
                  onKeyPress={handleLocationKeyPress}
                  placeholder="Where is this item located? (e.g., kitchen, bedroom)"
                  className="flex-1"
                />
                <Button onClick={handleAddLocationTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {locationSuggestions.filter(loc => !tags.includes(`location:${loc}`)).slice(0, 8).map((location) => (
                  <Button
                    key={location}
                    variant="ghost"
                    size="sm"
                    onClick={() => addTag(`location:${location}`)}
                    className="h-6 text-xs"
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>

            {/* Add Custom Tag */}
            <div>
              <h4 className="font-medium mb-2">Add Custom Tag:</h4>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a custom tag..."
                  className="flex-1"
                />
                <Button onClick={handleAddCustomTag} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Suggested Tags */}
            {suggestedTags.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Suggested Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.filter(tag => !tags.includes(tag)).map((tag, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => addTag(tag)}
                      className="h-8"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Regenerate Button */}
            <div className="flex justify-center">
              <Button onClick={generateTags} variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-1" />
                Generate New Suggestions
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button onClick={onBack} variant="outline">
            Back to Description
          </Button>
          <Button 
            onClick={onNext} 
            disabled={isGenerating}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Next: Item Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, RefreshCw, Check, Edit } from 'lucide-react';

interface AIDescriptionSectionProps {
  photos: string[];
  description: string;
  onDescriptionChange: (description: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AIDescriptionSection = ({ 
  photos, 
  description, 
  onDescriptionChange, 
  onNext, 
  onBack 
}: AIDescriptionSectionProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(description);

  // Simulate AI description generation
  const generateDescription = async () => {
    setIsGenerating(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI-generated descriptions based on common items
    const mockDescriptions = [
      "A well-maintained vintage item with classic design elements and rich patina that speaks to its quality craftsmanship.",
      "Modern piece in excellent condition, featuring sleek lines and contemporary styling perfect for today's lifestyle.",
      "Unique collectible item with distinctive characteristics and authentic details that make it a standout piece.",
      "Functional and stylish item that combines practicality with aesthetic appeal, showing minimal signs of wear.",
      "Rare find with exceptional build quality and timeless design that would complement any collection."
    ];
    
    const randomDescription = mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)];
    onDescriptionChange(randomDescription);
    setTempDescription(randomDescription);
    setIsGenerating(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempDescription(description);
  };

  const handleSave = () => {
    onDescriptionChange(tempDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempDescription(description);
    setIsEditing(false);
  };

  useEffect(() => {
    if (photos.length > 0 && !description) {
      generateDescription();
    }
  }, [photos]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          AI-Generated Description (Step 2 of 4)
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Our AI analyzed your photos and created a description
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {photos.length > 0 && (
          <div className="flex gap-2 mb-4">
            {photos.slice(0, 3).map((photo, index) => (
              <img 
                key={index}
                src={photo} 
                alt={`Reference ${index + 1}`} 
                className="w-16 h-16 object-cover rounded border" 
              />
            ))}
            {photos.length > 3 && (
              <div className="w-16 h-16 bg-muted rounded border flex items-center justify-center text-sm font-medium">
                +{photos.length - 3}
              </div>
            )}
          </div>
        )}

        {isGenerating ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin mr-2" />
            <span>AI is analyzing your photos...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={tempDescription}
                  onChange={(e) => setTempDescription(e.target.value)}
                  className="min-h-[120px]"
                  placeholder="Edit the description..."
                />
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm">
                    <Check className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="bg-muted/50 p-4 rounded-lg border">
                  <p className="text-sm leading-relaxed">{description}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleEdit} variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button onClick={generateDescription} variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Regenerate
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button onClick={onBack} variant="outline">
            Back to Photos
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!description || isGenerating || isEditing}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Next: Generate Tags
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

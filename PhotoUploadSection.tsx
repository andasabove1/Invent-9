import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, X, Upload } from 'lucide-react';

interface PhotoUploadSectionProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  onNext: () => void;
}

export const PhotoUploadSection = ({ photos, onPhotosChange, onNext }: PhotoUploadSectionProps) => {
  const [dragOver, setDragOver] = useState(false);

  const handlePhotoUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newPhotos = [...photos];
    Array.from(files).slice(0, 5 - photos.length).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        newPhotos.push(result);
        onPhotosChange([...newPhotos]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handlePhotoUpload(e.dataTransfer.files);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Add Photos (Step 1 of 4)
        </CardTitle>
        <p className="text-sm text-muted-foreground">Upload up to 5 photos of your item</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {photos.length < 5 && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Drag & drop photos here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            <Button variant="outline" asChild>
              <label className="cursor-pointer">
                Choose Files
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e.target.files)}
                  className="hidden"
                />
              </label>
            </Button>
          </div>
        )}

        {photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group">
                <img 
                  src={photo} 
                  alt={`Photo ${index + 1}`} 
                  className="w-full h-32 object-cover rounded-lg border" 
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removePhoto(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            {photos.length}/5 photos uploaded
          </div>
          <Button 
            onClick={onNext} 
            disabled={photos.length === 0}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Next: Generate Description
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

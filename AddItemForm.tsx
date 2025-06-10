import { useState } from 'react';
import { InventoryItem } from '@/types/inventory';
import { PhotoUploadSection } from './PhotoUploadSection';
import { AIDescriptionSection } from './AIDescriptionSection';
import { AITagsSection } from './AITagsSection';
import { ItemDetailsSection } from './ItemDetailsSection';
import { ExpiryReminderSection } from './ExpiryReminderSection';
import type { ExpiryReminder } from '@/types/inventory';

interface AddItemFormProps {
  onAddItem: (item: Omit<InventoryItem, 'id' | 'dateAdded'>) => void;
  onCancel: () => void;
}

type FormStep = 'photos' | 'description' | 'tags' | 'details' | 'expiry';

export const AddItemForm = ({ onAddItem, onCancel }: AddItemFormProps) => {
  const [currentStep, setCurrentStep] = useState<FormStep>('photos');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'General',
    estimatedValue: '',
    tags: [] as string[],
    photos: [] as string[],
    status: 'owned' as const,
    expiryReminder: undefined as ExpiryReminder | undefined
  });

  const handleSubmit = () => {
    if (!formData.name.trim()) return;

    onAddItem({
      name: formData.name,
      description: formData.description,
      category: formData.category,
      estimatedValue: formData.estimatedValue ? parseFloat(formData.estimatedValue) : undefined,
      tags: formData.tags,
      photos: formData.photos,
      status: formData.status,
      expiryReminder: formData.expiryReminder
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'photos':
        return (
          <PhotoUploadSection
            photos={formData.photos}
            onPhotosChange={(photos) => setFormData(prev => ({ ...prev, photos }))}
            onNext={() => setCurrentStep('description')}
          />
        );
      case 'description':
        return (
          <AIDescriptionSection
            photos={formData.photos}
            description={formData.description}
            onDescriptionChange={(description) => setFormData(prev => ({ ...prev, description }))}
            onNext={() => setCurrentStep('tags')}
            onBack={() => setCurrentStep('photos')}
          />
        );
      case 'tags':
        return (
          <AITagsSection
            photos={formData.photos}
            description={formData.description}
            tags={formData.tags}
            onTagsChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
            onNext={() => setCurrentStep('details')}
            onBack={() => setCurrentStep('description')}
          />
        );
      case 'details':
        return (
          <ItemDetailsSection
            name={formData.name}
            category={formData.category}
            estimatedValue={formData.estimatedValue}
            status={formData.status}
            onNameChange={(name) => setFormData(prev => ({ ...prev, name }))}
            onCategoryChange={(category) => setFormData(prev => ({ ...prev, category }))}
            onValueChange={(estimatedValue) => setFormData(prev => ({ ...prev, estimatedValue }))}
            onStatusChange={(status) => setFormData(prev => ({ ...prev, status: status as any }))}
            onNext={() => setCurrentStep('expiry')}
            onBack={() => setCurrentStep('tags')}
          />
        );
      case 'expiry':
        return (
          <div className="space-y-6">
            <ExpiryReminderSection
              reminder={formData.expiryReminder}
              onReminderChange={(reminder) => setFormData(prev => ({ ...prev, expiryReminder: reminder }))}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep('details')}
                className="px-4 py-2 border rounded-md hover:bg-muted"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.name.trim()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
              >
                Add Item
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          {['photos', 'description', 'tags', 'details', 'expiry'].map((step, index) => {
            const stepNames = ['Photos', 'Description', 'Tags', 'Details', 'Expiry'];
            const isActive = currentStep === step;
            const isCompleted = ['photos', 'description', 'tags', 'details', 'expiry'].indexOf(currentStep) > index;
            
            return (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isActive ? 'bg-primary text-primary-foreground' :
                  isCompleted ? 'bg-green-500 text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm ${
                  isActive ? 'font-medium' : 'text-muted-foreground'
                }`}>
                  {stepNames[index]}
                </span>
                {index < 4 && <div className="w-6 h-px bg-muted mx-2" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Step Content */}
      {renderCurrentStep()}

      {/* Cancel Button */}
      <div className="mt-6 text-center">
        <button
          onClick={onCancel}
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          Cancel and return to inventory
        </button>
      </div>
    </div>
  );
};
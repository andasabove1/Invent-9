import { useState, useEffect } from 'react';
import { InventoryItem } from '@/types/inventory';
import { toast } from '@/components/ui/use-toast';

const STORAGE_KEY = 'inventory-items';
const MAX_STORAGE_SIZE = 4 * 1024 * 1024; // 4MB limit

export const useInventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load items from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedItems = JSON.parse(stored).map((item: any) => ({
          ...item,
          dateAdded: new Date(item.dateAdded),
          expiryReminder: item.expiryReminder ? {
            ...item.expiryReminder,
            endDate: item.expiryReminder.endDate ? new Date(item.expiryReminder.endDate) : undefined,
            customDate: item.expiryReminder.customDate ? new Date(item.expiryReminder.customDate) : undefined,
            lastNotified: item.expiryReminder.lastNotified ? new Date(item.expiryReminder.lastNotified) : undefined
          } : undefined
        }));
        setItems(parsedItems);
      }
    } catch (error) {
      console.error('Error loading inventory:', error);
      toast({
        title: 'Error',
        description: 'Failed to load inventory data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Save items to localStorage with size check
  const saveToStorage = (itemsToSave: InventoryItem[]) => {
    try {
      const dataString = JSON.stringify(itemsToSave);
      if (dataString.length > MAX_STORAGE_SIZE) {
        throw new Error('Storage quota exceeded');
      }
      localStorage.setItem(STORAGE_KEY, dataString);
    } catch (error) {
      console.error('Error saving inventory:', error);
      toast({
        title: 'Storage Error',
        description: 'Storage quota exceeded. Consider removing old items or photos.',
        variant: 'destructive'
      });
      throw error;
    }
  };

  // Save items to localStorage whenever items change
  useEffect(() => {
    if (!loading) {
      try {
        saveToStorage(items);
      } catch (error) {
        // Error already handled in saveToStorage
      }
    }
  }, [items, loading]);

  const addItem = (itemData: Omit<InventoryItem, 'id' | 'dateAdded'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: crypto.randomUUID(),
      dateAdded: new Date()
    };
    
    try {
      const newItems = [newItem, ...items];
      saveToStorage(newItems);
      setItems(newItems);
      toast({
        title: 'Success',
        description: `${newItem.name} added to inventory`
      });
    } catch (error) {
      // Error already handled in saveToStorage
    }
  };

  const updateItem = (id: string, updates: Partial<InventoryItem>) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    try {
      saveToStorage(newItems);
      setItems(newItems);
      toast({
        title: 'Success',
        description: 'Item updated successfully'
      });
    } catch (error) {
      // Error already handled in saveToStorage
    }
  };

  const deleteItem = (id: string) => {
    const item = items.find(item => item.id === id);
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    toast({
      title: 'Success',
      description: `${item?.name || 'Item'} removed from inventory`
    });
  };

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem
  };
};
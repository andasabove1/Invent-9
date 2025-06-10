import { InventoryItem } from '@/types/inventory';
import { InventoryCard } from './InventoryCard';

interface InventoryGridProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onList: (item: InventoryItem) => void;
  onDonate: (item: InventoryItem) => void;
  onDistribute: (item: InventoryItem) => void;
}

export const InventoryGrid = ({ items, onEdit, onList, onDonate, onDistribute }: InventoryGridProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No items yet</h3>
        <p className="text-gray-500">Start building your inventory by adding your first item!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map(item => (
        <InventoryCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onList={onList}
          onDonate={onDonate}
          onDistribute={onDistribute}
        />
      ))}
    </div>
  );
};
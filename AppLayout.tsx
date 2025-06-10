import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Package, Search, Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const AppLayout = () => {
  const [showApp, setShowApp] = useState(false);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: Date.now(), name: newItem, category: 'General' }]);
      setNewItem('');
    }
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  if (showApp) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b px-6 py-4">
          <Button variant="ghost" onClick={() => setShowApp(false)} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />Back to Home
          </Button>
        </div>
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Smart Inventory Manager</h1>
            <div className="flex gap-4 mb-6">
              <Input placeholder="Add new item..." value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addItem()} />
              <Button onClick={addItem}><Plus className="w-4 h-4 mr-2" />Add</Button>
            </div>
            <Input placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />{item.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Category: {item.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredItems.length === 0 && items.length > 0 && (
            <p className="text-center text-gray-500 mt-8">No items match your search.</p>
          )}
          {items.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No items yet. Add your first item above!</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="fixed top-6 right-6 z-50">
        <Button onClick={() => setShowApp(true)} className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
          Try the App
        </Button>
      </div>
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Smart Inventory Manager</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Organize, sell, or donate your possessions with ease using photos and tags.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card><CardHeader><CardTitle>📸 Photo Management</CardTitle></CardHeader><CardContent>Upload and organize photos of your items</CardContent></Card>
          <Card><CardHeader><CardTitle>🏷️ Smart Tagging</CardTitle></CardHeader><CardContent>Automatically categorize with AI-powered tags</CardContent></Card>
          <Card><CardHeader><CardTitle>💰 Sell & Donate</CardTitle></CardHeader><CardContent>Easy listing options for selling or donating</CardContent></Card>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
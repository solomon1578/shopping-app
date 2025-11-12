import { useState, useEffect } from 'react';
import { Plus, Check, Trash2, ShoppingCart } from 'lucide-react';

interface ShoppingItem {
  id: string;
  name: string;
  purchased: boolean;
}

function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedItems = localStorage.getItem('shoppingList');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        name: inputValue.trim(),
        purchased: false,
      };
      setItems([...items, newItem]);
      setInputValue('');
    }
  };

  const togglePurchased = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const unpurchasedCount = items.filter(item => !item.purchased).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-8 sm:px-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <ShoppingCart className="w-8 h-8 text-white" strokeWidth={2.5} />
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Shopping List App</h1>
            </div>
            <p className="text-center text-blue-50 text-sm sm:text-base">
              {unpurchasedCount} {unpurchasedCount === 1 ? 'item' : 'items'} left to buy
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={addItem} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Add a new item..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-800 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>
            </form>

            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Your shopping list is empty</p>
                <p className="text-gray-400 text-sm mt-1">Add your first item to get started</p>
              </div>
            ) : (
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <button
                      onClick={() => togglePurchased(item.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                        item.purchased
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {item.purchased && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                    </button>

                    <span
                      className={`flex-1 text-gray-800 transition-all ${
                        item.purchased ? 'line-through text-gray-400' : ''
                      }`}
                    >
                      {item.name}
                    </span>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Delete item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Your list is automatically saved
        </p>
      </div>
    </div>
  );
}

export default App;

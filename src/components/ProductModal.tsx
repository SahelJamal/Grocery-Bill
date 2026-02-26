import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Plus, Save, Trash2 } from 'lucide-react';
import { GroceryItem } from '../data/items';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, price: number, category: string, image: string, id?: string) => void;
  onDelete?: (id: string) => void;
  categories: string[];
  editingItem?: GroceryItem | null;
}

export function ProductModal({ isOpen, onClose, onSave, onDelete, categories, editingItem }: ProductModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(categories[1] || 'Grains');
  const [image, setImage] = useState('📦');

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setPrice(editingItem.pricePerKg.toString());
      setCategory(editingItem.category);
      setImage(editingItem.image || '📦');
    } else {
      setName('');
      setPrice('');
      setCategory(categories[1] || 'Grains');
      setImage('📦');
    }
  }, [editingItem, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    onSave(name, Number(price), category, image, editingItem?.id);
    onClose();
  };

  const handleDelete = () => {
    if (editingItem && onDelete) {
      onDelete(editingItem.id);
      onClose();
    }
  };

  const commonEmojis = [
    // Grains & Pulses
    '🍚', '🌾', '🌾', '🌽', '🍞', '🥖', '🥐', '🫓', '🥣', '🟠', '🟡', '🟢', '🟤', '⚪',
    // Fruits
    '🍎', '🍏', '🍌', '🍊', '🍋', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝',
    // Vegetables
    '🥔', '🧅', '🧄', '🥕', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🍄', '🥜', '🌰',
    // Dairy & Pantry
    '🥛', '🧀', '🧈', '🥚', '🧂', '🍯', '🥫', '🍫', '🍬', '☕', '🍵', '🧃', '🧊', '📦'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-md overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingItem ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="e.g. Basmati Rice"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹/kg)</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all appearance-none"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL or Emoji</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="Paste image URL or emoji"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick Select Emoji</label>
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200 max-h-32 overflow-y-auto">
                {commonEmojis.map(emoji => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => setImage(emoji)}
                    className={`text-2xl p-2 rounded-lg transition-all ${image === emoji ? 'bg-indigo-100 scale-110 shadow-sm' : 'hover:bg-white'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              {editingItem && onDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 py-4 bg-red-50 text-red-600 rounded-xl font-bold text-lg hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              )}
              <button
                type="submit"
                className="flex-[2] py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {editingItem ? <Save className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                {editingItem ? 'Save Changes' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

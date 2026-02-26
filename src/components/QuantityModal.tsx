import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Plus, Minus } from 'lucide-react';
import { GroceryItem } from '../data/items';

interface QuantityModalProps {
  item: GroceryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: GroceryItem, quantity: number, price: number) => void;
}

export function QuantityModal({ item, isOpen, onClose, onConfirm }: QuantityModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  // Reset state when item changes or modal opens
  if (item && price === 0 && isOpen) {
    setPrice(item.pricePerKg);
  }

  if (!isOpen || !item) return null;

  const handleIncrement = (amount: number) => {
    setQuantity(prev => Math.min(100, Math.max(0.1, Number((prev + amount).toFixed(1)))));
  };

  const handleConfirm = () => {
    onConfirm(item, quantity, price);
    setQuantity(1); // Reset for next time
    setPrice(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ y: "100%", opacity: 0, scale: 1 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: "100%", opacity: 0, scale: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:max-w-sm overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-full">
              <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-500">₹</span>
                <input
                  type="number"
                  value={price || ''}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-24 p-1 border border-gray-300 rounded text-gray-700 font-medium focus:outline-none focus:border-indigo-500"
                  placeholder="Price"
                />
                <span className="text-gray-500">/kg</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-6 py-4">
            <div className="text-5xl font-mono font-bold text-indigo-600">
              {quantity.toFixed(1)} <span className="text-xl text-gray-400 font-sans font-medium">kg</span>
            </div>
            
            <div className="flex items-center gap-4 w-full justify-center">
              <button 
                onClick={() => handleIncrement(-0.5)}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all"
              >
                <Minus className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => handleIncrement(-0.1)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all text-sm"
              >
                -0.1
              </button>

              <button 
                onClick={() => handleIncrement(0.1)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all text-sm"
              >
                +0.1
              </button>

              <button 
                onClick={() => handleIncrement(0.5)}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-2 w-full">
              {[1, 5, 10, 25].map(val => (
                <button
                  key={val}
                  onClick={() => setQuantity(val)}
                  className={`py-2 rounded-lg font-medium transition-colors ${
                    quantity === val 
                      ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-200' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {val}kg
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500">Total Price</span>
              <span className="text-2xl font-bold text-gray-900">₹{(price * quantity).toFixed(2)}</span>
            </div>
            <button
              onClick={handleConfirm}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-6 h-6" />
              Add to Bill
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

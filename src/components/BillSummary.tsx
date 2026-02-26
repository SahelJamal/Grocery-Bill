import { Trash2, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';
import { GroceryItem } from '../data/items';

export interface BillItem {
  id: string;
  product: GroceryItem;
  quantity: number;
}

interface BillSummaryProps {
  items: BillItem[];
  onClear: () => void;
  onRemoveItem: (id: string) => void;
  onClose?: () => void; // Optional close handler for mobile
}

export function BillSummary({ items, onClear, onRemoveItem, onClose }: BillSummaryProps) {
  const total = items.reduce((sum, item) => sum + (item.product.pricePerKg * item.quantity), 0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [items.length]);

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200 shadow-xl">
      <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          {onClose ? (
            <button onClick={onClose} className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-200 rounded-full">
              <X className="w-5 h-5" />
            </button>
          ) : (
            <div className="p-2 bg-indigo-100 rounded-lg">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
            </div>
          )}
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Current Bill</h2>
        </div>
        <button 
          onClick={onClear}
          disabled={items.length === 0}
          className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
        <AnimatePresence initial={false}>
          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4"
            >
              <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 opacity-20" />
              <p className="text-sm md:text-base">No items added yet</p>
            </motion.div>
          ) : (
            items.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white border border-gray-100 rounded-xl p-3 md:p-4 shadow-sm flex justify-between items-center group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
                    {item.product.image?.startsWith('http') ? (
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="text-xl md:text-2xl">{item.product.image}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate text-sm md:text-base">{item.product.name}</h4>
                    <p className="text-xs md:text-sm text-gray-500 truncate">
                      {item.quantity.toFixed(1)} kg × ₹{item.product.pricePerKg}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                  <span className="font-mono font-bold text-gray-900 text-sm md:text-base">
                    ₹{(item.product.pricePerKg * item.quantity).toFixed(2)}
                  </span>
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 md:p-6 bg-gray-900 text-white mt-auto shrink-0">
        <div className="flex justify-between items-center mb-2 text-gray-400 text-xs md:text-sm">
          <span>Total Items</span>
          <span>{items.length}</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-base md:text-lg font-medium text-gray-300">Grand Total</span>
          <span className="text-2xl md:text-4xl font-bold font-mono tracking-tight">
            ₹{total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}


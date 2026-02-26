/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GROCERY_ITEMS, GroceryItem } from './data/items';
import { QuantityModal } from './components/QuantityModal';
import { ProductModal } from './components/ProductModal';
import { BillSummary, BillItem } from './components/BillSummary';
import { Search, Plus, ShoppingBag, ChevronUp, PackagePlus, Pencil, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function ProductImage({ image, name, className = "" }: { image?: string; name: string; className?: string }) {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const isUrl = image?.startsWith('http') || image?.startsWith('/') || image?.includes('.');
  
  if (!image) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-xl ${className}`}>
        <Package className="w-1/2 h-1/2 text-gray-400" />
      </div>
    );
  }

  if (isUrl && !error) {
    return (
      <div className={`relative overflow-hidden rounded-xl bg-gray-50 ${className}`}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
            <Package className="w-8 h-8 text-gray-300" />
          </div>
        )}
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {isUrl && error ? (
        <div className="flex flex-col items-center justify-center text-gray-400 bg-gray-50 w-full h-full rounded-xl border border-dashed border-gray-200">
          <Package className="w-8 h-8 mb-1" />
          <span className="text-[10px] font-medium uppercase tracking-wider">No Image</span>
        </div>
      ) : (
        <span className="text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-110">
          {image}
        </span>
      )}
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState<GroceryItem[]>(GROCERY_ITEMS);
  const [selectedItem, setSelectedItem] = useState<GroceryItem | null>(null);
  const [editingItem, setEditingItem] = useState<GroceryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isMobileBillOpen, setIsMobileBillOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 9 : 15;

  const categories = ['All', ...Array.from(new Set(items.map(item => item.category)))] as string[];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to page 1 when search or category changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const handleItemClick = (item: GroceryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleEditClick = (e: React.MouseEvent, item: GroceryItem) => {
    e.stopPropagation();
    setEditingItem(item);
    setIsProductModalOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingItem(null);
    setIsProductModalOpen(true);
  };

  const handleAddToBill = (item: GroceryItem, quantity: number, price: number) => {
    setBillItems(prev => [...prev, {
      id: crypto.randomUUID(),
      product: { ...item, pricePerKg: price }, // Use the custom price
      quantity
    }]);
  };

  const handleSaveProduct = (name: string, price: number, category: string, image: string, id?: string) => {
    if (id) {
      // Update existing
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, name, pricePerKg: price, category, image } : item
      ));
      // Also update in bill if needed (optional, usually POS keeps historical price but here we might want to sync if it's a correction)
      setBillItems(prev => prev.map(item => 
        item.product.id === id ? { ...item, product: { ...item.product, name, pricePerKg: price, category, image } } : item
      ));
    } else {
      // Add new
      const newItem: GroceryItem = {
        id: crypto.randomUUID(),
        name,
        pricePerKg: price,
        category,
        image
      };
      setItems(prev => [newItem, ...prev]);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setBillItems(prev => prev.filter(item => item.product.id !== id));
  };

  const handleRemoveItem = (id: string) => {
    setBillItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearBill = () => {
    if (confirm('Are you sure you want to clear the entire bill?')) {
      setBillItems([]);
      setIsMobileBillOpen(false);
    }
  };

  const totalAmount = billItems.reduce((sum, item) => sum + (item.product.pricePerKg * item.quantity), 0);
  const totalItems = billItems.length;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden font-sans">
      {/* Product Catalog Section */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="bg-white p-4 md:p-6 shadow-sm z-10 shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Grocery Billing</h1>
              <button 
                onClick={handleAddNewClick}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors font-semibold text-sm"
              >
                <PackagePlus className="w-4 h-4" />
                New Product
              </button>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-0 rounded-xl transition-all"
              />
            </div>
            <button 
              onClick={handleAddNewClick}
              className="sm:hidden flex w-full items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-bold shadow-lg shadow-indigo-100"
            >
              <PackagePlus className="w-5 h-5" />
              Add New Product
            </button>
          </div>
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-hidden p-2 md:p-6 pb-24 md:pb-6 flex flex-col">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 grid-rows-3 md:grid-rows-4 lg:grid-rows-3 gap-2 md:gap-4 flex-1 min-h-0">
            {paginatedItems.map(item => (
              <motion.div
                key={item.id}
                layoutId={item.id}
                onClick={() => handleItemClick(item)}
                className="bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md border border-transparent hover:border-indigo-100 transition-all text-left group flex flex-col h-full active:scale-95 relative cursor-pointer overflow-hidden"
              >
                <button
                  onClick={(e) => handleEditClick(e, item)}
                  className="absolute top-1 right-1 p-1.5 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg md:opacity-0 md:group-hover:opacity-100 transition-all z-10"
                >
                  <Pencil className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <ProductImage 
                  image={item.image} 
                  name={item.name} 
                  className="flex-1 min-h-0 w-full mb-1 md:mb-2" 
                />
                <div className="mt-auto w-full shrink-0">
                  <h3 className="font-bold text-gray-900 leading-tight mb-0.5 text-[10px] sm:text-sm md:text-base truncate">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500">₹{item.pricePerKg}</p>
                    <div className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Plus className="w-3 h-3 md:w-5 md:h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-4 pt-4 border-t border-gray-200 shrink-0">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Bill Summary Section (Hidden on mobile) */}
      <div className="hidden md:block h-full w-96 z-20 border-l border-gray-200 shadow-none shrink-0">
        <BillSummary 
          items={billItems} 
          onClear={handleClearBill} 
          onRemoveItem={handleRemoveItem}
        />
      </div>

      {/* Mobile Bottom Bar (Visible only on mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-30 safe-area-bottom">
        <div className="p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">{totalItems} Items</span>
            <span className="text-xl font-bold text-gray-900 font-mono">₹{totalAmount.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setIsMobileBillOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-5 h-5" />
            View Bill
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Bill Sheet/Modal */}
      <AnimatePresence>
        {isMobileBillOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileBillOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-[85vh] bg-white rounded-t-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full z-50" />
              <BillSummary 
                items={billItems} 
                onClear={handleClearBill} 
                onRemoveItem={handleRemoveItem}
                onClose={() => setIsMobileBillOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <QuantityModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddToBill}
      />

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        onDelete={handleDeleteProduct}
        categories={categories}
        editingItem={editingItem}
      />
    </div>
  );
}



import React, { useState } from 'react';
import { 
  X, 
  Tag, 
  Check, 
  Save, 
  Percent, 
  ArrowUpDown, 
  Sparkles, 
  RotateCcw,
  Sliders,
  DollarSign
} from 'lucide-react';
import { Product, ProductCategory, Language } from '../types';
import { categoriesData } from '../data/products';
import { translations } from '../data/translations';

interface CategoryPriceEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  products: Product[];
  initialCategory?: ProductCategory | 'all';
  onUpdateProduct: (product: Product) => void;
}

export const CategoryPriceEditorModal: React.FC<CategoryPriceEditorModalProps> = ({
  isOpen,
  onClose,
  lang,
  products,
  initialCategory = 'all',
  onUpdateProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(initialCategory);
  const [localProducts, setLocalProducts] = useState<Product[]>(products);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'individual' | 'bulk'>('individual');
  const [bulkPercent, setBulkPercent] = useState<number>(10);
  const [bulkAction, setBulkAction] = useState<'discount' | 'increase'>('discount');

  const t = translations[lang];

  // Keep localProducts synchronized if props change
  React.useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  if (!isOpen) return null;

  const filteredProducts = localProducts.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  const handlePriceChange = (productId: string, field: 'priceBn' | 'priceEn' | 'originalPriceBn', value: number) => {
    setLocalProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            [field]: value >= 0 ? value : 0,
          };
        }
        return p;
      })
    );
  };

  const handleUnitChange = (productId: string, unitBn: string) => {
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, unitBn } : p))
    );
  };

  const handleSaveIndividual = (product: Product) => {
    onUpdateProduct(product);
    setSaveSuccessMessage(
      lang === 'bn' 
        ? `"${product.nameBn}" এর মূল্য সফলভাবে আপডেট হয়েছে!` 
        : `Price updated for "${product.nameEn}" successfully!`
    );
    setTimeout(() => setSaveSuccessMessage(''), 2500);
  };

  const handleSaveAll = () => {
    filteredProducts.forEach((p) => {
      onUpdateProduct(p);
    });
    setSaveSuccessMessage(
      lang === 'bn' 
        ? `বাছাইকৃত ক্যাটাগরির সকল (${filteredProducts.length}টি) পণ্যের মূল্য সফলভাবে সংরক্ষিত হয়েছে!` 
        : `Successfully saved prices for all ${filteredProducts.length} products!`
    );
    setTimeout(() => setSaveSuccessMessage(''), 3000);
  };

  // Bulk category discount / adjustment
  const handleApplyBulkCategory = () => {
    const factor = bulkAction === 'discount' ? (1 - bulkPercent / 100) : (1 + bulkPercent / 100);
    const updated = localProducts.map((p) => {
      if (selectedCategory === 'all' || p.category === selectedCategory) {
        const newBn = Math.round(p.priceBn * factor);
        const newEn = Number((p.priceEn * factor).toFixed(2));
        const updatedProd: Product = {
          ...p,
          originalPriceBn: p.originalPriceBn || p.priceBn,
          priceBn: Math.max(1, newBn),
          priceEn: Math.max(0.1, newEn),
        };
        onUpdateProduct(updatedProd);
        return updatedProd;
      }
      return p;
    });

    setLocalProducts(updated);
    setSaveSuccessMessage(
      lang === 'bn'
        ? `ক্যাটাগরির সকল পণ্যের মূল্যে ${bulkPercent}% ${bulkAction === 'discount' ? 'ছাড়' : 'বৃদ্ধি'} কার্যকর হয়েছে!`
        : `Applied ${bulkPercent}% ${bulkAction} to all category items!`
    );
    setTimeout(() => setSaveSuccessMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-emerald-950 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 to-green-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-lime-300 shadow-sm">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>{lang === 'bn' ? 'সকল ক্যাটাগরি পণ্য মূল্য ও ডিসকাউন্ট সম্পাদনা' : 'Category Product Price Editor'}</span>
                <span className="text-[10px] bg-lime-400 text-emerald-950 px-2 py-0.5 rounded-full font-black">
                  LIVE EDIT
                </span>
              </h3>
              <p className="text-xs text-emerald-200">
                {lang === 'bn' 
                  ? 'যেকোনো ক্যাটাগরির পণ্যের বিক্রয় মূল্য, ডিসকাউন্ট ও একক সরাসরি পরিবর্তন করুন'
                  : 'Quickly modify sales price, discount rate, and unit across any category'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSaveAll}
              className="py-1.5 px-3 bg-white text-emerald-900 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'bn' ? 'সব সেভ করুন' : 'Save All'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-300 hover:text-white rounded-xl hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pills & Bulk Options Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-emerald-900/40 bg-slate-50 dark:bg-[#112318] space-y-3">
          
          {/* Notification */}
          {saveSuccessMessage && (
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{saveSuccessMessage}</span>
            </div>
          )}

          {/* Category Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#0c1a12] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-emerald-900/40 hover:bg-slate-100'
              }`}
            >
              {lang === 'bn' ? 'সকল ক্যাটাগরি (All)' : 'All Categories'} ({products.length})
            </button>

            {categoriesData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-white dark:bg-[#0c1a12] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-emerald-900/40 hover:bg-slate-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{lang === 'bn' ? cat.nameBn : cat.nameEn}</span>
              </button>
            ))}
          </div>

          {/* Bulk Category Price Action Accordion / Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 bg-white dark:bg-[#0c1a12] rounded-2xl border border-slate-200 dark:border-emerald-900/40 text-xs">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-slate-800 dark:text-white">
                {lang === 'bn' ? 'এক ক্লিকে ক্যাটাগরি মূল্য অ্যাডজাস্ট করুন:' : 'One-Click Category Price Adjustment:'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value as any)}
                className="p-1.5 bg-slate-50 dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/40 rounded-lg text-slate-800 dark:text-slate-200 text-xs"
              >
                <option value="discount">{lang === 'bn' ? 'ডিসকাউন্ট / মূল্য কমান' : 'Discount / Decrease'}</option>
                <option value="increase">{lang === 'bn' ? 'মূল্য বৃদ্ধি করুন' : 'Increase Price'}</option>
              </select>

              <select
                value={bulkPercent}
                onChange={(e) => setBulkPercent(Number(e.target.value))}
                className="p-1.5 bg-slate-50 dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/40 rounded-lg text-slate-800 dark:text-slate-200 text-xs font-bold"
              >
                <option value={5}>৫% (5%)</option>
                <option value={10}>১০% (10%)</option>
                <option value={15}>১৫% (15%)</option>
                <option value={20}>২০% (20%)</option>
                <option value={30}>৩০% (30%)</option>
              </select>

              <button
                type="button"
                onClick={handleApplyBulkCategory}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'bn' ? 'প্রয়োগ করুন' : 'Apply'}
              </button>
            </div>
          </div>
        </div>

        {/* Product Items Table */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#112318] border border-slate-200/90 dark:border-emerald-900/40 flex flex-col justify-between space-y-3 hover:border-emerald-500 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={p.image}
                    alt={p.nameBn}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                        {p.category}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${p.inStock ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300' : 'bg-rose-100 text-rose-800'}`}>
                        {p.inStock ? `${p.stockCount} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {lang === 'bn' ? p.nameBn : p.nameEn}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {p.farmOriginBn}
                    </p>
                  </div>
                </div>

                {/* Price Inputs Grid */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-0.5">
                      {lang === 'bn' ? 'বিক্রয় মূল্য (৳ BDT)' : 'Sale Price (৳)'}
                    </label>
                    <input
                      type="number"
                      value={p.priceBn}
                      onChange={(e) => handlePriceChange(p.id, 'priceBn', Number(e.target.value))}
                      className="w-full p-1.5 bg-white dark:bg-[#0c1a12] border border-slate-300 dark:border-emerald-800 rounded-lg text-slate-900 dark:text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-0.5">
                      {lang === 'bn' ? 'পূর্বের মূল্য (৳ ছাড়)' : 'Reg Price (৳)'}
                    </label>
                    <input
                      type="number"
                      value={p.originalPriceBn || ''}
                      placeholder="Optional"
                      onChange={(e) => handlePriceChange(p.id, 'originalPriceBn', Number(e.target.value))}
                      className="w-full p-1.5 bg-white dark:bg-[#0c1a12] border border-slate-300 dark:border-emerald-800 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-0.5">
                      {lang === 'bn' ? 'একক (Unit)' : 'Unit'}
                    </label>
                    <input
                      type="text"
                      value={p.unitBn}
                      onChange={(e) => handleUnitChange(p.id, e.target.value)}
                      className="w-full p-1.5 bg-white dark:bg-[#0c1a12] border border-slate-300 dark:border-emerald-800 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">
                    USD: ${p.priceEn} / {p.unitEn}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSaveIndividual(p)}
                    className="py-1 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'আপডেট করুন' : 'Update Price'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#112318] border-t border-slate-200 dark:border-emerald-900/40 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'bn' ? 'সর্বমোট পণ্য প্রদর্শিত: ' : 'Showing products: '}
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{filteredProducts.length}</span>
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সকল মূল্য সংরক্ষণ করুন' : 'Save All Prices'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 dark:bg-emerald-950 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-300 transition-colors cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

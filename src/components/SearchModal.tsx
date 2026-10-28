import React, { useState } from 'react';
import { Search, X, ArrowRight, ShoppingCart } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  lang,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [query, setQuery] = useState('');
  const t = translations[lang];

  if (!isOpen) return null;

  const results = query.trim() === '' ? products.slice(0, 4) : products.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.nameBn.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.descriptionBn.toLowerCase().includes(q) ||
      p.descriptionEn.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-emerald-950 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden"
        role="dialog"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-emerald-900/30 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white px-2 py-1"
          >
            {t.close}
          </button>
        </div>

        {/* Popular searches suggestions */}
        <div className="p-3 bg-slate-50 dark:bg-[#112318] border-b border-slate-100 dark:border-emerald-900/30 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-400 shrink-0 font-medium">{lang === 'bn' ? 'জনপ্রিয়:' : 'Popular:'}</span>
          {['টমেটো', 'পালং শাক', 'গাজর', 'ডিম', 'আপেল', 'মধু'].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-emerald-900/40 text-slate-700 dark:text-emerald-300 border border-slate-200/60 dark:border-emerald-800/40 shrink-0 hover:bg-emerald-50"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-emerald-950/60">
          {results.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              {lang === 'bn' ? 'কোনো পণ্য খুঁজে পাওয়া যায়নি' : 'No organic produce found'}
            </div>
          ) : (
            results.map((p) => {
              const price = lang === 'bn' ? p.priceBn : p.priceEn;
              const unit = lang === 'bn' ? p.unitBn : p.unitEn;

              return (
                <div
                  key={p.id}
                  className="py-2.5 flex items-center justify-between group hover:bg-slate-50 dark:hover:bg-emerald-950/40 px-2 rounded-xl transition-colors"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="flex items-center space-x-3 cursor-pointer flex-1 min-w-0"
                  >
                    <img
                      src={p.image}
                      alt={p.nameEn}
                      className="w-12 h-12 rounded-lg object-cover bg-white shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {lang === 'bn' ? p.nameBn : p.nameEn}
                      </h4>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        {t.currencySymbol}{price} / {unit}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart(p)}
                    className="p-2 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-lg transition-colors"
                    title={t.addToCart}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};

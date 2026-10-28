import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCategory, Language } from '../types';
import { categoriesData } from '../data/products';
import { translations } from '../data/translations';

interface CategoryGridProps {
  lang: Language;
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (category: ProductCategory | 'all') => void;
  onOpenPriceEditor: (category?: ProductCategory | 'all') => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  lang,
  selectedCategory,
  onSelectCategory,
  onOpenPriceEditor,
}) => {
  const t = translations[lang];

  return (
    <section id="categories" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>🌿</span>
            <span>{t.shopByCategory}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'bn' 
              ? 'আপনার প্রতিদিনের স্বাস্থ্যকর খাদ্য তালিকার জন্য সরাসরি বাছাইকৃত'
              : 'Directly sourced for your healthy wholesome daily diet'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Price Editor for all categories (User Request) */}
          <button
            onClick={() => onOpenPriceEditor('all')}
            className="py-1.5 px-3 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-700/60 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Edit prices across all categories"
          >
            <span>🏷️</span>
            <span>{lang === 'bn' ? 'সকল ক্যাটাগরি পণ্য মূল্য এডিট' : 'Edit Category Prices'}</span>
          </button>

          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer py-1.5 px-2"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categoriesData.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-4 rounded-2xl border transition-all duration-200 text-center flex flex-col items-center justify-between group cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/30 -translate-y-1'
                  : 'bg-white dark:bg-[#0c1a12] border-slate-200/80 dark:border-emerald-950 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-3 bg-slate-50 dark:bg-emerald-950/60 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                {lang === 'bn' ? cat.nameBn : cat.nameEn}
              </h3>
              <p className={`text-[10px] mt-1 ${isSelected ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>
                {lang === 'bn' ? cat.count : cat.countEn}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

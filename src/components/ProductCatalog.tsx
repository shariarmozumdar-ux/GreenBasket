import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingCart, 
  Eye, 
  Check, 
  Star, 
  Filter,
  Search,
  Sparkles
} from 'lucide-react';
import { Product, ProductCategory, Language } from '../types';
import { translations } from '../data/translations';

interface ProductCatalogProps {
  lang: Language;
  products: Product[];
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (category: ProductCategory | 'all') => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onOpenQuickView: (product: Product) => void;
  searchQuery: string;
  onOpenPriceEditor?: (category?: ProductCategory | 'all') => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  lang,
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenQuickView,
  searchQuery,
  onOpenPriceEditor,
}) => {
  const [sortBy, setSortBy] = useState<'popular' | 'priceLow' | 'priceHigh' | 'rating'>('popular');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const t = translations[lang];

  // Filtering
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.nameBn.toLowerCase().includes(query) ||
      p.nameEn.toLowerCase().includes(query) ||
      p.descriptionBn.toLowerCase().includes(query) ||
      p.descriptionEn.toLowerCase().includes(query) ||
      p.farmOriginBn.toLowerCase().includes(query) ||
      p.farmOriginEn.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceLow') {
      const priceA = lang === 'bn' ? a.priceBn : a.priceEn;
      const priceB = lang === 'bn' ? b.priceBn : b.priceEn;
      return priceA - priceB;
    }
    if (sortBy === 'priceHigh') {
      const priceA = lang === 'bn' ? a.priceBn : a.priceEn;
      const priceB = lang === 'bn' ? b.priceBn : b.priceEn;
      return priceB - priceA;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return b.reviewCount - a.reviewCount;
  });

  const handleAddToCartClick = (p: Product) => {
    onAddToCart(p);
    setJustAddedId(p.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <section id="shop" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Bar: Section Title + Interactive Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'সরাসরি খামার থেকে বাছাই' : 'Handpicked Harvest'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {t.topPicksTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lang === 'bn'
              ? 'সার এবং ক্ষতিকর কীটনাশক ছাড়াই সম্পূর্ণ প্রাকৃতিকভাবে উৎপাদিত পণ্য'
              : 'Grown naturally without harmful chemicals, harvested fresh every sunrise'}
          </p>
        </div>

        {/* Filter Tabs & Sorting Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Quick Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#112417] rounded-xl border border-slate-200/60 dark:border-emerald-900/40 text-xs">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => onSelectCategory('vegetables')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedCategory === 'vegetables'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              {t.catVegetables}
            </button>
            <button
              onClick={() => onSelectCategory('fruits')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedCategory === 'fruits'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600'
              }`}
            >
              {t.catFruits}
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white dark:bg-[#0f1f14] border border-slate-200 dark:border-emerald-900/40 px-3 py-1.5 rounded-xl text-xs text-slate-700 dark:text-slate-200">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer font-medium"
            >
              <option value="popular" className="dark:bg-[#0c1a12]">{t.sortPopular}</option>
              <option value="priceLow" className="dark:bg-[#0c1a12]">{t.sortPriceLow}</option>
              <option value="priceHigh" className="dark:bg-[#0c1a12]">{t.sortPriceHigh}</option>
              <option value="rating" className="dark:bg-[#0c1a12]">{t.sortRating}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-[#0c1a12] rounded-3xl border border-dashed border-slate-200 dark:border-emerald-900/40 p-8">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {lang === 'bn' 
              ? 'আপনার সার্চ অনুযায়ী কোনো পণ্য পাওয়া যায়নি।' 
              : 'No organic products found matching your current filter.'}
          </p>
          <button
            onClick={() => onSelectCategory('all')}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
          >
            {t.viewAll}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map((p) => {
            const isWishlisted = wishlistIds.includes(p.id);
            const isJustAdded = justAddedId === p.id;
            const price = lang === 'bn' ? p.priceBn : p.priceEn;
            const originalPrice = lang === 'bn' ? p.originalPriceBn : p.originalPriceEn;
            const unit = lang === 'bn' ? p.unitBn : p.unitEn;
            const symbol = t.currencySymbol;

            return (
              <div
                key={p.id}
                className="group relative bg-white dark:bg-[#0c1a12] rounded-2xl border border-slate-200/80 dark:border-emerald-950 overflow-hidden shadow-2xs hover:shadow-lg hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative aspect-4/3 bg-slate-50 dark:bg-emerald-950/40 overflow-hidden">
                  <img
                    src={p.image}
                    alt={lang === 'bn' ? p.nameBn : p.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Top Badge */}
                  {p.badge && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-700 text-white shadow-xs">
                        {lang === 'bn' ? (p.badgeBn || p.badge) : p.badge}
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(p)}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isWishlisted
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-white/80 dark:bg-black/60 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-white shadow-2xs'
                    }`}
                    title="Add to wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick View Floating Trigger */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <button
                      type="button"
                      onClick={() => onOpenQuickView(p)}
                      className="pointer-events-auto py-1.5 px-3 rounded-lg bg-white/95 text-slate-800 text-xs font-semibold shadow-md flex items-center gap-1.5 hover:bg-emerald-50 hover:text-emerald-700 transition-all transform scale-95 group-hover:scale-100"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.quickView}</span>
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                  <div>
                    {/* Rating & Origin */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                      <span className="flex items-center text-amber-500 font-semibold gap-1">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="tabular-nums">{p.rating}</span>
                        <span className="text-slate-400 font-normal">({p.reviewCount})</span>
                      </span>
                      <span className="truncate max-w-[110px] text-emerald-600 dark:text-emerald-400 font-medium">
                        {lang === 'bn' ? 'সাভার খামার' : 'Certified Farm'}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 
                      onClick={() => onOpenQuickView(p)}
                      className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {lang === 'bn' ? p.nameBn : p.nameEn}
                    </h3>

                    {/* Price and Unit with Quick Category Price Edit */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
                          {symbol}{price}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          / {unit}
                        </span>
                        {originalPrice && (
                          <span className="text-xs text-slate-400 line-through tabular-nums ml-1">
                            {symbol}{originalPrice}
                          </span>
                        )}
                      </div>

                      {onOpenPriceEditor && (
                        <button
                          type="button"
                          onClick={() => onOpenPriceEditor(p.category)}
                          className="p-1 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-slate-100 dark:hover:bg-emerald-950 transition-colors cursor-pointer"
                          title={lang === 'bn' ? 'মূল্য সম্পাদনা করুন' : 'Edit Price'}
                        >
                          <span className="text-xs">✏️</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button (Matching Reference Design) */}
                  <button
                    type="button"
                    onClick={() => handleAddToCartClick(p)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
                      isJustAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow-md shadow-emerald-700/20'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4 text-lime-300" />
                        <span>{t.addedToCart}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{t.addToCart}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};

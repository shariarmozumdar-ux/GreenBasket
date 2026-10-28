import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Check, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Leaf, 
  Flame, 
  Activity,
  Plus,
  Minus
} from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  lang: Language;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  lang,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const t = translations[lang];

  if (!product) return null;

  const price = lang === 'bn' ? product.priceBn : product.priceEn;
  const originalPrice = lang === 'bn' ? product.originalPriceBn : product.originalPriceEn;
  const unit = lang === 'bn' ? product.unitBn : product.unitEn;
  const symbol = t.currencySymbol;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-emerald-950 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-xs transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative aspect-square md:aspect-auto bg-slate-50 dark:bg-emerald-950/40 p-6 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.nameEn}
              className="w-full h-full object-cover rounded-2xl shadow-md"
            />
            {product.organicCertified && (
              <span className="absolute bottom-6 left-6 bg-emerald-700/90 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5" />
                100% Certified Organic
              </span>
            )}
          </div>

          {/* Right: Details & Purchase Module */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Farm Origin */}
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? product.farmOriginBn : product.farmOriginEn}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {lang === 'bn' ? product.nameBn : product.nameEn}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs">
                <div className="flex items-center text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 dark:text-slate-400">{product.reviewCount} {lang === 'bn' ? 'রিভিউ' : 'reviews'}</span>
                <span className="text-slate-400">·</span>
                <span className="text-emerald-600 font-medium">{t.inStock}</span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
                  {symbol}{price}
                </span>
                <span className="text-xs text-slate-500">/ {unit}</span>
                {originalPrice && (
                  <span className="text-sm text-slate-400 line-through tabular-nums">
                    {symbol}{originalPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
                {lang === 'bn' ? product.descriptionBn : product.descriptionEn}
              </p>

              {/* Nutrition Facts */}
              <div className="mt-4 p-3 bg-slate-50 dark:bg-[#122418] rounded-xl border border-slate-100 dark:border-emerald-900/40 space-y-1.5 text-[11px]">
                <div className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'bn' ? 'পুষ্টি উপাদান ও ক্যালরি:' : 'Nutritional Values:'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
                  <div>🔥 <strong>Calories:</strong> {product.nutrition.calories}</div>
                  <div>🌾 <strong>Fiber:</strong> {product.nutrition.fiber}</div>
                  <div className="col-span-2">💊 <strong>Vitamins:</strong> {product.nutrition.vitamins}</div>
                </div>
              </div>
            </div>

            {/* Stepper & Add to Bag */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-100 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-800 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-bold tabular-nums text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleWishlist(product)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40'
                      : 'border-slate-200 dark:border-emerald-900/40 text-slate-400 hover:text-rose-500'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-lime-300" />
                    <span>{t.addedToCart}</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>{t.addToCart} • {symbol}{(price * quantity).toFixed(lang === 'bn' ? 0 : 2)}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { CartItem, Language } from '../types';
import { translations } from '../data/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  lang: Language;
  onProceedToCheckout: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lang,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  const t = translations[lang];

  if (!isOpen) return null;

  // Financial calculations
  const subtotal = items.reduce((sum, item) => {
    const price = lang === 'bn' ? item.product.priceBn : item.product.priceEn;
    return sum + price * item.quantity;
  }, 0);

  const freeDeliveryThreshold = lang === 'bn' ? 1000 : 49;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold || appliedPromo === 'FREESHIP';
  const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : (lang === 'bn' ? 60 : 4.99);

  // Discount
  const discountRate = appliedPromo === 'GREEN30' ? 0.3 : 0;
  const discount = Math.round(subtotal * discountRate * 100) / 100;

  const total = Math.max(0, Math.round((subtotal - discount + deliveryFee) * 100) / 100);
  const symbol = t.currencySymbol;

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess(false);

    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (success) {
      setPromoSuccess(true);
      setPromoInput('');
    } else {
      setPromoError(lang === 'bn' ? 'অকার্যকর প্রোমো কোড। অনুগ্রহ করে GREEN30 ট্রাই করুন।' : 'Invalid promo code. Please try GREEN30');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#0c1911] shadow-2xl border-l border-slate-200 dark:border-emerald-950 flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.myCart}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {items.length} {t.itemsCount}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 font-medium px-2 py-1"
                >
                  {t.clearCart}
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-emerald-900/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery threshold banner */}
          <div className="bg-emerald-50 dark:bg-emerald-950/60 px-5 py-2.5 border-b border-emerald-100 dark:border-emerald-900/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
            {isFreeDelivery ? (
              <span className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
                <Check className="w-4 h-4 text-emerald-600" />
                {lang === 'bn' ? 'ফ্রি ডেলিভারি আনলক হয়েছে!' : 'Free Delivery Unlocked!'}
              </span>
            ) : (
              <span>
                {lang === 'bn' 
                  ? `আর মাত্র ${symbol}${freeDeliveryThreshold - subtotal} অর্ডারে ফ্রি ডেলিভারি!`
                  : `Add ${symbol}${(freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE delivery!`}
              </span>
            )}
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white dark:bg-emerald-900/80 shadow-2xs">
              {isFreeDelivery ? t.free : `${symbol}${deliveryFee}`}
            </span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-emerald-950/40 text-slate-400 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-emerald-600/40" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                    {t.cartEmpty}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                    {t.cartEmptyDesc}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  {t.startShopping}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const price = lang === 'bn' ? item.product.priceBn : item.product.priceEn;
                const unit = lang === 'bn' ? item.product.unitBn : item.product.unitEn;

                return (
                  <div
                    key={item.product.id}
                    className="flex items-center space-x-3.5 p-3 rounded-xl bg-slate-50 dark:bg-[#112318] border border-slate-100 dark:border-emerald-900/30"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.nameEn}
                      className="w-16 h-16 rounded-lg object-cover bg-white shrink-0"
                    />

                    {/* Information */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {lang === 'bn' ? item.product.nameBn : item.product.nameEn}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {symbol}{price} / {unit}
                      </p>

                      {/* Quantity Stepper */}
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center bg-white dark:bg-[#162e20] border border-slate-200 dark:border-emerald-800/60 rounded-lg">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold tabular-nums text-slate-800 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                          {symbol}{(price * item.quantity).toFixed(lang === 'bn' ? 0 : 2)}
                        </span>
                      </div>
                    </div>

                    {/* Delete Item */}
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-100 dark:border-emerald-900/30 bg-slate-50 dark:bg-[#09150d] space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromoCode} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder={t.promoPlaceholder}
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/40 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    {t.applyPromo}
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{appliedPromo} কুপন সক্রিয় (৩০% ছাড়)</span>
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-500 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{promoError}</span>
                  </p>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
                    {symbol}{subtotal.toFixed(lang === 'bn' ? 0 : 2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>{t.discount} (GREEN30)</span>
                    <span className="tabular-nums">
                      -{symbol}{discount.toFixed(lang === 'bn' ? 0 : 2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{t.deliveryFee}</span>
                  <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t.free}</span>
                    ) : (
                      `${symbol}${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-emerald-900/40 flex justify-between text-sm font-extrabold text-slate-900 dark:text-white">
                  <span>{t.total}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 text-base tabular-nums">
                    {symbol}{total.toFixed(lang === 'bn' ? 0 : 2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 active:scale-98 transition-all cursor-pointer"
              >
                <span>{t.proceedCheckout}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Guaranteed Freshness or Instant Refund</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

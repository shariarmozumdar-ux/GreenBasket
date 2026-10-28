import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  Download, 
  X, 
  ShoppingBag, 
  CreditCard,
  Truck
} from 'lucide-react';
import { OrderDetails, Language } from '../types';
import { translations } from '../data/translations';

interface OrderSuccessModalProps {
  order: OrderDetails | null;
  onClose: () => void;
  lang: Language;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  lang,
}) => {
  const t = translations[lang];

  useEffect(() => {
    if (order) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [order]);

  if (!order) return null;

  const symbol = t.currencySymbol;

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-emerald-950 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-emerald-600 p-6 text-center text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-emerald-700/60 hover:bg-emerald-700 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-md animate-bounce">
            <CheckCircle className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold">
            {t.orderSuccessTitle}
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            {t.orderSuccessMsg}
          </p>

          <div className="mt-3 inline-block bg-emerald-800/80 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider">
            {t.orderNumber}: {order.orderId}
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Rider Tracker Status Bar */}
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center space-x-3 text-xs">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-emerald-800 dark:text-emerald-300">
                {lang === 'bn' ? 'অর্ডার প্রস্তুত ও প্যাকিং সম্পন্ন হচ্ছে' : 'Harvest Packing in Progress'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {lang === 'bn' ? 'ডেলিভারি স্লট:' : 'Delivery Slot:'} {order.deliverySlot}
              </p>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="bg-slate-50 dark:bg-[#122418] p-4 rounded-xl space-y-2 text-xs">
            <p className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>{order.customerName}</span>
              <span className="font-mono text-slate-500">{order.phone}</span>
            </p>
            <p className="text-slate-600 dark:text-slate-400 flex items-start">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 mr-1.5 shrink-0 mt-0.5" />
              <span>{order.address}, {order.city}</span>
            </p>
            <p className="text-slate-600 dark:text-slate-400 flex items-center">
              <CreditCard className="w-3.5 h-3.5 text-emerald-500 mr-1.5 shrink-0" />
              <span>
                {lang === 'bn' ? 'পেমেন্ট মাধ্যম:' : 'Payment:'} <strong className="uppercase text-slate-800 dark:text-slate-200">{order.paymentMethod}</strong>
              </span>
            </p>
          </div>

          {/* Items Summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              {t.orderSummary} ({order.items.length})
            </h4>
            <div className="space-y-1.5 divide-y divide-slate-100 dark:divide-emerald-950/60 text-xs">
              {order.items.map((item) => (
                <div key={item.product.id} className="pt-1.5 flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span>
                    {lang === 'bn' ? item.product.nameBn : item.product.nameEn} × {item.quantity}
                  </span>
                  <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
                    {symbol}{((lang === 'bn' ? item.product.priceBn : item.product.priceEn) * item.quantity).toFixed(lang === 'bn' ? 0 : 2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financials Breakdown */}
          <div className="pt-2 border-t border-slate-200 dark:border-emerald-900/40 space-y-1 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>{t.subtotal}</span>
              <span className="tabular-nums">{symbol}{order.subtotal.toFixed(lang === 'bn' ? 0 : 2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>{t.discount} (30% Coupon)</span>
                <span className="tabular-nums">-{symbol}{order.discount.toFixed(lang === 'bn' ? 0 : 2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500">
              <span>{t.deliveryFee}</span>
              <span>{order.deliveryFee === 0 ? t.free : `${symbol}${order.deliveryFee}`}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-emerald-900/40 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
              <span>{t.total}</span>
              <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">
                {symbol}{order.total.toFixed(lang === 'bn' ? 0 : 2)}
              </span>
            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="p-4 bg-slate-50 dark:bg-[#112318] border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrintReceipt}
            className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadReceipt}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
};

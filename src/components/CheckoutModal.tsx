import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Building
} from 'lucide-react';
import { CartItem, Language, PaymentMethod, OrderDetails, AuthUser } from '../types';
import { translations } from '../data/translations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  lang: Language;
  currentUser?: AuthUser | null;
  appliedPromo: string;
  onOrderPlaced: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  lang,
  currentUser,
  appliedPromo,
  onOrderPlaced,
}) => {
  const [customerName, setCustomerName] = useState(currentUser?.name || (lang === 'bn' ? 'শাহরিয়ার মজুমদার' : 'Shahriar Mozumdar'));
  const [phone, setPhone] = useState(currentUser?.phone || '+880 1712-345678');
  const [address, setAddress] = useState(lang === 'bn' ? 'বাড়ি #২৪, রোড #১২, সেক্টর #১০, উত্তরা' : 'House #24, Road #12, Sector #10, Uttara');
  const [city, setCity] = useState(lang === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh');
  const [deliverySlot, setDeliverySlot] = useState('morning');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setCustomerName(currentUser.name);
      if (currentUser.phone) setPhone(currentUser.phone);
    }
  }, [currentUser]);

  const t = translations[lang];

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => {
    const price = lang === 'bn' ? item.product.priceBn : item.product.priceEn;
    return sum + price * item.quantity;
  }, 0);

  const freeDeliveryThreshold = lang === 'bn' ? 1000 : 49;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold || appliedPromo === 'FREESHIP';
  const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : (lang === 'bn' ? 60 : 4.99);
  const discountRate = appliedPromo === 'GREEN30' ? 0.3 : 0;
  const discount = Math.round(subtotal * discountRate * 100) / 100;
  const total = Math.max(0, Math.round((subtotal - discount + deliveryFee) * 100) / 100);
  const symbol = t.currencySymbol;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = `GB-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: OrderDetails = {
      orderId,
      customerName,
      phone,
      address,
      city,
      deliverySlot: deliverySlot === 'morning' ? t.slotMorning : deliverySlot === 'afternoon' ? t.slotAfternoon : t.slotEvening,
      paymentMethod,
      items: [...items],
      subtotal,
      discount,
      deliveryFee,
      total,
      date: new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-emerald-950 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8"
        role="dialog"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.checkoutTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-emerald-400/80">
              {lang === 'bn' ? 'দ্রুত হোম ডেলিভারির জন্য তথ্য নিশ্চিত করুন' : 'Confirm details for fast farm-to-table doorstep delivery'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-emerald-900/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
          
          {/* Customer & Address Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-l-2 border-emerald-500 pl-2">
              {t.customerInfo}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.fullName}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.phoneLabel}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.addressLabel}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.cityLabel}
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.deliverySlotLabel}
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="morning">{t.slotMorning}</option>
                    <option value="afternoon">{t.slotAfternoon}</option>
                    <option value="evening">{t.slotEvening}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-l-2 border-emerald-500 pl-2">
              {t.paymentMethodTitle}
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* bKash */}
              <button
                type="button"
                onClick={() => setPaymentMethod('bkash')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'bkash'
                    ? 'border-[#E2136E] bg-[#FFF0F5] dark:bg-[#e2136e]/20 ring-1 ring-[#E2136E]'
                    : 'border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-[#122418] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-[#E2136E] text-xs">bKash</span>
                  {paymentMethod === 'bkash' && <CheckCircle2 className="w-4 h-4 text-[#E2136E]" />}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                  বিকাশ ওয়ালেট পেমেন্ট
                </span>
              </button>

              {/* Nagad */}
              <button
                type="button"
                onClick={() => setPaymentMethod('nagad')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'nagad'
                    ? 'border-[#F7931E] bg-[#FFF5EE] dark:bg-[#f7931e]/20 ring-1 ring-[#F7931E]'
                    : 'border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-[#122418] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-[#F7931E] text-xs">Nagad</span>
                  {paymentMethod === 'nagad' && <CheckCircle2 className="w-4 h-4 text-[#F7931E]" />}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                  নগদ ডিজিটাল ওয়ালেট
                </span>
              </button>

              {/* Rocket */}
              <button
                type="button"
                onClick={() => setPaymentMethod('rocket')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'rocket'
                    ? 'border-[#8C3494] bg-[#F8F4FF] dark:bg-[#8c3494]/20 ring-1 ring-[#8C3494]'
                    : 'border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-[#122418] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-[#8C3494] text-xs">Rocket</span>
                  {paymentMethod === 'rocket' && <CheckCircle2 className="w-4 h-4 text-[#8C3494]" />}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                  রকেট মোবাইল ব্যাংকিং
                </span>
              </button>

              {/* Visa / Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 ring-1 ring-blue-500'
                    : 'border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-[#122418] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-blue-600 dark:text-blue-400 text-xs">Card (Visa/MC)</span>
                  {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                  ডেবিট ও ক্রেডিট কার্ড
                </span>
              </button>

              {/* Internet Banking */}
              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'bank'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-600'
                    : 'border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-[#122418] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-xs">Net Banking</span>
                  {paymentMethod === 'bank' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                  সিটি, ব্র্যাক, ডাচ-বাংলা
                </span>
              </button>

              {/* Cash On Delivery (COD) */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 ring-1 ring-amber-500'
                    : 'border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-[#122418] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-amber-700 dark:text-amber-400 text-xs">COD</span>
                  {paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                  পণ্য হাতে পেয়ে মূল্য পরিশোধ
                </span>
              </button>
            </div>
          </div>

          {/* Order Summary Strip */}
          <div className="p-4 bg-slate-50 dark:bg-[#112318] rounded-xl border border-slate-200 dark:border-emerald-900/30 flex items-center justify-between text-xs">
            <div>
              <p className="text-slate-500 dark:text-slate-400">
                {items.length} {t.itemsCount} {appliedPromo && `• ${appliedPromo} (-30%)`}
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {t.total}: <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">{symbol}{total.toFixed(lang === 'bn' ? 0 : 2)}</span>
              </p>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>SSL Commerz Encrypted</span>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-900/40 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-emerald-900/30 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-700/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>অর্ডার প্রসেস হচ্ছে...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.confirmOrder}</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

import React from 'react';
import { ShieldCheck, Lock, Landmark, Banknote } from 'lucide-react';
import { Language } from '../types';

interface PaymentPartnerBarProps {
  lang: Language;
}

export const PaymentPartnerBar: React.FC<PaymentPartnerBarProps> = ({ lang }) => {
  return (
    <section className="bg-white dark:bg-[#0a180f] py-6 border-y border-slate-200/80 dark:border-emerald-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-sm">
          
          <div className="font-bold text-slate-400 dark:text-emerald-500/70 text-xs uppercase tracking-wider">
            {lang === 'bn' ? 'পেমেন্ট মেথডস:' : 'Payment Methods:'}
          </div>

          {/* bKash */}
          <div className="flex items-center space-x-1.5 bg-[#FFF0F5] dark:bg-[#e2136e]/10 px-3 py-1.5 rounded-lg border border-[#e2136e]/30 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E2136E]" />
            <span className="font-bold text-[#E2136E] text-xs tracking-tight">bKash</span>
          </div>

          {/* Nagad */}
          <div className="flex items-center space-x-1.5 bg-[#FFF5EE] dark:bg-[#f7931e]/10 px-3 py-1.5 rounded-lg border border-[#f7931e]/30 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F7931E]" />
            <span className="font-bold text-[#F7931E] text-xs tracking-tight">Nagad</span>
          </div>

          {/* Rocket */}
          <div className="flex items-center space-x-1.5 bg-[#F8F4FF] dark:bg-[#8c3494]/10 px-3 py-1.5 rounded-lg border border-[#8c3494]/30 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8C3494]" />
            <span className="font-bold text-[#8C3494] text-xs tracking-tight">Rocket</span>
          </div>

          {/* Visa Card Badge */}
          <div className="flex items-center px-3 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <span className="font-extrabold italic text-blue-600 dark:text-blue-400 text-sm tracking-wider">VISA</span>
          </div>

          {/* Mastercard Badge */}
          <div className="flex items-center gap-1 px-3 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <div className="flex -space-x-1.5 items-center">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 inline-block opacity-90" />
              <span className="w-3.5 h-3.5 rounded-full bg-amber-500 inline-block opacity-90" />
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs ml-1">mastercard</span>
          </div>

          {/* Amex */}
          <div className="flex items-center px-2.5 py-1 bg-[#006fcf]/10 border border-[#006fcf]/30 rounded-lg">
            <span className="font-bold text-[#006fcf] text-xs uppercase tracking-tighter">AMEX</span>
          </div>

          {/* Internet Banking */}
          <div className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-medium text-xs border-l border-slate-200 dark:border-slate-800 pl-4">
            <Landmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{lang === 'bn' ? 'ইন্টারনেট ব্যাংকিং' : 'Internet Banking'}</span>
          </div>

          {/* COD */}
          <div className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5 font-medium text-xs border-l border-slate-200 dark:border-slate-800 pl-4">
            <Banknote className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>{lang === 'bn' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'Cash on Delivery (COD)'}</span>
          </div>

          {/* SSL Secured */}
          <div className="hidden lg:flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>256-Bit SSL SECURE</span>
          </div>

        </div>
      </div>
    </section>
  );
};

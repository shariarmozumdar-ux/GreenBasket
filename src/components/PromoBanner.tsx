import React, { useState } from 'react';
import { Tag, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface PromoBannerProps {
  lang: Language;
  onApplyCoupon: (code: string) => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ lang, onApplyCoupon }) => {
  const [copied, setCopied] = useState(false);
  const t = translations[lang];

  const handleCopy = () => {
    onApplyCoupon('GREEN30');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="deals" className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-[#0e2717] to-emerald-900 border border-emerald-800/40 shadow-xl">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 sm:p-8 relative z-10">
          
          {/* Content */}
          <div className="md:col-span-7 space-y-3">
            <span className="inline-block text-emerald-400 font-extrabold text-[11px] tracking-widest uppercase bg-emerald-900/60 px-3 py-1 rounded-md border border-emerald-600/30">
              {t.limitedTimeOffer}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              {t.offerHeading}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-lg">
              {lang === 'bn' 
                ? 'কুপন কোড GREEN30 ব্যবহার করে আপনার অর্ডারে ৩০% মূল্যছাড় উপভোগ করুন।'
                : 'Apply promotional voucher code GREEN30 at checkout to receive instant 30% savings on all farm harvest.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Tag className="w-4 h-4" />}
                <span>{copied ? t.copiedCoupon : `${t.grabTheDeal} (GREEN30)`}</span>
              </button>
            </div>
          </div>

          {/* Visual with Best Quality Best Price badge */}
          <div className="md:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-xs h-48 sm:h-56 rounded-2xl overflow-hidden border border-emerald-700/50 shadow-2xl bg-emerald-950/80">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80"
                alt="Basket of fresh colorful vegetables"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Circular Badge */}
              <div className="absolute top-3 right-3 w-20 h-20 rounded-full bg-amber-400 text-slate-950 border-2 border-white/60 flex flex-col items-center justify-center p-1 text-center shadow-lg font-extrabold">
                <span className="text-[9px] uppercase leading-none">Best</span>
                <span className="text-xs uppercase leading-tight font-black">Quality</span>
                <span className="text-[9px] uppercase leading-none text-emerald-950">Best Price</span>
              </div>

              <div className="absolute bottom-2 left-3 right-3 text-white text-[11px] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>30% Savings Applied Automatically</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

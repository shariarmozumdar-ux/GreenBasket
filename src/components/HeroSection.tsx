import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Leaf, 
  QrCode, 
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import { Language, StorePlatform } from '../types';
import { translations } from '../data/translations';
import { StoreBadges } from './StoreBadges';

interface HeroSectionProps {
  lang: Language;
  onOpenAppModal: (platform?: StorePlatform) => void;
  onShopNow: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenAppModal,
  onShopNow,
}) => {
  const t = translations[lang];

  return (
    <section className="bg-gradient-to-b from-[#0b1f13] via-[#0d2617] to-[#07130b] text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-emerald-950/60">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-600/40 text-emerald-400 text-xs font-bold uppercase tracking-widest shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.multiPlatformEcosystem}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.18] tracking-tight text-white">
              {t.heroTitlePart1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-lime-300">
                {t.heroTitleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {t.heroDesc}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onShopNow}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all transform active:scale-95 cursor-pointer"
              >
                <span>{t.shopNowBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenAppModal('android')}
                className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>{t.scanQrBtn}</span>
              </button>
            </div>

            {/* Store Download Quick Links Banner (Prompt Specification) */}
            <div className="pt-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    <span>{t.downloadQuickTitle}</span>
                  </h3>
                  <span className="text-[11px] text-gray-400">iOS • Android • PC</span>
                </div>

                {/* Badges Component */}
                <StoreBadges 
                  lang={lang} 
                  onSelectPlatform={(p) => onOpenAppModal(p)} 
                  variant="dark"
                />
              </div>
            </div>

            {/* 3 Key Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-emerald-900/50 text-emerald-400 shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.guarantee1Title}</h4>
                  <p className="text-[11px] text-gray-400">{t.guarantee1Desc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-emerald-900/50 text-emerald-400 shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.guarantee2Title}</h4>
                  <p className="text-[11px] text-gray-400">{t.guarantee2Desc}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-emerald-900/50 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.guarantee3Title}</h4>
                  <p className="text-[11px] text-gray-400">{t.guarantee3Desc}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Heart-shaped Fresh Organic Produce Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Main Card with Organic Imagery & Backdrop */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#14301d] to-[#0c1f13] border border-emerald-500/30 p-6 shadow-2xl">
                
                {/* Floating "Eat Fresh Stay Healthy" Badge */}
                <div className="absolute top-4 right-4 z-20 w-24 h-24 rounded-full bg-emerald-950/90 border-2 border-emerald-400/50 flex flex-col items-center justify-center p-2 text-center shadow-lg backdrop-blur-xs transform rotate-6 hover:rotate-0 transition-transform">
                  <span className="text-[9px] font-bold text-emerald-300 tracking-wider uppercase">EAT FRESH</span>
                  <span className="text-[11px] font-extrabold text-white leading-tight">STAY HEALTHY</span>
                </div>

                {/* Heart Produce Composition / Visual */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center group">
                  <img
                    src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&auto=format&fit=crop&q=80"
                    alt="Heart basket of organic vegetables and fruits"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gracefully
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  
                  {/* Organic Badge Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 font-medium flex items-center gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                      100% Certified Organic Harvest
                    </span>
                    <span className="bg-emerald-600/90 font-bold px-2.5 py-1 rounded-full text-[10px]">
                      Daily Fresh
                    </span>
                  </div>
                </div>

                {/* Mini Farm-to-Kitchen Trust Strip */}
                <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {lang === 'bn' ? 'সরাসরি কৃষক থেকে সংগ্রহ' : 'Direct Farm Sourcing'}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {lang === 'bn' ? '২৪ ঘণ্টার মধ্যে ফ্রেশ ডেলিভারি' : 'Delivered within 24 hours of harvest'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onShopNow}
                    className="text-emerald-400 font-bold hover:text-white transition-colors"
                  >
                    →
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

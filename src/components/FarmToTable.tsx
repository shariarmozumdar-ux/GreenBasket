import React from 'react';
import { ArrowRight, Users, Store, Sprout, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FarmToTableProps {
  lang: Language;
  onExplore: () => void;
}

export const FarmToTable: React.FC<FarmToTableProps> = ({ lang, onExplore }) => {
  const t = translations[lang];

  return (
    <section id="about" className="py-12 px-4 sm:px-6 lg:px-8 bg-emerald-950/20 dark:bg-[#08150c] border-b border-slate-200/60 dark:border-emerald-950 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-emerald-900/90 via-emerald-800 to-green-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          
          {/* Ambient organic texture overlay */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Farmer visual showcase */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="rounded-2xl overflow-hidden border-2 border-emerald-400/30 shadow-2xl bg-emerald-950">
                  <img
                    src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80"
                    alt="Organic Farmer holding fresh harvest crate"
                    className="w-full h-64 sm:h-72 object-cover object-top hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-3 bg-emerald-950/90 border-t border-emerald-800/50 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-300">
                      {lang === 'bn' ? 'সাভার অর্গানিক ফার্ম পার্টনার' : 'Savar Organic Partner'}
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
                      VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content & Story */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-emerald-300 text-xs font-bold tracking-widest uppercase">
                {t.welcomeToGreenBasket}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white">
                {t.farmToTableTitle}
              </h2>
              <p className="text-emerald-100/90 text-sm leading-relaxed">
                {t.farmToTableDesc}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onExplore}
                  className="py-2.5 px-5 rounded-xl bg-lime-400 hover:bg-lime-500 text-emerald-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <span>{t.learnMore}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* KPI Highlights */}
            <div className="lg:col-span-3 space-y-3">
              <div className="bg-emerald-950/60 border border-emerald-700/40 rounded-2xl p-4 flex items-center space-x-3.5 backdrop-blur-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-lime-400 flex items-center justify-center shrink-0">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-white leading-tight">২৫+ / 25+</h4>
                  <p className="text-xs text-emerald-200">{lang === 'bn' ? 'স্থানীয় খামার' : 'Local Farms'}</p>
                </div>
              </div>

              <div className="bg-emerald-950/60 border border-emerald-700/40 rounded-2xl p-4 flex items-center space-x-3.5 backdrop-blur-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-lime-400 flex items-center justify-center shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-white leading-tight">৫০০+ / 500+</h4>
                  <p className="text-xs text-emerald-200">{lang === 'bn' ? 'তাজা অর্গানিক পণ্য' : 'Fresh Products'}</p>
                </div>
              </div>

              <div className="bg-emerald-950/60 border border-emerald-700/40 rounded-2xl p-4 flex items-center space-x-3.5 backdrop-blur-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-lime-400 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-white leading-tight">১০,০০০+ / 10K+</h4>
                  <p className="text-xs text-emerald-200">{lang === 'bn' ? 'সন্তুষ্ট গ্রাহক' : 'Happy Customers'}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

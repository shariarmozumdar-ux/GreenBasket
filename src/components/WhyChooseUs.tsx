import React from 'react';
import { ShoppingBag, ShieldCheck, Sun, Award } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface WhyChooseUsProps {
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const t = translations[lang];

  const features = [
    {
      icon: <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: t.feature1Title,
      desc: t.feature1Desc,
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: t.feature2Title,
      desc: t.feature2Desc,
    },
    {
      icon: <Sun className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: t.feature3Title,
      desc: t.feature3Desc,
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: t.feature4Title,
      desc: t.feature4Desc,
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>🌿</span>
          <span>{t.whyChooseUs}</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {lang === 'bn' 
            ? 'প্রতিটি ধাপে আমরা নিশ্চিত করি পরিবারের প্রতিটি সদস্যের সর্বোচ্চ পুষ্টি ও নিরাপত্তা'
            : 'Uncompromising standards of quality, freshness, and ecological health'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-[#0c1a12] border border-slate-200/80 dark:border-emerald-950 shadow-2xs hover:shadow-md hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center mb-3">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

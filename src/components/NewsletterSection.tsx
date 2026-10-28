import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface NewsletterSectionProps {
  lang: Language;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ lang }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#11281a] border border-emerald-800/40 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-7 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-lime-400 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold leading-tight">
                {lang === 'bn' ? 'সুস্থ থাকুন, আপডেটেড থাকুন!' : 'Stay Healthy, Stay Updated!'}
              </h3>
              <p className="text-xs text-emerald-200/80 mt-1">
                {lang === 'bn' 
                  ? 'সেরা অফার, পুষ্টি টিপস এবং সাপ্তাহিক নতুন সবজির তালিকা পেতে সাবস্ক্রাইব করুন।' 
                  : 'Subscribe to get weekly harvest deals, organic health tips & seasonal arrivals.'}
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            {subscribed ? (
              <div className="p-3 bg-emerald-900/80 border border-emerald-600 rounded-2xl text-xs text-lime-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                <span>
                  {lang === 'bn' ? 'ধন্যবাদ! আপনি সফলভাবে নিউজলেটারে যুক্ত হয়েছেন।' : 'Thank you! You are now subscribed to GreenBasket.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'bn' ? 'আপনার ইমেইল অ্যাড্রেস...' : 'Enter your email...'}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-lime-500 hover:bg-lime-400 text-emerald-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-colors shadow-sm cursor-pointer"
                >
                  {lang === 'bn' ? 'সাবস্ক্রাইব' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

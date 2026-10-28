import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShoppingBasket, 
  QrCode, 
  ChevronRight,
  ShieldCheck,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';
import { Language, StorePlatform } from '../types';
import { translations } from '../data/translations';
import { StoreBadges } from './StoreBadges';

interface FooterSectionProps {
  lang: Language;
  onOpenAppModal: (platform?: StorePlatform) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  lang,
  onOpenAppModal,
  onNavigateSection,
}) => {
  const t = translations[lang];

  return (
    <footer className="bg-[#0b1f13] text-gray-300 pt-14 pb-8 px-4 sm:px-6 lg:px-8 mt-auto border-t border-emerald-950/60 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Main 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-emerald-900/30">
          
          {/* Column 1: যোগাযোগ ও ঠিকানা (Contact & Address) */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <ShoppingBasket className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                GreenBasket
              </span>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed pr-4">
              {lang === 'bn' 
                ? 'শতভাগ খাঁটি ও সতেজ অর্গানিক শাকসবজি, ফলমূল ও দেশি খাদ্যসামগ্রী আপনার দোরগোড়ায় পৌঁছে দেওয়াই আমাদের অঙ্গীকার।'
                : 'Delivering 100% natural, farm-fresh organic vegetables, fruits, and groceries directly to your family doorstep.'}
            </p>

            <div className="pt-2 space-y-3">
              <h4 className="text-white font-bold text-sm tracking-wide border-l-2 border-emerald-400 pl-2.5">
                {t.contactColTitle}
              </h4>
              <div className="space-y-2 text-xs text-gray-300">
                <p className="flex items-start">
                  <MapPin className="w-4 h-4 text-emerald-400 mr-2.5 shrink-0 mt-0.5" />
                  <span>{t.contactAddress}</span>
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 text-emerald-400 mr-2.5 shrink-0" />
                  <span>{t.contactPhone}</span>
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 text-emerald-400 mr-2.5 shrink-0" />
                  <span>{t.contactEmail}</span>
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="#social" className="w-8 h-8 rounded-full bg-emerald-900/30 border border-emerald-800/40 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-full bg-emerald-900/30 border border-emerald-800/40 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-full bg-emerald-900/30 border border-emerald-800/40 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-full bg-emerald-900/30 border border-emerald-800/40 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: আমাদের সম্পর্কে (About Us & Quick Links) */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide border-l-2 border-emerald-400 pl-2.5">
              {t.aboutColTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <button 
                  onClick={() => onNavigateSection('about')}
                  className="flex items-center hover:text-emerald-400 transition-colors text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
                  <span>{t.companyProfile}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('policy')}
                  className="flex items-center hover:text-emerald-400 transition-colors text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
                  <span>{t.returnPolicy}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('terms')}
                  className="flex items-center hover:text-emerald-400 transition-colors text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
                  <span>{t.termsConditions}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('faqs')}
                  className="flex items-center hover:text-emerald-400 transition-colors text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
                  <span>{t.faqs}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateSection('catalog')}
                  className="flex items-center hover:text-emerald-400 transition-colors text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
                  <span>{t.shop} & {t.deals}</span>
                </button>
              </li>
            </ul>

            <div className="pt-2 p-3 bg-emerald-950/40 rounded-xl border border-emerald-900/30">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'bn' ? 'নিরাপদ ডেলিভারি গ্যারান্টি' : '100% Quality Guarantee'}</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                {lang === 'bn' 
                  ? 'কোনো পণ্য পছন্দ না হলে সাথে সাথে রাইডারকে রিটার্ন করতে পারেন।'
                  : 'Instant return available at doorstep if produce does not meet expectations.'}
              </p>
            </div>
          </div>

          {/* Column 3: অফিসিয়াল অ্যাপস (Official Apps with Badges) */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide border-l-2 border-emerald-400 pl-2.5">
              {t.officialAppsColTitle}
            </h4>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              {t.officialAppsDesc}
            </p>

            {/* Official Store Badges (Google Play, App Store, Microsoft Store) */}
            <StoreBadges 
              lang={lang} 
              onSelectPlatform={(p) => onOpenAppModal(p)} 
              variant="dark"
            />

            {/* QR Code Action Panel */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => onOpenAppModal('android')}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-700/30 text-emerald-300 hover:text-white text-xs font-medium transition-colors"
              >
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>{t.scanQrBtn}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Security Badges */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>{t.copyrightText}</p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="flex items-center text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Verified Multi-Platform Build
            </span>
            <span>·</span>
            <span>Made with Care for Healthy Living</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

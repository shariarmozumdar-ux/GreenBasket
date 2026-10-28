import React, { useState } from 'react';
import { X, QrCode, Smartphone, Laptop, CheckCircle2, ExternalLink, Download } from 'lucide-react';
import { Language, StorePlatform } from '../types';
import { translations } from '../data/translations';
import { GooglePlayIcon, AppleStoreIcon, MicrosoftStoreIcon } from './StoreBadges';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialPlatform?: StorePlatform;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialPlatform = 'android'
}) => {
  const [platform, setPlatform] = useState<StorePlatform>(initialPlatform);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const t = translations[lang];

  if (!isOpen) return null;

  const handleSimulateDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  // QR Code SVGs for each platform
  const renderQrCode = () => {
    return (
      <div className="relative p-4 bg-white rounded-2xl shadow-inner border border-slate-200 inline-block">
        <svg viewBox="0 0 160 160" className="w-36 h-36 mx-auto">
          {/* Outer finder patterns */}
          <rect x="10" y="10" width="40" height="40" fill="#0b1f13" rx="4" />
          <rect x="18" y="18" width="24" height="24" fill="#ffffff" rx="2" />
          <rect x="24" y="24" width="12" height="12" fill="#15803d" rx="2" />

          <rect x="110" y="10" width="40" height="40" fill="#0b1f13" rx="4" />
          <rect x="118" y="18" width="24" height="24" fill="#ffffff" rx="2" />
          <rect x="124" y="24" width="12" height="12" fill="#15803d" rx="2" />

          <rect x="10" y="110" width="40" height="40" fill="#0b1f13" rx="4" />
          <rect x="18" y="118" width="24" height="24" fill="#ffffff" rx="2" />
          <rect x="24" y="124" width="12" height="12" fill="#15803d" rx="2" />

          {/* Data clusters simulating QR code */}
          <rect x="60" y="15" width="10" height="10" fill="#0b1f13" />
          <rect x="80" y="20" width="15" height="8" fill="#15803d" />
          <rect x="60" y="35" width="12" height="12" fill="#0b1f13" />
          <rect x="85" y="40" width="10" height="15" fill="#15803d" />

          <rect x="20" y="65" width="12" height="10" fill="#0b1f13" />
          <rect x="40" y="70" width="15" height="15" fill="#15803d" />
          <rect x="70" y="65" width="20" height="20" fill="#0b1f13" rx="3" />
          <rect x="100" y="65" width="15" height="10" fill="#15803d" />
          <rect x="130" y="70" width="15" height="12" fill="#0b1f13" />

          <rect x="65" y="100" width="15" height="15" fill="#0b1f13" />
          <rect x="90" y="95" width="12" height="18" fill="#15803d" />
          <rect x="120" y="105" width="10" height="15" fill="#0b1f13" />
          <rect x="70" y="130" width="20" height="12" fill="#15803d" />
          <rect x="105" y="130" width="15" height="15" fill="#0b1f13" />

          {/* Central GreenBasket leaf insignia */}
          <circle cx="80" cy="80" r="14" fill="#ffffff" />
          <circle cx="80" cy="80" r="11" fill="#22c55e" />
          <path d="M76 83c0-4 4-7 8-7-1 4-4 7-8 7z" fill="#ffffff" />
        </svg>
        <div className="mt-2 text-center text-[11px] font-medium text-slate-500">
          Scan to install {platform === 'android' ? 'Android APK' : platform === 'ios' ? 'iOS App' : 'Windows MSIX'}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-emerald-900/40 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-emerald-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.appModalTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-emerald-300/70">
                GreenBasket Official Ecosystem v2.4
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-emerald-900/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Selection Tabs */}
        <div className="p-5 pb-0">
          <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-[#15251c] rounded-xl">
            <button
              onClick={() => setPlatform('android')}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                platform === 'android'
                  ? 'bg-white dark:bg-emerald-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GooglePlayIcon className="w-4 h-4 shrink-0" />
              <span className="truncate">Android</span>
            </button>
            <button
              onClick={() => setPlatform('ios')}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                platform === 'ios'
                  ? 'bg-white dark:bg-emerald-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <AppleStoreIcon className="w-4 h-4 shrink-0" />
              <span className="truncate">iOS</span>
            </button>
            <button
              onClick={() => setPlatform('windows')}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                platform === 'windows'
                  ? 'bg-white dark:bg-emerald-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MicrosoftStoreIcon className="w-4 h-4 shrink-0" />
              <span className="truncate">Windows</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center text-center">
            {renderQrCode()}
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              {t.scanPrompt}
            </p>
          </div>

          {/* Details & Direct Button */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.appFeature1}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.appFeature2}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.appFeature3}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSimulateDownload}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-700/20 active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>{t.directDownload}</span>
              </button>
            </div>

            {downloadSuccess && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'bn' 
                    ? 'অ্যাপ স্টোরে রিডাইরেক্ট করা হচ্ছে... আপনার ডাউনলোড শুরু হয়েছে।' 
                    : 'Redirecting to official store... download link initiated.'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-[#112117] border-t border-slate-100 dark:border-emerald-900/30 text-center text-xs text-slate-500 dark:text-slate-400">
          {lang === 'bn' 
            ? 'সুরক্ষিত ও ভাইরাস মুক্ত ডিজিটাল সার্টিফিকেট দ্বারা ভেরিফায়েড।' 
            : 'Digitally signed, malware-free official release.'}
        </div>
      </div>
    </div>
  );
};

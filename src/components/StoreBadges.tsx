import React from 'react';
import { Language, StorePlatform } from '../types';

interface StoreBadgesProps {
  lang: Language;
  onSelectPlatform?: (platform: StorePlatform) => void;
  variant?: 'dark' | 'light' | 'compact';
  className?: string;
}

export const GooglePlayIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M3.609 1.813c-.347.369-.549.932-.549 1.666v17.042c0 .734.202 1.297.549 1.666l.088.083 9.544-9.544v-.226l-9.544-9.544-.088.083z"
      fill="url(#gp-a)"
    />
    <path
      d="M16.425 15.688l-3.183-3.183v-.226l3.183-3.183.072.041 3.774 2.144c1.077.612 1.077 1.614 0 2.226l-3.774 2.144-.072.037z"
      fill="url(#gp-b)"
    />
    <path
      d="M13.242 12.505L3.609 22.138c.394.418 1.049.467 1.782.05l11.034-6.269-3.183-3.414z"
      fill="url(#gp-c)"
    />
    <path
      d="M13.242 12.279l3.183-3.414L5.391 2.596C4.658 2.179 4.003 2.228 3.609 2.646l9.633 9.633z"
      fill="url(#gp-d)"
    />
    <defs>
      <linearGradient id="gp-a" x1="12.028" y1="2.257" x2="-2.046" y2="16.331" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00A0FF" />
        <stop offset=".007" stopColor="#00A1FF" />
        <stop offset=".26" stopColor="#00BEFF" />
        <stop offset=".512" stopColor="#00D2FF" />
        <stop offset=".76" stopColor="#00DFFF" />
        <stop offset="1" stopColor="#00E3FF" />
      </linearGradient>
      <linearGradient id="gp-b" x1="20.316" y1="12.392" x2="2.721" y2="12.392" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFE000" />
        <stop offset=".409" stopColor="#FFBD00" />
        <stop offset=".775" stopColor="#FFA500" />
        <stop offset="1" stopColor="#FF9C00" />
      </linearGradient>
      <linearGradient id="gp-c" x1="14.49" y1="13.931" x2="-4.218" y2="32.639" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF3A44" />
        <stop offset="1" stopColor="#C31162" />
      </linearGradient>
      <linearGradient id="gp-d" x1="2.148" y1="-5.529" x2="10.82" y2="3.143" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00E676" />
        <stop offset="1" stopColor="#00B0FF" />
      </linearGradient>
    </defs>
  </svg>
);

export const AppleStoreIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.62-.75 1.04-1.8 0.93-2.89-.9.04-1.99.6-2.63 1.35-.58.65-1.08 1.73-.95 2.78 1 .08 2.03-.49 2.65-1.24z" />
  </svg>
);

export const MicrosoftStoreIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" />
    <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" />
    <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
    <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
  </svg>
);

export const StoreBadges: React.FC<StoreBadgesProps> = ({
  lang,
  onSelectPlatform,
  variant = 'dark',
  className = ''
}) => {
  const getSubtext = (type: 'play' | 'apple' | 'ms') => {
    if (lang === 'bn') {
      if (type === 'play') return 'গেট ইট অন';
      if (type === 'apple') return 'ডাউনলোড করুন';
      return 'সংগ্রহ করুন';
    }
    if (type === 'play') return 'GET IT ON';
    if (type === 'apple') return 'Download on the';
    return 'Get it from';
  };

  const isLight = variant === 'light';

  const baseCardStyle = isLight
    ? 'bg-white border-slate-200 text-slate-800 hover:border-emerald-500 hover:shadow-md'
    : 'bg-[#0f1912] border-emerald-900/40 text-white hover:border-emerald-400 hover:bg-[#15251a] hover:shadow-lg hover:shadow-emerald-950/40';

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
      {/* Google Play */}
      <button
        type="button"
        onClick={() => onSelectPlatform?.('android')}
        className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-200 text-left cursor-pointer group active:scale-95 ${baseCardStyle}`}
        title="Download GreenBasket for Android on Google Play"
      >
        <div className="shrink-0 group-hover:scale-105 transition-transform">
          <GooglePlayIcon className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase font-semibold text-emerald-400/90 leading-tight tracking-wider truncate">
            {getSubtext('play')}
          </p>
          <p className={`text-xs font-bold leading-snug tracking-tight truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Google Play
          </p>
        </div>
      </button>

      {/* Apple App Store */}
      <button
        type="button"
        onClick={() => onSelectPlatform?.('ios')}
        className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-200 text-left cursor-pointer group active:scale-95 ${baseCardStyle}`}
        title="Download GreenBasket for iOS on Apple App Store"
      >
        <div className={`shrink-0 group-hover:scale-105 transition-transform ${isLight ? 'text-slate-900' : 'text-white'}`}>
          <AppleStoreIcon className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase font-semibold text-emerald-400/90 leading-tight tracking-wider truncate">
            {getSubtext('apple')}
          </p>
          <p className={`text-xs font-bold leading-snug tracking-tight truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
            App Store
          </p>
        </div>
      </button>

      {/* Microsoft Store */}
      <button
        type="button"
        onClick={() => onSelectPlatform?.('windows')}
        className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-200 text-left cursor-pointer group active:scale-95 ${baseCardStyle}`}
        title="Download GreenBasket for Windows on Microsoft Store"
      >
        <div className="shrink-0 group-hover:scale-105 transition-transform">
          <MicrosoftStoreIcon className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase font-semibold text-emerald-400/90 leading-tight tracking-wider truncate">
            {getSubtext('ms')}
          </p>
          <p className={`text-xs font-bold leading-snug tracking-tight truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
            MS Store
          </p>
        </div>
      </button>
    </div>
  );
};

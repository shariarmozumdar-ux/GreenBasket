import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Cloud, 
  ShieldCheck, 
  RefreshCw, 
  Link2, 
  Unlink, 
  Globe, 
  Lock, 
  Zap, 
  AlertTriangle,
  Github,
  KeyRound
} from 'lucide-react';
import { Language, ConnectedAccountProvider, CloudflareEdgeConfig } from '../types';
import { GoogleLogoIcon } from './AuthModal';

interface ConnectedAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

// Apple Icon SVG
export const AppleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 170 170" className={className} fill="currentColor">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.3-9.58-11.13-20.5-14.48-32.74-3.35-12.24-5.02-23.95-5.02-35.14 0-14.28 3.59-26.15 10.77-35.61 7.18-9.46 16.29-14.28 27.32-14.47 5.2 0 10.99 1.41 17.37 4.23 6.39 2.82 10.37 4.3 11.96 4.45 1.8-.15 6.03-1.74 12.69-4.76 6.66-3.02 12.38-4.35 17.15-4.01 13.06.87 23.41 5.99 31.05 15.36-11.41 6.85-17.01 16.52-16.8 29.01.21 10.12 4.09 18.57 11.64 25.35 4.68 4.24 9.99 7.28 15.93 9.13-2.61 7.72-5.77 15.22-9.46 22.52zM119.22 31.84c0-7.39 2.67-14.35 8.01-20.88 5.34-6.53 11.9-10.65 19.68-12.35.32 1.41.48 2.61.48 3.6 0 7.39-2.78 14.51-8.33 21.36-5.55 6.85-12.33 10.87-20.35 12.06.11-1.3.51-2.56.51-3.79z" />
  </svg>
);

// Microsoft Logo SVG
export const MicrosoftIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 23 23" className={className}>
    <path fill="#f35325" d="M1 1h10v10H1z"/>
    <path fill="#81bc06" d="M12 1h10v10H12z"/>
    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
    <path fill="#ffba08" d="M12 12h10v10H12z"/>
  </svg>
);

// Cloudflare Logo SVG
export const CloudflareIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="#F38020">
    <path d="M78.3 48.7c-.8-6.9-6.3-12.2-13.2-12.7-3.9-.3-7.7 1.2-10.4 4-2.8-5.3-8.3-8.7-14.4-8.7-8.7 0-15.8 6.8-16.3 15.4-6.3.7-11 6-11 12.4 0 6.9 5.6 12.5 12.5 12.5h52.8c6.9 0 12.5-5.6 12.5-12.5 0-5.7-3.9-10.6-9.5-12z" />
  </svg>
);

export const ConnectedAccountsModal: React.FC<ConnectedAccountsModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  // SSO Providers State
  const [providers, setProviders] = useState<ConnectedAccountProvider[]>([
    {
      id: 'google',
      name: 'Google Account',
      accountIdentifier: 'shariarmozumdar@gmail.com',
      connected: true,
      lastSynced: 'Just now',
    },
    {
      id: 'apple',
      name: 'Apple Account',
      accountIdentifier: 'shariar.mozumdar@icloud.com',
      connected: true,
      lastSynced: '10m ago',
    },
    {
      id: 'microsoft',
      name: 'Microsoft 365 Account',
      accountIdentifier: 'shariarmozumdar@outlook.com',
      connected: true,
      lastSynced: '25m ago',
    },
    {
      id: 'github',
      name: 'GitHub Account',
      accountIdentifier: 'shariarmozumdar',
      connected: true,
      lastSynced: '1h ago',
    },
  ]);

  // Cloudflare Edge Config State
  const [cloudflareConfig, setCloudflareConfig] = useState<CloudflareEdgeConfig>({
    zoneName: 'greenbasket.com.bd',
    accountId: 'shariarmozumdar@gmail.com',
    status: 'active',
    sslMode: 'Full (Strict)',
    underAttackMode: false,
    ddosProtection: true,
    cacheStatus: 'cached',
    edgeLocations: 310,
  });

  const [notification, setNotification] = useState<string>('');
  const [isPurgingCache, setIsPurgingCache] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleToggleConnect = (id: string) => {
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newState = !p.connected;
          setNotification(
            lang === 'bn'
              ? `${p.name} ${newState ? 'সফলভাবে লিঙ্ক করা হয়েছে!' : 'লিঙ্ক বিচ্ছিন্ন করা হয়েছে।'}`
              : `${p.name} ${newState ? 'linked successfully!' : 'unlinked.'}`
          );
          setTimeout(() => setNotification(''), 3000);
          return {
            ...p,
            connected: newState,
            lastSynced: newState ? 'Just now' : 'Disconnected',
          };
        }
        return p;
      })
    );
  };

  const handleToggleUnderAttack = () => {
    const nextState = !cloudflareConfig.underAttackMode;
    setCloudflareConfig((prev) => ({
      ...prev,
      underAttackMode: nextState,
    }));
    setNotification(
      lang === 'bn'
        ? `Cloudflare Under Attack Mode ${nextState ? 'চালু (ON) করা হয়েছে। DDoS প্রটেকশন সর্বোচ্চ সক্রিয়।' : 'বন্ধ (OFF) করা হয়েছে।'}`
        : `Cloudflare Under Attack Mode turned ${nextState ? 'ON. Maximum DDoS mitigation engaged.' : 'OFF.'}`
    );
    setTimeout(() => setNotification(''), 3500);
  };

  const handlePurgeCloudflareCache = () => {
    setIsPurgingCache(true);
    setNotification(
      lang === 'bn' 
        ? 'Cloudflare গ্লোবাল এজ ক্যাশ মুছে ফেলা হচ্ছে (Purging Everything)...' 
        : 'Purging all cached files from 310+ Cloudflare edge nodes...'
    );

    setTimeout(() => {
      setIsPurgingCache(false);
      setCloudflareConfig((prev) => ({ ...prev, cacheStatus: 'purged' }));
      setNotification(
        lang === 'bn' 
          ? 'Cloudflare এজ ক্যাশ সম্পূর্ণ সফলভাবে পার্জ সম্পন্ন হয়েছে!' 
          : 'All Cloudflare edge caches purged successfully!'
      );
      setTimeout(() => setNotification(''), 3500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-emerald-950 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 via-[#0d2a17] to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 shadow-sm">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>{lang === 'bn' ? 'কানেক্টেড অ্যাকাউন্টস ও ক্লাউডফ্লেয়ার লিংক' : 'Connected Accounts & Cloudflare Link'}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                  SSO & EDGE
                </span>
              </h3>
              <p className="text-xs text-emerald-200/80">
                Google, Apple, Microsoft, GitHub and Cloudflare Enterprise Edge Protection
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Notification */}
          {notification && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{notification}</span>
            </div>
          )}

          {/* Section 1: SSO Multi-Provider Accounts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'bn' ? 'সংযুক্ত অ্যাকাউন্টসমূহ (Multi-Provider Single Sign-On)' : 'Identity Providers (Connected Accounts)'}</span>
            </h4>

            <div className="space-y-2.5">
              {providers.map((p) => (
                <div
                  key={p.id}
                  className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-[#112318] border border-slate-200/80 dark:border-emerald-900/40 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-2xs">
                      {p.id === 'google' && <GoogleLogoIcon className="w-5 h-5" />}
                      {p.id === 'apple' && <AppleIcon className="w-5 h-5 text-slate-900 dark:text-white" />}
                      {p.id === 'microsoft' && <MicrosoftIcon className="w-5 h-5" />}
                      {p.id === 'github' && <Github className="w-5 h-5 text-slate-900 dark:text-white" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {p.name}
                        </p>
                        {p.connected && (
                          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Linked</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {p.accountIdentifier}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleToggleConnect(p.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        p.connected
                          ? 'bg-slate-200 dark:bg-emerald-950 hover:bg-rose-100 hover:text-rose-700 dark:hover:bg-rose-950 text-slate-700 dark:text-slate-300'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {p.connected ? (
                        <span className="flex items-center gap-1">
                          <Unlink className="w-3 h-3" />
                          <span>{lang === 'bn' ? 'সংযোগ বিচ্ছিন্ন' : 'Unlink'}</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Link2 className="w-3 h-3" />
                          <span>{lang === 'bn' ? 'কানেক্ট করুন' : 'Connect'}</span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Cloudflare Edge Security Link */}
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-emerald-900/40">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-amber-500" />
                <span>{lang === 'bn' ? 'ক্লাউডফ্লেয়ার একাউন্ট ও এজ সিকিউরিটি লিংক' : 'Cloudflare Edge Security & Zone Link'}</span>
              </h4>
              <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-600" />
                <span>CLOUDFLARE ACTIVE</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-slate-900/5 border border-amber-500/30 dark:border-amber-500/20 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0">
                    <CloudflareIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{cloudflareConfig.zoneName}</span>
                      <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold">
                        FULL SSL (STRICT)
                      </span>
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Cloudflare Account: <span className="font-mono text-slate-800 dark:text-slate-200">{cloudflareConfig.accountId}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-semibold">
                    {cloudflareConfig.edgeLocations}+ Edge Nodes Active
                  </span>
                </div>
              </div>

              {/* Cloudflare Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                {/* Under Attack Mode Toggle */}
                <div className="p-3 bg-white dark:bg-[#0c1a12] border border-slate-200 dark:border-emerald-900/40 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <AlertTriangle className={`w-3.5 h-3.5 ${cloudflareConfig.underAttackMode ? 'text-rose-500' : 'text-slate-400'}`} />
                      <span>{lang === 'bn' ? 'আন্ডার অ্যাটাক মোড' : 'Under Attack Mode'}</span>
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {lang === 'bn' ? 'DDoS আক্রমণ প্রতিরোধে JS চ্যালেঞ্জ' : 'Managed challenge for all visitors'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleToggleUnderAttack}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      cloudflareConfig.underAttackMode
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-slate-200 dark:bg-emerald-950 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {cloudflareConfig.underAttackMode ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* Purge Cache Button */}
                <div className="p-3 bg-white dark:bg-[#0c1a12] border border-slate-200 dark:border-emerald-900/40 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>{lang === 'bn' ? 'এজ ক্যাশ পার্জ করুন' : 'Purge Edge Cache'}</span>
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {lang === 'bn' ? 'গ্লোবাল ক্যাশ তাৎক্ষণিক পরিষ্কার' : 'Purge everything across edge nodes'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handlePurgeCloudflareCache}
                    disabled={isPurgingCache}
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isPurgingCache ? 'animate-spin' : ''}`} />
                    <span>{lang === 'bn' ? 'পার্জ' : 'Purge'}</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#112318] border-t border-slate-200 dark:border-emerald-950 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-bit SSL/TLS End-to-End Encrypted</span>
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            {lang === 'bn' ? 'সম্পন্ন' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};

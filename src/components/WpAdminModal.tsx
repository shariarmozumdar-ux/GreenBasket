import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  User, 
  ExternalLink, 
  CheckCircle2, 
  Layout, 
  Palette, 
  Upload, 
  RefreshCw, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  Layers, 
  Settings, 
  Cloud,
  Check,
  AlertCircle,
  Package
} from 'lucide-react';
import { Language, WpThemePackage } from '../types';

interface WpAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

// WordPress Logo SVG
export const WordPressLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 122.5 122.5" className={className} fill="currentColor">
    <path d="M8.7 61.3c0 20.7 12 38.6 29.4 46.9L12.5 35.8c-2.4 7.7-3.8 16-3.8 25.5zm82.7-2.3c0-5.7-2-9.7-3.8-12.8-2.3-3.7-4.5-6.9-4.5-10.6 0-4.2 3.2-8.1 7.7-8.1.2 0 .4 0 .6.1-8.5-7.8-19.8-12.6-32.2-12.6-17.1 0-32.1 9.1-40.4 22.8 1.2 0 2.3.1 3.2.1 5.3 0 13.5-.7 13.5-.7 2.8-.2 3.1 3.9.3 4.1 0 0-2.8.3-5.9.5l18.8 55.9 11.3-33.8-8-22.1c-2.8-.2-5.5-.5-5.5-.5-2.8-.2-2.4-4.3.3-4.1 0 0 8.4.7 13.3.7 5.3 0 13.5-.7 13.5-.7 2.8-.2 3.1 3.9.3 4.1 0 0-2.8.3-5.9.5l18.6 55.2 5.1-17.1c2.8-8.9 4.9-15.3 4.9-20.9zM62.3 69.4l-15.4 44.8c4.6 1.3 9.4 2.1 14.4 2.1 6 0 11.8-1.1 17.1-3l-16.1-43.9zm42.7-42.5c.3 2.1.4 4.5.4 7.1 0 7-1.3 14.8-5.2 24.6l15.3 44.2c6.9-9 11-20.3 11-32.5 0-17.4-8.4-32.9-21.5-43.4zM61.3 0C27.5 0 0 27.5 0 61.3s27.5 61.3 61.3 61.3 61.3-27.5 61.3-61.3S95.1 0 61.3 0z"/>
  </svg>
);

export const WpAdminModal: React.FC<WpAdminModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Pre-authenticated for convenient immediate access
  const [username, setUsername] = useState<string>('shariarmozumdar@gmail.com');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'themes' | 'dashboard' | 'woocommerce' | 'cloudflare'>('themes');
  
  // Theme Packages List
  const [themePackages, setThemePackages] = useState<WpThemePackage[]>([
    {
      id: 'astra-pro',
      name: 'Astra Pro - Organic WooCommerce',
      version: '4.6.2',
      author: 'Brainstorm Force',
      description: 'Ultra-fast, customizable WooCommerce theme optimized for organic grocery, supermarket and farm-fresh stores.',
      descriptionBn: 'সুপার-ফাস্ট ও লাইটওয়েট অর্গানিক ই-কমার্স ও গ্রোসারি স্টোরের জন্য বিশেষভাবে অপ্টিমাইজড থিম।',
      previewUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
      badge: 'ACTIVE & INSTALLED',
      status: 'active',
      accentColor: '#16a34a'
    },
    {
      id: 'flatsome',
      name: 'Flatsome - Responsive Supermarket',
      version: '3.18.5',
      author: 'UX-Themes',
      description: 'The #1 best-selling WooCommerce theme with UX Page Builder, multi-vendor support, and high conversion cart.',
      descriptionBn: 'বিশ্বসেরা বিক্রিত উকমার্স থিম, সম্পূর্ণ রেসপনসিভ সুপারমার্কেট গ্রিড ও দ্রুত লোডিং পেজ বিল্ডার।',
      previewUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&auto=format&fit=crop&q=80',
      badge: 'OFFICIAL PACKAGE',
      status: 'installed',
      accentColor: '#2563eb'
    },
    {
      id: 'woodmart',
      name: 'WoodMart - Fresh Farm Grocery',
      version: '7.5.1',
      author: 'XTEMOS',
      description: 'Premium WordPress theme for organic food, fresh vegetables, AJAX product filters and lightning performance.',
      descriptionBn: 'তাজা শাকসবজি ও অর্গানিক ফার্ম ফ্রেশ ফুড শপের জন্য প্রিমিয়াম ড্যাশবোর্ড ও ফিল্টারিং সুবিধা।',
      previewUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&auto=format&fit=crop&q=80',
      badge: 'POPULAR',
      status: 'available',
      accentColor: '#059669'
    },
    {
      id: 'storefront',
      name: 'Storefront - Official Nature Theme',
      version: '4.5.0',
      author: 'Automattic',
      description: 'The official core WooCommerce theme built and maintained by WooCommerce Core developers.',
      descriptionBn: 'অটোম্যাটিক এবং উকমার্স এর অফিসিয়াল কোর থিম, ১০০% বাগ-মুক্ত ও নিশ্ছিদ্র নিরাপত্তা।',
      previewUrl: 'https://images.unsplash.com/photo-1543168256-418811576931?w=600&auto=format&fit=crop&q=80',
      badge: 'WOO CORE',
      status: 'installed',
      accentColor: '#7c3aed'
    },
  ]);

  const [installingThemeId, setInstallingThemeId] = useState<string | null>(null);
  const [installProgress, setInstallProgress] = useState<number>(0);
  const [installStepName, setInstallStepName] = useState<string>('');
  const [uploadModalOpen, setUploadModalOpen] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('astra-addon-v4.6.2.zip');
  const [themeSuccessMsg, setThemeSuccessMsg] = useState<string>('');

  if (!isOpen) return null;

  // Handle Theme Installation Simulation
  const handleInstallTheme = (themeId: string) => {
    setInstallingThemeId(themeId);
    setInstallProgress(15);
    setInstallStepName(lang === 'bn' ? 'WordPress রিপোজিটরি থেকে থিম প্যাকেজ ডাউনলোড হচ্ছে...' : 'Downloading package archive (.zip)...');

    setTimeout(() => {
      setInstallProgress(45);
      setInstallStepName(lang === 'bn' ? 'প্যাকেজ ফাইল আনপ্যাক করা হচ্ছে (Unpacking zip)...' : 'Unpacking theme archive...');
    }, 700);

    setTimeout(() => {
      setInstallProgress(80);
      setInstallStepName(lang === 'bn' ? 'WooCommerce ডিপেন্ডেন্সি ও টেমপ্লেট ভেরিফাই করা হচ্ছে...' : 'Verifying WooCommerce templates & child theme...');
    }, 1400);

    setTimeout(() => {
      setInstallProgress(100);
      setInstallStepName(lang === 'bn' ? 'ইনস্টলেশন সফল হয়েছে!' : 'Theme package installed successfully!');
      
      setThemePackages((prev) =>
        prev.map((t) => (t.id === themeId ? { ...t, status: 'installed' } : t))
      );
      setInstallingThemeId(null);
      setThemeSuccessMsg(lang === 'bn' ? 'থিম প্যাকেজ সফলভাবে ইনস্টল হয়েছে!' : 'Theme package successfully installed!');
      setTimeout(() => setThemeSuccessMsg(''), 3000);
    }, 2100);
  };

  // Handle Theme Activation
  const handleActivateTheme = (themeId: string) => {
    setThemePackages((prev) =>
      prev.map((t) => ({
        ...t,
        status: t.id === themeId ? 'active' : t.status === 'active' ? 'installed' : t.status,
      }))
    );
    const target = themePackages.find((t) => t.id === themeId);
    setThemeSuccessMsg(
      lang === 'bn' 
        ? `"${target?.name}" সফলভাবে সক্রিয় (Active Theme) করা হয়েছে!` 
        : `"${target?.name}" activated successfully as active theme!`
    );
    setTimeout(() => setThemeSuccessMsg(''), 3500);
  };

  // Handle Upload Theme Package .zip
  const handleUploadZip = () => {
    setInstallingThemeId('upload');
    setInstallProgress(25);
    setInstallStepName(lang === 'bn' ? `${uploadedFileName} আপলোড হচ্ছে...` : `Uploading ${uploadedFileName}...`);

    setTimeout(() => {
      setInstallProgress(60);
      setInstallStepName(lang === 'bn' ? 'আর্কাইভ এক্সট্র্যাক্ট হচ্ছে...' : 'Extracting zip archive to wp-content/themes...');
    }, 800);

    setTimeout(() => {
      setInstallProgress(100);
      setInstallingThemeId(null);
      setUploadModalOpen(false);
      setThemeSuccessMsg(
        lang === 'bn' 
          ? `প্যাকেজ "${uploadedFileName}" সফলভাবে ইনস্টল হয়েছে!` 
          : `Package "${uploadedFileName}" unpacked & installed successfully!`
      );
      setTimeout(() => setThemeSuccessMsg(''), 3500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#1e1e1e] border border-[#2c3338] text-white rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
      >
        {/* WordPress 6.7 Admin Top Bar */}
        <div className="h-10 bg-[#1d2327] border-b border-[#2c3338] px-4 flex items-center justify-between text-xs text-gray-300 shrink-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white font-bold cursor-pointer hover:text-blue-400 transition-colors">
              <WordPressLogo className="w-5 h-5 text-gray-300 hover:text-white" />
              <span>WordPress 6.7.1</span>
            </div>

            <div className="hidden sm:flex items-center space-x-3 text-[11px] text-gray-400">
              <span className="flex items-center gap-1 hover:text-white cursor-pointer">
                🌿 <span>GreenBasket Store</span>
              </span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">
                WooCommerce 9.4
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Cloud className="w-3 h-3" />
                <span>Cloudflare Edge Synced</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[11px] text-gray-300 hidden md:inline">
              {lang === 'bn' ? 'স্বাগতম, শাহরিয়ার মজুমদার' : 'Howdy, Shahriar Mozumdar'}
            </span>
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
              SM
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-[#2c3338] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* If user logs out of wp-admin, show authentic wp-login.php */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center bg-[#f0f0f1] text-[#3c434a] min-h-[460px]">
            <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200">
              <div className="flex flex-col items-center mb-6">
                <WordPressLogo className="w-16 h-16 text-[#2271b1] mb-2" />
                <h3 className="text-base font-bold text-[#1d2327]">WordPress / WP-Admin</h3>
                <p className="text-xs text-gray-500">{lang === 'bn' ? 'আপনার অ্যাকাউন্টে লগইন করুন' : 'Log in to your website dashboard'}</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    {lang === 'bn' ? 'ইউজারনেম বা ইমেইল ঠিকানা' : 'Username or Email Address'}
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">
                    {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1]"
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer text-gray-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-[#2271b1]"
                    />
                    <span>{lang === 'bn' ? 'মনে রাখুন (Remember Me)' : 'Remember Me'}</span>
                  </label>
                  <a href="#reset" className="text-[#2271b1] hover:underline font-semibold">
                    {lang === 'bn' ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Lost your password?'}
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#2271b1] hover:bg-[#135e96] text-white font-bold text-sm rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  {lang === 'bn' ? 'ওয়ার্ডপ্রেসে লগ ইন করুন' : 'Log In to WordPress'}
                </button>
              </form>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              ← <button onClick={onClose} className="hover:underline text-gray-700 font-semibold">Go to GreenBasket Home</button>
            </div>
          </div>
        ) : (
          /* WP-Admin Main Layout */
          <div className="flex flex-grow overflow-hidden">
            
            {/* Left WP Sidebar */}
            <div className="w-52 bg-[#1d2327] border-r border-[#2c3338] p-2 flex flex-col justify-between shrink-0 text-xs">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('themes')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-colors cursor-pointer ${
                    activeTab === 'themes'
                      ? 'bg-[#2271b1] text-white shadow-xs'
                      : 'text-gray-300 hover:bg-[#2c3338] hover:text-white'
                  }`}
                >
                  <Palette className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'bn' ? 'থিম প্যাকেজ (Themes)' : 'Themes & Packages'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-colors cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-[#2271b1] text-white shadow-xs'
                      : 'text-gray-300 hover:bg-[#2c3338] hover:text-white'
                  }`}
                >
                  <Layout className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'bn' ? 'ড্যাশবোর্ড (Dashboard)' : 'Dashboard'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('woocommerce')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-colors cursor-pointer ${
                    activeTab === 'woocommerce'
                      ? 'bg-[#2271b1] text-white shadow-xs'
                      : 'text-gray-300 hover:bg-[#2c3338] hover:text-white'
                  }`}
                >
                  <Package className="w-4 h-4 text-purple-400" />
                  <span>{lang === 'bn' ? 'WooCommerce স্টোর' : 'WooCommerce Store'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('cloudflare')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-colors cursor-pointer ${
                    activeTab === 'cloudflare'
                      ? 'bg-[#2271b1] text-white shadow-xs'
                      : 'text-gray-300 hover:bg-[#2c3338] hover:text-white'
                  }`}
                >
                  <Cloud className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'bn' ? 'ক্লাউডফ্লেয়ার এজ সিঙ্ক' : 'Cloudflare Edge Link'}</span>
                </button>
              </div>

              {/* Sidebar bottom */}
              <div className="pt-3 border-t border-[#2c3338] space-y-2">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 cursor-pointer"
                >
                  {lang === 'bn' ? 'WP-Admin সাইন আউট' : 'Log Out (WP-Admin)'}
                </button>
              </div>
            </div>

            {/* Right Main Body Content */}
            <div className="flex-grow bg-[#141414] overflow-y-auto p-4 sm:p-6 text-gray-200">
              
              {/* Notification Banner */}
              {themeSuccessMsg && (
                <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-600 text-emerald-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold">{themeSuccessMsg}</span>
                </div>
              )}

              {/* Installing Progress Indicator */}
              {installingThemeId && (
                <div className="mb-5 p-4 bg-[#1f2937] border border-blue-500/40 rounded-2xl space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-400 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                      <span>{installStepName}</span>
                    </span>
                    <span className="font-mono font-bold text-white">{installProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full transition-all duration-300"
                      style={{ width: `${installProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* TAB 1: THEMES & PACKAGE INSTALLER */}
              {activeTab === 'themes' && (
                <div className="space-y-6">
                  {/* Top Bar for Themes */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-[#2c3338]">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Palette className="w-5 h-5 text-emerald-400" />
                        <span>{lang === 'bn' ? 'WordPress থিম প্যাকেজ ম্যানেজার' : 'WordPress Theme Packages'}</span>
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">
                        {lang === 'bn' 
                          ? 'আপনার গ্রিনবাস্কেট ইকমার্স ও অ্যাপের জন্য সেরা থিম প্যাকেজ ইনস্টল বা সক্রিয় করুন'
                          : 'Install and activate verified high-performance WooCommerce theme packages'}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setUploadModalOpen(true)}
                        className="py-2 px-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{lang === 'bn' ? 'থিম আপলোড (.zip)' : 'Upload Theme (.zip)'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Themes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {themePackages.map((theme) => {
                      const isActive = theme.status === 'active';
                      const isInstalled = theme.status === 'installed';

                      return (
                        <div
                          key={theme.id}
                          className={`bg-[#1e1e1e] border rounded-2xl overflow-hidden shadow-md transition-all flex flex-col justify-between ${
                            isActive
                              ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                              : 'border-[#2c3338] hover:border-gray-500'
                          }`}
                        >
                          <div className="relative aspect-16/9 bg-gray-900 overflow-hidden">
                            <img
                              src={theme.previewUrl}
                              alt={theme.name}
                              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute top-2.5 left-2.5">
                              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                isActive
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-black/70 text-gray-200'
                              }`}>
                                {isActive ? (lang === 'bn' ? 'বর্তমান সক্রিয় থিম' : 'ACTIVE THEME') : theme.badge}
                              </span>
                            </div>
                            <div className="absolute bottom-2.5 right-2.5 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-gray-300">
                              v{theme.version}
                            </div>
                          </div>

                          <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm text-white">{theme.name}</h3>
                                <span className="text-[11px] text-gray-400">By {theme.author}</span>
                              </div>
                              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                {lang === 'bn' ? theme.descriptionBn : theme.description}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-[#2c3338] flex items-center justify-between">
                              <span className="text-[11px] text-gray-400 flex items-center gap-1">
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span>WooCommerce Ready</span>
                              </span>

                              <div className="flex items-center space-x-2">
                                {isActive ? (
                                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>{lang === 'bn' ? 'সক্রিয় রয়েছে' : 'Active'}</span>
                                  </span>
                                ) : isInstalled ? (
                                  <button
                                    onClick={() => handleActivateTheme(theme.id)}
                                    className="py-1 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                                  >
                                    {lang === 'bn' ? 'সক্রিয় করুন' : 'Activate Theme'}
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleInstallTheme(theme.id)}
                                    disabled={installingThemeId !== null}
                                    className="py-1 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                                  >
                                    {lang === 'bn' ? 'প্যাকেজ ইনস্টল করুন' : 'Install Package'}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: WP DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#1e1e1e] border border-[#2c3338] rounded-2xl">
                    <h3 className="text-base font-bold text-white mb-2">
                      {lang === 'bn' ? 'ওয়ার্ডপ্রেস ৬.৭ সাইট হেলথ ও স্ট্যাটাস' : 'WordPress 6.7 Site Health & Status'}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 bg-[#141414] rounded-xl border border-[#2c3338]">
                        <p className="text-gray-400">PHP Version</p>
                        <p className="text-sm font-bold text-emerald-400 mt-1">8.3.12 (High Performance)</p>
                      </div>
                      <div className="p-3 bg-[#141414] rounded-xl border border-[#2c3338]">
                        <p className="text-gray-400">MySQL Database</p>
                        <p className="text-sm font-bold text-white mt-1">8.0.35 InnoDB</p>
                      </div>
                      <div className="p-3 bg-[#141414] rounded-xl border border-[#2c3338]">
                        <p className="text-gray-400">Server Architecture</p>
                        <p className="text-sm font-bold text-blue-400 mt-1">Linux / Node.js Engine</p>
                      </div>
                      <div className="p-3 bg-[#141414] rounded-xl border border-[#2c3338]">
                        <p className="text-gray-400">REST API</p>
                        <p className="text-sm font-bold text-emerald-400 mt-1">Active (v2 / v3)</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#1e1e1e] border border-[#2c3338] rounded-2xl space-y-2">
                    <h4 className="font-bold text-sm text-white">
                      {lang === 'bn' ? 'সক্রিয় প্লাগিনসমূহ (Active Plugins)' : 'Active Plugins'}
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 bg-[#141414] rounded-lg">
                        <span className="font-bold text-white">WooCommerce Core v9.4.2</span>
                        <span className="text-emerald-400 font-semibold">Active & Synced</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-[#141414] rounded-lg">
                        <span className="font-bold text-white">Cloudflare for WordPress v4.12</span>
                        <span className="text-emerald-400 font-semibold">Edge Cache On</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-[#141414] rounded-lg">
                        <span className="font-bold text-white">GreenBasket React Bridge Connector</span>
                        <span className="text-blue-400 font-semibold">Live Webhook Connected</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: WOOCOMMERCE */}
              {activeTab === 'woocommerce' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#1e1e1e] border border-[#2c3338] rounded-2xl">
                    <h3 className="text-base font-bold text-white mb-1">
                      {lang === 'bn' ? 'WooCommerce লাইভ স্টোর সিনক্রোনাইজেশন' : 'WooCommerce Live Store Synchronization'}
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">
                      {lang === 'bn'
                        ? 'আপনার GreenBasket অ্যাপের পণ্য ও অর্ডারসমূহ সরাসরি ওয়ার্ডপ্রেস উকমার্স ডাটাবেসে সিঙ্ক হচ্ছে।'
                        : 'Products, pricing, and orders are continuously synchronized between GreenBasket app and WooCommerce.'}
                    </p>

                    <div className="p-3 bg-emerald-950/60 border border-emerald-700/60 rounded-xl text-xs flex items-center justify-between">
                      <span className="flex items-center gap-2 text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Webhook Status: 200 OK • Products in Sync: 10/10</span>
                      </span>
                      <button
                        onClick={() => {
                          setThemeSuccessMsg(lang === 'bn' ? 'WooCommerce ডেটাবেস সফলভাবে রিফ্রেশ হয়েছে!' : 'WooCommerce database refreshed successfully!');
                          setTimeout(() => setThemeSuccessMsg(''), 3000);
                        }}
                        className="py-1 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-bold cursor-pointer"
                      >
                        Sync Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: CLOUDFLARE */}
              {activeTab === 'cloudflare' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#1e1e1e] border border-[#2c3338] rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Cloud className="w-5 h-5 text-amber-500" />
                        <span>Cloudflare WordPress Integration</span>
                      </h3>
                      <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                        PROTECTED
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Zone: <span className="text-white font-mono font-bold">greenbasket.com.bd</span> • Account: <span className="text-white font-mono">shariarmozumdar@gmail.com</span>
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-3 bg-[#141414] rounded-xl border border-[#2c3338]">
                        <p className="text-gray-400">Automatic Platform Optimization (APO)</p>
                        <p className="text-emerald-400 font-bold mt-1">Enabled (Edge Cache 99.8%)</p>
                      </div>
                      <div className="p-3 bg-[#141414] rounded-xl border border-[#2c3338]">
                        <p className="text-gray-400">SSL/TLS Encryption</p>
                        <p className="text-blue-400 font-bold mt-1">Full (Strict) Mode</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Upload Zip Modal Overlay */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
            <div className="bg-[#1e1e1e] border border-[#2c3338] p-6 rounded-2xl max-w-md w-full space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">
                  {lang === 'bn' ? 'থিম প্যাকেজ আপলোড করুন (.zip)' : 'Upload Theme Package (.zip)'}
                </h3>
                <button onClick={() => setUploadModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 border-2 border-dashed border-[#2c3338] rounded-xl text-center space-y-2 bg-[#141414]">
                <Upload className="w-8 h-8 text-blue-400 mx-auto" />
                <p className="text-xs text-gray-300 font-medium">
                  {lang === 'bn' ? 'ওয়ার্ডপ্রেস থিম প্যাকেজ ফাইল সিলেক্ট করুন' : 'Choose a WordPress theme package (.zip)'}
                </p>
                <p className="text-[11px] text-gray-500 font-mono">{uploadedFileName}</p>
              </div>

              <div className="flex justify-end space-x-2 text-xs">
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="px-3 py-1.5 bg-gray-700 text-gray-200 rounded-lg"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  onClick={handleUploadZip}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg cursor-pointer"
                >
                  {lang === 'bn' ? 'ইনস্টল ও আনপ্যাক করুন' : 'Install & Unpack'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

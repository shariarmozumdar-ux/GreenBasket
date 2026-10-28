import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBasket, 
  Search, 
  ShoppingCart, 
  Heart, 
  Settings, 
  Sun, 
  Moon, 
  Languages, 
  User, 
  LogOut, 
  LogIn, 
  ChevronDown,
  Menu,
  X,
  Smartphone,
  ShieldCheck,
  UserCheck,
  RotateCcw,
  Laptop,
  Printer,
  FileText,
  Cloud,
  Tag
} from 'lucide-react';
import { Language, Theme, AuthUser } from '../types';
import { translations } from '../data/translations';
import { GoogleLogoIcon } from './AuthModal';
import { WordPressLogo } from './WpAdminModal';

interface TopNavProps {
  lang: Language;
  onToggleLang: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  cartCount: number;
  wishlistCount: number;
  currentUser: AuthUser | null;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onOpenAdmin: () => void;
  onOpenAuth: (mode?: 'phone_otp' | 'google' | 'password' | 'reset_password_otp') => void;
  onSignOut: () => void;
  onOpenAppModal: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
  onOpenInvoice: () => void;
  onOpenWpAdmin: () => void;
  onOpenConnectedAccounts: () => void;
  onOpenPriceEditor: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  cartCount,
  wishlistCount,
  currentUser,
  onOpenCart,
  onOpenSearch,
  onOpenProfile,
  onOpenAdmin,
  onOpenAuth,
  onSignOut,
  onOpenAppModal,
  onNavigateSection,
  activeSection,
  onOpenInvoice,
  onOpenWpAdmin,
  onOpenConnectedAccounts,
  onOpenPriceEditor,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'shop', label: t.shop },
    { id: 'categories', label: t.categories },
    { id: 'deals', label: t.deals },
    { id: 'about', label: t.aboutUs },
    { id: 'contact', label: t.contact },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#112417] text-emerald-200/90 text-xs py-2 px-4 border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="truncate text-center w-full sm:w-auto font-medium">
            {t.topAnnouncement}
          </p>
          <div className="hidden sm:flex items-center space-x-4 text-[11px] shrink-0 font-medium">
            <button
              onClick={() => onOpenAppModal()}
              className="flex items-center gap-1 text-emerald-400 hover:text-white transition-colors cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'মোবাইল অ্যাপস' : 'Mobile Apps'}</span>
            </button>
            <span>•</span>
            <button 
              onClick={onToggleLang}
              className="hover:text-white transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <Languages className="w-3 h-3" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="bg-[#0b1f13] text-white py-3 px-4 sm:px-6 sticky top-0 z-40 shadow-md border-b border-emerald-950/70 transition-colors">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2 sm:gap-4">
          
          {/* Logo & Mobile Menu Trigger */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-emerald-900/40 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-emerald-400" />}
            </button>

            <button 
              onClick={() => onNavigateSection('home')}
              className="flex items-center space-x-2 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/30 group-hover:scale-105 transition-transform">
                <ShoppingBasket className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white leading-none">
                  GreenBasket
                </span>
                <span className="text-[9px] sm:text-[10px] text-emerald-400 tracking-wider font-semibold">
                  {lang === 'bn' ? 'অর্গানিক ই-কমার্স' : 'Organic Farm Fresh'}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigateSection(item.id)}
                  className={`relative py-1 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-emerald-400 font-bold'
                      : 'text-gray-200 hover:text-emerald-300'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons, Dedicated Login/Register and Gear Dropdown */}
          <div className="flex items-center space-x-2 sm:space-x-3 relative">
            
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/30 rounded-xl transition-colors cursor-pointer"
              title={t.searchPlaceholder}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="p-2 text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/30 rounded-xl transition-colors relative cursor-pointer"
              title={t.myCart}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] w-5 h-5 rounded-full font-bold flex items-center justify-center shadow-md animate-in zoom-in-50">
                  {cartCount}
                </span>
              )}
            </button>

            {/* GOOGLE & LOGIN / REGISTER SECTION IN HEADER */}
            {currentUser ? (
              <button
                type="button"
                onClick={onOpenProfile}
                className="hidden sm:flex items-center space-x-2 py-1.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-700/60 text-white text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                title="View Profile & Connected Devices"
              >
                {currentUser.provider === 'google' ? (
                  <GoogleLogoIcon className="w-4 h-4 shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-[10px] shrink-0">
                    {currentUser.name.slice(0, 1)}
                  </div>
                )}
                <span className="max-w-[95px] truncate">{currentUser.name}</span>
              </button>
            ) : (
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                {/* 1-Click Google Sign-In Header Pill (User Request) */}
                <button
                  type="button"
                  onClick={() => onOpenAuth('google')}
                  className="hidden xl:flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap"
                  title="Google Account 1-Click Sign-in"
                >
                  <GoogleLogoIcon className="w-3.5 h-3.5" />
                  <span>Google</span>
                </button>

                {/* Dedicated Login/Register Button */}
                <button
                  type="button"
                  onClick={() => onOpenAuth('phone_otp')}
                  className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-700/30 transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
                  title="Login with OTP, Google or Password"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t.loginRegister}</span>
                </button>
              </div>
            )}

            {/* INVOICE / MEMO PRINTER & DOWNLOAD BUTTONS (User Request in Header) */}
            <div className="flex items-center space-x-1 bg-emerald-950/60 p-0.5 rounded-xl border border-emerald-800/40">
              <button
                type="button"
                onClick={onOpenInvoice}
                className="p-1.5 text-emerald-300 hover:text-white hover:bg-emerald-800/50 rounded-lg transition-colors cursor-pointer"
                title={lang === 'bn' ? 'মেমো / ইনভয়েস প্রিন্ট করুন' : 'Print Invoice / Memo'}
              >
                <Printer className="w-4 h-4 text-emerald-300" />
              </button>
              <button
                type="button"
                onClick={onOpenInvoice}
                className="p-1.5 text-emerald-300 hover:text-white hover:bg-emerald-800/50 rounded-lg transition-colors cursor-pointer"
                title={lang === 'bn' ? 'ওয়েবসাইট ইনভয়েস ডাউনলোড' : 'Download Invoice Memo'}
              >
                <FileText className="w-4 h-4 text-emerald-300" />
              </button>
            </div>

            {/* Gear Account Settings Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 p-2 text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/30 rounded-xl transition-colors focus:outline-none cursor-pointer"
                title="Account Settings & Device Sync"
                aria-expanded={dropdownOpen}
              >
                <Settings className="w-5 h-5" />
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>

              {/* Dropdown Menu Panel */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#0e1d14] text-slate-800 dark:text-slate-100 rounded-2xl shadow-2xl border border-slate-200 dark:border-emerald-900/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  
                  {/* User Header */}
                  <div className="px-4 py-3 bg-slate-50 dark:bg-[#14281c] border-b border-slate-100 dark:border-emerald-900/40">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500 dark:text-emerald-400/80">
                        {t.welcomeUser}
                      </p>
                      {currentUser && (
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 font-bold px-1.5 py-0.5 rounded">
                          {currentUser.provider === 'google' ? 'Google' : 'OTP Active'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-emerald-700 dark:text-white truncate mt-0.5">
                      {currentUser ? currentUser.name : (lang === 'bn' ? 'গেস্ট ইউজার' : 'Guest Customer')}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {currentUser ? (currentUser.email || currentUser.phone) : (lang === 'bn' ? 'অ্যাকাউন্টে সাইন ইন করুন' : 'Sign in to access ecosystem')}
                    </p>
                  </div>

                  {/* Menu Options */}
                  <div className="py-1">
                    
                    {/* Google Sign-in fast trigger if logged out */}
                    {!currentUser && (
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenAuth('google');
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-emerald-950/50 transition-colors text-left border-b border-slate-100 dark:border-emerald-900/30"
                      >
                        <span className="flex items-center gap-2">
                          <GoogleLogoIcon className="w-4 h-4" />
                          <span>{t.quickGoogleSignIn}</span>
                        </span>
                        <span className="text-[10px] bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 px-1.5 py-0.5 rounded font-bold">
                          1-Click
                        </span>
                      </button>
                    )}

                    {/* Password Reset via OTP (User Request) */}
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenAuth('reset_password_otp');
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors text-left"
                    >
                      <span className="flex items-center">
                        <RotateCcw className="w-4 h-4 mr-2.5 text-amber-600" />
                        <span>{t.resetPasswordWithOtp}</span>
                      </span>
                      <span className="text-[9px] bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 font-extrabold px-1.5 py-0.5 rounded uppercase">
                        OTP
                      </span>
                    </button>

                    {/* Admin Panel & Inventory */}
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenAdmin();
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 transition-colors text-left border-y border-emerald-100 dark:border-emerald-900/40 my-1 cursor-pointer"
                    >
                      <span className="flex items-center">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2.5 shrink-0" />
                        <span>{t.adminPanel}</span>
                      </span>
                      <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        SETTINGS
                      </span>
                    </button>

                    {/* Website Invoice & Cash Memo (Download & Print) */}
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenInvoice();
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors text-left"
                    >
                      <span className="flex items-center">
                        <Printer className="w-4 h-4 mr-2.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{lang === 'bn' ? 'ক্যাশ মেমো ও চালান (প্রিন্ট/ডাউনলোড)' : 'Invoice & Cash Memo'}</span>
                      </span>
                      <span className="text-[9px] bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 font-bold px-1.5 py-0.5 rounded">
                        PRINT
                      </span>
                    </button>

                    {/* WordPress WP-Admin Login Portal */}
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenWpAdmin();
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors text-left"
                    >
                      <span className="flex items-center">
                        <div className="w-4 h-4 mr-2.5 text-blue-600 dark:text-blue-400 shrink-0">
                          <WordPressLogo className="w-4 h-4" />
                        </div>
                        <span>{lang === 'bn' ? 'ওয়ার্ডপ্রেস WP-Admin লগইন' : 'WordPress WP-Admin'}</span>
                      </span>
                      <span className="text-[9px] bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 font-bold px-1.5 py-0.5 rounded">
                        6.7
                      </span>
                    </button>

                    {/* Connected Accounts & Cloudflare Edge Link */}
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenConnectedAccounts();
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors text-left"
                    >
                      <span className="flex items-center">
                        <Cloud className="w-4 h-4 mr-2.5 text-amber-500 shrink-0" />
                        <span>{lang === 'bn' ? 'কানেক্টেড অ্যাকাউন্টস ও ক্লাউডফ্লেয়ার' : 'Connected SSO & Cloudflare'}</span>
                      </span>
                      <span className="text-[9px] bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 font-bold px-1.5 py-0.5 rounded">
                        EDGE
                      </span>
                    </button>

                    {/* Quick Category Price Editor */}
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenPriceEditor();
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors text-left"
                    >
                      <span className="flex items-center">
                        <Tag className="w-4 h-4 mr-2.5 text-purple-600 dark:text-purple-400 shrink-0" />
                        <span>{lang === 'bn' ? 'সকল ক্যাটাগরি পণ্য মূল্য এডিট' : 'Edit Category Prices'}</span>
                      </span>
                      <span className="text-[9px] bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 font-bold px-1.5 py-0.5 rounded">
                        EDIT
                      </span>
                    </button>

                    {/* Customer Profile & Connected Devices */}
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenProfile();
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-left"
                    >
                      <span className="flex items-center">
                        <User className="w-4 h-4 text-slate-400 dark:text-emerald-500 mr-2.5" />
                        <span>{t.customerProfile}</span>
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <Laptop className="w-3 h-3" />
                        <span>Devices</span>
                      </span>
                    </button>

                    {/* Theme Mode Toggle */}
                    <div 
                      onClick={() => {
                        onToggleTheme();
                      }}
                      className="flex items-center justify-between px-4 py-2.5 text-xs font-medium hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center text-slate-700 dark:text-slate-200">
                        {theme === 'dark' ? (
                          <Moon className="w-4 h-4 text-amber-400 mr-2.5" />
                        ) : (
                          <Sun className="w-4 h-4 text-amber-500 mr-2.5" />
                        )}
                        <span>{t.themeMode}</span>
                      </span>
                      <span className="text-[11px] bg-slate-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded text-slate-600 dark:text-emerald-300 font-semibold">
                        {theme === 'dark' ? t.dark : t.light}
                      </span>
                    </div>

                    {/* Language Switch */}
                    <div 
                      onClick={() => {
                        onToggleLang();
                      }}
                      className="flex items-center justify-between px-4 py-2.5 text-xs font-medium hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center text-slate-700 dark:text-slate-200">
                        <Languages className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2.5" />
                        <span>{t.language}</span>
                      </span>
                      <span className="text-[11px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">
                        {t.currentLang}
                      </span>
                    </div>

                    {/* Mobile App Download */}
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenAppModal();
                      }}
                      className="w-full flex items-center px-4 py-2.5 text-xs font-medium hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-left"
                    >
                      <Smartphone className="w-4 h-4 text-slate-400 dark:text-emerald-500 mr-2.5" />
                      <span>{lang === 'bn' ? 'অফিসিয়াল অ্যাপস (Android/iOS)' : 'Official Apps (Android/iOS)'}</span>
                    </button>
                  </div>

                  <hr className="border-slate-100 dark:border-emerald-900/40" />

                  {/* Logout / Login Toggle */}
                  <div className="py-1">
                    {currentUser ? (
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onSignOut();
                        }}
                        className="w-full flex items-center px-4 py-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2.5" />
                        <span>{t.logout}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenAuth('phone_otp');
                        }}
                        className="w-full flex items-center px-4 py-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors text-left cursor-pointer"
                      >
                        <LogIn className="w-4 h-4 mr-2.5" />
                        <span>{t.loginRegister}</span>
                      </button>
                    )}
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-emerald-900/40 mt-3 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-2">
              
              {/* Mobile User Status / Login Buttons */}
              {currentUser ? (
                <div className="p-3 bg-emerald-950/90 rounded-2xl border border-emerald-800/60 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    {currentUser.provider === 'google' ? (
                      <GoogleLogoIcon className="w-6 h-6 shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                        {currentUser.name.slice(0, 1)}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-white truncate max-w-[140px]">{currentUser.name}</p>
                      <p className="text-[10px] text-emerald-400">{currentUser.memberTier || 'Verified'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSignOut();
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
                  >
                    {t.logout}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuth('google');
                      }}
                      className="py-2.5 px-3 rounded-xl bg-white text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <GoogleLogoIcon className="w-4 h-4" />
                      <span>Google</span>
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuth('phone_otp');
                      }}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <User className="w-4 h-4" />
                      <span>{t.loginRegister}</span>
                    </button>
                  </div>

                  {/* Password Reset OTP trigger in mobile menu */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('reset_password_otp');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-amber-950/40 text-amber-300 border border-amber-800/50 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.resetPasswordWithOtp}</span>
                  </button>
                </div>
              )}

              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigateSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-emerald-800/50 text-emerald-400 font-bold'
                      : 'text-gray-300 hover:bg-emerald-900/30 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-left px-3 py-2 rounded-lg text-sm font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{t.adminPanel}</span>
                </span>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded">
                  INVENTORY
                </span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInvoice();
                  }}
                  className="p-2 rounded-xl bg-emerald-900/40 text-emerald-300 border border-emerald-800/50 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'মেমো / ইনভয়েস' : 'Cash Memo'}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWpAdmin();
                  }}
                  className="p-2 rounded-xl bg-blue-950/40 text-blue-300 border border-blue-800/50 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <WordPressLogo className="w-3.5 h-3.5 text-blue-400" />
                  <span>WP-Admin 6.7</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConnectedAccounts();
                  }}
                  className="p-2 rounded-xl bg-amber-950/40 text-amber-300 border border-amber-800/50 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Cloud className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'bn' ? 'ক্লাউডফ্লেয়ার SSO' : 'Cloudflare SSO'}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPriceEditor();
                  }}
                  className="p-2 rounded-xl bg-purple-950/40 text-purple-300 border border-purple-800/50 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Tag className="w-3.5 h-3.5 text-purple-400" />
                  <span>{lang === 'bn' ? 'মূল্য এডিট' : 'Edit Prices'}</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between px-3 border-t border-emerald-900/40">
                <button
                  onClick={onToggleLang}
                  className="text-xs text-emerald-400 font-semibold"
                >
                  ভাষা: {t.currentLang} (পরিবর্তন)
                </button>
                <button
                  onClick={onToggleTheme}
                  className="text-xs text-emerald-400 font-semibold"
                >
                  মোড: {theme === 'dark' ? 'ডার্ক' : 'লাইট'}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

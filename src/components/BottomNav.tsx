import React from 'react';
import { Home, ShoppingBag, Grid, ShoppingCart, User } from 'lucide-react';
import { Language, AuthUser } from '../types';
import { translations } from '../data/translations';

interface BottomNavProps {
  lang: Language;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  currentUser: AuthUser | null;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  onOpenCategories?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  lang,
  activeSection,
  onNavigateSection,
  cartCount,
  onOpenCart,
  currentUser,
  onOpenProfile,
  onOpenAuth,
  onOpenCategories,
}) => {
  const t = translations[lang];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#09160e]/95 backdrop-blur-md border-t border-slate-200 dark:border-emerald-900/60 shadow-lg px-2 py-1.5 transition-colors"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      <div className="grid grid-cols-5 gap-1 items-center max-w-md mx-auto">
        
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => onNavigateSection('home')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
            activeSection === 'home'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight truncate">{t.bottomNavHome}</span>
        </button>

        {/* 2. Shop */}
        <button
          type="button"
          onClick={() => onNavigateSection('shop')}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
            activeSection === 'shop'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600'
          }`}
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight truncate">{t.bottomNavShop}</span>
        </button>

        {/* 3. Categories */}
        <button
          type="button"
          onClick={() => {
            if (onOpenCategories) {
              onOpenCategories();
            } else {
              onNavigateSection('categories');
            }
          }}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
            activeSection === 'categories'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600'
          }`}
        >
          <Grid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight truncate">{t.bottomNavCategories}</span>
        </button>

        {/* 4. Cart with live badge */}
        <button
          type="button"
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-xl text-slate-500 dark:text-slate-400 hover:text-emerald-600 relative transition-all cursor-pointer"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] leading-tight truncate">{t.bottomNavCart}</span>
        </button>

        {/* 5. Profile or Login */}
        <button
          type="button"
          onClick={() => {
            if (currentUser) {
              onOpenProfile();
            } else {
              onOpenAuth();
            }
          }}
          className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
            currentUser
              ? 'text-emerald-700 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600'
          }`}
        >
          {currentUser ? (
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center mb-0.5">
              {currentUser.name.slice(0, 1)}
            </div>
          ) : (
            <User className="w-5 h-5 mb-0.5" />
          )}
          <span className="text-[10px] leading-tight truncate">
            {currentUser ? currentUser.name.split(' ')[0] : (lang === 'bn' ? 'লগইন' : 'Login')}
          </span>
        </button>

      </div>
    </nav>
  );
};

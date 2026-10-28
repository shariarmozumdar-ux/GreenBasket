/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Language, 
  Theme, 
  Product, 
  CartItem, 
  ProductCategory, 
  OrderDetails, 
  StorePlatform,
  StoreSettings,
  AuthUser 
} from './types';
import { products as initialProducts } from './data/products';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { PaymentPartnerBar } from './components/PaymentPartnerBar';
import { FarmToTable } from './components/FarmToTable';
import { CategoryGrid } from './components/CategoryGrid';
import { PromoBanner } from './components/PromoBanner';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProductCatalog } from './components/ProductCatalog';
import { NewsletterSection } from './components/NewsletterSection';
import { FooterSection } from './components/FooterSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AppDownloadModal } from './components/AppDownloadModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CustomerProfileModal } from './components/CustomerProfileModal';
import { SearchModal } from './components/SearchModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AuthModal, AuthModalMethod } from './components/AuthModal';
import { BottomNav } from './components/BottomNav';
import { InvoiceModal } from './components/InvoiceModal';
import { CategoryPriceEditorModal } from './components/CategoryPriceEditorModal';
import { WpAdminModal } from './components/WpAdminModal';
import { ConnectedAccountsModal } from './components/ConnectedAccountsModal';

export default function App() {
  // Localization & Theme (Default Bengali 'bn' as requested by prompt)
  const [lang, setLang] = useState<Language>('bn');
  const [theme, setTheme] = useState<Theme>('light');

  // Navigation
  const [activeSection, setActiveSection] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  // Live Product Inventory (Managed by Admin)
  const [productList, setProductList] = useState<Product[]>(initialProducts);

  // Store Settings (Managed by Admin)
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    storeName: 'GreenBasket',
    contactPhone: '+৮৮০ ১২৩৪-৫৬৭৮৯০',
    contactEmail: 'support@greenbasket.com',
    address: 'সেক্টর #১০, উত্তরা, ঢাকা, বাংলাদেশ',
    deliveryFeeBn: 60,
    deliveryFeeEn: 4.99,
    freeDeliveryThresholdBn: 1000,
    freeDeliveryThresholdEn: 49,
    promoCode: 'GREEN30',
    promoDiscountPercent: 30,
    enableCod: true,
    enableMultiPlatformBadges: true,
  });

  // Initial cart with items matching user's reference badge
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: initialProducts[0], quantity: 2 }, // Organic Tomatoes
    { product: initialProducts[1], quantity: 1 }, // Fresh Carrots
    { product: initialProducts[2], quantity: 3 }, // Green Spinach
  ]);

  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1', 'prod-4']);
  const [appliedPromo, setAppliedPromo] = useState<string>('GREEN30'); // Pre-applied 30% discount offer!

  // Past orders
  const [pastOrders, setPastOrders] = useState<OrderDetails[]>([
    {
      orderId: 'GB-748291',
      customerName: 'শাহরিয়ার মজুমদার',
      phone: '+880 1712-345678',
      address: 'বাড়ি #২৪, রোড #১২, সেক্টর #১০, উত্তরা',
      city: 'ঢাকা',
      deliverySlot: 'সকাল ৮:০০ - বেলা ১১:০০',
      paymentMethod: 'bkash',
      items: [
        { product: initialProducts[3], quantity: 2 },
        { product: initialProducts[4], quantity: 1 }
      ],
      subtotal: 700,
      discount: 210,
      deliveryFee: 0,
      total: 490,
      date: '২৪ অক্টোবর, ২০২৬'
    }
  ]);

  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [appModalPlatform, setAppModalPlatform] = useState<StorePlatform>('android');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMethod>('phone_otp');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  // New Feature Modals (Invoices, Price Editor, WP-Admin, Connected Accounts)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isCategoryPriceEditorOpen, setIsCategoryPriceEditorOpen] = useState(false);
  const [priceEditorCategory, setPriceEditorCategory] = useState<ProductCategory | 'all'>('all');
  const [isWpAdminModalOpen, setIsWpAdminModalOpen] = useState(false);
  const [isConnectedAccountsModalOpen, setIsConnectedAccountsModalOpen] = useState(false);

  const handleOpenAuth = (mode: AuthModalMethod = 'phone_otp') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleOpenCategoryPriceEditor = (category: ProductCategory | 'all' = 'all') => {
    setPriceEditorCategory(category);
    setIsCategoryPriceEditorOpen(true);
  };

  // Authentication State (OTP / Google / Password)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>({
    id: 'user-default-1',
    name: 'শাহরিয়ার মজুমদার',
    email: 'shariarmozumdar@gmail.com',
    phone: '+880 1712-345678',
    provider: 'phone_otp',
    memberTier: 'Gold Member',
    greenPoints: 420
  });

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  // Sync dark mode class on document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Total cart item quantity for counter badge
  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Promo code apply
  const handleApplyPromo = (code: string) => {
    if (code === storeSettings.promoCode || code === 'FREESHIP' || code === 'GREEN30') {
      setAppliedPromo(code);
      return true;
    }
    return false;
  };

  // Checkout flow
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (order: OrderDetails) => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
    setPastOrders((prev) => [order, ...prev]);
    setCartItems([]); // clear cart
  };

  // Open App Download modal with specific platform
  const handleOpenAppModal = (platform: StorePlatform = 'android') => {
    setAppModalPlatform(platform);
    setIsAppModalOpen(true);
  };

  // --- ADMIN PRODUCT INVENTORY OPERATIONS ---
  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: `prod-${Date.now()}`,
    };
    setProductList((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    // Also update in cart if present
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === updatedProduct.id
          ? { ...item, product: updatedProduct }
          : item
      )
    );
  };

  const handleDeleteProduct = (productId: string) => {
    // Delete from inventory
    setProductList((prev) => prev.filter((p) => p.id !== productId));
    // Remove from cart if present
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    // Remove from wishlist
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
    // Close quick view if deleting current product
    if (quickViewProduct?.id === productId) {
      setQuickViewProduct(null);
    }
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProductList((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, stockCount: newStock, inStock: newStock > 0 }
          : p
      )
    );
  };

  const handleResetInventory = () => {
    setProductList(initialProducts);
  };

  const handleSaveSettings = (newSettings: StoreSettings) => {
    setStoreSettings(newSettings);
  };

  // Smooth scroll navigate to section
  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'catalog' || sectionId === 'shop') {
      const el = document.getElementById('shop');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'categories') {
      const el = document.getElementById('categories');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'deals') {
      const el = document.getElementById('deals');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'about') {
      const el = document.getElementById('about');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#07130b] text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* 1. Top Navigation Bar with Gear Settings, Dedicated Login/Register & Language/Theme Switch */}
      <TopNav
        lang={lang}
        onToggleLang={() => setLang(lang === 'bn' ? 'en' : 'bn')}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        currentUser={currentUser}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
        onOpenAppModal={() => handleOpenAppModal('android')}
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
        onOpenInvoice={() => setIsInvoiceModalOpen(true)}
        onOpenWpAdmin={() => setIsWpAdminModalOpen(true)}
        onOpenConnectedAccounts={() => setIsConnectedAccountsModalOpen(true)}
        onOpenPriceEditor={() => handleOpenCategoryPriceEditor('all')}
      />

      <main className="flex-1 pb-16 md:pb-0">
        {/* 2. Hero Section with Multi-platform Ecosystem & Store Badges */}
        <HeroSection
          lang={lang}
          onOpenAppModal={handleOpenAppModal}
          onShopNow={() => handleNavigateSection('shop')}
        />

        {/* 3. Payment Partner Gateway Panel (Prompt Specification) */}
        <PaymentPartnerBar lang={lang} />

        {/* 4. Farm to Table Guarantee & Verification */}
        <FarmToTable
          lang={lang}
          onExplore={() => handleNavigateSection('shop')}
        />

        {/* 5. Shop by Category Grid */}
        <CategoryGrid
          lang={lang}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleNavigateSection('shop');
          }}
          onOpenPriceEditor={handleOpenCategoryPriceEditor}
        />

        {/* 6. Promotional Banner (Up to 30% Off) */}
        <PromoBanner
          lang={lang}
          onApplyCoupon={(code) => {
            handleApplyPromo(code);
            setIsCartOpen(true);
          }}
        />

        {/* 7. Why Choose Us 4 Pillars */}
        <WhyChooseUs lang={lang} />

        {/* 8. Top Picks For You / Live Product Catalog */}
        <ProductCatalog
          lang={lang}
          products={productList}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onOpenQuickView={(p) => setQuickViewProduct(p)}
          searchQuery={searchQuery}
          onOpenPriceEditor={handleOpenCategoryPriceEditor}
        />

        {/* 9. Newsletter Subscription Strip */}
        <NewsletterSection lang={lang} />
      </main>

      {/* 10. Footer Section (3-Column Layout with Official App Badges) */}
      <FooterSection
        lang={lang}
        onOpenAppModal={handleOpenAppModal}
        onNavigateSection={handleNavigateSection}
      />

      {/* Mobile All-Device User-Friendly Bottom Navigation Bar */}
      <BottomNav
        lang={lang}
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAuth={() => handleOpenAuth('phone_otp')}
        onOpenCategories={() => {
          setSelectedCategory('all');
          handleNavigateSection('categories');
        }}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        lang={lang}
        onProceedToCheckout={handleProceedToCheckout}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        lang={lang}
        currentUser={currentUser}
        appliedPromo={appliedPromo}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Order Confirmed Receipt Modal with Confetti */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        lang={lang}
      />

      {/* Official App Download & QR Code Modal */}
      <AppDownloadModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        lang={lang}
        initialPlatform={appModalPlatform}
      />

      {/* Product Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        lang={lang}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Customer Profile Modal with All Devices Session Support */}
      <CustomerProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        lang={lang}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenAuth={handleOpenAuth}
        pastOrders={pastOrders}
        onOpenConnectedAccounts={() => setIsConnectedAccountsModalOpen(true)}
        onOpenInvoice={() => setIsInvoiceModalOpen(true)}
      />

      {/* Dedicated Authentication Modal (Phone OTP, Google, Password with OTP Reset) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        lang={lang}
        initialMode={authModalMode}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
        products={productList}
        onSelectProduct={(p) => setQuickViewProduct(p)}
        onAddToCart={handleAddToCart}
      />

      {/* Admin Dashboard & Inventory Management Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
        products={productList}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateStock={handleUpdateStock}
        onResetInventory={handleResetInventory}
        settings={storeSettings}
        onSaveSettings={handleSaveSettings}
      />

      {/* Official Cash Memo & Tax Invoice Modal (Print & Download Ready) */}
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        lang={lang}
        items={cartItems}
        currentUser={currentUser}
        latestOrder={pastOrders[0] || null}
      />

      {/* Category Product Price Editor Modal */}
      <CategoryPriceEditorModal
        isOpen={isCategoryPriceEditorOpen}
        onClose={() => setIsCategoryPriceEditorOpen(false)}
        lang={lang}
        products={productList}
        initialCategory={priceEditorCategory}
        onUpdateProduct={handleUpdateProduct}
      />

      {/* WordPress 6.7 WP-Admin & Theme Package Installer Modal */}
      <WpAdminModal
        isOpen={isWpAdminModalOpen}
        onClose={() => setIsWpAdminModalOpen(false)}
        lang={lang}
      />

      {/* Connected Accounts (Google, Apple, Microsoft, GitHub with Cloudflare Edge Link) */}
      <ConnectedAccountsModal
        isOpen={isConnectedAccountsModalOpen}
        onClose={() => setIsConnectedAccountsModalOpen(false)}
        lang={lang}
      />

    </div>
  );
}

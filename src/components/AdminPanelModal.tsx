import React, { useState } from 'react';
import { 
  X, 
  Package, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpDown, 
  DollarSign, 
  Layers, 
  ShieldAlert, 
  RotateCcw, 
  Save, 
  Check, 
  Leaf, 
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { Product, ProductCategory, StoreSettings, Language } from '../types';
import { translations } from '../data/translations';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onResetInventory: () => void;
  settings: StoreSettings;
  onSaveSettings: (newSettings: StoreSettings) => void;
}

const PRESET_IMAGES = [
  { name: 'Red Tomatoes', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80' },
  { name: 'Fresh Carrots', url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80' },
  { name: 'Green Spinach', url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80' },
  { name: 'Fresh Apples', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80' },
  { name: 'Farm Eggs', url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80' },
  { name: 'Broccoli', url: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=600&auto=format&fit=crop&q=80' },
  { name: 'Bell Peppers', url: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80' },
  { name: 'Honey & Nuts', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80' },
  { name: 'Fresh Milk', url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80' },
  { name: 'Fresh Mangoes', url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80' },
  { name: 'Strawberries', url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&auto=format&fit=crop&q=80' },
  { name: 'Fresh Cucumbers', url: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&auto=format&fit=crop&q=80' },
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  lang,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateStock,
  onResetInventory,
  settings,
  onSaveSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'settings'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'lowStock' | 'outOfStock'>('all');

  // Add / Edit Product Modal state
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState<ProductCategory>('vegetables');
  const [priceBn, setPriceBn] = useState<number>(100);
  const [priceEn, setPriceEn] = useState<number>(1.99);
  const [unitBn, setUnitBn] = useState('কেজি');
  const [unitEn, setUnitEn] = useState('kg');
  const [stockCount, setStockCount] = useState<number>(50);
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [farmOriginBn, setFarmOriginBn] = useState('সাভার অর্গানিক এগ্রো, ঢাকা');
  const [farmOriginEn, setFarmOriginEn] = useState('Savar Organic Agro, Dhaka');
  const [descriptionBn, setDescriptionBn] = useState('প্রাকৃতিকভাবে উৎপাদিত তাজা ও পুষ্টিকর ফসল।');
  const [descriptionEn, setDescriptionEn] = useState('Freshly harvested wholesome organic produce.');
  const [organicCertified, setOrganicCertified] = useState(true);
  const [inStock, setInStock] = useState(true);

  // Delete Confirmation State
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Feedback notifications
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Store Settings Form State
  const [formSettings, setFormSettings] = useState<StoreSettings>({ ...settings });

  const t = translations[lang];

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => {
      setActionNotice(null);
    }, 3000);
  };

  // Open Add Product form
  const handleOpenAddForm = () => {
    setEditingProduct(null);
    setNameBn('');
    setNameEn('');
    setCategory('vegetables');
    setPriceBn(100);
    setPriceEn(1.99);
    setUnitBn('কেজি');
    setUnitEn('kg');
    setStockCount(50);
    setImage(PRESET_IMAGES[0].url);
    setFarmOriginBn('সাভার অর্গানিক ফার্ম, ঢাকা');
    setFarmOriginEn('Savar Organic Farm, Dhaka');
    setDescriptionBn('প্রাকৃতিক ও রাসায়নিকমুক্ত খামারের তাজা ফসল।');
    setDescriptionEn('Naturally grown chemical-free farm harvest.');
    setOrganicCertified(true);
    setInStock(true);
    setIsProductFormOpen(true);
  };

  // Open Edit Product form
  const handleOpenEditForm = (p: Product) => {
    setEditingProduct(p);
    setNameBn(p.nameBn);
    setNameEn(p.nameEn);
    setCategory(p.category);
    setPriceBn(p.priceBn);
    setPriceEn(p.priceEn);
    setUnitBn(p.unitBn);
    setUnitEn(p.unitEn);
    setStockCount(p.stockCount ?? 45);
    setImage(p.image);
    setFarmOriginBn(p.farmOriginBn);
    setFarmOriginEn(p.farmOriginEn);
    setDescriptionBn(p.descriptionBn);
    setDescriptionEn(p.descriptionEn);
    setOrganicCertified(p.organicCertified);
    setInStock(p.inStock);
    setIsProductFormOpen(true);
  };

  // Save Add/Edit
  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      // Update
      const updated: Product = {
        ...editingProduct,
        nameBn,
        nameEn,
        category,
        priceBn: Number(priceBn),
        priceEn: Number(priceEn),
        unitBn,
        unitEn,
        stockCount: Number(stockCount),
        inStock: Number(stockCount) > 0 ? inStock : false,
        image,
        farmOriginBn,
        farmOriginEn,
        descriptionBn,
        descriptionEn,
        organicCertified,
      };
      onUpdateProduct(updated);
      showNotification(t.productUpdatedMsg);
    } else {
      // Add
      onAddProduct({
        nameBn,
        nameEn,
        category,
        priceBn: Number(priceBn),
        priceEn: Number(priceEn),
        unitBn,
        unitEn,
        rating: 5.0,
        reviewCount: 1,
        image,
        inStock: Number(stockCount) > 0 ? inStock : false,
        stockCount: Number(stockCount),
        organicCertified,
        farmOriginBn,
        farmOriginEn,
        nutrition: {
          calories: '35 kcal / 100g',
          fiber: '2.0g',
          vitamins: 'Vitamin C, Mineral Complex',
          protein: '1.2g'
        },
        descriptionBn,
        descriptionEn,
      });
      showNotification(t.productAddedMsg);
    }
    setIsProductFormOpen(false);
  };

  // Confirm delete product
  const handleConfirmDelete = () => {
    if (productToDelete) {
      onDeleteProduct(productToDelete.id);
      showNotification(t.productDeletedMsg);
      setProductToDelete(null);
    }
  };

  // Save Settings
  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formSettings);
    showNotification(t.settingsSavedMsg);
  };

  // Filtering products in admin table
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      p.nameBn.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.farmOriginBn.toLowerCase().includes(q);

    const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;

    const count = p.stockCount ?? 0;
    const matchStock =
      stockFilter === 'all' ||
      (stockFilter === 'inStock' && count > 10 && p.inStock) ||
      (stockFilter === 'lowStock' && count > 0 && count <= 10) ||
      (stockFilter === 'outOfStock' && (count === 0 || !p.inStock));

    return matchSearch && matchCategory && matchStock;
  });

  // Calculate Metrics
  const totalItemsCount = products.length;
  const inStockCount = products.filter((p) => (p.stockCount ?? 0) > 0 && p.inStock).length;
  const lowStockCount = products.filter((p) => (p.stockCount ?? 0) > 0 && (p.stockCount ?? 0) <= 10).length;
  const outOfStockCount = products.filter((p) => (p.stockCount ?? 0) === 0 || !p.inStock).length;
  const totalValuation = products.reduce((acc, p) => acc + p.priceBn * (p.stockCount ?? 0), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#09150e] border border-slate-200 dark:border-emerald-950 rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]"
        role="dialog"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-[#0b1f13] text-white border-b border-emerald-900/40 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-sm">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold leading-tight">
                  {t.adminPanelTitle}
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                {t.adminPanelDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-emerald-900/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-5 pt-3 border-b border-slate-200 dark:border-emerald-950 bg-slate-50 dark:bg-[#0c1a12] shrink-0">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`py-2.5 px-4 text-xs font-bold rounded-t-xl transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                activeTab === 'inventory'
                  ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-[#09150e]'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>{t.tabInventory}</span>
              <span className="ml-1 text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.2 rounded-full font-bold">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2.5 px-4 text-xs font-bold rounded-t-xl transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-white dark:bg-[#09150e]'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>{t.tabSettings}</span>
            </button>
          </div>

          {/* Quick Notice */}
          {actionNotice && (
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1 rounded-lg border border-emerald-300/40 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{actionNotice}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: INVENTORY MANAGEMENT */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              
              {/* Summary KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0f2115] border border-slate-200/80 dark:border-emerald-900/40">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {t.totalProducts}
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums mt-1">
                    {totalItemsCount}
                  </p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {inStockCount} {t.statusInStock}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                  <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                    {t.lowStockAlerts}
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-300 tabular-nums mt-1">
                    {lowStockCount}
                  </p>
                  <p className="text-[10px] text-amber-700 dark:text-amber-400 mt-0.5">
                    ≤ ১০ ইউনিট বাকি
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                  <p className="text-[11px] font-semibold text-rose-700 dark:text-rose-400">
                    {t.statusOutOfStock}
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-300 tabular-nums mt-1">
                    {outOfStockCount}
                  </p>
                  <p className="text-[10px] text-rose-700 dark:text-rose-400 mt-0.5">
                    জরুরি রিস্টক প্রয়োজন
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40">
                  <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    {t.totalInventoryValue}
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-300 tabular-nums mt-1">
                    ৳{totalValuation.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                    বর্তমান গুদাম মূল্য
                  </p>
                </div>
              </div>

              {/* Action Toolbar: Search, Filters & Add Product Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 dark:bg-[#0c1a12] p-3 rounded-2xl border border-slate-200/80 dark:border-emerald-950">
                <div className="flex flex-wrap items-center gap-2 flex-1">
                  
                  {/* Search */}
                  <div className="relative flex-1 min-w-[180px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.searchInventory}
                      className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="py-2 px-3 bg-white dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
                  >
                    <option value="all">{lang === 'bn' ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
                    <option value="vegetables">{t.catVegetables}</option>
                    <option value="fruits">{t.catFruits}</option>
                    <option value="herbs">{t.catHerbs}</option>
                    <option value="dairy">{t.catDairy}</option>
                    <option value="nuts">{t.catNuts}</option>
                    <option value="fish-meat">{t.catFishMeat}</option>
                  </select>

                  {/* Stock Filter */}
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value as any)}
                    className="py-2 px-3 bg-white dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
                  >
                    <option value="all">{lang === 'bn' ? 'সকল স্টক অবস্থা' : 'All Stock Status'}</option>
                    <option value="inStock">{t.statusInStock}</option>
                    <option value="lowStock">{t.statusLowStock}</option>
                    <option value="outOfStock">{t.statusOutOfStock}</option>
                  </select>
                </div>

                {/* Add Product Button */}
                <button
                  type="button"
                  onClick={handleOpenAddForm}
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.addProduct}</span>
                </button>
              </div>

              {/* Products Inventory Table */}
              <div className="bg-white dark:bg-[#0c1a12] rounded-2xl border border-slate-200/80 dark:border-emerald-950 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-[#112318] border-b border-slate-200 dark:border-emerald-950 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <th className="py-3 px-4">পণ্য (Product)</th>
                        <th className="py-3 px-3">ক্যাটাগরি</th>
                        <th className="py-3 px-3">মূল্য (Price)</th>
                        <th className="py-3 px-3">স্টক ও সমন্বয়</th>
                        <th className="py-3 px-3">স্ট্যাটাস</th>
                        <th className="py-3 px-4 text-right">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-emerald-950/60 text-xs">
                      {filteredProducts.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            {lang === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি।' : 'No inventory items match current filter.'}
                          </td>
                        </tr>
                      ) : (
                        filteredProducts.map((p) => {
                          const stock = p.stockCount ?? 0;
                          const isLow = stock > 0 && stock <= 10;
                          const isOut = stock === 0 || !p.inStock;

                          return (
                            <tr key={p.id} className="hover:bg-slate-50/70 dark:hover:bg-emerald-950/30 transition-colors">
                              {/* Product Info */}
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={p.image}
                                    alt={p.nameEn}
                                    className="w-11 h-11 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200/60"
                                  />
                                  <div className="min-w-0">
                                    <p className="font-bold text-slate-900 dark:text-white truncate">
                                      {lang === 'bn' ? p.nameBn : p.nameEn}
                                    </p>
                                    <p className="text-[11px] text-slate-400 truncate">
                                      {lang === 'bn' ? p.farmOriginBn : p.farmOriginEn}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              {/* Category */}
                              <td className="py-3 px-3 whitespace-nowrap">
                                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 capitalize">
                                  {p.category}
                                </span>
                              </td>

                              {/* Price */}
                              <td className="py-3 px-3 whitespace-nowrap font-bold text-slate-800 dark:text-slate-200">
                                <div className="tabular-nums">
                                  ৳{p.priceBn} <span className="text-[11px] font-normal text-slate-400">/ {p.unitBn}</span>
                                </div>
                                <div className="text-[10px] text-slate-400 tabular-nums">
                                  ${p.priceEn} / {p.unitEn}
                                </div>
                              </td>

                              {/* Stock Adjuster */}
                              <td className="py-3 px-3 whitespace-nowrap">
                                <div className="flex items-center space-x-1.5">
                                  <button
                                    type="button"
                                    onClick={() => onUpdateStock(p.id, Math.max(0, stock - 5))}
                                    className="w-6 h-6 rounded-md bg-slate-100 dark:bg-emerald-900/40 text-slate-600 dark:text-slate-300 hover:bg-slate-200 flex items-center justify-center font-bold text-xs"
                                    title="-5 units"
                                  >
                                    -
                                  </button>
                                  <span className="w-10 text-center font-bold tabular-nums text-slate-900 dark:text-white">
                                    {stock}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => onUpdateStock(p.id, stock + 5)}
                                    className="w-6 h-6 rounded-md bg-slate-100 dark:bg-emerald-900/40 text-slate-600 dark:text-slate-300 hover:bg-slate-200 flex items-center justify-center font-bold text-xs"
                                    title="+5 units"
                                  >
                                    +
                                  </button>
                                </div>
                              </td>

                              {/* Status Badge */}
                              <td className="py-3 px-3 whitespace-nowrap">
                                {isOut ? (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300">
                                    {t.statusOutOfStock}
                                  </span>
                                ) : isLow ? (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300">
                                    {t.statusLowStock} ({stock})
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
                                    {t.statusInStock} ({stock})
                                  </span>
                                )}
                              </td>

                              {/* Actions: Edit & Delete */}
                              <td className="py-3 px-4 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end space-x-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditForm(p)}
                                    className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded-lg transition-colors cursor-pointer"
                                    title={t.editProduct}
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => setProductToDelete(p)}
                                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors cursor-pointer"
                                    title={t.deleteProduct}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: STORE SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSettingsSubmit} className="space-y-6 max-w-2xl mx-auto">
              
              <div className="bg-slate-50 dark:bg-[#0c1a12] p-5 rounded-2xl border border-slate-200/80 dark:border-emerald-950 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-l-2 border-emerald-500 pl-2">
                  ডেলিভারি ও পেমেন্ট কনফিগারেশন
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.deliveryChargeSetting}
                    </label>
                    <input
                      type="number"
                      value={formSettings.deliveryFeeBn}
                      onChange={(e) => setFormSettings({ ...formSettings, deliveryFeeBn: Number(e.target.value) })}
                      className="w-full p-2.5 bg-white dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.freeThresholdSetting}
                    </label>
                    <input
                      type="number"
                      value={formSettings.freeDeliveryThresholdBn}
                      onChange={(e) => setFormSettings({ ...formSettings, freeDeliveryThresholdBn: Number(e.target.value) })}
                      className="w-full p-2.5 bg-white dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <label className="flex items-center space-x-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formSettings.enableCod}
                      onChange={(e) => setFormSettings({ ...formSettings, enableCod: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span>{t.codToggle}</span>
                  </label>

                  <label className="flex items-center space-x-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formSettings.enableMultiPlatformBadges}
                      onChange={(e) => setFormSettings({ ...formSettings, enableMultiPlatformBadges: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <span>{t.multiPlatformToggle}</span>
                  </label>
                </div>
              </div>

              {/* Promo Code Configuration */}
              <div className="bg-slate-50 dark:bg-[#0c1a12] p-5 rounded-2xl border border-slate-200/80 dark:border-emerald-950 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-l-2 border-emerald-500 pl-2">
                  প্রোমো কোড ও ক্যাম্পেইন
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.activePromoCode}
                    </label>
                    <input
                      type="text"
                      value={formSettings.promoCode}
                      onChange={(e) => setFormSettings({ ...formSettings, promoCode: e.target.value.toUpperCase() })}
                      className="w-full p-2.5 bg-white dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white font-mono uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.promoDiscountRate}
                    </label>
                    <input
                      type="number"
                      value={formSettings.promoDiscountPercent}
                      onChange={(e) => setFormSettings({ ...formSettings, promoDiscountPercent: Number(e.target.value) })}
                      className="w-full p-2.5 bg-white dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Store Contact & Address */}
              <div className="bg-slate-50 dark:bg-[#0c1a12] p-5 rounded-2xl border border-slate-200/80 dark:border-emerald-950 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-l-2 border-emerald-500 pl-2">
                  স্টোর হেল্পলাইন ও ঠিকানা
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.storeContactPhone}
                    </label>
                    <input
                      type="text"
                      value={formSettings.contactPhone}
                      onChange={(e) => setFormSettings({ ...formSettings, contactPhone: e.target.value })}
                      className="w-full p-2.5 bg-white dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.storeContactEmail}
                    </label>
                    <input
                      type="email"
                      value={formSettings.contactEmail}
                      onChange={(e) => setFormSettings({ ...formSettings, contactEmail: e.target.value })}
                      className="w-full p-2.5 bg-white dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.storeAddressSetting}
                  </label>
                  <input
                    type="text"
                    value={formSettings.address}
                    onChange={(e) => setFormSettings({ ...formSettings, address: e.target.value })}
                    className="w-full p-2.5 bg-white dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Reset to Demo Catalog Option */}
              <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-emerald-900/50 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">
                    {t.resetDemoInventory}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    পূর্বের ১২টি ডিফল্ট ফ্রেশ অর্গানিক প্রোডাক্ট ক্যাটাগরি রিস্টোর হবে।
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onResetInventory();
                    showNotification('ডিফল্ট ইনভেন্টরি সফলভাবে রিস্টোর হয়েছে!');
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-950 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>রিস্টোর</span>
                </button>
              </div>

              {/* Save Settings Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{t.saveSettings}</span>
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#0c1a12] border-t border-slate-200 dark:border-emerald-950 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>GreenBasket Live Inventory Sync Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-emerald-900/60 text-slate-700 dark:text-white rounded-xl text-xs font-semibold hover:bg-slate-300 transition-colors"
          >
            {t.close}
          </button>
        </div>

      </div>

      {/* SUB-MODAL 1: ADD / EDIT PRODUCT FORM */}
      {isProductFormOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-emerald-950 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-4">
            
            <div className="p-4 border-b border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingProduct ? t.editProduct : t.addProduct}
              </h3>
              <button
                onClick={() => setIsProductFormOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProductForm} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.productNameBn} *
                  </label>
                  <input
                    type="text"
                    required
                    value={nameBn}
                    onChange={(e) => setNameBn(e.target.value)}
                    placeholder="যেমন: তাজা বাঁধাকপি"
                    className="w-full p-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.productNameEn} *
                  </label>
                  <input
                    type="text"
                    required
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder="e.g. Fresh Cabbage"
                    className="w-full p-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.categoryLabel}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white"
                  >
                    <option value="vegetables">{t.catVegetables}</option>
                    <option value="fruits">{t.catFruits}</option>
                    <option value="herbs">{t.catHerbs}</option>
                    <option value="dairy">{t.catDairy}</option>
                    <option value="nuts">{t.catNuts}</option>
                    <option value="fish-meat">{t.catFishMeat}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.priceInBdt} *
                  </label>
                  <input
                    type="number"
                    required
                    value={priceBn}
                    onChange={(e) => setPriceBn(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.stockLabel} *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={stockCount}
                    onChange={(e) => setStockCount(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.unitLabelBn}
                  </label>
                  <input
                    type="text"
                    value={unitBn}
                    onChange={(e) => setUnitBn(e.target.value)}
                    placeholder="কেজি / পিস / আঁটি"
                    className="w-full p-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.farmOriginLabel}
                  </label>
                  <input
                    type="text"
                    value={farmOriginBn}
                    onChange={(e) => setFarmOriginBn(e.target.value)}
                    placeholder="যেমন: সাভার অর্গানিক ফার্ম"
                    className="w-full p-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Image URL & Presets */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.imageUrlLabel}
                </label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white"
                />
                
                {/* Image presets */}
                <div className="mt-2 flex items-center gap-1.5 overflow-x-auto py-1">
                  <span className="text-[10px] text-slate-400 shrink-0">স্যাম্পল ছবি:</span>
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setImage(preset.url)}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-emerald-900/40 text-[10px] text-slate-600 dark:text-slate-300 hover:bg-emerald-100 shrink-0 transition-colors"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.descriptionLabel}
                </label>
                <textarea
                  rows={2}
                  value={descriptionBn}
                  onChange={(e) => setDescriptionBn(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-[#13271c] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white resize-none"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center space-x-6 pt-1">
                <label className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={organicCertified}
                    onChange={(e) => setOrganicCertified(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>১০০% অর্গানিক সার্টিফাইড</span>
                </label>

                <label className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <span>স্টোরফ্রন্টে প্রদর্শন করুন (In Stock)</span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="pt-4 flex items-center justify-end space-x-2 border-t border-slate-100 dark:border-emerald-900/40">
                <button
                  type="button"
                  onClick={() => setIsProductFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  {editingProduct ? t.updateProduct : t.saveProduct}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* SUB-MODAL 2: CONFIRM DELETE MODAL */}
      {productToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0c1811] border border-rose-200 dark:border-rose-900/50 rounded-2xl max-w-md w-full shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.confirmDeleteTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t.confirmDeleteMsg}
              </p>
            </div>

            {/* Product Snapshot */}
            <div className="p-3 bg-slate-50 dark:bg-[#112318] rounded-xl flex items-center space-x-3 text-left">
              <img
                src={productToDelete.image}
                alt={productToDelete.nameEn}
                className="w-12 h-12 rounded-lg object-cover bg-white shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {lang === 'bn' ? productToDelete.nameBn : productToDelete.nameEn}
                </p>
                <p className="text-[11px] text-emerald-600 font-semibold">
                  ৳{productToDelete.priceBn} / {productToDelete.unitBn}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-emerald-900/50 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.deleteProduct}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

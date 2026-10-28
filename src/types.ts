export type Language = 'bn' | 'en';
export type Theme = 'light' | 'dark';

export type ProductCategory = 
  | 'vegetables' 
  | 'fruits' 
  | 'herbs' 
  | 'dairy' 
  | 'nuts' 
  | 'fish-meat';

export interface Product {
  id: string;
  nameBn: string;
  nameEn: string;
  category: ProductCategory;
  priceBn: number; // in BDT ৳
  priceEn: number; // in USD $
  unitBn: string;
  unitEn: string;
  originalPriceBn?: number;
  originalPriceEn?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  badgeBn?: string;
  inStock: boolean;
  stockCount: number;
  organicCertified: boolean;
  farmOriginBn: string;
  farmOriginEn: string;
  nutrition: {
    calories: string;
    fiber: string;
    vitamins: string;
    protein?: string;
  };
  descriptionBn: string;
  descriptionEn: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'card' | 'bank' | 'cod';

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  deliverySlot: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  date: string;
}

export type StorePlatform = 'android' | 'ios' | 'windows';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  provider: 'phone_otp' | 'google' | 'password';
  memberTier?: string;
  greenPoints?: number;
}

export interface ActiveDeviceSession {
  id: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface StoreSettings {
  storeName: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  deliveryFeeBn: number;
  deliveryFeeEn: number;
  freeDeliveryThresholdBn: number;
  freeDeliveryThresholdEn: number;
  promoCode: string;
  promoDiscountPercent: number;
  enableCod: boolean;
  enableMultiPlatformBadges: boolean;
}

export interface ConnectedAccountProvider {
  id: 'google' | 'apple' | 'microsoft' | 'github' | 'cloudflare';
  name: string;
  accountIdentifier: string;
  connected: boolean;
  lastSynced: string;
  avatarIcon?: string;
}

export interface CloudflareEdgeConfig {
  zoneName: string;
  accountId: string;
  status: 'active' | 'pending' | 'paused';
  sslMode: 'Full (Strict)' | 'Flexible' | 'Strict';
  underAttackMode: boolean;
  ddosProtection: boolean;
  cacheStatus: 'cached' | 'purged';
  edgeLocations: number;
}

export interface WpThemePackage {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  descriptionBn: string;
  previewUrl: string;
  badge: string;
  status: 'active' | 'installed' | 'available';
  accentColor: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  paymentMethod: string;
  transactionId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}


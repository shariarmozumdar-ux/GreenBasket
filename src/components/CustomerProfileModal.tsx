import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Package, 
  ChevronRight, 
  CheckCircle2,
  Edit2,
  Laptop,
  Smartphone,
  Tablet,
  RefreshCw,
  LogOut,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { Language, OrderDetails, AuthUser, ActiveDeviceSession } from '../types';
import { translations } from '../data/translations';

interface CustomerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  currentUser: AuthUser | null;
  onSignOut: () => void;
  onOpenAuth: (mode?: 'phone_otp' | 'google' | 'password' | 'reset_password_otp') => void;
  pastOrders: OrderDetails[];
  onOpenConnectedAccounts?: () => void;
  onOpenInvoice?: () => void;
}

export const CustomerProfileModal: React.FC<CustomerProfileModalProps> = ({
  isOpen,
  onClose,
  lang,
  currentUser,
  onSignOut,
  onOpenAuth,
  pastOrders,
  onOpenConnectedAccounts,
  onOpenInvoice,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || (lang === 'bn' ? 'শাহরিয়ার মজুমদার' : 'Shahriar Mozumdar'));
  const [email, setEmail] = useState(currentUser?.email || 'shariarmozumdar@gmail.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+880 1712-345678');
  const [address, setAddress] = useState(lang === 'bn' ? 'বাড়ি #২৪, রোড #১২, সেক্টর #১০, উত্তরা, ঢাকা' : 'House #24, Road #12, Sector #10, Uttara, Dhaka');
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  // All Device Sessions State
  const [deviceSessions, setDeviceSessions] = useState<ActiveDeviceSession[]>([
    {
      id: 'dev-1',
      deviceName: 'Windows 11 PC (Chrome 130)',
      deviceType: 'desktop',
      browser: 'Chrome 130.0',
      location: 'Dhaka, Bangladesh',
      lastActive: lang === 'bn' ? 'বর্তমান ডিভাইস (এখন সক্রিয়)' : 'Current Device (Active Now)',
      isCurrent: true,
    },
    {
      id: 'dev-2',
      deviceName: 'Samsung Galaxy S24 Ultra (App)',
      deviceType: 'mobile',
      browser: 'GreenBasket Android App v2.4',
      location: 'Dhaka, Bangladesh',
      lastActive: lang === 'bn' ? '১০ মিনিট পূর্বে সিঙ্কড' : 'Synced 10m ago',
      isCurrent: false,
    },
    {
      id: 'dev-3',
      deviceName: 'Apple iPhone 15 Pro (Safari)',
      deviceType: 'mobile',
      browser: 'Mobile Safari 18.1',
      location: 'Dhaka, Bangladesh',
      lastActive: lang === 'bn' ? '২ ঘণ্টা পূর্বে সিঙ্কড' : 'Synced 2h ago',
      isCurrent: false,
    },
  ]);

  const [syncStatusMsg, setSyncStatusMsg] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const t = translations[lang];

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleForceSyncDevices = () => {
    setIsSyncing(true);
    setSyncStatusMsg(lang === 'bn' ? 'সকল ডিভাইসের সাথে ডেটা সিঙ্ক হচ্ছে...' : 'Syncing state across all active devices...');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatusMsg(lang === 'bn' ? 'সকল ডিভাইস সফলভাবে সিঙ্ক সম্পন্ন হয়েছে!' : 'All connected devices successfully synchronized!');
      setTimeout(() => setSyncStatusMsg(''), 3000);
    }, 800);
  };

  const handleLogoutOtherDevices = () => {
    setDeviceSessions((prev) => prev.filter((d) => d.isCurrent));
    setSyncStatusMsg(lang === 'bn' ? 'অন্যান্য সকল ডিভাইস থেকে সফলভাবে সাইন আউট করা হয়েছে।' : 'Signed out from all other devices successfully.');
    setTimeout(() => setSyncStatusMsg(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-emerald-950 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
        role="dialog"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              SM
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.customerProfile}
              </h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {lang === 'bn' ? 'গোল্ড মেম্বার • গ্রিন পয়েন্ট: ৪২০' : 'Gold Member • 420 Green Points'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-emerald-900/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[72vh] overflow-y-auto">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{lang === 'bn' ? 'প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!' : 'Profile updated successfully!'}</span>
            </div>
          )}

          {syncStatusMsg && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <RefreshCw className={`w-4 h-4 text-blue-600 shrink-0 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{syncStatusMsg}</span>
            </div>
          )}

          {/* Loyalty Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-green-900 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-700/60 flex items-center justify-center text-lime-300">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-emerald-200">
                  {lang === 'bn' ? 'আপনার অর্জিত গ্রিন পয়েন্ট' : 'Accumulated Green Points'}
                </p>
                <p className="text-lg font-extrabold text-lime-300 leading-none mt-0.5">
                  420 PTS (৳210 / $2.00)
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              10% Cashback
            </span>
          </div>

          {/* User Information */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {lang === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Details'}
              </h4>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Edit2 className="w-3 h-3" />
                <span>{isEditing ? t.cancel : (lang === 'bn' ? 'সম্পাদনা' : 'Edit')}</span>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">{t.fullName}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">{t.phoneLabel}</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">{t.addressLabel}</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Changes'}
                </button>
              </form>
            ) : (
              <div className="bg-slate-50 dark:bg-[#112318] p-4 rounded-2xl space-y-2.5 text-xs">
                <div className="flex items-center text-slate-700 dark:text-slate-200">
                  <User className="w-4 h-4 text-emerald-600 mr-2.5 shrink-0" />
                  <span className="font-semibold">{name}</span>
                </div>
                <div className="flex items-center text-slate-700 dark:text-slate-200">
                  <Mail className="w-4 h-4 text-emerald-600 mr-2.5 shrink-0" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center text-slate-700 dark:text-slate-200">
                  <Phone className="w-4 h-4 text-emerald-600 mr-2.5 shrink-0" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-start text-slate-700 dark:text-slate-200">
                  <MapPin className="w-4 h-4 text-emerald-600 mr-2.5 shrink-0 mt-0.5" />
                  <span>{address}</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick OTP Password Reset Button in Profile Security */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-amber-950 dark:text-amber-300 flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.resetPasswordTitle}</span>
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {lang === 'bn' ? 'ওটিপি কোড দিয়ে তাৎক্ষণিক পাসওয়ার্ড পরিবর্তন করুন' : 'Reset or change password with OTP verification'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuth('reset_password_otp');
              }}
              className="py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
            >
              {lang === 'bn' ? 'ওটিপি রিসেট' : 'OTP Reset'}
            </button>
          </div>

          {/* ALL DEVICE SUPPORT & SESSIONS (USER REQUESTED FEATURE) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-emerald-600" />
                <span>{t.activeDevicesTitle}</span>
              </h4>
              <button
                type="button"
                onClick={handleForceSyncDevices}
                disabled={isSyncing}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{t.syncAllDevices}</span>
              </button>
            </div>

            <div className="space-y-2">
              {deviceSessions.map((device) => (
                <div
                  key={device.id}
                  className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                    device.isCurrent
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                      : 'bg-slate-50 dark:bg-[#112318] border-slate-100 dark:border-emerald-900/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      device.isCurrent
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 dark:bg-emerald-900/60 text-slate-600 dark:text-emerald-300'
                    }`}>
                      {device.deviceType === 'desktop' ? (
                        <Laptop className="w-4 h-4" />
                      ) : (
                        <Smartphone className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{device.deviceName}</span>
                        {device.isCurrent && (
                          <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                            Active
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {device.lastActive} • {device.location}
                      </p>
                    </div>
                  </div>

                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              ))}
            </div>

            {deviceSessions.length > 1 && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleLogoutOtherDevices}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.logoutOtherDevices}</span>
                </button>
              </div>
            )}
          </div>

          {/* Connected Accounts & Cloudflare Edge Section */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#112318] border border-slate-200/80 dark:border-emerald-900/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'bn' ? 'কানেক্টেড অ্যাকাউন্টস ও ক্লাউডফ্লেয়ার' : 'Connected SSO & Cloudflare Link'}</span>
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Google, Apple, Microsoft, GitHub • Zone: greenbasket.com.bd
                </p>
              </div>
              {onOpenConnectedAccounts && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenConnectedAccounts();
                  }}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  {lang === 'bn' ? 'ম্যানেজ করুন' : 'Manage'}
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-medium">Google ✓</span>
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-medium">Apple ID ✓</span>
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-medium">Microsoft 365 ✓</span>
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-medium">GitHub ✓</span>
              <span className="bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-bold">Cloudflare SSL ✓</span>
            </div>
          </div>

          {/* Quick Invoice & Print Memo Button */}
          {onOpenInvoice && (
            <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  🖨️
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {lang === 'bn' ? 'ক্যাশ মেমো ও চালান প্রিন্টার' : 'Cash Memo & Printable Invoice'}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {lang === 'bn' ? 'অফিসিয়াল রসিদ ভিউ, প্রিন্ট ও ডাউনলোড' : 'Official electronic tax receipt viewer'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenInvoice();
                }}
                className="px-3 py-1 bg-slate-900 dark:bg-emerald-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {lang === 'bn' ? 'ভিউ ও প্রিন্ট' : 'View & Print'}
              </button>
            </div>
          )}

          {/* Recent Orders */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {lang === 'bn' ? 'সাম্প্রতিক অর্ডারসমূহ' : 'Recent Farm Orders'}
            </h4>

            {pastOrders.length === 0 ? (
              <div className="p-4 bg-slate-50 dark:bg-[#112318] rounded-2xl text-center text-xs text-slate-500">
                {lang === 'bn' ? 'আপনার কোনো পূর্ববর্তী অর্ডার রেকর্ড পাওয়া যায়নি।' : 'No previous orders yet. Start your fresh journey today!'}
              </div>
            ) : (
              <div className="space-y-2">
                {pastOrders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="p-3 bg-slate-50 dark:bg-[#112318] border border-slate-100 dark:border-emerald-900/30 rounded-2xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{ord.orderId}</span>
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded font-medium">
                          Delivered
                        </span>
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {ord.items.length} {t.itemsCount} • {ord.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                        {t.currencySymbol}{ord.total.toFixed(lang === 'bn' ? 0 : 2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-[#112318] border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
          {currentUser ? (
            <button
              type="button"
              onClick={() => {
                onSignOut();
                onClose();
              }}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.logout}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuth('phone_otp');
              }}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              {t.loginRegister}
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-emerald-900 text-slate-700 dark:text-white rounded-xl text-xs font-semibold hover:bg-slate-300 transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

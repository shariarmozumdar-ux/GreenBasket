import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  Mail, 
  Lock, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  KeyRound, 
  RefreshCw, 
  ShieldCheck, 
  Globe, 
  Check, 
  AlertCircle,
  Eye,
  EyeOff,
  RotateCcw,
  Laptop
} from 'lucide-react';
import { AuthUser, Language } from '../types';
import { translations } from '../data/translations';

export type AuthModalMethod = 'phone_otp' | 'google' | 'password' | 'reset_password_otp';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLoginSuccess: (user: AuthUser) => void;
  initialMode?: AuthModalMethod;
}

export const GoogleLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  lang,
  onLoginSuccess,
  initialMode = 'phone_otp',
}) => {
  const [authMethod, setAuthMethod] = useState<AuthModalMethod>(initialMode);
  
  // Update auth method when initialMode changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setAuthMethod(initialMode);
      setAuthSuccess(false);
      setOtpError('');
      setResetError('');
    }
  }, [isOpen, initialMode]);

  // Phone OTP States
  const [phoneNumber, setPhoneNumber] = useState('01712345678');
  const [otpStep, setOtpStep] = useState<'input_phone' | 'input_otp'>('input_phone');
  const [otpCode, setOtpCode] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [otpError, setOtpError] = useState('');

  // Password / Register States
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [fullName, setFullName] = useState('শাহরিয়ার মজুমদার');
  const [emailInput, setEmailInput] = useState('shariarmozumdar@gmail.com');
  const [passwordInput, setPasswordInput] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // OTP Password Reset (Forget Password) States
  const [resetStage, setResetStage] = useState<'contact' | 'otp' | 'new_password' | 'success'>('contact');
  const [resetContact, setResetContact] = useState('shariarmozumdar@gmail.com');
  const [resetOtpCode, setResetOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetResendTimer, setResetResendTimer] = useState(30);
  const [resetError, setResetError] = useState('');

  // General Loading & Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const t = translations[lang];

  // OTP Countdown timer for phone login
  useEffect(() => {
    let interval: any;
    if (otpStep === 'input_otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpStep, resendTimer]);

  // OTP Countdown timer for password reset
  useEffect(() => {
    let interval: any;
    if (resetStage === 'otp' && resetResendTimer > 0) {
      interval = setInterval(() => {
        setResetResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resetStage, resetResendTimer]);

  if (!isOpen) return null;

  // Phone OTP: Step 1 Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 8) {
      setOtpError(lang === 'bn' ? 'সঠিক মোবাইল নম্বর প্রদান করুন' : 'Please provide a valid phone number');
      return;
    }
    setOtpError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setOtpStep('input_otp');
      setResendTimer(30);
    }, 600);
  };

  // Phone OTP: Step 2 Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setOtpError(lang === 'bn' ? 'অনুগ্রহ করে সঠিক ওটিপি লিখুন' : 'Please enter the 6-digit OTP code');
      return;
    }
    setOtpError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setAuthSuccess(true);
      
      const user: AuthUser = {
        id: `user-${Date.now()}`,
        name: lang === 'bn' ? 'শাহরিয়ার মজুমদার' : 'Shahriar Mozumdar',
        email: 'shariarmozumdar@gmail.com',
        phone: phoneNumber.startsWith('+88') ? phoneNumber : `+880 ${phoneNumber}`,
        provider: 'phone_otp',
        memberTier: 'Gold Member',
        greenPoints: 420
      };

      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 700);
    }, 600);
  };

  // Google 1-Click Sign-in
  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setAuthSuccess(true);

      const user: AuthUser = {
        id: `user-google-10928`,
        name: lang === 'bn' ? 'শাহরিয়ার মজুমদার (Google)' : 'Shahriar Mozumdar',
        email: 'shariarmozumdar@gmail.com',
        phone: '+880 1712-345678',
        provider: 'google',
        memberTier: 'Gold Member',
        greenPoints: 420
      };

      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 700);
    }, 700);
  };

  // Password Sign-in / Register
  const handlePasswordAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setAuthSuccess(true);

      const user: AuthUser = {
        id: `user-pwd-${Date.now()}`,
        name: fullName || (lang === 'bn' ? 'শাহরিয়ার মজুমদার' : 'Shahriar Mozumdar'),
        email: emailInput || 'shariarmozumdar@gmail.com',
        phone: '+880 1712-345678',
        provider: 'password',
        memberTier: 'Verified Member',
        greenPoints: 150
      };

      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 700);
    }, 600);
  };

  // FORGOT PASSWORD WITH OTP FLOW
  // Reset Stage 1: Send Reset OTP
  const handleSendResetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetContact || resetContact.trim().length < 5) {
      setResetError(lang === 'bn' ? 'অনুগ্রহ করে বৈধ ইমেইল বা ফোন নম্বর লিখুন' : 'Please provide a valid email or phone');
      return;
    }
    setResetError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setResetStage('otp');
      setResetResendTimer(30);
    }, 600);
  };

  // Reset Stage 2: Verify Reset OTP
  const handleVerifyResetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetOtpCode || resetOtpCode.length < 4) {
      setResetError(lang === 'bn' ? 'সঠিক ৬-সংখ্যার ওটিপি লিখুন' : 'Please enter the 6-digit OTP code');
      return;
    }
    setResetError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setResetStage('new_password');
    }, 600);
  };

  // Reset Stage 3: Set New Password
  const handleSetNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setResetError(lang === 'bn' ? 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে' : 'Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError(t.passwordMismatch);
      return;
    }

    setResetError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setResetStage('success');

      // Auto sign-in with newly reset credentials
      const user: AuthUser = {
        id: `user-pwd-reset-${Date.now()}`,
        name: lang === 'bn' ? 'শাহরিয়ার মজুমদার' : 'Shahriar Mozumdar',
        email: resetContact.includes('@') ? resetContact : 'shariarmozumdar@gmail.com',
        phone: !resetContact.includes('@') ? resetContact : '+880 1712-345678',
        provider: 'password',
        memberTier: 'Gold Member',
        greenPoints: 420
      };

      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 1200);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-emerald-950 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {authMethod === 'reset_password_otp' ? t.resetPasswordTitle : t.signInTitle}
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-emerald-400/80 mt-0.5">
              {authMethod === 'reset_password_otp' ? t.resetPasswordDesc : t.authSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-emerald-900/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Method Selector Tabs - 4 Responsive Navigation Pills */}
        <div className="px-4 sm:px-5 pt-3">
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-[#15251c] rounded-xl text-[11px] font-semibold">
            
            {/* Tab 1: Phone OTP */}
            <button
              onClick={() => {
                setAuthMethod('phone_otp');
                setOtpError('');
              }}
              className={`py-2 px-1 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer ${
                authMethod === 'phone_otp'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{lang === 'bn' ? 'ওটিপি' : 'OTP'}</span>
            </button>

            {/* Tab 2: Google */}
            <button
              onClick={() => {
                setAuthMethod('google');
                setOtpError('');
              }}
              className={`py-2 px-1 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer ${
                authMethod === 'google'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GoogleLogoIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Google</span>
            </button>

            {/* Tab 3: Password */}
            <button
              onClick={() => {
                setAuthMethod('password');
                setOtpError('');
              }}
              className={`py-2 px-1 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer ${
                authMethod === 'password'
                  ? 'bg-white dark:bg-emerald-800 text-emerald-800 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}</span>
            </button>

            {/* Tab 4: Reset OTP (User Requested Feature) */}
            <button
              onClick={() => {
                setAuthMethod('reset_password_otp');
                setResetError('');
              }}
              className={`py-2 px-1 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-1 transition-all cursor-pointer ${
                authMethod === 'reset_password_otp'
                  ? 'bg-amber-500 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{lang === 'bn' ? 'রিসেট' : 'Reset'}</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* General Success Overlay Notification */}
          {authSuccess && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 rounded-2xl text-xs flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-semibold">{t.signInSuccess}</span>
            </div>
          )}

          {/* METHOD 1: MOBILE PHONE + OTP */}
          {authMethod === 'phone_otp' && (
            <div>
              {otpStep === 'input_phone' ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t.mobileNumber}
                    </label>
                    <div className="relative flex rounded-xl border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-[#122418] overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500">
                      <div className="px-3 py-2.5 bg-slate-100 dark:bg-[#152a1d] text-slate-700 dark:text-slate-300 text-xs font-bold border-r border-slate-200 dark:border-emerald-900/50 flex items-center gap-1">
                        <span>🇧🇩</span>
                        <span>+880</span>
                      </div>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="1712345678"
                        className="w-full px-3 py-2.5 bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none font-mono"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {lang === 'bn' ? 'আমরা আপনার নম্বরে ৬-সংখ্যার গোপন কোড পাঠাব' : 'We will send a 6-digit OTP code to this mobile'}
                    </p>
                  </div>

                  {otpError && (
                    <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{otpError}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>কোড পাঠানো হচ্ছে...</span>
                    ) : (
                      <>
                        <span>{t.sendOtp}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 text-xs">
                    <p className="text-slate-600 dark:text-slate-300">
                      {t.otpSentTo}
                    </p>
                    <p className="font-bold text-emerald-700 dark:text-emerald-400 font-mono mt-0.5">
                      +880 {phoneNumber}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t.enterOtp}
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      autoFocus
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="582417"
                      className="w-full p-3 bg-slate-50 dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-center text-lg tracking-widest font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    {/* Auto-fill demo pill */}
                    <div className="mt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setOtpCode('582417')}
                        className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>{t.autoFillDemoOtp}</span>
                      </button>

                      <span className="text-[11px] text-slate-500">
                        {resendTimer > 0 ? (
                          `০:${resendTimer < 10 ? `0${resendTimer}` : resendTimer}s`
                        ) : (
                          <button
                            type="button"
                            onClick={() => setResendTimer(30)}
                            className="text-emerald-600 font-bold hover:underline"
                          >
                            {t.resendOtp}
                          </button>
                        )}
                      </span>
                    </div>
                  </div>

                  {otpError && (
                    <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{otpError}</span>
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setOtpStep('input_phone')}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-900/50 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                    >
                      {lang === 'bn' ? 'নম্বর পরিবর্তন' : 'Change No.'}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>যাচাই হচ্ছে...</span>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{t.verifyOtp}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* METHOD 2: GOOGLE 1-CLICK AUTH */}
          {authMethod === 'google' && (
            <div className="space-y-4 py-2 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#112318] border border-slate-200/80 dark:border-emerald-900/50 text-left space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow-xs border flex items-center justify-center p-2 shrink-0">
                    <GoogleLogoIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Google Account Fast Sign-In
                    </p>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                      shariarmozumdar@gmail.com
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'bn' 
                    ? 'আপনার গুগল অ্যাকাউন্টের মাধ্যমে তাৎক্ষণিকভাবে কোনো পাসওয়ার্ড ছাড়াই নিরাপদ লগইন করুন। এটি আপনার সকল ডিভাইস (মোবাইল, ট্যাবলেট, পিসি)-তে স্বয়ংক্রিয়ভাবে সিঙ্ক হবে।' 
                    : 'Secure 1-click authentication using your verified Google profile credentials with multi-device cross-platform synchronization.'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl border border-slate-300 dark:border-emerald-800 bg-white dark:bg-[#13281c] hover:bg-slate-50 dark:hover:bg-emerald-900/40 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center gap-2.5 shadow-xs transition-all active:scale-98 cursor-pointer disabled:opacity-60"
              >
                <GoogleLogoIcon className="w-4 h-4" />
                <span>
                  {isSubmitting ? (lang === 'bn' ? 'গুগল ভেরিফিকেশন হচ্ছে...' : 'Verifying Google Account...') : t.loginWithGoogle}
                </span>
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMethod('reset_password_otp')}
                  className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold"
                >
                  {lang === 'bn' ? 'পাসওয়ার্ড অ্যাকাউন্ট রিসেট করতে চান? এখানে চাপুন' : 'Need to reset account password with OTP?'}
                </button>
              </div>
            </div>
          )}

          {/* METHOD 3: EMAIL & PASSWORD / REGISTER */}
          {authMethod === 'password' && (
            <form onSubmit={handlePasswordAuth} className="space-y-3">
              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.fullName}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="শাহরিয়ার মজুমদার"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.emailOrPhoneLabel}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="shariarmozumdar@gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.passwordLabel}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2 bg-slate-50 dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 text-emerald-600 rounded"
                  />
                  <span>{t.rememberMe}</span>
                </label>
                
                {/* FORGOT PASSWORD BUTTON -> SWITCHES TO OTP RESET MODE */}
                {!isRegisterMode && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setAuthMethod('reset_password_otp');
                      setResetStage('contact');
                      setResetContact(emailInput || 'shariarmozumdar@gmail.com');
                      setResetError('');
                    }}
                    className="text-amber-600 dark:text-amber-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{t.forgotPassword}</span>
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>প্রসেস হচ্ছে...</span>
                ) : (
                  <span>{isRegisterMode ? t.createAccount : (lang === 'bn' ? 'সাইন ইন করুন' : 'Sign In')}</span>
                )}
              </button>

              <div className="text-center pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                >
                  {isRegisterMode ? t.alreadyHaveAccount : t.dontHaveAccount} {isRegisterMode ? (lang === 'bn' ? 'লগইন করুন' : 'Sign In') : t.createAccount}
                </button>
              </div>
            </form>
          )}

          {/* METHOD 4: PASSWORD RESET WITH OTP (USER REQUESTED DEDICATED FEATURE) */}
          {authMethod === 'reset_password_otp' && (
            <div className="space-y-4">
              
              {/* Reset Stage 1: Enter email or phone */}
              {resetStage === 'contact' && (
                <form onSubmit={handleSendResetOtp} className="space-y-3">
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/70 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                    <RotateCcw className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p>
                      {lang === 'bn'
                        ? 'আপনার অ্যাকাউন্টের সাথে যুক্ত মোবাইল নম্বর বা ইমেইল ঠিকানা লিখুন। আমরা ৬-সংখ্যার রিসেট কোড পাঠাব।'
                        : 'Enter your registered email address or mobile number to receive a 6-digit OTP reset code.'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.emailOrPhoneLabel}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={resetContact}
                        onChange={(e) => setResetContact(e.target.value)}
                        placeholder="shariarmozumdar@gmail.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                      />
                    </div>
                  </div>

                  {resetError && (
                    <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{resetError}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>রিসেট ওটিপি পাঠানো হচ্ছে...</span>
                    ) : (
                      <>
                        <span>{t.sendOtp}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={() => setAuthMethod('password')}
                      className="text-xs text-slate-500 hover:text-emerald-600 underline font-medium"
                    >
                      {t.backToLogin}
                    </button>
                  </div>
                </form>
              )}

              {/* Reset Stage 2: Enter OTP Code */}
              {resetStage === 'otp' && (
                <form onSubmit={handleVerifyResetOtp} className="space-y-3">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 text-xs">
                    <p className="text-slate-600 dark:text-slate-300">
                      {t.resetOtpSent}
                    </p>
                    <p className="font-bold text-emerald-700 dark:text-emerald-400 font-mono mt-0.5">
                      {resetContact}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t.enterResetOtp}
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      autoFocus
                      required
                      value={resetOtpCode}
                      onChange={(e) => setResetOtpCode(e.target.value)}
                      placeholder="894215"
                      className="w-full p-3 bg-slate-50 dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-center text-lg tracking-widest font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />

                    {/* Auto-fill demo pill for reset OTP */}
                    <div className="mt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setResetOtpCode('894215')}
                        className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <span>{t.autoFillResetOtp}</span>
                      </button>

                      <span className="text-[11px] text-slate-500">
                        {resetResendTimer > 0 ? (
                          `০:${resetResendTimer < 10 ? `0${resetResendTimer}` : resetResendTimer}s`
                        ) : (
                          <button
                            type="button"
                            onClick={() => setResetResendTimer(30)}
                            className="text-amber-600 font-bold hover:underline"
                          >
                            {t.resendOtp}
                          </button>
                        )}
                      </span>
                    </div>
                  </div>

                  {resetError && (
                    <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{resetError}</span>
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setResetStage('contact')}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-900/50 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                    >
                      {lang === 'bn' ? 'পরিবর্তন' : 'Back'}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? <span>যাচাই হচ্ছে...</span> : <span>{lang === 'bn' ? 'কোড যাচাই করুন' : 'Verify Code'}</span>}
                    </button>
                  </div>
                </form>
              )}

              {/* Reset Stage 3: Set New Password */}
              {resetStage === 'new_password' && (
                <form onSubmit={handleSetNewPassword} className="space-y-3">
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{lang === 'bn' ? 'ওটিপি যাচাই সফল! এবার নতুন পাসওয়ার্ড দিন।' : 'OTP verified! Now choose a new secure password.'}</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.newPasswordLabel}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.confirmNewPasswordLabel}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-[#122418] border border-slate-200 dark:border-emerald-900/50 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {resetError && (
                    <p className="text-xs text-rose-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{resetError}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>পাসওয়ার্ড আপডেট হচ্ছে...</span>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{lang === 'bn' ? 'পাসওয়ার্ড পরিবর্তন ও লগইন' : 'Reset Password & Sign In'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Reset Stage 4: Success confirmation */}
              {resetStage === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-white">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                    {lang === 'bn' ? 'পাসওয়ার্ড সফলভাবে রিসেট সম্পন্ন!' : 'Password Reset Successful!'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {t.passwordResetSuccess}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Cross-Platform All-Device Ecosystem Sync Note (Prompt Dedicated Feature) */}
          <div className="pt-2 border-t border-slate-100 dark:border-emerald-900/40">
            <div className="p-3 bg-slate-50 dark:bg-[#112318] rounded-xl flex items-center space-x-2.5 text-[11px] text-slate-600 dark:text-slate-300">
              <Laptop className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.universalSyncNote}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

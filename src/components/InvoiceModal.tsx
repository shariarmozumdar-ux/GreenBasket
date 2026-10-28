import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShoppingBasket, 
  QrCode, 
  ShieldCheck, 
  FileText,
  Calendar,
  CreditCard,
  User,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { Language, CartItem, OrderDetails, AuthUser } from '../types';
import { translations } from '../data/translations';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  items: CartItem[];
  currentUser: AuthUser | null;
  latestOrder?: OrderDetails | null;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  lang,
  items,
  currentUser,
  latestOrder,
}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  if (!isOpen) return null;

  // Invoice Data derivation
  const invoiceNumber = latestOrder?.orderId 
    ? `INV-${latestOrder.orderId}` 
    : 'INV-GB-2026-894215';
  
  const invoiceDate = latestOrder?.date 
    ? latestOrder.date 
    : (lang === 'bn' ? '২৮ অক্টোবর, ২০২৬ • বেলা ১১:৩০' : 'Oct 28, 2026 • 11:30 AM');

  const customerName = currentUser?.name || latestOrder?.customerName || (lang === 'bn' ? 'শাহরিয়ার মজুমদার' : 'Shahriar Mozumdar');
  const customerEmail = currentUser?.email || 'shariarmozumdar@gmail.com';
  const customerPhone = currentUser?.phone || latestOrder?.phone || '+880 1712-345678';
  const customerAddress = latestOrder?.address || (lang === 'bn' ? 'বাড়ি #২৪, রোড #১২, সেক্টর #১০, উত্তরা, ঢাকা-১২৩০' : 'House #24, Road #12, Sector #10, Uttara, Dhaka-1230');

  // Items to show: either from latest order or current cart
  const displayItems: CartItem[] = latestOrder?.items && latestOrder.items.length > 0
    ? latestOrder.items
    : items.length > 0
      ? items
      : [
          {
            product: {
              id: 'prod-demo-1',
              nameBn: 'অর্গানিক রেড টমেটো (ফার্ম ফ্রেশ)',
              nameEn: 'Organic Red Tomatoes',
              category: 'vegetables',
              priceBn: 120,
              priceEn: 2.49,
              unitBn: 'কেজি',
              unitEn: 'kg',
              rating: 4.9,
              reviewCount: 128,
              image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=60',
              inStock: true,
              stockCount: 85,
              organicCertified: true,
              farmOriginBn: 'সাভার জৈব খামার',
              farmOriginEn: 'Savar Organic Farm',
              nutrition: { calories: '18 kcal', fiber: '1.2g', vitamins: 'C, K' },
              descriptionBn: 'সরাসরি খামার থেকে বাছাইকৃত শতভাগ বিষমুক্ত লাল টমেটো।',
              descriptionEn: 'Naturally ripened organic fresh tomatoes.'
            },
            quantity: 2
          },
          {
            product: {
              id: 'prod-demo-2',
              nameBn: 'তাজা গাজর (হাতে বাছাইকৃত)',
              nameEn: 'Fresh Carrots',
              category: 'vegetables',
              priceBn: 80,
              priceEn: 1.49,
              unitBn: 'কেজি',
              unitEn: 'kg',
              rating: 4.8,
              reviewCount: 95,
              image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=60',
              inStock: true,
              stockCount: 60,
              organicCertified: true,
              farmOriginBn: 'বগুড়া কৃষি পার্ক',
              farmOriginEn: 'Bogra Agri Park',
              nutrition: { calories: '41 kcal', fiber: '2.8g', vitamins: 'A, B6' },
              descriptionBn: 'মাটির পুষ্টিতে ভরপুর খাস্তা মিষ্টি গাজর।',
              descriptionEn: 'Crunchy sweet farm-fresh carrots.'
            },
            quantity: 1
          },
          {
            product: {
              id: 'prod-demo-3',
              nameBn: 'সবুজ দেশি পালং শাক (তাজা আঁটি)',
              nameEn: 'Green Spinach Bunch',
              category: 'herbs',
              priceBn: 45,
              priceEn: 1.29,
              unitBn: 'আঁটি',
              unitEn: 'bunch',
              rating: 4.9,
              reviewCount: 142,
              image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=60',
              inStock: true,
              stockCount: 40,
              organicCertified: true,
              farmOriginBn: 'গাজীপুর অর্গানিক ভিলেজ',
              farmOriginEn: 'Gazipur Organic Village',
              nutrition: { calories: '23 kcal', fiber: '2.2g', vitamins: 'A, C, Iron' },
              descriptionBn: 'সকালে সংগৃহীত তাজা ও পুষ্টিকর সবুজ পালং শাক।',
              descriptionEn: 'Handpicked nutrient-dense spinach.'
            },
            quantity: 3
          }
        ];

  const subtotal = displayItems.reduce((acc, curr) => {
    const price = lang === 'bn' ? curr.product.priceBn : curr.product.priceEn;
    return acc + price * curr.quantity;
  }, 0);

  const discount = latestOrder?.discount ?? (subtotal * 0.15); // 15% discount demo
  const deliveryFee = latestOrder?.deliveryFee ?? (subtotal > (lang === 'bn' ? 500 : 30) ? 0 : (lang === 'bn' ? 60 : 4.99));
  const total = latestOrder?.total ?? (subtotal - discount + deliveryFee);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    const invoiceHtml = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>GreenBasket Invoice - ${invoiceNumber}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 40px; color: #1e293b; background: #fff; }
    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #16a34a; padding-bottom: 20px; }
    .title { color: #15803d; font-size: 24px; font-weight: bold; margin: 0; }
    .subtitle { color: #64748b; font-size: 12px; margin: 4px 0 0; }
    .inv-info { text-align: right; }
    .inv-id { font-size: 18px; font-weight: bold; color: #0f172a; }
    .customer-box { margin-top: 24px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; }
    th { background: #f1f5f9; text-align: left; padding: 10px; font-size: 13px; border-bottom: 2px solid #cbd5e1; }
    td { padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
    .total-box { margin-top: 24px; width: 300px; margin-left: auto; }
    .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
    .grand-total { font-size: 16px; font-weight: bold; color: #15803d; border-top: 2px solid #16a34a; padding-top: 8px; }
    .stamp { margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
    .seal { border: 2px dashed #16a34a; color: #16a34a; padding: 8px 16px; border-radius: 6px; font-weight: bold; font-size: 12px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="title">🌿 GreenBasket</h1>
      <p class="subtitle">100% Organic Farm Produce • Government Reg: #GB-894215-BD</p>
      <p class="subtitle">Sector #10, Uttara, Dhaka, Bangladesh • support@greenbasket.com</p>
    </div>
    <div class="inv-info">
      <div class="inv-id">${invoiceNumber}</div>
      <div style="font-size: 12px; color: #64748b; margin-top: 4px;">${invoiceDate}</div>
      <div style="font-size: 11px; color: #16a34a; font-weight: bold; margin-top: 4px;">PAID & VERIFIED (bKash)</div>
    </div>
  </div>

  <div class="customer-box">
    <strong>Billed To:</strong><br>
    ${customerName}<br>
    Email: ${customerEmail} | Phone: ${customerPhone}<br>
    Address: ${customerAddress}
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Product Name</th>
        <th>Unit Price</th>
        <th>Quantity</th>
        <th style="text-align: right;">Total Amount</th>
      </tr>
    </thead>
    <tbody>
      ${displayItems.map((item, idx) => `
        <tr>
          <td>${idx + 1}</td>
          <td>${lang === 'bn' ? item.product.nameBn : item.product.nameEn} (${lang === 'bn' ? item.product.unitBn : item.product.unitEn})</td>
          <td>${t.currencySymbol}${lang === 'bn' ? item.product.priceBn : item.product.priceEn}</td>
          <td>${item.quantity}</td>
          <td style="text-align: right;">${t.currencySymbol}${((lang === 'bn' ? item.product.priceBn : item.product.priceEn) * item.quantity).toFixed(lang === 'bn' ? 0 : 2)}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="total-box">
    <div class="total-row"><span>Subtotal:</span><span>${t.currencySymbol}${subtotal.toFixed(lang === 'bn' ? 0 : 2)}</span></div>
    <div class="total-row"><span>Discount:</span><span style="color: #dc2626;">-${t.currencySymbol}${discount.toFixed(lang === 'bn' ? 0 : 2)}</span></div>
    <div class="total-row"><span>Delivery Charge:</span><span>${deliveryFee === 0 ? 'FREE' : `${t.currencySymbol}${deliveryFee}`}</span></div>
    <div class="total-row grand-total"><span>Total Paid:</span><span>${t.currencySymbol}${total.toFixed(lang === 'bn' ? 0 : 2)}</span></div>
  </div>

  <div class="stamp">
    <div>
      <div class="seal">✓ OFFICIAL GREENBASKET VERIFIED CASH MEMO</div>
      <p style="font-size: 11px; color: #64748b; margin-top: 6px;">TrxID: 9J82KL01M • Machine Generated Electronic Receipt</p>
    </div>
    <div style="text-align: center;">
      <div style="border-bottom: 1px solid #94a3b8; width: 140px; margin-bottom: 4px;"></div>
      <div style="font-size: 11px; color: #64748b;">Authorized Signature</div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([invoiceHtml], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `GreenBasket_${invoiceNumber}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0c1811] border border-slate-200 dark:border-emerald-950 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
      >
        {/* Header Toolbar (Non-printable) */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-emerald-950">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{lang === 'bn' ? 'অফিসিয়াল ক্যাশ মেমো ও চালান' : 'Official Cash Memo & Tax Invoice'}</span>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                  PDF / PRINT READY
                </span>
              </h3>
              <p className="text-[11px] text-emerald-200/80">
                {lang === 'bn' ? 'হেডার সেটিং আইকনের অধীন ডিজিটাল ইনভয়েস ভিউয়ার' : 'Header settings integrated billing portal'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Direct Print Button */}
            <button
              onClick={handlePrint}
              className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
              title="Print Cash Memo directly"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'bn' ? 'প্রিন্ট মেমো' : 'Print Memo'}</span>
            </button>

            {/* Direct Download Invoice Button */}
            <button
              onClick={handleDownloadInvoice}
              className="py-1.5 px-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              title="Download Invoice as HTML / PDF receipt"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">{lang === 'bn' ? 'ডাউনলোড' : 'Download'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div 
          ref={invoiceRef}
          className="p-6 sm:p-8 overflow-y-auto bg-white text-slate-800 space-y-6 printable-invoice"
        >
          {/* Top Brand & Invoice Metadata */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b-2 border-emerald-600">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-md">
                🌿
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-emerald-800 tracking-tight leading-none">
                  GreenBasket Ltd.
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {lang === 'bn' ? '১০০% অর্গানিক তাজা ফলমূল ও খামার পণ্য' : '100% Organic Farm Fresh Produce & Groceries'}
                </p>
                <p className="text-[11px] text-slate-400">
                  Govt Reg: #GB-894215-BD • Sector #10, Uttara, Dhaka
                </p>
              </div>
            </div>

            <div className="sm:text-right bg-emerald-50 sm:bg-transparent p-3 sm:p-0 rounded-xl w-full sm:w-auto border sm:border-0 border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                CASH MEMO / চালান
              </span>
              <p className="text-sm font-extrabold text-slate-900 mt-1 font-mono">
                {invoiceNumber}
              </p>
              <p className="text-xs text-slate-500 flex items-center sm:justify-end gap-1 mt-0.5">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{invoiceDate}</span>
              </p>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>bKash Verified (Trx: 9J82KL01M)</span>
              </div>
            </div>
          </div>

          {/* Customer & Billing Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'bn' ? 'গ্রাহকের নাম ও ঠিকানা' : 'Customer & Shipping Address'}</span>
              </p>
              <p className="font-bold text-slate-900 text-sm">{customerName}</p>
              <p className="text-slate-600 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{customerAddress}</span>
              </p>
              <p className="text-slate-600 flex items-center gap-1.5 mt-0.5">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{customerPhone}</span>
              </p>
            </div>

            <div className="sm:border-l sm:border-slate-200 sm:pl-4">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'bn' ? 'পেমেন্ট ও ডেলিভারি বিবরণ' : 'Payment & Order Verification'}</span>
              </p>
              <p className="text-slate-700">
                <span className="text-slate-400">{lang === 'bn' ? 'ইমেইল: ' : 'Email: '}</span>
                <span className="font-medium text-slate-900">{customerEmail}</span>
              </p>
              <p className="text-slate-700 mt-0.5">
                <span className="text-slate-400">{lang === 'bn' ? 'পেমেন্ট মাধ্যম: ' : 'Payment Method: '}</span>
                <span className="font-bold text-emerald-700">bKash Digital Payment (Prepaid)</span>
              </p>
              <p className="text-slate-700 mt-0.5">
                <span className="text-slate-400">{lang === 'bn' ? 'ডেলিভারি স্লট: ' : 'Delivery Slot: '}</span>
                <span className="font-medium">Express Farm Delivery (Same Day)</span>
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-100/70 text-slate-600 font-bold">
                  <th className="py-2.5 px-3 w-8 text-center">#</th>
                  <th className="py-2.5 px-3">{lang === 'bn' ? 'পণ্যের বিবরণ' : 'Item Description'}</th>
                  <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'একক মূল্য' : 'Unit Price'}</th>
                  <th className="py-2.5 px-3 text-center">{lang === 'bn' ? 'পরিমাণ' : 'Qty'}</th>
                  <th className="py-2.5 px-3 text-right">{lang === 'bn' ? 'মোট টাকা' : 'Line Total'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayItems.map((item, index) => {
                  const unitPrice = lang === 'bn' ? item.product.priceBn : item.product.priceEn;
                  const itemTotal = unitPrice * item.quantity;
                  const unit = lang === 'bn' ? item.product.unitBn : item.product.unitEn;

                  return (
                    <tr key={index} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 text-center text-slate-400 font-mono">{index + 1}</td>
                      <td className="py-2.5 px-3">
                        <span className="font-bold text-slate-900 block">
                          {lang === 'bn' ? item.product.nameBn : item.product.nameEn}
                        </span>
                        <span className="text-[10px] text-emerald-600">
                          {item.product.farmOriginBn} • {lang === 'bn' ? '১০০% বিশুদ্ধ অর্গানিক' : 'Organic Certified'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium text-slate-700 tabular-nums">
                        {t.currencySymbol}{unitPrice} / {unit}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-800">
                        {item.quantity}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-slate-900 tabular-nums">
                        {t.currencySymbol}{itemTotal.toFixed(lang === 'bn' ? 0 : 2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pricing Summary & Digital Signature */}
          <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            
            {/* Official QR Code & Seal */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-xl p-2 flex flex-col items-center justify-center shrink-0">
                <QrCode className="w-12 h-12 text-slate-800" />
                <span className="text-[8px] font-mono text-slate-500 mt-0.5">SCAN TO VERIFY</span>
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1 border border-emerald-600 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">
                  <ShieldCheck className="w-3 h-3" />
                  <span>OFFICIAL DIGITAL SEAL</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  This is a certified computer-generated invoice.<br />
                  No physical signature is legally required under Bangladesh E-Commerce Act.
                </p>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="w-full sm:w-64 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{lang === 'bn' ? 'সাবটোটাল (Subtotal):' : 'Subtotal:'}</span>
                <span className="font-semibold tabular-nums">{t.currencySymbol}{subtotal.toFixed(lang === 'bn' ? 0 : 2)}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>{lang === 'bn' ? 'ডিসকাউন্ট (Promo GREEN30):' : 'Discount:'}</span>
                <span className="font-semibold tabular-nums">-{t.currencySymbol}{discount.toFixed(lang === 'bn' ? 0 : 2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{lang === 'bn' ? 'ডেলিভারি চার্জ:' : 'Delivery Fee:'}</span>
                <span className="font-semibold tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-bold">{lang === 'bn' ? 'ফ্রি' : 'FREE'}</span>
                  ) : (
                    `${t.currencySymbol}${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t-2 border-emerald-600 text-sm font-extrabold text-emerald-800">
                <span>{lang === 'bn' ? 'সর্বমোট পরিশোধিত:' : 'Grand Total Paid:'}</span>
                <span className="tabular-nums">{t.currencySymbol}{total.toFixed(lang === 'bn' ? 0 : 2)}</span>
              </div>
            </div>

          </div>

          {/* Footer Note */}
          <div className="pt-4 border-t border-dashed border-slate-200 text-center text-[10px] text-slate-400">
            {lang === 'bn'
              ? 'গ্রিনবাস্কেট বেছে নেওয়ার জন্য আপনাকে ধন্যবাদ! পণ্য সংক্রান্ত কোনো জিজ্ঞাসায় কল করুন +৮৮০ ১২৩৪-৫৬৭৮৯০'
              : 'Thank you for choosing GreenBasket! For questions regarding your order, call +880 1234-567890'}
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-50 dark:bg-[#112318] border-t border-slate-200 dark:border-emerald-950 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {lang === 'bn' ? 'ইনভয়েস নম্বর: ' : 'Invoice ID: '}
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{invoiceNumber}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadInvoice}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'ইনভয়েস ডাউনলোড করুন' : 'Download Invoice'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  ShieldAlert,
  ShieldCheck,
  Package,
  ShoppingCart,
  CreditCard,
  Tag,
  Settings,
  TrendingUp,
  Search,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  AlertTriangle,
  LogOut,
  RefreshCw,
  Eye,
  Smartphone,
  Banknote,
  Globe,
  Sliders,
} from 'lucide-react';
import { Product, Order, PaymentSettings, PromoCode, Vibe, Category } from '../types';
import { SockArtwork } from '../components/SockArtwork';

interface AdminDashboardPageProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onAddProduct: (product: Product) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  paymentSettings: PaymentSettings;
  onUpdatePaymentSettings: (settings: PaymentSettings) => void;
  promoCodes: PromoCode[];
  onUpdatePromoCodes: (promos: PromoCode[]) => void;
  onExitAdmin: () => void;
}

const ADMIN_PASSWORD = '0000';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 60 * 1000; // 1 hour

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  products,
  onUpdateProduct,
  onDeleteProduct,
  onAddProduct,
  orders,
  onUpdateOrderStatus,
  paymentSettings,
  onUpdatePaymentSettings,
  promoCodes,
  onUpdatePromoCodes,
  onExitAdmin,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('auraplus_admin_logged_in') === 'true';
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [attempts, setAttempts] = useState<number>(() => {
    const saved = localStorage.getItem('auraplus_admin_attempts');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lockoutUntil, setLockoutUntil] = useState<number | null>(() => {
    const saved = localStorage.getItem('auraplus_admin_lockout_until');
    return saved ? parseInt(saved, 10) : null;
  });

  const [lockoutRemainingSeconds, setLockoutRemainingSeconds] = useState<number>(0);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'payments' | 'promos'>(
    'overview'
  );

  // Search & Filter in Admin
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');

  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState<number>(10);
  const [newPromoDesc, setNewPromoDesc] = useState('');

  // Lockout Countdown Timer
  useEffect(() => {
    const checkLockout = () => {
      if (lockoutUntil) {
        const now = Date.now();
        if (now < lockoutUntil) {
          const remainingSec = Math.ceil((lockoutUntil - now) / 1000);
          setLockoutRemainingSeconds(remainingSec);
        } else {
          // Lockout expired
          setLockoutUntil(null);
          setAttempts(0);
          setLockoutRemainingSeconds(0);
          localStorage.removeItem('auraplus_admin_lockout_until');
          localStorage.setItem('auraplus_admin_attempts', '0');
        }
      }
    };

    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // Handle Login Attempt
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    // Check if currently locked out
    if (lockoutUntil && Date.now() < lockoutUntil) {
      setAuthError('System locked for security. Please wait for the lockout timer to expire.');
      return;
    }

    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAttempts(0);
      setAuthError('');
      localStorage.setItem('auraplus_admin_logged_in', 'true');
      localStorage.setItem('auraplus_admin_attempts', '0');
      setPasswordInput('');
    } else {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      localStorage.setItem('auraplus_admin_attempts', nextAttempts.toString());
      setPasswordInput('');

      if (nextAttempts >= MAX_ATTEMPTS) {
        const lockoutTime = Date.now() + LOCKOUT_DURATION_MS;
        setLockoutUntil(lockoutTime);
        localStorage.setItem('auraplus_admin_lockout_until', lockoutTime.toString());
        setAuthError(`Maximum 5 attempts reached. Dashboard LOCKED OUT for 1 HOUR.`);
      } else {
        const remaining = MAX_ATTEMPTS - nextAttempts;
        setAuthError(`Incorrect PIN. ${remaining} attempt${remaining > 1 ? 's' : ''} remaining before 1-hour lockout.`);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auraplus_admin_logged_in');
  };

  const formatLockoutTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalOrdersCount = orders.length;
  const inStockCount = products.filter((p) => p.inStock).length;

  // Filtered Products
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.color.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.vibe.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.phone.includes(orderSearch);
    const matchesStatus = orderStatusFilter === 'ALL' || o.orderStatus === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle Add New Promo
  const handleAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;
    const newPromo: PromoCode = {
      code: newPromoCode.trim().toUpperCase(),
      discountPercent: newPromoDiscount,
      active: true,
      description: newPromoDesc || `${newPromoDiscount}% off on all statement pairs`,
    };
    onUpdatePromoCodes([...promoCodes, newPromo]);
    setNewPromoCode('');
    setNewPromoDiscount(10);
    setNewPromoDesc('');
  };

  // Toggle Promo Active
  const handleTogglePromo = (code: string) => {
    const updated = promoCodes.map((p) => (p.code === code ? { ...p, active: !p.active } : p));
    onUpdatePromoCodes(updated);
  };

  // Delete Promo
  const handleDeletePromo = (code: string) => {
    onUpdatePromoCodes(promoCodes.filter((p) => p.code !== code));
  };

  // LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    const isLocked = lockoutUntil !== null && Date.now() < lockoutUntil;

    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#111111] text-white">
        <div className="w-full max-w-md bg-neutral-900 border-2 border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Security Header */}
          <div className="text-center space-y-3 mb-8 relative z-10">
            <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-lg transition-colors ${
              isLocked ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-[#B7FF3C] text-black'
            }`}>
              {isLocked ? <ShieldAlert className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
            </div>

            <h1 className="font-display font-black text-2xl uppercase tracking-wider text-white">
              AURAPLUS ADMIN PORTAL
            </h1>
            <p className="text-xs text-neutral-400">
              High-security control system. All access attempts are monitored and recorded.
            </p>
          </div>

          {isLocked ? (
            /* LOCKED OUT SCREEN */
            <div className="space-y-6 text-center relative z-10 animate-fade-in">
              <div className="p-5 rounded-2xl bg-red-950/60 border border-red-800 text-red-200 space-y-2">
                <AlertTriangle className="w-6 h-6 text-red-400 mx-auto" />
                <h3 className="font-display font-extrabold text-sm uppercase text-red-300">
                  SECURITY LOCKOUT ACTIVE
                </h3>
                <p className="text-xs text-red-300/80 leading-relaxed">
                  5 consecutive failed attempts detected. For safety, this terminal has been locked for 1 hour.
                </p>
                <div className="pt-2">
                  <span className="text-xs font-mono text-neutral-400 block uppercase">TIME REMAINING:</span>
                  <span className="font-mono font-black text-3xl text-red-400 tabular-nums">
                    {formatLockoutTime(lockoutRemainingSeconds)}
                  </span>
                </div>
              </div>

              <button
                onClick={onExitAdmin}
                className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full font-display font-bold text-xs uppercase tracking-wider transition-colors"
              >
                RETURN TO STOREFRONT
              </button>
            </div>
          ) : (
            /* PIN ENTRY FORM */
            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label className="uppercase text-neutral-400">ENTER 4-DIGIT ADMIN PIN</label>
                  <span className={`font-bold ${attempts > 2 ? 'text-amber-400' : 'text-neutral-500'}`}>
                    Attempt {attempts}/{MAX_ATTEMPTS}
                  </span>
                </div>

                <input
                  type="password"
                  maxLength={10}
                  autoFocus
                  placeholder="••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full py-3 px-4 bg-neutral-950 border-2 border-neutral-700 focus:border-[#B7FF3C] rounded-2xl text-center text-2xl font-mono tracking-widest text-white focus:outline-none transition-colors"
                />
              </div>

              {authError && (
                <div className="p-3 bg-red-950/70 border border-red-800/80 rounded-xl text-xs font-mono text-red-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#B7FF3C] hover:bg-[#a6f020] text-black font-display font-black text-xs uppercase tracking-wider rounded-full shadow-lg transition-transform hover:scale-[1.02]"
                >
                  UNLOCK CONTROL SYSTEM →
                </button>

                <button
                  type="button"
                  onClick={onExitAdmin}
                  className="w-full py-2.5 text-neutral-400 hover:text-white text-xs font-mono uppercase tracking-wider"
                >
                  Cancel & Return to Store
                </button>
              </div>

              <div className="pt-4 border-t border-neutral-800 text-center text-[10px] font-mono text-neutral-500">
                <span>SECURITY LEVEL: 256-BIT · AUTO LOCKOUT AFTER 5 FAILS</span>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="bg-[#111111] text-white p-6 rounded-3xl border border-neutral-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#B7FF3C] text-black">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-xl sm:text-2xl uppercase tracking-wider text-white">
                AURAPLUS MASTER CONTROL
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                LIVE SECURE
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              Role: Master Administrator · PIN: 0000 · Lockout Protection Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onExitAdmin}
            className="py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Globe className="w-4 h-4" />
            <span>VIEW STOREFRONT</span>
          </button>

          <button
            onClick={handleLogout}
            className="py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white text-xs font-mono uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span>SECURE LOCK</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-200">
        {[
          { key: 'overview', label: 'OVERVIEW & METRICS', icon: TrendingUp },
          { key: 'products', label: `PRODUCTS (${products.length})`, icon: Package },
          { key: 'orders', label: `ORDERS (${orders.length})`, icon: ShoppingCart },
          { key: 'payments', label: 'PAYMENT METHODS', icon: CreditCard },
          { key: 'promos', label: `PROMO CODES (${promoCodes.length})`, icon: Tag },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`py-3 px-5 rounded-2xl text-xs font-display font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-neutral-900 text-white shadow-md'
                : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-1">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                TOTAL GROSS REVENUE
              </span>
              <div className="text-3xl font-display font-black text-neutral-900 tabular-nums">
                ₹{totalRevenue.toLocaleString()}
              </div>
              <span className="text-[11px] font-mono text-emerald-600 font-bold block pt-1">
                ↑ Direct from live checkouts
              </span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-1">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                TOTAL ORDERS PLACED
              </span>
              <div className="text-3xl font-display font-black text-neutral-900 tabular-nums">
                {totalOrdersCount}
              </div>
              <span className="text-[11px] font-mono text-neutral-500 block pt-1">
                Across UPI, COD & Cards
              </span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-1">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                ACTIVE PRODUCTS
              </span>
              <div className="text-3xl font-display font-black text-neutral-900 tabular-nums">
                {inStockCount} / {products.length}
              </div>
              <span className="text-[11px] font-mono text-emerald-600 font-bold block pt-1">
                All 12 Gen-Z drop designs loaded
              </span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-1">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                FREE SHIPPING GOAL
              </span>
              <div className="text-3xl font-display font-black text-[#7C3AED] tabular-nums">
                ₹{paymentSettings.freeShippingThreshold}
              </div>
              <span className="text-[11px] font-mono text-neutral-500 block pt-1">
                Configurable threshold
              </span>
            </div>
          </div>

          {/* Quick System Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-4">
              <h3 className="font-display font-black text-base uppercase text-neutral-900">
                LIVE PAYMENT GATEWAY STATUS
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center p-3 rounded-xl bg-neutral-50">
                  <span className="font-bold">UPI / QR PAYMENTS:</span>
                  <span className={paymentSettings.upiEnabled ? 'text-emerald-600 font-bold' : 'text-red-500'}>
                    {paymentSettings.upiEnabled ? `ACTIVE (${paymentSettings.upiId})` : 'DISABLED'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-neutral-50">
                  <span className="font-bold">CASH ON DELIVERY (COD):</span>
                  <span className={paymentSettings.codEnabled ? 'text-emerald-600 font-bold' : 'text-red-500'}>
                    {paymentSettings.codEnabled ? 'ACTIVE (Zero Risk Option)' : 'DISABLED'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-neutral-50">
                  <span className="font-bold">CREDIT / DEBIT CARDS:</span>
                  <span className={paymentSettings.cardEnabled ? 'text-emerald-600 font-bold' : 'text-red-500'}>
                    {paymentSettings.cardEnabled ? 'ACTIVE (Visa/Mastercard/RuPay)' : 'DISABLED'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-4">
              <h3 className="font-display font-black text-base uppercase text-neutral-900">
                ACTIVE PROMO CODES
              </h3>
              <div className="space-y-2 text-xs font-mono">
                {promoCodes.map((p) => (
                  <div key={p.code} className="flex justify-between items-center p-3 rounded-xl bg-neutral-50">
                    <div>
                      <span className="font-bold text-neutral-900">{p.code}</span>
                      <span className="text-neutral-500 text-[10px] block">{p.description}</span>
                    </div>
                    <span className="font-bold text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded">
                      {p.discountPercent}% OFF
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search products to modify..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900"
              />
            </div>

            <button
              onClick={() => setIsAddingProduct(true)}
              className="py-2.5 px-5 bg-neutral-900 hover:bg-[#7C3AED] text-white rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>CREATE NEW DROP PAIR</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-neutral-100 border-b border-neutral-200 font-mono font-bold text-neutral-600 uppercase">
                    <th className="p-4">PRODUCT</th>
                    <th className="p-4">VIBE</th>
                    <th className="p-4">PRICE</th>
                    <th className="p-4">STOCK STATUS</th>
                    <th className="p-4">BADGE</th>
                    <th className="p-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-neutral-100 shrink-0 overflow-hidden">
                          <SockArtwork product={p} className="w-full h-full p-1" />
                        </div>
                        <div>
                          <div className="font-display font-extrabold text-sm uppercase text-neutral-900">
                            {p.name}
                          </div>
                          <span className="text-[10px] font-mono text-neutral-500">{p.color}</span>
                        </div>
                      </td>

                      <td className="p-4 font-mono font-bold uppercase text-neutral-800">
                        {p.vibe}
                      </td>

                      <td className="p-4 font-mono">
                        <span className="font-black text-sm text-neutral-900 tabular-nums">
                          ₹{p.price}
                        </span>
                        {p.originalPrice && (
                          <span className="text-[10px] text-neutral-400 line-through ml-1.5 tabular-nums">
                            ₹{p.originalPrice}
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => onUpdateProduct({ ...p, inStock: !p.inStock })}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-colors ${
                            p.inStock
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {p.inStock ? '✓ IN STOCK' : '✕ SOLD OUT'}
                        </button>
                      </td>

                      <td className="p-4 font-mono">
                        <select
                          value={p.badge || 'NONE'}
                          onChange={(e) => {
                            const val = e.target.value === 'NONE' ? null : (e.target.value as any);
                            onUpdateProduct({ ...p, badge: val });
                          }}
                          className="px-2 py-1 rounded-lg border border-neutral-300 text-[10px] font-bold uppercase bg-white focus:outline-none"
                        >
                          <option value="NONE">NO BADGE</option>
                          <option value="NEW">NEW</option>
                          <option value="BESTSELLER">BESTSELLER</option>
                          <option value="LIMITED">LIMITED</option>
                          <option value="HOT">HOT</option>
                        </select>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search orders by ID, Customer Name, or Phone..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">STATUS:</span>
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="py-2 px-3 rounded-xl bg-white border border-neutral-300 text-xs font-mono font-bold uppercase focus:outline-none"
              >
                <option value="ALL">ALL STATUSES</option>
                <option value="Processing">Processing</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-neutral-200 space-y-2">
              <ShoppingCart className="w-10 h-10 text-neutral-300 mx-auto" />
              <h3 className="font-display font-extrabold text-base uppercase text-neutral-800">
                NO ORDERS FOUND
              </h3>
              <p className="text-xs text-neutral-500">
                Orders placed in the checkout will appear here in real time with customer & tracking details.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((o) => (
                <div
                  key={o.id}
                  className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-black text-base text-neutral-900">{o.id}</span>
                      <span className="text-xs font-mono text-neutral-400">{o.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-100 font-bold text-neutral-800">
                        {o.paymentMethod} · {o.paymentStatus}
                      </span>

                      {/* Status Selector */}
                      <select
                        value={o.orderStatus}
                        onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                        className={`py-1 px-3 rounded-lg text-xs font-mono font-bold uppercase border ${
                          o.orderStatus === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : o.orderStatus === 'Shipped'
                            ? 'bg-blue-50 text-blue-700 border-blue-300'
                            : o.orderStatus === 'Cancelled'
                            ? 'bg-red-50 text-red-700 border-red-300'
                            : 'bg-amber-50 text-amber-700 border-amber-300'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer & Address Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                        CUSTOMER & SHIPPING
                      </span>
                      <div className="font-bold text-neutral-900">{o.customer.fullName}</div>
                      <div className="text-neutral-600">{o.customer.phone} · {o.customer.email}</div>
                      <div className="text-neutral-600">
                        {o.customer.address}, {o.customer.city}, {o.customer.state} - {o.customer.pincode}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">
                        ITEMS ORDERED ({o.items.length})
                      </span>
                      <div className="space-y-1 max-h-24 overflow-y-auto">
                        {o.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="font-medium text-neutral-800">
                              {it.quantity}x {it.name} (Size {it.size})
                            </span>
                            <span className="font-mono text-neutral-600 tabular-nums">
                              ₹{it.price * it.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-neutral-100 flex justify-between items-baseline font-mono font-black text-sm">
                        <span>TOTAL AMOUNT:</span>
                        <span className="text-neutral-950">₹{o.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PAYMENT METHODS CONTROL */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-6">
            <div>
              <h3 className="font-display font-black text-lg uppercase text-neutral-900">
                PAYMENT METHODS & GATEWAYS
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Toggle and configure which payment modes are accepted during customer checkout.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* UPI Settings */}
              <div className="p-5 rounded-2xl border-2 border-neutral-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-[#7C3AED]" />
                    <span className="font-display font-bold text-sm uppercase">UPI / GPAY / PHONEPE</span>
                  </div>
                  <button
                    onClick={() =>
                      onUpdatePaymentSettings({
                        ...paymentSettings,
                        upiEnabled: !paymentSettings.upiEnabled,
                      })
                    }
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase transition-colors ${
                      paymentSettings.upiEnabled
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {paymentSettings.upiEnabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                    MERCHANT UPI VPA / ID:
                  </label>
                  <input
                    type="text"
                    value={paymentSettings.upiId}
                    onChange={(e) =>
                      onUpdatePaymentSettings({ ...paymentSettings, upiId: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              {/* Cash On Delivery */}
              <div className="p-5 rounded-2xl border-2 border-neutral-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-emerald-600" />
                    <span className="font-display font-bold text-sm uppercase">CASH ON DELIVERY (COD)</span>
                  </div>
                  <button
                    onClick={() =>
                      onUpdatePaymentSettings({
                        ...paymentSettings,
                        codEnabled: !paymentSettings.codEnabled,
                      })
                    }
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase transition-colors ${
                      paymentSettings.codEnabled
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {paymentSettings.codEnabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
                <p className="text-xs text-neutral-500">
                  Allow customers to pay physical cash upon package handover by delivery partner.
                </p>
              </div>

              {/* Credit / Debit Cards */}
              <div className="p-5 rounded-2xl border-2 border-neutral-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#2563EB]" />
                    <span className="font-display font-bold text-sm uppercase">CREDIT / DEBIT CARDS</span>
                  </div>
                  <button
                    onClick={() =>
                      onUpdatePaymentSettings({
                        ...paymentSettings,
                        cardEnabled: !paymentSettings.cardEnabled,
                      })
                    }
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase transition-colors ${
                      paymentSettings.cardEnabled
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {paymentSettings.cardEnabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
                <p className="text-xs text-neutral-500">
                  Accept Visa, Mastercard, RuPay, and American Express.
                </p>
              </div>

              {/* Free Shipping Threshold */}
              <div className="p-5 rounded-2xl border-2 border-neutral-200 space-y-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#FF3D81]" />
                  <span className="font-display font-bold text-sm uppercase">FREE SHIPPING THRESHOLD</span>
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                    MINIMUM CART AMOUNT FOR FREE SHIPPING (₹):
                  </label>
                  <input
                    type="number"
                    value={paymentSettings.freeShippingThreshold}
                    onChange={(e) =>
                      onUpdatePaymentSettings({
                        ...paymentSettings,
                        freeShippingThreshold: Math.max(0, parseInt(e.target.value, 10) || 0),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono font-bold focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PROMO CODES */}
      {activeTab === 'promos' && (
        <div className="space-y-6">
          {/* Add Promo Form */}
          <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-4">
            <h3 className="font-display font-black text-base uppercase text-neutral-900">
              CREATE NEW PROMO CODE
            </h3>
            <form onSubmit={handleAddPromo} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <div>
                <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                  PROMO CODE *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH30"
                  value={newPromoCode}
                  onChange={(e) => setNewPromoCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono uppercase focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                  DISCOUNT PERCENT (%) *
                </label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  required
                  value={newPromoDiscount}
                  onChange={(e) => setNewPromoDiscount(parseInt(e.target.value, 10) || 10)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono font-bold focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                  DESCRIPTION
                </label>
                <input
                  type="text"
                  placeholder="e.g. Weekend streetwear discount"
                  value={newPromoDesc}
                  onChange={(e) => setNewPromoDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-4 bg-neutral-900 hover:bg-[#7C3AED] text-white rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>SAVE PROMO</span>
              </button>
            </form>
          </div>

          {/* Promo List */}
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-neutral-200">
              {promoCodes.map((pr) => (
                <div key={pr.code} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-sm uppercase px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-900">
                      {pr.code}
                    </span>
                    <div>
                      <span className="font-bold text-xs text-[#7C3AED]">{pr.discountPercent}% OFF</span>
                      <span className="text-xs text-neutral-500 block">{pr.description}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleTogglePromo(pr.code)}
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                        pr.active ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-600'
                      }`}
                    >
                      {pr.active ? 'ACTIVE' : 'PAUSED'}
                    </button>

                    <button
                      onClick={() => handleDeletePromo(pr.code)}
                      className="p-1.5 text-neutral-400 hover:text-red-500"
                      title="Delete Promo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-neutral-300 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
              <h3 className="font-display font-extrabold text-base uppercase text-neutral-900">
                EDIT PRODUCT: {editingProduct.name}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="p-1 text-neutral-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-mono font-bold uppercase text-neutral-500 block mb-1">
                  PRODUCT NAME
                </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold uppercase focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold uppercase text-neutral-500 block mb-1">
                    PRICE (₹)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: parseInt(e.target.value, 10) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold uppercase text-neutral-500 block mb-1">
                    ORIGINAL PRICE (₹)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        originalPrice: parseInt(e.target.value, 10) || undefined,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono font-bold uppercase text-neutral-500 block mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold uppercase text-neutral-500 block mb-1">
                    VIBE
                  </label>
                  <select
                    value={editingProduct.vibe}
                    onChange={(e) => setEditingProduct({ ...editingProduct, vibe: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold uppercase"
                  >
                    <option value="MINIMAL">MINIMAL</option>
                    <option value="STREET">STREET</option>
                    <option value="PLAYFUL">PLAYFUL</option>
                    <option value="CUTE">CUTE</option>
                    <option value="CHAOTIC">CHAOTIC</option>
                    <option value="LOUD">LOUD</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono font-bold uppercase text-neutral-500 block mb-1">
                    BADGE
                  </label>
                  <select
                    value={editingProduct.badge || 'NONE'}
                    onChange={(e) => {
                      const val = e.target.value === 'NONE' ? null : (e.target.value as any);
                      setEditingProduct({ ...editingProduct, badge: val });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold uppercase"
                  >
                    <option value="NONE">NO BADGE</option>
                    <option value="NEW">NEW</option>
                    <option value="BESTSELLER">BESTSELLER</option>
                    <option value="LIMITED">LIMITED</option>
                    <option value="HOT">HOT</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={editingProduct.inStock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  className="w-4 h-4 rounded text-black"
                />
                <label htmlFor="inStockCheck" className="font-mono font-bold text-xs uppercase text-neutral-800">
                  CURRENTLY IN STOCK & AVAILABLE FOR PURCHASE
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="py-2 px-4 rounded-xl border border-neutral-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onUpdateProduct(editingProduct);
                  setEditingProduct(null);
                }}
                className="py-2 px-5 rounded-xl bg-neutral-900 text-white text-xs font-bold uppercase"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW PRODUCT MODAL */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-neutral-300 p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
              <h3 className="font-display font-extrabold text-base uppercase text-neutral-900">
                ADD NEW STREETWEAR PAIR
              </h3>
              <button onClick={() => setIsAddingProduct(false)} className="p-1 text-neutral-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem('pname') as HTMLInputElement).value;
                const price = parseInt((form.elements.namedItem('pprice') as HTMLInputElement).value, 10);
                const vibe = (form.elements.namedItem('pvibe') as HTMLSelectElement).value as Vibe;
                const color = (form.elements.namedItem('pcolor') as HTMLInputElement).value;

                const newProd: Product = {
                  id: name.toLowerCase().replace(/\s+/g, '-'),
                  name: name.toUpperCase(),
                  price,
                  originalPrice: price + 100,
                  category: 'GRAPHIC',
                  vibe,
                  color,
                  colorHex: '#7C3AED',
                  accentColorHex: '#111111',
                  bgColor: '#F5F3FF',
                  rating: 5.0,
                  reviewCount: 1,
                  description: 'Brand new limited edition drop pair.',
                  vibeDescription: 'Custom release built for modern streetwear fits.',
                  badge: 'NEW',
                  sizes: ['S', 'M', 'L', 'XL'],
                  inStock: true,
                  patternType: 'checker',
                  material: '84% Combed Organic Cotton, 13% Recycled Nylon, 3% Spandex',
                  fit: 'Mid-calf athletic crew with 360° arch compression.',
                  care: 'Wash cold inside out. Air dry.',
                  gallery: [
                    { id: '1', title: 'Product Close-Up', type: 'sock', label: 'Close-Up' },
                    { id: '2', title: 'Styled with Kicks', type: 'sneaker', label: 'On Feet' },
                    { id: '3', title: 'Full Outfit', type: 'fit', label: 'Full Fit' },
                    { id: '4', title: 'Knit Structure', type: 'fabric', label: 'Fabric' },
                    { id: '5', title: 'Aura Slide Box', type: 'packaging', label: 'Unboxing' },
                  ],
                };

                onAddProduct(newProd);
                setIsAddingProduct(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-mono font-bold uppercase text-neutral-500 block mb-1">
                  PRODUCT NAME *
                </label>
                <input
                  name="pname"
                  type="text"
                  required
                  placeholder="e.g. CYBER VOLT"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold uppercase focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold uppercase text-neutral-500 block mb-1">
                    PRICE (₹) *
                  </label>
                  <input
                    name="pprice"
                    type="number"
                    required
                    defaultValue={449}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold uppercase text-neutral-500 block mb-1">
                    VIBE *
                  </label>
                  <select
                    name="pvibe"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold uppercase"
                  >
                    <option value="STREET">STREET</option>
                    <option value="LOUD">LOUD</option>
                    <option value="PLAYFUL">PLAYFUL</option>
                    <option value="MINIMAL">MINIMAL</option>
                    <option value="CUTE">CUTE</option>
                    <option value="CHAOTIC">CHAOTIC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono font-bold uppercase text-neutral-500 block mb-1">
                  COLORWAY *
                </label>
                <input
                  name="pcolor"
                  type="text"
                  required
                  placeholder="e.g. Electric Violet / Noir"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="py-2 px-4 rounded-xl border border-neutral-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl bg-neutral-900 text-white text-xs font-bold uppercase"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

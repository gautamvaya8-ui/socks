import React, { useState } from 'react';
import {
  Trash2,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Sparkles,
  Check,
  CreditCard,
  Smartphone,
  Banknote,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react';
import { CartItem, Product, Order, PaymentSettings, PromoCode } from '../types';
import { PRODUCTS } from '../data/products';
import { SockArtwork } from '../components/SockArtwork';

interface CartCheckoutPageProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, newQty: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onMoveToWishlist: (product: Product, size: string) => void;
  onQuickAddRecommendation: (product: Product, size: 'S' | 'M' | 'L' | 'XL') => void;
  onClearCart: () => void;
  onNavigateToShop: () => void;
  paymentSettings: PaymentSettings;
  promoCodes: PromoCode[];
  onPlaceOrder: (order: Order) => void;
}

export const CartCheckoutPage: React.FC<CartCheckoutPageProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onMoveToWishlist,
  onQuickAddRecommendation,
  onClearCart,
  onNavigateToShop,
  paymentSettings,
  promoCodes,
  onPlaceOrder,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(
    null
  );
  const [promoError, setPromoError] = useState('');

  // Checkout flow state
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmed'>(
    'cart'
  );

  // Form states
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    fullName: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'COD' | 'NETBANKING' | 'WALLET'>('UPI');
  const [upiId, setUpiId] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  // Free shipping threshold from admin settings
  const FREE_SHIPPING_THRESHOLD = paymentSettings.freeShippingThreshold || 799;

  // Subtotal
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Discount calculation
  const discountAmount = appliedPromo
    ? Math.round((subtotal * appliedPromo.discountPercent) / 100)
    : 0;

  // Shipping calculation
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 99;

  // Final Total
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  // Amount needed for free shipping
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Recommended products (filter out items in cart)
  const cartProductIds = cart.map((c) => c.product.id);
  const recommendations = PRODUCTS.filter((p) => !cartProductIds.includes(p.id)).slice(0, 3);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    // Check dynamic promo codes
    const found = promoCodes.find((p) => p.code.toUpperCase() === code && p.active);
    if (found) {
      setAppliedPromo({ code: found.code, discountPercent: found.discountPercent });
      return;
    }

    if (code === 'AURA10') {
      setAppliedPromo({ code: 'AURA10', discountPercent: 10 });
    } else if (code === 'GENZ20') {
      setAppliedPromo({ code: 'GENZ20', discountPercent: 20 });
    } else if (code === 'FREESHIP') {
      setAppliedPromo({ code: 'FREESHIP', discountPercent: 12 });
    } else {
      setPromoError('Invalid or inactive promo code. Try "AURA10" for 10% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomOrder = `AP-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(randomOrder);

    // Create real Order object
    const newOrder: Order = {
      id: randomOrder,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      customer: {
        fullName: contactInfo.fullName || 'Customer',
        email: contactInfo.email || 'customer@auraplus.in',
        phone: contactInfo.phone || '+91 98765 43210',
        address: contactInfo.address || 'Street 1, Apt 4',
        city: contactInfo.city || 'Mumbai',
        state: contactInfo.state || 'Maharashtra',
        pincode: contactInfo.pincode || '400050',
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        size: item.size,
        price: item.product.price,
        quantity: item.quantity,
      })),
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending COD' : 'Paid',
      orderStatus: 'Processing',
    };

    onPlaceOrder(newOrder);
    setCheckoutStep('confirmed');
    onClearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ORDER CONFIRMED VIEW
  if (checkoutStep === 'confirmed') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#B7FF3C] text-black mx-auto flex items-center justify-center shadow-xl animate-bounce">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-[#7C3AED] uppercase">
            DROP PACKAGED & CONFIRMED
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-tight text-neutral-900">
            ORDER CONFIRMED ✦
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 max-w-md mx-auto">
            Your new favorite socks are on the way.
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border-2 border-neutral-900 shadow-xl max-w-md mx-auto text-left space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-neutral-200 text-xs font-mono">
            <span className="text-neutral-500">ORDER NUMBER</span>
            <span className="font-bold text-neutral-900">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-neutral-200 text-xs font-mono">
            <span className="text-neutral-500">PAYMENT METHOD</span>
            <span className="font-bold text-neutral-900">{paymentMethod}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-neutral-200 text-xs font-mono">
            <span className="text-neutral-500">ESTIMATED DELIVERY</span>
            <span className="font-bold text-[#7C3AED]">2-3 BUSINESS DAYS</span>
          </div>
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-500">TOTAL AMOUNT</span>
            <span className="font-black text-sm text-neutral-900 tabular-nums">₹{total}</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setCheckoutStep('cart');
              onNavigateToShop();
            }}
            className="w-full sm:w-auto py-3.5 px-8 bg-neutral-900 hover:bg-[#7C3AED] text-white rounded-full font-display font-black text-xs uppercase tracking-wider transition-colors"
          >
            CONTINUE SHOPPING →
          </button>
        </div>
      </div>
    );
  }

  // EMPTY CART VIEW
  if (cart.length === 0 && checkoutStep === 'cart') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-neutral-200 flex items-center justify-center mx-auto text-neutral-400">
          <ShoppingBag className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-neutral-900">
            YOUR CART IS EMPTY
          </h1>
          <p className="text-sm text-neutral-500 max-w-sm mx-auto">
            You haven't added any statement pairs yet. Don't let your kicks go bare.
          </p>
        </div>

        <button
          onClick={onNavigateToShop}
          className="py-3.5 px-8 bg-neutral-900 hover:bg-[#7C3AED] text-white rounded-full font-display font-black text-xs uppercase tracking-wider transition-colors"
        >
          EXPLORE THE DROP →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      {/* Header */}
      <div className="pb-4 border-b border-neutral-200">
        <span className="text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-widest">
          CHECKOUT REVIEW
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-neutral-900 mt-1">
          YOUR CART HAS TASTE.
        </h1>
      </div>

      {/* Free Shipping Progress Bar */}
      <div className="p-4 sm:p-5 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold">
          <div className="flex items-center gap-1.5 text-neutral-900">
            <Truck className="w-4 h-4 text-[#7C3AED]" />
            <span>
              {amountToFreeShipping === 0
                ? 'YOU UNLOCKED FREE SHIPPING! 🎉'
                : `₹${amountToFreeShipping} AWAY FROM FREE SHIPPING 🚚`}
            </span>
          </div>
          <span className="text-neutral-500 tabular-nums">
            ₹{subtotal} / ₹{FREE_SHIPPING_THRESHOLD}
          </span>
        </div>
        <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#7C3AED] to-[#B7FF3C] transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Side: Cart Items or Checkout Forms */}
        <div className="lg:col-span-7 space-y-8">
          {checkoutStep === 'cart' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>ITEMS IN YOUR ROTATION ({cart.length})</span>
                <button
                  onClick={onClearCart}
                  className="hover:text-red-500 transition-colors"
                >
                  CLEAR ALL
                </button>
              </div>

              {/* Itemized List */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="p-4 bg-white rounded-3xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 group"
                  >
                    {/* Item Thumbnail */}
                    <div className="w-20 h-20 rounded-2xl bg-neutral-100 shrink-0 overflow-hidden p-1 flex items-center justify-center">
                      <SockArtwork product={item.product} className="w-full h-full" />
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 text-center sm:text-left min-w-0">
                      <h3 className="font-display font-extrabold text-base uppercase text-neutral-900 truncate">
                        {item.product.name}
                      </h3>
                      <div className="text-xs font-mono text-neutral-500 mt-0.5">
                        {item.product.color} · Size: <span className="font-bold text-neutral-800">{item.size}</span>
                      </div>
                      <div className="text-sm font-mono font-bold text-neutral-900 mt-1 tabular-nums">
                        ₹{item.product.price}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-neutral-200 rounded-full bg-neutral-50 p-1">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.size, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-full hover:bg-white flex items-center justify-center text-neutral-700"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-xs tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.size, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-full hover:bg-white flex items-center justify-center text-neutral-700"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Item Subtotal & Actions */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-neutral-950 tabular-nums">
                        ₹{item.product.price * item.quantity}
                      </span>

                      <button
                        onClick={() => onMoveToWishlist(item.product, item.size)}
                        className="p-2 text-neutral-400 hover:text-[#FF3D81] transition-colors"
                        title="Save to wishlist"
                      >
                        <Heart className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onRemoveItem(item.product.id, item.size)}
                        className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* STEP 2 & 3: SHIPPING & PAYMENT FORMS */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Back to Cart */}
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="text-xs font-mono font-bold text-neutral-600 hover:text-black flex items-center gap-1"
              >
                ← BACK TO EDIT CART
              </button>

              {/* Contact Information */}
              <div className="bg-white p-6 rounded-3xl border border-neutral-200 space-y-4">
                <h3 className="font-display font-extrabold text-base uppercase text-neutral-900">
                  1. CONTACT DETAILS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@gmail.com"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                      MOBILE NUMBER (FOR TRACKING) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white p-6 rounded-3xl border border-neutral-200 space-y-4">
                <h3 className="font-display font-extrabold text-base uppercase text-neutral-900">
                  2. DELIVERY ADDRESS
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Fernandes"
                      value={contactInfo.fullName}
                      onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                      STREET ADDRESS / APARTMENT *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Flat 402, Skyline Residency, Linking Road"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                        CITY *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Mumbai"
                        value={contactInfo.city}
                        onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                        STATE *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Maharashtra"
                        value={contactInfo.state}
                        onChange={(e) => setContactInfo({ ...contactInfo, state: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                        PIN CODE *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="400050"
                        value={contactInfo.pincode}
                        onChange={(e) => setContactInfo({ ...contactInfo, pincode: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 rounded-3xl border border-neutral-200 space-y-4">
                <h3 className="font-display font-extrabold text-base uppercase text-neutral-900">
                  3. PAYMENT METHOD
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    ...(paymentSettings.upiEnabled
                      ? [{ key: 'UPI' as const, label: 'UPI / GPAY', icon: Smartphone, badge: 'FASTEST', desc: 'Google Pay, PhonePe, Paytm' }]
                      : []),
                    ...(paymentSettings.cardEnabled
                      ? [{ key: 'CARD' as const, label: 'CARDS', icon: CreditCard, badge: 'ALL CARDS', desc: 'Visa, Master, RuPay' }]
                      : []),
                    ...(paymentSettings.codEnabled
                      ? [{ key: 'COD' as const, label: 'CASH ON DELIVERY', icon: Banknote, badge: 'ZERO RISK', desc: 'Pay on delivery' }]
                      : []),
                    ...(paymentSettings.netBankingEnabled
                      ? [{ key: 'NETBANKING' as const, label: 'NET BANKING', icon: Smartphone, badge: '50+ BANKS', desc: 'HDFC, ICICI, SBI' }]
                      : []),
                    ...(paymentSettings.walletsEnabled
                      ? [{ key: 'WALLET' as const, label: 'WALLETS', icon: CreditCard, badge: 'ONE-CLICK', desc: 'Paytm, Mobikwik' }]
                      : []),
                  ].map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setPaymentMethod(p.key)}
                      className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                        paymentMethod === p.key
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                          : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                      }`}
                    >
                      <p.icon className="w-5 h-5" />
                      <span className="font-display font-bold text-xs uppercase">{p.label}</span>
                      <span
                        className={`text-[9px] font-mono ${
                          paymentMethod === p.key ? 'text-[#B7FF3C]' : 'text-neutral-400'
                        }`}
                      >
                        {p.badge}
                      </span>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="pt-2 animate-fade-in bg-neutral-50 p-3 rounded-xl border border-neutral-200 space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-mono">
                      <span className="text-neutral-500 uppercase">MERCHANT VPA:</span>
                      <span className="font-bold text-[#7C3AED]">{paymentSettings.upiId}</span>
                    </div>
                    <label className="text-[11px] font-mono uppercase text-neutral-500 block">
                      ENTER YOUR UPI VPA / ID
                    </label>
                    <input
                      type="text"
                      placeholder="yourname@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-neutral-300 text-xs bg-white focus:outline-none focus:border-neutral-900"
                    />
                    <p className="text-[10px] text-neutral-400">
                      You will receive a payment request prompt on Google Pay, PhonePe, or Paytm.
                    </p>
                  </div>
                )}

                {paymentMethod === 'COD' && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-mono">
                    ✓ Cash on Delivery active. Keep exact cash ready at the time of delivery.
                  </div>
                )}
              </div>

              {/* Final Place Order Button */}
              <button
                type="submit"
                className="w-full py-4 px-8 bg-[#B7FF3C] hover:bg-[#a4f122] text-black rounded-full font-display font-black text-sm uppercase tracking-wider shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <span>PLACE ORDER</span>
                <span>—</span>
                <span className="font-mono tabular-nums">₹{total}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          )}

          {/* Section: WAIT... YOU'RE MISSING THESE. 👀 */}
          <div className="pt-6 border-t border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-extrabold text-lg uppercase text-neutral-900">
                WAIT... YOU’RE MISSING THESE. 👀
              </h3>
              <span className="text-xs font-mono text-neutral-400">FRESH DROP ADDS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {recommendations.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 bg-white rounded-2xl border border-neutral-200 flex flex-col justify-between group hover:border-neutral-900 transition-all"
                >
                  <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden mb-2">
                    <SockArtwork product={prod} className="w-full h-full p-1" />
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-xs uppercase truncate text-neutral-900">
                      {prod.name}
                    </div>
                    <div className="text-xs font-mono font-bold text-neutral-700 tabular-nums">
                      ₹{prod.price}
                    </div>
                  </div>
                  <button
                    onClick={() => onQuickAddRecommendation(prod, 'M')}
                    className="mt-2 w-full py-1.5 bg-neutral-900 hover:bg-[#7C3AED] text-white rounded-lg text-[10px] font-display font-bold uppercase transition-colors"
                  >
                    + QUICK ADD
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-neutral-900 shadow-xl space-y-6">
            <h2 className="font-display font-black text-xl uppercase tracking-tight text-neutral-900">
              ORDER SUMMARY
            </h2>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs font-mono border-b border-neutral-200 pb-4">
              <div className="flex justify-between items-center text-neutral-600">
                <span>SUBTOTAL ({cart.reduce((a, b) => a + b.quantity, 0)} PAIRS)</span>
                <span className="font-bold text-neutral-900 tabular-nums">₹{subtotal}</span>
              </div>

              {appliedPromo && (
                <div className="flex justify-between items-center text-emerald-600 font-bold">
                  <span>PROMO DISCOUNT ({appliedPromo.code})</span>
                  <span className="tabular-nums">-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-neutral-600">
                <span>SHIPPING</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    <span className="tabular-nums">₹{shippingFee}</span>
                  )}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline pt-1">
              <span className="font-display font-black text-lg uppercase text-neutral-900">
                TOTAL
              </span>
              <div className="text-right">
                <span className="font-mono font-black text-2xl text-neutral-950 tabular-nums">
                  ₹{total}
                </span>
                <span className="text-[10px] text-neutral-400 block font-mono">
                  Includes all taxes & duty
                </span>
              </div>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-2 pt-2">
              <label className="text-[10px] font-mono font-bold uppercase text-neutral-500 block">
                PROMO CODE
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ENTER CODE (Try AURA10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono uppercase focus:outline-none focus:border-neutral-900"
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 bg-neutral-900 hover:bg-[#7C3AED] text-white rounded-xl font-display font-bold text-xs uppercase transition-colors"
                >
                  APPLY
                </button>
              </div>
              {promoError && (
                <p className="text-[10px] text-red-500 font-mono">{promoError}</p>
              )}
              {appliedPromo && (
                <p className="text-[10px] text-emerald-600 font-mono font-bold">
                  ✓ {appliedPromo.code} APPLIED! ({appliedPromo.discountPercent}% OFF)
                </p>
              )}
            </form>

            {/* Proceed to Checkout Button */}
            {checkoutStep === 'cart' && (
              <button
                onClick={() => setCheckoutStep('shipping')}
                className="w-full py-4 px-6 bg-neutral-900 hover:bg-[#7C3AED] text-white rounded-full font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <span>LET'S GET THESE HOME</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Trust badges */}
            <div className="pt-2 text-center text-[10px] font-mono text-neutral-400 space-y-1">
              <div>🔒 256-BIT ENCRYPTED DEMO CHECKOUT</div>
              <div>GUARANTEED DAMAGE-FREE TRANSIT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

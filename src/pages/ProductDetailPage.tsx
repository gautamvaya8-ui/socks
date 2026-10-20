import React, { useState } from 'react';
import {
  Star,
  Heart,
  Plus,
  Minus,
  Check,
  ChevronDown,
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, REVIEWS } from '../data/products';
import { SockArtwork } from '../components/SockArtwork';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL', quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onNavigateToLookbook: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onNavigateToLookbook,
}) => {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('vibe');
  const [reviewFilter, setReviewFilter] = useState<'ALL' | '5' | 'VERIFIED'>('ALL');

  const galleryItem = product.gallery[activeGalleryIndex] || product.gallery[0];

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  // Related products (exclude current)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  // Filtered reviews
  const filteredReviews = REVIEWS.filter((r) => {
    if (reviewFilter === '5') return r.rating === 5;
    if (reviewFilter === 'VERIFIED') return r.verified;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase">
        <span className="hover:text-black cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          HOME
        </span>
        <span>/</span>
        <span className="hover:text-black cursor-pointer">SHOP</span>
        <span>/</span>
        <span className="text-neutral-900 font-bold">{product.name}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left Side: 5-View Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Gallery Stage */}
          <div className="relative aspect-square w-full rounded-3xl bg-neutral-100 border border-neutral-200 overflow-hidden shadow-sm flex items-center justify-center">
            <SockArtwork
              product={product}
              mode={galleryItem.type}
              className="w-full h-full"
            />

            {/* Gallery View Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md text-white rounded-full text-[11px] font-mono font-bold uppercase tracking-wider">
              VIEW {activeGalleryIndex + 1}/5: {galleryItem.title}
            </div>
          </div>

          {/* Gallery Thumbnails (5 views: close-up, sneaker, fit, fabric, packaging) */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {product.gallery.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveGalleryIndex(idx)}
                className={`aspect-square rounded-2xl border-2 p-1 bg-white overflow-hidden transition-all ${
                  activeGalleryIndex === idx
                    ? 'border-neutral-900 ring-2 ring-neutral-900/20 scale-105 shadow-md'
                    : 'border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="w-full h-full rounded-xl bg-neutral-100 overflow-hidden flex items-center justify-center">
                  <SockArtwork
                    product={product}
                    mode={item.type}
                    className="w-full h-full p-1"
                  />
                </div>
                <span className="sr-only">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Fit Guarantees Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-neutral-200 text-center">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-[11px] font-mono font-bold text-neutral-800">FREE SHIPPING</span>
              <span className="text-[10px] text-neutral-500">On orders over ₹799</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-[#FF3D81]" />
              <span className="text-[11px] font-mono font-bold text-neutral-800">EASY 7-DAY RETURNS</span>
              <span className="text-[10px] text-neutral-500">Zero hassle exchange</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#B7FF3C] stroke-neutral-900" />
              <span className="text-[11px] font-mono font-bold text-neutral-800">200-NEEDLE COMBED</span>
              <span className="text-[10px] text-neutral-500">Premium heavy gauge</span>
            </div>
          </div>
        </div>

        {/* Right Side: Product Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Title */}
          <div className="space-y-2 pb-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#B7FF3C] text-black">
                {product.vibe} VIBE ✦
              </span>
              <div className="flex items-center gap-1 text-xs font-mono text-neutral-600">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-neutral-900">{product.rating}</span>
                <span>({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-neutral-900">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-2xl sm:text-3xl font-mono font-black text-neutral-950 tabular-nums">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-base font-mono text-neutral-400 line-through tabular-nums">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded ml-2">
                IN STOCK · SHIPS TODAY
              </span>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          {/* Color Details */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-500 uppercase">COLOR:</span>
              <span className="font-bold text-neutral-900">{product.color}</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full border-2 border-neutral-900 shadow-sm flex items-center justify-center p-0.5"
                style={{ backgroundColor: product.colorHex }}
              >
                <div className="w-full h-full rounded-full border border-white" />
              </div>
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-500 uppercase">SELECT SIZE:</span>
              <span className="text-neutral-400">UK/India Sizing Chart</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { size: 'S', label: 'UK 4-7' },
                { size: 'M', label: 'UK 7-9' },
                { size: 'L', label: 'UK 9-11' },
                { size: 'XL', label: 'UK 11-13' },
              ].map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size as any)}
                  className={`py-3 px-2 rounded-2xl border-2 text-center transition-all ${
                    selectedSize === s.size
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                      : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                  }`}
                >
                  <span className="block font-display font-black text-sm uppercase">
                    {s.size}
                  </span>
                  <span
                    className={`block text-[10px] font-mono mt-0.5 ${
                      selectedSize === s.size ? 'text-neutral-300' : 'text-neutral-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-neutral-500 uppercase block">
              QUANTITY:
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center border-2 border-neutral-200 rounded-full bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-700 font-bold"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-mono font-bold text-sm tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-700 font-bold"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-xs font-mono text-neutral-500">
                Total: <span className="font-bold text-neutral-900">₹{product.price * quantity}</span>
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCartClick}
              className={`w-full py-4 px-8 rounded-full font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl ${
                addedAnimation
                  ? 'bg-[#B7FF3C] text-black scale-[1.02]'
                  : 'bg-neutral-900 hover:bg-[#7C3AED] text-white hover:scale-[1.01]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>ADDED TO YOUR FIT ✦</span>
                </>
              ) : (
                <>
                  <span>ADD TO CART</span>
                  <span>—</span>
                  <span className="font-mono tabular-nums">₹{product.price * quantity}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>

            <button
              onClick={() => onToggleWishlist(product)}
              className={`w-full py-3.5 px-6 rounded-full border-2 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                isWishlisted
                  ? 'border-[#FF3D81] bg-[#FF3D81]/10 text-[#FF3D81]'
                  : 'border-neutral-200 hover:border-neutral-900 bg-white text-neutral-800'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
              />
              <span>{isWishlisted ? 'SAVED IN WISHLIST ♡' : 'ADD TO WISHLIST'}</span>
            </button>
          </div>

          {/* Expandable Product Information Accordions */}
          <div className="border-t border-neutral-200 pt-4 space-y-2">
            {[
              {
                id: 'vibe',
                title: "WHAT'S THE VIBE?",
                content: product.vibeDescription,
              },
              {
                id: 'material',
                title: 'MATERIAL',
                content: product.material,
              },
              {
                id: 'fit',
                title: 'FIT',
                content: product.fit,
              },
              {
                id: 'care',
                title: 'CARE',
                content: product.care,
              },
              {
                id: 'shipping',
                title: 'SHIPPING',
                content:
                  'Dispatches within 24 hours. Fast express delivery with live order tracking across all Indian metro and tier-2 pin codes.',
              },
              {
                id: 'returns',
                title: 'RETURNS',
                content:
                  'Hassle-free 7-day returns on unworn pairs in original collectible packaging according to our transparent return policy.',
              },
            ].map((acc) => (
              <div
                key={acc.id}
                className="border border-neutral-200 rounded-2xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => toggleAccordion(acc.id)}
                  className="w-full p-4 text-left flex items-center justify-between font-display font-extrabold text-xs uppercase tracking-wider text-neutral-900 hover:bg-neutral-50"
                >
                  <span>{acc.title}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === acc.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === acc.id && (
                  <div className="px-4 pb-4 text-xs text-neutral-600 leading-relaxed font-sans border-t border-neutral-100 pt-3">
                    {acc.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION: STYLE IT. */}
      <section className="bg-[#111111] text-white rounded-3xl p-8 md:p-14 border border-neutral-800">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-[#B7FF3C] uppercase tracking-widest">
              STYLING DIRECTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight leading-tight">
              YOUR SOCKS. <br />
              <span className="text-[#FF3D81]">YOUR FIT.</span>
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Styled with chunky sneakers, baggy washed jeans, and an oversized heavyweight tee.
              Socks are the bridge between your pants and kicks—don't let them be an afterthought.
            </p>
            <div className="pt-2">
              <button
                onClick={onNavigateToLookbook}
                className="py-3 px-6 bg-[#B7FF3C] hover:bg-[#a6ee2a] text-black rounded-full font-display font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <span>BUILD THE FIT IN LOOKBOOK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="aspect-[4/3] rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden flex items-center justify-center p-4">
            <SockArtwork product={product} mode="sneaker" className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* SECTION: YOU MIGHT ALSO LIKE */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-neutral-900">
            YOU MIGHT ALSO LIKE
          </h2>
          <span className="text-xs font-mono text-neutral-500">MORE SOCKS FOR YOUR ROTATION</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelect={onSelectProduct}
              onQuickAdd={(prod, size) => onAddToCart(prod, size, 1)}
              isWishlisted={false}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* SECTION: REVIEWS */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
          <div>
            <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest">
              COMMUNITY FEEDBACK
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-neutral-900 mt-1">
              REVIEWS ({product.reviewCount})
            </h2>
          </div>

          {/* Review Filter Pills */}
          <div className="flex items-center gap-2">
            {[
              { key: 'ALL', label: 'ALL REVIEWS' },
              { key: '5', label: '5 STARS ONLY' },
              { key: 'VERIFIED', label: 'VERIFIED BUYERS' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setReviewFilter(f.key as any)}
                className={`py-1.5 px-3 rounded-full text-xs font-mono font-bold uppercase transition-all ${
                  reviewFilter === f.key
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-neutral-400">{rev.date}</span>
              </div>

              <h4 className="font-display font-extrabold text-sm uppercase text-neutral-900">
                "{rev.title}"
              </h4>

              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                {rev.text}
              </p>

              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-neutral-800">{rev.author} · {rev.city}</span>
                <span className="text-[10px] text-neutral-500 font-bold">{rev.fitFeedback}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Mobile Add To Cart Bar */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-display font-extrabold uppercase text-neutral-900 block truncate max-w-[130px]">
            {product.name}
          </span>
          <span className="text-xs font-mono font-bold text-neutral-950 tabular-nums">
            ₹{product.price} · Size {selectedSize}
          </span>
        </div>

        <button
          onClick={handleAddToCartClick}
          className="py-2.5 px-6 bg-neutral-900 hover:bg-[#7C3AED] text-white rounded-full font-display font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
        >
          {addedAnimation ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>ADDED!</span>
            </>
          ) : (
            <>
              <span>ADD TO CART</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

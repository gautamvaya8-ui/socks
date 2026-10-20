import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Sparkles, X, Home, Compass, Lock } from 'lucide-react';
import { Page, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { SockArtwork } from './SockArtwork';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
  wishlistCount: number;
  wishlistItems: Product[];
  onSelectProduct: (product: Product) => void;
  onRemoveFromWishlist: (product: Product) => void;
  onQuickAddToCart: (product: Product, size: 'S' | 'M' | 'L' | 'XL') => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
  wishlistItems,
  onSelectProduct,
  onRemoveFromWishlist,
  onQuickAddToCart,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Search results
  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.vibe.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      {/* Sticky Desktop & Mobile Top Bar */}
      <header className="sticky top-0 z-40 bg-[#FAFAF7]/90 backdrop-blur-md border-b border-neutral-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-6">
          {/* Left: Brand Logo & Animated Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl md:text-3xl font-display font-black tracking-tight text-[#111111] hover:text-[#7C3AED] transition-colors uppercase whitespace-nowrap"
            >
              auraplus
            </button>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#B7FF3C] text-black animate-pulse">
              NEW DROP ⚡
            </span>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-display font-bold uppercase tracking-wider text-neutral-800">
            <button
              onClick={() => onNavigate('shop')}
              className={`hover:text-[#7C3AED] transition-colors relative py-1 ${
                currentPage === 'shop'
                  ? 'text-[#7C3AED] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#7C3AED]'
                  : ''
              }`}
            >
              SHOP
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="hover:text-[#7C3AED] transition-colors relative py-1 flex items-center gap-1"
            >
              <span>NEW DROP</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF3D81]" />
            </button>
            <button
              onClick={() => onNavigate('lookbook')}
              className={`hover:text-[#7C3AED] transition-colors relative py-1 ${
                currentPage === 'lookbook'
                  ? 'text-[#7C3AED] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#7C3AED]'
                  : ''
              }`}
            >
              LOOKBOOK
            </button>
            <button
              onClick={() => onNavigate('lookbook')}
              className="hover:text-[#7C3AED] transition-colors relative py-1"
            >
              OUR WORLD
            </button>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-neutral-800 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setWishlistOpen(true)}
              className="p-2 text-neutral-800 hover:text-black hover:bg-neutral-100 rounded-full transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FF3D81] text-white text-[10px] font-mono font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => onNavigate('cart')}
              className={`flex items-center gap-2 py-2 px-3 sm:px-4 rounded-full transition-all ${
                currentPage === 'cart'
                  ? 'bg-[#111111] text-white'
                  : 'bg-neutral-900 text-white hover:bg-[#7C3AED]'
              }`}
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-mono font-bold tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => onNavigate('admin')}
              className={`py-1.5 px-2.5 sm:px-3 rounded-full text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 border ${
                currentPage === 'admin'
                  ? 'bg-[#B7FF3C] text-black border-black shadow-md'
                  : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-300'
              }`}
              title="Admin Dashboard (PIN: 0000)"
              aria-label="Admin Dashboard"
            >
              <Lock className="w-3.5 h-3.5 text-neutral-800" />
              <span className="hidden sm:inline">ADMIN</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sticky Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111111] text-white border-t border-neutral-800 px-2 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            currentPage === 'home' ? 'text-[#B7FF3C]' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[9px] font-display font-bold uppercase tracking-wider">
            HOME
          </span>
        </button>

        <button
          onClick={() => onNavigate('shop')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            currentPage === 'shop' ? 'text-[#B7FF3C]' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[9px] font-display font-bold uppercase tracking-wider">
            SHOP
          </span>
        </button>

        <button
          onClick={() => setWishlistOpen(true)}
          className="flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-neutral-400 hover:text-white transition-colors relative"
        >
          <Heart className="w-5 h-5" />
          <span className="text-[9px] font-display font-bold uppercase tracking-wider">
            WISHLIST
          </span>
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-[#FF3D81] text-white text-[9px] font-mono font-bold flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          onClick={() => onNavigate('cart')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors relative ${
            currentPage === 'cart' ? 'text-[#B7FF3C]' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[9px] font-display font-bold uppercase tracking-wider">
            CART
          </span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-[#B7FF3C] text-black text-[9px] font-mono font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => onNavigate('admin')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg transition-colors ${
            currentPage === 'admin' ? 'text-[#B7FF3C]' : 'text-neutral-400 hover:text-white'
          }`}
          title="Admin Control (PIN 0000)"
        >
          <Lock className="w-5 h-5" />
          <span className="text-[9px] font-display font-bold uppercase tracking-wider">
            ADMIN
          </span>
        </button>
      </nav>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-[#FAFAF7] rounded-3xl border border-neutral-300 shadow-2xl overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-neutral-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search socks by name, vibe (STREET, LOUD, CUTE), color..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-base md:text-lg font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none"
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 rounded-full hover:bg-neutral-200 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 sm:p-6">
              {searchQuery.trim() === '' ? (
                <div>
                  <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider mb-3">
                    POPULAR SEARCHES
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['CHERRY POP', 'LIME CRUSH', 'MIDNIGHT CHAOS', 'ACID DREAM', 'STREET', 'CUTE'].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-3 py-1.5 rounded-full bg-neutral-200/80 hover:bg-neutral-900 hover:text-white text-xs font-display font-bold uppercase transition-colors"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                    {filteredProducts.length} PAIR{filteredProducts.length > 1 ? 'S' : ''} FOUND
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="p-3 bg-white rounded-2xl border border-neutral-200 hover:border-neutral-900 flex items-center gap-3 cursor-pointer group transition-all"
                      >
                        <div className="w-14 h-14 rounded-xl bg-neutral-100 shrink-0 overflow-hidden">
                          <SockArtwork product={p} className="w-full h-full p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-extrabold text-sm uppercase text-neutral-900 group-hover:text-[#7C3AED] transition-colors truncate">
                            {p.name}
                          </h4>
                          <span className="text-xs text-neutral-500 font-mono">
                            {p.color} · {p.vibe}
                          </span>
                          <div className="text-xs font-mono font-bold text-neutral-950 mt-0.5">
                            ₹{p.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-2 text-neutral-500">
                  <p className="text-sm">No pairs found matching "{searchQuery}".</p>
                  <p className="text-xs">Try searching "LOUD", "STREET", or "PINK".</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WISHLIST DRAWER */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#FAFAF7] h-full shadow-2xl flex flex-col border-l border-neutral-300">
            <div className="p-5 bg-neutral-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 fill-[#FF3D81] text-[#FF3D81]" />
                <h3 className="font-display font-extrabold text-base uppercase tracking-wider">
                  YOUR WISHLIST ({wishlistItems.length})
                </h3>
              </div>
              <button
                onClick={() => setWishlistOpen(false)}
                className="p-1 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {wishlistItems.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-neutral-200 flex items-center justify-center mx-auto text-neutral-400">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-extrabold text-lg uppercase text-neutral-900">
                    YOUR WISHLIST IS EMPTY
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                    Tap the heart icon on any pair to save them for your next fit check.
                  </p>
                  <button
                    onClick={() => {
                      setWishlistOpen(false);
                      onNavigate('shop');
                    }}
                    className="py-2.5 px-6 bg-neutral-900 text-white rounded-full font-display font-bold text-xs uppercase tracking-wider"
                  >
                    EXPLORE SHOP →
                  </button>
                </div>
              ) : (
                wishlistItems.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 bg-white rounded-2xl border border-neutral-200 flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div
                      onClick={() => {
                        onSelectProduct(product);
                        setWishlistOpen(false);
                      }}
                      className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                    >
                      <div className="w-14 h-14 rounded-xl bg-neutral-100 shrink-0 overflow-hidden">
                        <SockArtwork product={product} className="w-full h-full p-1" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-display font-extrabold text-sm uppercase text-neutral-900 truncate">
                          {product.name}
                        </h4>
                        <div className="text-xs font-mono text-neutral-500">
                          ₹{product.price}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onQuickAddToCart(product, 'M')}
                        className="py-1.5 px-3 bg-neutral-900 hover:bg-[#7C3AED] text-white rounded-lg text-xs font-display font-bold uppercase transition-colors"
                      >
                        ADD
                      </button>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="p-1.5 text-neutral-400 hover:text-red-500 rounded"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {wishlistItems.length > 0 && (
              <div className="p-4 border-t border-neutral-200 bg-white">
                <button
                  onClick={() => {
                    wishlistItems.forEach((p) => onQuickAddToCart(p, 'M'));
                    setWishlistOpen(false);
                    onNavigate('cart');
                  }}
                  className="w-full py-3 bg-[#111111] hover:bg-[#7C3AED] text-white rounded-full font-display font-extrabold text-xs uppercase tracking-wider transition-colors"
                >
                  ADD ALL TO CART →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

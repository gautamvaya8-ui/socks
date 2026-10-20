import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { Category, Product, Vibe } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: 'S' | 'M' | 'L' | 'XL') => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onOpenVibeFinder: () => void;
  initialCategory?: Category;
  initialVibe?: Vibe | null;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onSelectProduct,
  onQuickAdd,
  wishlistIds,
  onToggleWishlist,
  onOpenVibeFinder,
  initialCategory = 'ALL',
  initialVibe = null,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [selectedVibe, setSelectedVibe] = useState<Vibe | 'ALL'>(initialVibe || 'ALL');
  const [sortOption, setSortOption] = useState<
    'FEATURED' | 'NEWEST' | 'PRICE: LOW TO HIGH' | 'PRICE: HIGH TO LOW' | 'BEST RATED'
  >('FEATURED');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: Category[] = [
    'ALL',
    'NEW DROP',
    'BESTSELLERS',
    'GRAPHIC',
    'SPORTY',
    'CUTE',
    'MINIMAL',
    'FUN',
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.vibe.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'ALL') {
      if (selectedCategory === 'NEW DROP') {
        result = result.filter((p) => p.badge === 'NEW');
      } else if (selectedCategory === 'BESTSELLERS') {
        result = result.filter((p) => p.badge === 'BESTSELLER' || p.rating >= 4.9);
      } else {
        result = result.filter((p) => p.category === selectedCategory);
      }
    }

    // Vibe filter
    if (selectedVibe !== 'ALL') {
      result = result.filter((p) => p.vibe === selectedVibe);
    }

    // Sorting
    switch (sortOption) {
      case 'PRICE: LOW TO HIGH':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'PRICE: HIGH TO LOW':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'BEST RATED':
        result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'NEWEST':
        result.sort((a, b) => (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0));
        break;
      case 'FEATURED':
      default:
        // Default order
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedVibe, sortOption]);

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedVibe('ALL');
    setSearchQuery('');
    setSortOption('FEATURED');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div>
          <span className="text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-widest">
            STREETWEAR SOCKS COLLECTION
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-neutral-900 mt-1">
            FIND YOUR PERFECT PAIR.
          </h1>
          <p className="text-sm md:text-base text-neutral-600 mt-2">
            Scroll. Discover. Add to cart. Repeat.
          </p>
        </div>

        {/* Vibe Finder CTA Button */}
        <button
          onClick={onOpenVibeFinder}
          className="self-start md:self-auto py-3 px-6 bg-gradient-to-r from-[#7C3AED] to-[#FF3D81] text-white rounded-full font-display font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>WHAT'S YOUR VIBE? (QUIZ)</span>
        </button>
      </div>

      {/* Limited Drop Promotional Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#111111] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="p-2 rounded-xl bg-[#B7FF3C] text-black">
            <Zap className="w-4 h-4 fill-current" />
          </span>
          <div>
            <div className="font-display font-black text-sm uppercase text-[#B7FF3C] tracking-wide">
              LIMITED DROP ⚡
            </div>
            <div className="text-xs text-neutral-300">
              ONCE THEY’RE GONE, THEY’RE GONE. NO RESTOCKS ON COLLAB COLORWAYS.
            </div>
          </div>
        </div>
        <button
          onClick={() => setSelectedCategory('NEW DROP')}
          className="py-2 px-5 bg-white hover:bg-[#B7FF3C] text-black font-display font-bold text-xs uppercase tracking-wider rounded-full transition-colors whitespace-nowrap"
        >
          SHOP THE DROP →
        </button>
      </div>

      {/* Controls Bar: Search, Category Tabs & Sort */}
      <div className="space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-2 px-4 rounded-full text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'bg-white hover:bg-neutral-200 text-neutral-700 border border-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name, color, or vibe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-neutral-300 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-800"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Vibe Sub-filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-neutral-500 uppercase font-bold hidden sm:inline">
                VIBE:
              </span>
              <select
                value={selectedVibe}
                onChange={(e) => setSelectedVibe(e.target.value as any)}
                className="py-2 px-3 rounded-full bg-white border border-neutral-300 text-xs font-mono font-bold uppercase text-neutral-800 focus:outline-none focus:border-neutral-900 cursor-pointer"
              >
                <option value="ALL">ALL VIBES</option>
                <option value="MINIMAL">MINIMAL</option>
                <option value="STREET">STREET</option>
                <option value="PLAYFUL">PLAYFUL</option>
                <option value="CUTE">CUTE</option>
                <option value="CHAOTIC">CHAOTIC</option>
                <option value="LOUD">LOUD</option>
              </select>
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-neutral-500 uppercase font-bold hidden sm:inline">
                SORT:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="py-2 px-3 rounded-full bg-white border border-neutral-300 text-xs font-mono font-bold uppercase text-neutral-800 focus:outline-none focus:border-neutral-900 cursor-pointer"
              >
                <option value="FEATURED">FEATURED</option>
                <option value="NEWEST">NEWEST</option>
                <option value="PRICE: LOW TO HIGH">PRICE: LOW TO HIGH</option>
                <option value="PRICE: HIGH TO LOW">PRICE: HIGH TO LOW</option>
                <option value="BEST RATED">BEST RATED</option>
              </select>
            </div>

            {/* Reset button if filtered */}
            {(selectedCategory !== 'ALL' || selectedVibe !== 'ALL' || searchQuery) && (
              <button
                onClick={resetFilters}
                className="p-2 rounded-full border border-neutral-300 hover:bg-neutral-100 text-neutral-600 hover:text-black transition-colors"
                title="Reset filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Count Tracker */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-2">
        <span>SHOWING {filteredProducts.length} STATEMENT PAIRS</span>
        <span>ALL ORDERS INCLUDE FREE PACKAGING</span>
      </div>

      {/* Responsive Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-neutral-200">
          <h3 className="font-display font-extrabold text-2xl uppercase text-neutral-900">
            NO SOCKS FOUND
          </h3>
          <p className="text-sm text-neutral-500 max-w-md mx-auto">
            We couldn't find any socks matching your search filters. Try clearing filters or
            searching another vibe.
          </p>
          <button
            onClick={resetFilters}
            className="py-3 px-6 bg-neutral-900 text-white rounded-full font-display font-bold text-xs uppercase tracking-wider"
          >
            RESET ALL FILTERS
          </button>
        </div>
      )}
    </div>
  );
};

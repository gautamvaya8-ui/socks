import React, { useState } from 'react';
import { Heart, Plus, Star, Check } from 'lucide-react';
import { Product } from '../types';
import { SockArtwork } from './SockArtwork';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product, size: 'S' | 'M' | 'L' | 'XL') => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (size: 'S' | 'M' | 'L' | 'XL') => {
    onQuickAdd(product, size);
    setShowSizePicker(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const getBadgeStyle = (badge: Product['badge']) => {
    switch (badge) {
      case 'NEW':
        return 'bg-[#7C3AED] text-white rotate-[-2deg]';
      case 'BESTSELLER':
        return 'bg-[#FF3D81] text-white rotate-[2deg]';
      case 'LIMITED':
        return 'bg-[#111111] text-[#B7FF3C] border border-[#B7FF3C]/50 rotate-[-3deg]';
      case 'HOT':
        return 'bg-[#FF7A30] text-white rotate-[1.5deg]';
      default:
        return '';
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizePicker(false);
      }}
      className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
    >
      {/* Product Image Area */}
      <div
        onClick={() => onSelect(product)}
        className="relative aspect-square w-full cursor-pointer overflow-hidden bg-neutral-100"
      >
        {/* Sock Art: toggles to 'sneaker' view on hover or zoom effect */}
        <SockArtwork
          product={product}
          mode={isHovered ? 'sneaker' : 'sock'}
          isHovered={isHovered}
          className="w-full h-full"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`inline-block px-2.5 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider rounded-md shadow-sm transition-transform group-hover:scale-105 ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge} ✦
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-[#FF3D81] text-white scale-110 shadow-md'
              : 'bg-white/80 backdrop-blur-sm text-neutral-700 hover:bg-white hover:text-black hover:scale-105'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isWishlisted ? 'fill-current scale-110' : ''
            }`}
          />
        </button>

        {/* Quick Add Overlay */}
        <div
          className={`absolute bottom-3 left-3 right-3 z-20 transition-all duration-200 ${
            isHovered || showSizePicker ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {justAdded ? (
            <div className="w-full py-2.5 px-3 bg-[#B7FF3C] text-black font-display font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-lg">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>ADDED TO YOUR FIT ✦</span>
            </div>
          ) : showSizePicker ? (
            <div className="bg-neutral-900 text-white p-2 rounded-xl shadow-xl flex items-center justify-between gap-1 animate-fade-in">
              <span className="text-[10px] font-mono uppercase text-neutral-400 pl-1">
                SIZE:
              </span>
              <div className="flex items-center gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleAdd(s)}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-[#B7FF3C] hover:text-black text-xs font-bold font-mono transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowSizePicker(true)}
              className="w-full py-2.5 px-3 bg-neutral-900 hover:bg-[#7C3AED] text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>QUICK ADD</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Metadata Info */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2">
        <div onClick={() => onSelect(product)} className="cursor-pointer space-y-1">
          <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
            <span>{product.color}</span>
            <div className="flex items-center gap-0.5 text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-neutral-700">{product.rating}</span>
            </div>
          </div>

          <h3 className="font-display font-extrabold text-sm md:text-base text-neutral-900 uppercase tracking-tight group-hover:text-[#7C3AED] transition-colors truncate">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-1">
            {product.description}
          </p>
        </div>

        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono font-black text-base text-neutral-950 tabular-nums">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-neutral-400 line-through tabular-nums">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono uppercase font-bold text-neutral-400">
            {product.vibe}
          </span>
        </div>
      </div>
    </div>
  );
};

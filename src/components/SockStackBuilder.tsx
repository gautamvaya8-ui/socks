import React, { useState } from 'react';
import { Check, Plus, Layers, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { SockArtwork } from './SockArtwork';

interface SockStackBuilderProps {
  onAddStackToCart: (items: { product: Product; size: 'M'; quantity: number }[]) => void;
  onNavigateToCart: () => void;
}

export const SockStackBuilder: React.FC<SockStackBuilderProps> = ({
  onAddStackToCart,
  onNavigateToCart,
}) => {
  const [tier, setTier] = useState<1 | 3 | 5>(3);
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'cherry-pop',
    'lime-crush',
    'midnight-chaos',
  ]);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Pricing configuration
  const pricing = {
    1: { price: 399, original: 399, savings: 0 },
    3: { price: 999, original: 1197, savings: 198 },
    5: { price: 1499, original: 1995, savings: 496 },
  };

  const handleSelectTier = (t: 1 | 3 | 5) => {
    setTier(t);
    // Adjust selected IDs length
    if (selectedIds.length > t) {
      setSelectedIds(selectedIds.slice(0, t));
    } else if (selectedIds.length < t) {
      const extraNeeded = t - selectedIds.length;
      const unselected = PRODUCTS.filter((p) => !selectedIds.includes(p.id)).slice(0, extraNeeded);
      setSelectedIds([...selectedIds, ...unselected.map((p) => p.id)]);
    }
  };

  const toggleProductInStack = (productId: string) => {
    if (selectedIds.includes(productId)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((id) => id !== productId));
      }
    } else {
      if (selectedIds.length < tier) {
        setSelectedIds([...selectedIds, productId]);
      } else {
        // Replace last one
        const updated = [...selectedIds.slice(0, tier - 1), productId];
        setSelectedIds(updated);
      }
    }
  };

  const handleBuildStack = () => {
    const productsToAdd = PRODUCTS.filter((p) => selectedIds.includes(p.id));
    const items = productsToAdd.map((product) => ({
      product,
      size: 'M' as const,
      quantity: 1,
    }));
    onAddStackToCart(items);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onNavigateToCart();
    }, 1200);
  };

  const currentPricing = pricing[tier];

  return (
    <div className="bg-[#111111] text-[#FAFAF7] rounded-3xl p-6 md:p-12 border border-neutral-800 relative overflow-hidden shadow-2xl">
      {/* Decorative background glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#7C3AED]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#B7FF3C]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#B7FF3C] text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BUNDLE & SAVE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-white">
            BUILD YOUR SOCK STACK.
          </h2>
          <p className="text-neutral-400 text-sm md:text-base">
            Stack your rotation with statement pairs. More pairs, bigger flex, sweeter discount.
          </p>
        </div>

        {/* Tier Selector */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8">
          {[
            { count: 1, label: '1 PAIR', price: '₹399', badge: 'STARTER' },
            { count: 3, label: '3 PAIRS', price: '₹999', badge: 'SAVE ₹198', popular: true },
            { count: 5, label: '5 PAIRS', price: '₹1,499', badge: 'SAVE ₹496' },
          ].map((t) => (
            <button
              key={t.count}
              onClick={() => handleSelectTier(t.count as any)}
              className={`p-3 md:p-4 rounded-2xl border-2 text-center transition-all relative ${
                tier === t.count
                  ? 'border-[#B7FF3C] bg-neutral-900 shadow-lg scale-105'
                  : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 text-neutral-300'
              }`}
            >
              {t.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider bg-[#FF3D81] text-white rounded-full">
                  MOST POPULAR
                </span>
              )}
              <span className="block font-display font-extrabold text-sm md:text-base uppercase text-white">
                {t.label}
              </span>
              <span className="block font-mono font-bold text-xs md:text-sm text-[#B7FF3C] mt-1 tabular-nums">
                {t.price}
              </span>
              <span className="inline-block mt-1 text-[10px] font-semibold text-neutral-400">
                {t.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Stack Slots & Selector */}
        <div className="bg-neutral-900/90 rounded-2xl p-5 border border-neutral-800 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#B7FF3C]" />
              <span>
                SELECT {tier} PAIR{tier > 1 ? 'S' : ''} ({selectedIds.length}/{tier} SELECTED)
              </span>
            </span>
            {currentPricing.savings > 0 && (
              <span className="text-xs font-mono font-extrabold text-[#B7FF3C] bg-[#B7FF3C]/10 px-2.5 py-1 rounded-md">
                YOU SAVE ₹{currentPricing.savings} ✦
              </span>
            )}
          </div>

          {/* Product grid to pick from */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {PRODUCTS.slice(0, 12).map((product) => {
              const isSelected = selectedIds.includes(product.id);
              return (
                <button
                  key={product.id}
                  onClick={() => toggleProductInStack(product.id)}
                  className={`p-2 rounded-xl border text-left transition-all relative flex flex-col items-center group ${
                    isSelected
                      ? 'border-[#B7FF3C] bg-neutral-800/90 shadow-md ring-2 ring-[#B7FF3C]/50'
                      : 'border-neutral-800 bg-neutral-950 hover:border-neutral-600'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#B7FF3C] text-black flex items-center justify-center text-xs font-bold shadow-md z-10">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                  <div className="w-full aspect-square rounded-lg bg-neutral-900 overflow-hidden mb-1.5 flex items-center justify-center">
                    <SockArtwork product={product} className="h-full w-full p-1" />
                  </div>
                  <span className="text-[11px] font-display font-bold uppercase text-white truncate w-full text-center">
                    {product.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {product.vibe}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-neutral-950 rounded-2xl border border-neutral-800">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-display font-extrabold text-white tabular-nums">
                ₹{currentPricing.price}
              </span>
              {currentPricing.savings > 0 && (
                <span className="text-sm font-mono text-neutral-500 line-through tabular-nums">
                  ₹{currentPricing.original}
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Includes {selectedIds.length} customized pairs with free gift collectible pouch.
            </p>
          </div>

          <button
            onClick={handleBuildStack}
            disabled={selectedIds.length !== tier}
            className={`w-full sm:w-auto py-3.5 px-8 rounded-full font-display font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              selectedIds.length === tier
                ? 'bg-[#B7FF3C] hover:bg-[#a2e82f] text-black shadow-lg shadow-[#B7FF3C]/20 hover:scale-105'
                : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>STACK ADDED! TAKING YOU TO CART...</span>
              </>
            ) : (
              <>
                <span>BUILD MY STACK</span>
                <span className="text-xs font-mono">→</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

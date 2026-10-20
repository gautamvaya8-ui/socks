import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, RotateCcw } from 'lucide-react';
import { Product, Vibe } from '../types';
import { PRODUCTS } from '../data/products';
import { SockArtwork } from './SockArtwork';

interface VibeFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onShopVibe: (vibe: Vibe) => void;
}

export const VibeFinderModal: React.FC<VibeFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onShopVibe,
}) => {
  const [step, setStep] = useState<number>(1);
  const [fit, setFit] = useState<'CLEAN' | 'STREET' | 'CUTE' | 'CHAOTIC' | null>(null);
  const [color, setColor] = useState<'BLACK' | 'PINK' | 'BLUE' | 'GREEN' | 'ORANGE' | 'PURPLE' | null>(null);
  const [loudness, setLoudness] = useState<'LOWKEY' | 'MEDIUM' | 'LOUD AF' | null>(null);

  if (!isOpen) return null;

  const resetQuiz = () => {
    setStep(1);
    setFit(null);
    setColor(null);
    setLoudness(null);
  };

  // Determine recommendation based on choices
  const getRecommendation = () => {
    let title = 'CHAOTIC MAIN CHARACTER ⚡';
    let subtitle = 'You don’t do boring. Your fit screams confidence and high visual decibels.';
    let matchedIds = ['acid-dream', 'lime-crush', 'midnight-chaos'];

    if (fit === 'CLEAN' || loudness === 'LOWKEY') {
      title = 'EFFORTLESS ARCHITECT ☁️';
      subtitle = 'Subtle, crisp, and impeccably curated. Clean lines that elevate minimal footwear.';
      matchedIds = ['sky-high', 'cloud-nine', 'matcha-mood'];
    } else if (fit === 'CUTE' || color === 'PINK') {
      title = 'SWEET Y2K NOSTALGIA 🌸';
      subtitle = 'Playful, sweet, and aesthetically delicious with sneakers and washed denim.';
      matchedIds = ['cherry-pop', 'strawberry-milk', 'pixel-heart'];
    } else if (fit === 'STREET' || color === 'BLACK' || color === 'PURPLE') {
      title = 'NOCTURNAL STREETWEAR ICON 🖤';
      subtitle = 'Dark silhouette with high-contrast shock accents made for night photography.';
      matchedIds = ['midnight-chaos', 'blue-hour', 'off-duty'];
    } else if (loudness === 'LOUD AF' || color === 'ORANGE' || color === 'GREEN') {
      title = 'MAXIMALIST HEAD-TURNER 🔥';
      subtitle = 'Why wear basic socks when you can electrify the room from 50 yards away?';
      matchedIds = ['neon-wave', 'lime-crush', 'acid-dream'];
    }

    const matchedProducts = PRODUCTS.filter((p) => matchedIds.includes(p.id));
    return { title, subtitle, matchedProducts };
  };

  const recommendation = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#FAFAF7] text-neutral-900 rounded-3xl border border-neutral-300 shadow-2xl overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 text-white">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#B7FF3C] text-black">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-display font-extrabold text-sm tracking-wider uppercase">
              WHAT’S YOUR SOCK VIBE?
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Progress */}
        {step <= 3 && (
          <div className="w-full bg-neutral-200 h-1">
            <div
              className="bg-[#7C3AED] h-1 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* STEP 1: WHAT'S YOUR FIT? */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-widest">
                  QUESTION 01 OF 03
                </span>
                <h3 className="text-2xl font-display font-extrabold text-neutral-900 mt-1 uppercase">
                  WHAT’S YOUR FIT?
                </h3>
                <p className="text-sm text-neutral-600 mt-1">
                  How does your daily sneaker and streetwear rotation look?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'CLEAN', desc: 'Minimal, neat, neutral tones' },
                  { key: 'STREET', desc: 'Baggy cargos, hoodies, chunky kicks' },
                  { key: 'CUTE', desc: 'Pastels, sweet vibes, vintage aesthetics' },
                  { key: 'CHAOTIC', desc: 'Unapologetic, loud, unexpected colors' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setFit(item.key as any);
                      setStep(2);
                    }}
                    className={`p-4 text-left rounded-2xl border-2 transition-all ${
                      fit === item.key
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                        : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-900'
                    }`}
                  >
                    <span className="block font-display font-bold text-base tracking-wide uppercase">
                      {item.key}
                    </span>
                    <span
                      className={`block text-xs mt-1 ${
                        fit === item.key ? 'text-neutral-300' : 'text-neutral-500'
                      }`}
                    >
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: WHAT COLOR ARE YOU FEELING? */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-widest">
                  QUESTION 02 OF 03
                </span>
                <h3 className="text-2xl font-display font-extrabold text-neutral-900 mt-1 uppercase">
                  WHAT COLOR ARE YOU FEELING?
                </h3>
                <p className="text-sm text-neutral-600 mt-1">
                  Pick the dominant palette that calls to you today.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: 'BLACK', hex: '#111111', text: '#FFFFFF' },
                  { name: 'PINK', hex: '#FF3D81', text: '#FFFFFF' },
                  { name: 'BLUE', hex: '#2563EB', text: '#FFFFFF' },
                  { name: 'GREEN', hex: '#10B981', text: '#FFFFFF' },
                  { name: 'ORANGE', hex: '#FF7A30', text: '#FFFFFF' },
                  { name: 'PURPLE', hex: '#7C3AED', text: '#FFFFFF' },
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setColor(c.name as any);
                      setStep(3);
                    }}
                    className="p-4 rounded-2xl border-2 border-neutral-200 hover:border-neutral-900 bg-white flex flex-col items-center justify-center gap-2 group transition-all"
                  >
                    <span
                      className="w-8 h-8 rounded-full shadow-inner transition-transform group-hover:scale-110"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="font-display font-bold text-xs uppercase tracking-wider text-neutral-900">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: HOW LOUD? */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-widest">
                  QUESTION 03 OF 03
                </span>
                <h3 className="text-2xl font-display font-extrabold text-neutral-900 mt-1 uppercase">
                  HOW LOUD?
                </h3>
                <p className="text-sm text-neutral-600 mt-1">
                  How much attention do you want your socks to command?
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    key: 'LOWKEY',
                    desc: 'Clean accent, pairs with anything, subtle flex',
                    badge: 'QUIET STATEMENT',
                  },
                  {
                    key: 'MEDIUM',
                    desc: 'Visible graphics, clear personality, stylish pop',
                    badge: 'STREET SIGNATURE',
                  },
                  {
                    key: 'LOUD AF',
                    desc: 'Full chromatic shock, conversational starter, main character',
                    badge: 'ZERO BORING SOCKS',
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setLoudness(item.key as any);
                      setStep(4);
                    }}
                    className="w-full p-4 text-left rounded-2xl border-2 border-neutral-200 bg-white hover:border-neutral-900 hover:bg-neutral-50 transition-all flex items-center justify-between"
                  >
                    <div>
                      <span className="block font-display font-bold text-base tracking-wide uppercase text-neutral-900">
                        {item.key}
                      </span>
                      <span className="block text-xs text-neutral-500 mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-1 bg-neutral-100 rounded text-neutral-700 font-bold">
                      {item.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: RESULT */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
                  YOUR VIBE MATCH:
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-neutral-900 uppercase">
                  {recommendation.title}
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto">
                  {recommendation.subtitle}
                </p>
              </div>

              {/* Recommended Products */}
              <div className="grid grid-cols-3 gap-3">
                {recommendation.matchedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="p-3 bg-white rounded-2xl border border-neutral-200 hover:border-neutral-900 cursor-pointer group transition-all"
                  >
                    <div className="aspect-square rounded-xl bg-neutral-100 overflow-hidden mb-2">
                      <SockArtwork product={p} className="h-full w-full" />
                    </div>
                    <div className="text-center">
                      <div className="font-display font-bold text-xs uppercase truncate text-neutral-900">
                        {p.name}
                      </div>
                      <div className="text-xs font-mono text-neutral-500 tabular-nums">
                        ₹{p.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onShopVibe(recommendation.matchedProducts[0].vibe);
                    onClose();
                  }}
                  className="w-full sm:flex-1 py-3 px-6 bg-[#111111] hover:bg-[#7C3AED] text-white rounded-full font-display font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>SHOP YOUR VIBE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={resetQuiz}
                  className="py-3 px-5 border border-neutral-300 hover:border-neutral-900 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors text-neutral-700"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RETAKE</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

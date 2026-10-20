import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Flame,
  Check,
  Star,
  ChevronRight,
  ShieldCheck,
  Feather,
  Anchor,
  Instagram,
  Twitter,
} from 'lucide-react';
import { Page, Product, Vibe } from '../types';
import { PRODUCTS, REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SockArtwork } from '../components/SockArtwork';
import { SockStackBuilder } from '../components/SockStackBuilder';
import { DropCountdown } from '../components/DropCountdown';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: 'S' | 'M' | 'L' | 'XL') => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddStackToCart: (items: { product: Product; size: 'M'; quantity: number }[]) => void;
  onSelectVibeFilter: (vibe: Vibe) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProduct,
  onQuickAdd,
  wishlistIds,
  onToggleWishlist,
  onAddStackToCart,
  onSelectVibeFilter,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // New drop products (first 6)
  const newDropProducts = PRODUCTS.slice(0, 6);

  // Bestsellers products
  const bestsellerProducts = PRODUCTS.filter((p) => p.badge === 'BESTSELLER' || p.rating >= 4.9).slice(0, 6);

  // Vibes data
  const vibeCategories: {
    name: Vibe;
    desc: string;
    bg: string;
    text: string;
    accent: string;
    sampleProduct: Product;
  }[] = [
    {
      name: 'MINIMAL',
      desc: 'Clean lines, neutral tones, effortless flex',
      bg: 'bg-neutral-100',
      text: 'text-neutral-900',
      accent: 'border-neutral-300',
      sampleProduct: PRODUCTS.find((p) => p.id === 'sky-high')!,
    },
    {
      name: 'STREET',
      desc: 'Obsidian noir, nocturnal flash, oversized cargo fits',
      bg: 'bg-neutral-950',
      text: 'text-white',
      accent: 'border-[#2563EB]',
      sampleProduct: PRODUCTS.find((p) => p.id === 'midnight-chaos')!,
    },
    {
      name: 'PLAYFUL',
      desc: 'High dopamine, sweet cherries, bold candy accents',
      bg: 'bg-[#FFF0F5]',
      text: 'text-[#111111]',
      accent: 'border-[#FF3D81]',
      sampleProduct: PRODUCTS.find((p) => p.id === 'cherry-pop')!,
    },
    {
      name: 'CUTE',
      desc: '8-bit nostalgia, strawberry swirl, soft washed pastel',
      bg: 'bg-[#FDF2F8]',
      text: 'text-[#111111]',
      accent: 'border-[#EC4899]',
      sampleProduct: PRODUCTS.find((p) => p.id === 'pixel-heart')!,
    },
    {
      name: 'CHAOTIC',
      desc: 'Acid lime, thermal distortion, main character energy',
      bg: 'bg-[#18181B]',
      text: 'text-[#B7FF3C]',
      accent: 'border-[#B7FF3C]',
      sampleProduct: PRODUCTS.find((p) => p.id === 'acid-dream')!,
    },
    {
      name: 'LOUD',
      desc: 'Maximum decibels, high-voltage neon, turn all heads',
      bg: 'bg-[#FF7A30]',
      text: 'text-white',
      accent: 'border-white',
      sampleProduct: PRODUCTS.find((p) => p.id === 'neon-wave')!,
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden bg-[#111111] text-white pt-12 pb-20 md:py-28 px-4 sm:px-6 lg:px-8 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#7C3AED]/25 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#B7FF3C]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Floating Sticker Elements with gentle CSS animations */}
        <div
          className="hidden lg:flex absolute top-16 right-16 z-20 items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#B7FF3C] text-black font-display font-extrabold text-xs uppercase tracking-wider shadow-xl animate-float"
          style={{ ['--rot' as any]: '-4deg' }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>NEW DROP ✦</span>
        </div>

        <div
          className="hidden lg:flex absolute bottom-24 left-12 z-20 items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF3D81] text-white font-display font-extrabold text-xs uppercase tracking-wider shadow-xl animate-float-delayed"
          style={{ ['--rot' as any]: '3deg' }}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>NO BORING SOCKS</span>
        </div>

        <div
          className="hidden xl:flex absolute top-40 left-14 z-20 items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] font-bold uppercase tracking-wider shadow-lg animate-float"
          style={{ ['--rot' as any]: '-2deg' }}
        >
          <span>MADE FOR YOUR FIT</span>
        </div>

        <div
          className="hidden xl:flex absolute bottom-44 right-20 z-20 items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB] text-white font-display font-bold text-xs uppercase tracking-wider shadow-lg animate-float-delayed"
          style={{ ['--rot' as any]: '2deg' }}
        >
          <Zap className="w-3 h-3" />
          <span>GEN-Z ENERGY</span>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#B7FF3C] text-xs font-mono font-bold tracking-widest uppercase">
              <span>AURA PLUS · STATEMENT SOCKS</span>
              <span>✦</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.95] uppercase">
              YOUR FIT. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                YOUR VIBE.
              </span>{' '}
              <br />
              <span className="text-[#B7FF3C]">YOUR SOCKS.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Not basic. Never boring. <br />
              Socks made for people who don’t dress boring.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onNavigate('shop')}
                className="w-full sm:w-auto py-4 px-8 bg-[#B7FF3C] hover:bg-[#a6ee2a] text-black font-display font-black text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#B7FF3C]/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <span>SHOP THE DROP</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => onNavigate('lookbook')}
                className="w-full sm:w-auto py-4 px-8 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white font-display font-bold text-sm uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2"
              >
                <span>EXPLORE COLLECTION</span>
              </button>
            </div>

            {/* Trust Micro-Metrics */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-1.5">
                <span className="text-[#B7FF3C] font-bold">✓</span>
                <span>200-Needle Combed Cotton</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#B7FF3C] font-bold">✓</span>
                <span>Stay-Up Anti-Slip Rib</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#B7FF3C] font-bold">✓</span>
                <span>Ships Across India in 48h</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl bg-neutral-900 border-2 border-neutral-800 p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
              <div className="flex justify-between items-center z-10">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase bg-white/10 text-white px-2.5 py-1 rounded">
                  FEATURED DROP
                </span>
                <span className="text-xs font-mono font-black text-[#B7FF3C]">
                  DROP 01 // 2026
                </span>
              </div>

              {/* Sock Silhouette Artwork Showcase */}
              <div className="relative z-10 w-full flex-1 flex items-center justify-center py-4">
                <SockArtwork
                  product={PRODUCTS[0]}
                  mode="sock"
                  className="w-full h-full"
                  isHovered={true}
                />
              </div>

              <div className="relative z-10 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-lg uppercase text-white">
                    CHERRY POP
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">Playful · Crew Cut</p>
                </div>
                <button
                  onClick={() => onSelectProduct(PRODUCTS[0])}
                  className="py-2 px-4 bg-white hover:bg-[#B7FF3C] hover:text-black text-black font-display font-bold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center gap-1"
                >
                  <span>VIEW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — MARQUEE */}
      <section className="relative overflow-hidden py-3 bg-[#B7FF3C] text-black font-display font-black text-xs sm:text-sm tracking-wider uppercase rotate-[-1deg] border-y-2 border-black shadow-md">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span className="mx-4">NO BORING SOCKS ✦</span>
          <span className="mx-4">MADE FOR YOUR FIT ✦</span>
          <span className="mx-4">NEW DROP ✦</span>
          <span className="mx-4">EXPRESS YOURSELF ✦</span>
          <span className="mx-4">SOCKS ARE 40% OF THE VISUAL FIT ✦</span>
          <span className="mx-4">NO BORING SOCKS ✦</span>
          <span className="mx-4">MADE FOR YOUR FIT ✦</span>
          <span className="mx-4">NEW DROP ✦</span>
          <span className="mx-4">EXPRESS YOURSELF ✦</span>
          <span className="mx-4">STREETWEAR SOCKS ✦</span>
        </div>
      </section>

      {/* SECTION 3 — NEW DROP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-[#7C3AED] uppercase">
              FRESH PAIRS · FRESH ENERGY
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-neutral-900 mt-1">
              THE NEW DROP IS HERE.
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-display font-bold uppercase tracking-wider text-neutral-900 hover:text-[#7C3AED] flex items-center gap-1 group whitespace-nowrap"
          >
            <span>VIEW ALL 12 PAIRS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {newDropProducts.map((product) => (
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
      </section>

      {/* SECTION 4 — SHOP BY VIBE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase">
            CHOOSE YOUR FREQUENCY
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-neutral-900 mt-1">
            WHAT’S YOUR VIBE?
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Every fit has an attitude. Match your socks to your exact mood.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {vibeCategories.map((v) => (
            <div
              key={v.name}
              onClick={() => {
                onSelectVibeFilter(v.name);
                onNavigate('shop');
              }}
              className={`p-5 sm:p-6 rounded-3xl border-2 ${v.accent} ${v.bg} ${v.text} cursor-pointer group hover:scale-[1.02] hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px]`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest px-2.5 py-0.5 rounded bg-black/10 backdrop-blur-sm">
                  VIBE
                </span>
                <span className="text-xs font-mono font-bold opacity-70 group-hover:translate-x-1 transition-transform">
                  EXPLORE →
                </span>
              </div>

              <div className="my-3 flex justify-center h-24">
                <SockArtwork
                  product={v.sampleProduct}
                  mode="sock"
                  className="w-full h-full max-h-24"
                />
              </div>

              <div>
                <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight">
                  {v.name}
                </h3>
                <p className="text-xs opacity-80 line-clamp-1 mt-0.5">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — BESTSELLERS HORIZONTAL CAROUSEL */}
      <section className="bg-neutral-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-[#FF3D81] uppercase">
                MOST WANTED ON THE STREET
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-neutral-900 mt-1">
                EVERYONE’S WEARING THESE.
              </h2>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-neutral-600">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-neutral-900">4.9 / 5.0</span>
              <span>Based on 800+ Gen-Z sneakerheads</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {bestsellerProducts.slice(0, 4).map((product) => (
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
        </div>
      </section>

      {/* SECTION 6 — WHY OUR SOCKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase">
            NO COMPROMISES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-neutral-900 mt-1">
            WHY SETTLE FOR BASIC?
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Engineered specifically to elevate footwear culture without sacrificing comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'SOFT AF',
              desc: 'Premium soft fabric made for everyday comfort with 200-needle combed cotton loops.',
              icon: Feather,
              accent: 'bg-[#B7FF3C] text-black',
            },
            {
              title: 'FIT CHECK',
              desc: 'Designed to stay comfortable and secure with 360° arch compression and zero heel-slip.',
              icon: Anchor,
              accent: 'bg-[#7C3AED] text-white',
            },
            {
              title: 'NO BASIC ENERGY',
              desc: 'Statement designs made to stand out and turn casual footwear into an editorial moment.',
              icon: Flame,
              accent: 'bg-[#FF3D81] text-white',
            },
            {
              title: 'EVERYDAY FLEX',
              desc: 'Made for sneakers, cargos, shorts, wide-leg denim and everything between.',
              icon: Zap,
              accent: 'bg-[#2563EB] text-white',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 bg-white rounded-3xl border border-neutral-200 hover:border-neutral-900 transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${item.accent} shadow-md`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-black text-xl uppercase tracking-tight text-neutral-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 font-bold">
                <span>✦</span>
                <span>AURAPLUS STANDARD</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — EDITORIAL LOOKBOOK TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-white rounded-3xl p-8 md:p-14 border border-neutral-800">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-mono font-bold text-[#B7FF3C] uppercase tracking-widest">
                EDITORIAL LOOKBOOK
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tight mt-1">
                SOCKS MEET THE FIT.
              </h2>
              <p className="text-neutral-400 text-sm md:text-base mt-2 max-w-lg">
                Sneakers. Baggy jeans. Shorts. Cargo pants. Oversized tees. Streetwear outfits.
                See how the community styles them.
              </p>
            </div>
            <button
              onClick={() => onNavigate('lookbook')}
              className="py-3.5 px-7 bg-white hover:bg-[#B7FF3C] text-black rounded-full font-display font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors self-start lg:self-end"
            >
              <span>SEE THE LOOKBOOK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'MONDAY MOOD',
                tag: 'BAGGY DENIM + WHITE KICKS',
                desc: 'Coffee. Sneakers. Good socks. Start the week right.',
                sample: PRODUCTS[0],
              },
              {
                title: 'MIDNIGHT FIT',
                tag: 'DARK OVERSIZED STREETWEAR',
                desc: 'Dark outfit. Loud socks. Flash photography ready.',
                sample: PRODUCTS[2],
              },
              {
                title: 'COLOR THEORY',
                tag: 'CARGOS + NEON POP',
                desc: 'Why wear one color when you can wear five?',
                sample: PRODUCTS[1],
              },
            ].map((card) => (
              <div
                key={card.title}
                onClick={() => onNavigate('lookbook')}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-neutral-600 cursor-pointer group transition-all"
              >
                <div className="aspect-[4/3] rounded-xl bg-neutral-950 overflow-hidden mb-4 relative flex items-center justify-center">
                  <SockArtwork
                    product={card.sample}
                    mode="sneaker"
                    className="w-full h-full"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] font-mono font-bold text-white uppercase">
                    {card.tag}
                  </div>
                </div>
                <h3 className="font-display font-extrabold text-lg uppercase text-white group-hover:text-[#B7FF3C] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — BRAND STATEMENT HUGE TYPOGRAPHY */}
      <section className="py-12 md:py-20 text-center px-4 max-w-5xl mx-auto space-y-4">
        <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#7C3AED]">
          THE AURAPLUS MANIFESTO
        </div>
        <div className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none text-neutral-900 space-y-2">
          <div className="hover:text-[#FF3D81] transition-colors cursor-default">BE LOUD.</div>
          <div className="hover:text-[#7C3AED] transition-colors cursor-default">BE WEIRD.</div>
          <div className="hover:text-[#2563EB] transition-colors cursor-default">BE YOU.</div>
          <div className="text-neutral-400 pt-2 text-3xl sm:text-5xl md:text-6xl">
            JUST DON'T BE BORING.
          </div>
        </div>
      </section>

      {/* SECTION 9 — SOCIAL PROOF / REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase">
            VERIFIED FIT CHECKS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-neutral-900 mt-1">
            THE PEOPLE HAVE SPOKEN.
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Real sneakerheads styling auraplus across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.slice(0, 4).map((rev) => (
            <div
              key={rev.id}
              className="p-5 bg-white rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <h3 className="font-display font-extrabold text-base text-neutral-900 uppercase">
                  "{rev.title}"
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {rev.text}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-neutral-900">{rev.author}</span>
                  <span className="text-neutral-500 font-mono text-[10px] block">
                    {rev.city} · {rev.date}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  VERIFIED BUYER
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10 — NEXT DROP COUNTDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DropCountdown />
      </section>

      {/* SECTION 11 — SOCK STACK FEATURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SockStackBuilder
          onAddStackToCart={onAddStackToCart}
          onNavigateToCart={() => onNavigate('cart')}
        />
      </section>

      {/* SECTION 12 — NEWSLETTER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-[#B7FF3C] text-black rounded-3xl p-8 md:p-12 border-2 border-black shadow-xl space-y-4">
          <div className="inline-block px-3 py-1 bg-black text-[#B7FF3C] text-xs font-mono font-bold uppercase rounded-full">
            VIP CLUB
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight">
            GET THE GOOD STUFF.
          </h2>
          <p className="text-sm sm:text-base font-medium max-w-md mx-auto text-neutral-900">
            New drops. Limited pairs. Secret restocks. No boring emails.
          </p>

          {newsletterSubscribed ? (
            <div className="py-4 px-6 bg-black text-[#B7FF3C] rounded-full font-display font-bold text-sm uppercase inline-flex items-center gap-2">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>YOU'RE ON THE LIST ✦ CHECK YOUR INBOX FOR 10% OFF</span>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
            >
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full bg-white text-neutral-900 placeholder-neutral-500 font-mono text-xs uppercase tracking-wider focus:outline-none border-2 border-black"
              />
              <button
                type="submit"
                className="py-3.5 px-6 bg-black hover:bg-neutral-800 text-white font-display font-extrabold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-1.5"
              >
                <span>KEEP ME IN</span>
                <span>→</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* SECTION 13 — FOOTER */}
      <footer className="bg-[#111111] text-white pt-16 pb-24 md:pb-16 px-4 sm:px-6 lg:px-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 space-y-4">
              <span className="font-display font-black text-2xl uppercase tracking-wider">
                auraplus
              </span>
              <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                Modern Gen-Z socks fashion brand. Premium streetwear socks made for people who
                don’t dress boring. Socks are not just an accessory. They are part of the fit.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#instagram"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#FF3D81] flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#twitter"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#2563EB] flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-300 mb-3">
                COLLECTIONS
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400 font-mono">
                <li>
                  <button onClick={() => onNavigate('shop')} className="hover:text-white">
                    SHOP ALL
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('shop')} className="hover:text-white">
                    NEW DROP
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('shop')} className="hover:text-white">
                    BESTSELLERS
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('lookbook')} className="hover:text-white">
                    LOOKBOOK
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-300 mb-3">
                BRAND
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400 font-mono">
                <li>
                  <button onClick={() => onNavigate('lookbook')} className="hover:text-white">
                    OUR WORLD
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('lookbook')} className="hover:text-white">
                    MANIFESTO
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('shop')} className="hover:text-white">
                    COMMUNITY
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('admin')}
                    className="hover:text-[#B7FF3C] font-bold text-neutral-300 flex items-center gap-1"
                  >
                    <span>ADMIN PORTAL</span>
                    <span>🔒</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-300 mb-3">
                HELP
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400 font-mono">
                <li>
                  <a href="#shipping" onClick={(e) => e.preventDefault()} className="hover:text-white">
                    SHIPPING
                  </a>
                </li>
                <li>
                  <a href="#returns" onClick={(e) => e.preventDefault()} className="hover:text-white">
                    RETURNS
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => e.preventDefault()} className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white">
                    PRIVACY
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <div>© {new Date().getFullYear()} AURAPLUS FASHION LABS. ALL RIGHTS RESERVED.</div>
            <div className="font-display font-black text-sm text-[#B7FF3C] tracking-widest uppercase">
              NO BORING SOCKS.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

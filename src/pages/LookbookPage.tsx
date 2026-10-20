import React, { useState } from 'react';
import {
  ArrowRight,
  Camera,
  Heart,
  Share2,
  Sparkles,
  Check,
  X,
  Upload,
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { SockArtwork } from '../components/SockArtwork';

interface LookbookPageProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToShop: () => void;
}

export const LookbookPage: React.FC<LookbookPageProps> = ({
  onSelectProduct,
  onNavigateToShop,
}) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [handle, setHandle] = useState('');
  const [shareSuccess, setShareSuccess] = useState(false);

  // Lookbook editorial chapters
  const chapters = [
    {
      id: 'monday-mood',
      title: 'MONDAY MOOD',
      tag: 'VOLUME 01 · CAFE & COMMUTE',
      copy: 'Coffee. Sneakers. Good socks. Start the week right.',
      detail:
        'Washed vintage denim, oversized chore jacket, and clean Matcha Mood ribs peeking out above chalk sneakers. An understated statement for Monday morning.',
      product: PRODUCTS.find((p) => p.id === 'matcha-mood')!,
      styling: ['Wide-leg pleated trousers', 'Vintage German army trainers', 'Heavyweight ecru tee'],
    },
    {
      id: 'weekend-energy',
      title: 'WEEKEND ENERGY',
      tag: 'VOLUME 02 · DAYTIME DRIFT',
      copy: 'Plans? Maybe. Good fit? Definitely.',
      detail:
        'Cherry Pop socks worn with chunky retro runners and relaxed basketball shorts. High-dopamine styling that turns heads at thrift stores and flea markets.',
      product: PRODUCTS.find((p) => p.id === 'cherry-pop')!,
      styling: ['Distressed denim shorts', 'Retro chunky trainers', 'Boxy vintage graphic tee'],
    },
    {
      id: 'midnight-fit',
      title: 'MIDNIGHT FIT',
      tag: 'VOLUME 03 · NOCTURNAL CITY',
      copy: 'Dark outfit. Loud socks.',
      detail:
        'All-black oversized hoodie, deep charcoal tactical cargos, and Midnight Chaos socks bursting with electric violet threads when hit by camera flash.',
      product: PRODUCTS.find((p) => p.id === 'midnight-chaos')!,
      styling: ['Obsidian nylon cargo pants', 'Matte black skate sneakers', 'Double-layer oversized hoodie'],
    },
    {
      id: 'color-theory',
      title: 'COLOR THEORY',
      tag: 'VOLUME 04 · EXPERIMENTAL',
      copy: 'Why wear one color when you can wear five?',
      detail:
        'Thermal multi-color Jacquard knit contrasting against earth-toned utility pants. Acid Dream socks prove that rule-breaking color palettes make the fit iconic.',
      product: PRODUCTS.find((p) => p.id === 'acid-dream')!,
      styling: ['Olive parachute pants', 'Futuristic mesh trail runners', 'Cropped zip-up windbreaker'],
    },
  ];

  // Community Instagram fit grid
  const communityFits = [
    {
      author: '@tanmay_wears',
      city: 'Bandra, Mumbai',
      likes: '1.4k',
      sockName: 'CHERRY POP',
      product: PRODUCTS[0],
      outfit: 'Raw indigo denim + White Sambas',
    },
    {
      author: '@kavya.fits',
      city: 'Indiranagar, BLR',
      likes: '2.1k',
      sockName: 'LIME CRUSH',
      product: PRODUCTS[1],
      outfit: 'Black jorts + Chunky Dunks',
    },
    {
      author: '@sid.streetwear',
      city: 'Hauz Khas, Delhi',
      likes: '980',
      sockName: 'MIDNIGHT CHAOS',
      product: PRODUCTS[2],
      outfit: 'Tech cargos + Salomo XT-6',
    },
    {
      author: '@ananya_core',
      city: 'Koregaon Park, Pune',
      likes: '3.2k',
      sockName: 'ACID DREAM',
      product: PRODUCTS[8],
      outfit: 'Pleated mini skirt + Platform boots',
    },
  ];

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle) return;
    setShareSuccess(true);
    setTimeout(() => {
      setShareSuccess(false);
      setShareModalOpen(false);
      setHandle('');
    }, 2500);
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* HERO: WELCOME TO OUR WORLD */}
      <section className="relative bg-[#111111] text-white pt-16 pb-20 md:py-28 px-4 sm:px-6 lg:px-8 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7C3AED]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#B7FF3C]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#B7FF3C] text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FASHION EDITORIAL · ISSUE NO. 01</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none">
            WELCOME TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FAFAF7] to-neutral-400">
              OUR WORLD.
            </span>
          </h1>

          <div className="pt-4 max-w-2xl mx-auto space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-[#B7FF3C] uppercase tracking-wide">
              WE DON’T BELIEVE SOCKS SHOULD BE BORING.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              Your socks are part of your outfit. They’re part of your personality. They’re part
              of the little details that make your fit yours.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={onNavigateToShop}
              className="py-3.5 px-8 bg-[#B7FF3C] hover:bg-[#a5f322] text-black font-display font-black text-xs uppercase tracking-wider rounded-full shadow-lg transition-all flex items-center gap-2"
            >
              <span>SHOP THE LOOKS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShareModalOpen(true)}
              className="py-3.5 px-8 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-display font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>SUBMIT YOUR FIT</span>
            </button>
          </div>
        </div>
      </section>

      {/* WHY WE STARTED SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#7C3AED]">
            <span>FOUNDER'S LOG</span>
            <span>·</span>
            <span>01</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-neutral-900">
            WHY WE STARTED
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
            <p>
              We wanted to make socks that feel less like an everyday necessity and more like a
              fashion statement.
            </p>
            <p>
              For years, sneakerheads would drop serious money on grail kicks and curated vintage
              cargos, only to slide into flimsy grey athletic socks bought in a 3-pack from a
              supermarket bin. It made zero sense.
            </p>
            <p>
              At auraplus, we build socks with the exact same obsession that designers pour into
              high-end footwear: custom yarn weights, heavy-gauge 200-needle weaves, anti-slip
              cuff retention, and graphic art that commands attention on the pavement.
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>AURAPLUS DESIGN STUDIO · EST. 2026</span>
            <span className="font-bold text-neutral-900">NO COMPROMISES.</span>
          </div>
        </div>
      </section>

      {/* THE LOOKBOOK EDITORIAL CHAPTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase">
            EDITORIAL EDIT 01
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-neutral-900">
            THE LOOKBOOK
          </h2>
          <p className="text-sm text-neutral-600">
            Four distinct style profiles. Real outfits built from the feet up.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {chapters.map((ch, idx) => (
            <div
              key={ch.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Visual Showcase Card */}
              <div
                className={`lg:col-span-7 ${
                  idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="relative aspect-[4/3] rounded-3xl bg-neutral-100 border-2 border-neutral-900 overflow-hidden shadow-xl group">
                  <SockArtwork
                    product={ch.product}
                    mode="sneaker"
                    className="w-full h-full"
                    isHovered={true}
                  />

                  <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                    {ch.tag}
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <button
                      onClick={() => onSelectProduct(ch.product)}
                      className="py-2 px-4 bg-white hover:bg-[#B7FF3C] text-black font-display font-extrabold text-xs uppercase tracking-wider rounded-full shadow-md transition-colors flex items-center gap-1.5"
                    >
                      <span>VIEW {ch.product.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Editorial Copy */}
              <div
                className={`lg:col-span-5 space-y-5 ${
                  idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="text-xs font-mono font-bold uppercase text-[#7C3AED]">
                  CHAPTER 0{idx + 1}
                </div>
                <h3 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-tight text-neutral-900">
                  {ch.title}
                </h3>
                <div className="text-lg sm:text-xl font-display font-extrabold text-[#FF3D81] uppercase leading-tight">
                  "{ch.copy}"
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                  {ch.detail}
                </p>

                {/* Outfit Specs */}
                <div className="pt-2">
                  <span className="text-[11px] font-mono font-bold uppercase text-neutral-400 block mb-2">
                    RECOMMENDED FIT PIECES:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {ch.styling.map((piece) => (
                      <span
                        key={piece}
                        className="px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-800"
                      >
                        {piece}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: OUR MANIFESTO */}
      <section className="bg-[#111111] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-y-2 border-neutral-800 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#B7FF3C]">
            OUR CORE MANIFESTO
          </div>

          <div className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-none space-y-3">
            <div className="text-[#FF3D81]">BE LOUD.</div>
            <div className="text-[#B7FF3C]">BE WEIRD.</div>
            <div className="text-[#2563EB]">BE YOU.</div>
            <div className="text-white text-3xl sm:text-5xl pt-4">
              JUST DON'T BE BORING.
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto pt-4 leading-relaxed font-mono">
            Every thread woven with attitude. Every pair built to elevate everyday streetwear.
          </p>
        </div>
      </section>

      {/* SECTION: SHOW US YOUR FIT / INSTAGRAM COLLAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-[#FF3D81] uppercase">
              TAG @AURAPLUS · #PARTOFTHEFIT
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-neutral-900 mt-1">
              SHOW US YOUR FIT.
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Your socks deserve a spotlight. Tag us on Instagram to get featured on the billboard.
            </p>
          </div>

          <button
            onClick={() => setShareModalOpen(true)}
            className="self-start sm:self-auto py-3 px-6 bg-neutral-900 hover:bg-[#7C3AED] text-white rounded-full font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
          >
            <Camera className="w-4 h-4" />
            <span>SHARE YOUR FIT →</span>
          </button>
        </div>

        {/* Fit Cards Collage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {communityFits.map((item) => (
            <div
              key={item.author}
              className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="aspect-square bg-neutral-100 overflow-hidden relative flex items-center justify-center">
                <SockArtwork
                  product={item.product}
                  mode="sneaker"
                  className="w-full h-full p-2"
                  isHovered={true}
                />
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-[#FF3D81] text-[#FF3D81]" />
                  <span>{item.likes}</span>
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-neutral-900">{item.author}</span>
                  <span className="text-[10px] font-mono text-neutral-400">{item.city}</span>
                </div>
                <div className="text-xs text-neutral-600 font-mono">
                  Pair: <span className="font-bold text-neutral-800">{item.sockName}</span>
                </div>
                <p className="text-[11px] text-neutral-500 truncate">
                  {item.outfit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SHARE FIT MODAL */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-[#FAFAF7] border border-neutral-300 text-neutral-900 rounded-3xl p-6 shadow-2xl">
            <button
              onClick={() => setShareModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500"
            >
              <X className="w-5 h-5" />
            </button>

            {shareSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#B7FF3C] text-black mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="font-display font-extrabold text-xl uppercase">
                  FIT SUBMITTED! ✦
                </h3>
                <p className="text-xs text-neutral-600">
                  Our editors review community submissions daily. If featured, you'll receive a
                  free limited pair from Drop 02.
                </p>
              </div>
            ) : (
              <form onSubmit={handleShareSubmit} className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-[#7C3AED] uppercase">
                    COMMUNITY FIT CHECK
                  </div>
                  <h3 className="text-2xl font-display font-extrabold uppercase text-neutral-900">
                    SHARE YOUR FIT
                  </h3>
                  <p className="text-xs text-neutral-600">
                    Tag @auraplus or drop your Instagram handle and outfit photo link below.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                      INSTAGRAM HANDLE
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="@yourhandle"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm focus:outline-none focus:border-neutral-900"
                    />
                  </div>

                  <div className="p-4 border-2 border-dashed border-neutral-300 rounded-2xl text-center space-y-1 bg-white hover:bg-neutral-50 cursor-pointer">
                    <Upload className="w-6 h-6 text-neutral-400 mx-auto" />
                    <span className="block text-xs font-bold text-neutral-800">
                      Upload Fit Check Image
                    </span>
                    <span className="block text-[10px] text-neutral-400">
                      JPG, PNG or HEIC up to 10MB
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#111111] hover:bg-[#7C3AED] text-white rounded-full font-display font-extrabold text-xs uppercase tracking-wider transition-colors"
                >
                  SUBMIT FIT TO EDITORIAL →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

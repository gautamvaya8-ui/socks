import React from 'react';
import { Product } from '../types';

interface SockArtworkProps {
  product: Product;
  mode?: 'sock' | 'sneaker' | 'fit' | 'fabric' | 'packaging';
  className?: string;
  isHovered?: boolean;
}

export const SockArtwork: React.FC<SockArtworkProps> = ({
  product,
  mode = 'sock',
  className = '',
  isHovered = false,
}) => {
  const { colorHex, accentColorHex, patternType, name } = product;

  // Custom pattern renderers
  const renderPattern = () => {
    switch (patternType) {
      case 'cherry':
        return (
          <g>
            {/* Cherry embroidery graphic */}
            <circle cx="108" cy="115" r="8" fill="#E11D48" />
            <circle cx="120" cy="118" r="8" fill="#BE123C" />
            <path
              d="M108 110 C108 95, 114 88, 122 84 C120 95, 120 105, 120 112"
              stroke="#15803D"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M122 84 C128 82, 134 85, 132 89 C126 90, 122 86, 122 84 Z"
              fill="#22C55E"
            />
            {/* Top athletic stripe */}
            <rect x="70" y="44" width="70" height="4" fill="#E11D48" />
            <rect x="70" y="52" width="70" height="2" fill="#E11D48" opacity="0.6" />
          </g>
        );

      case 'checker':
        return (
          <g>
            {/* Wavy checkerboard */}
            <pattern id={`checker-${product.id}`} width="14" height="14" patternUnits="userSpaceOnUse">
              <rect width="7" height="7" fill={accentColorHex} />
              <rect x="7" y="7" width="7" height="7" fill={accentColorHex} />
            </pattern>
            <rect x="75" y="48" width="60" height="70" fill={`url(#checker-${product.id})`} opacity="0.85" />
            <rect x="70" y="40" width="70" height="4" fill={accentColorHex} />
          </g>
        );

      case 'flames':
        return (
          <g>
            {/* Electric purple flames / glitch lines */}
            <path
              d="M75 130 C80 100, 85 90, 90 105 C95 85, 102 70, 108 95 C115 75, 120 90, 125 110 C130 95, 135 115, 135 130 Z"
              fill={colorHex}
              opacity="0.9"
            />
            <line x1="72" y1="46" x2="138" y2="46" stroke={colorHex} strokeWidth="3" />
            <line x1="72" y1="54" x2="138" y2="54" stroke={colorHex} strokeWidth="1.5" />
          </g>
        );

      case 'clouds':
        return (
          <g>
            {/* Soft minimalist sky cloud gradients */}
            <ellipse cx="95" cy="85" rx="16" ry="10" fill="#FFFFFF" opacity="0.75" />
            <ellipse cx="112" cy="80" rx="14" ry="9" fill="#FFFFFF" opacity="0.8" />
            <ellipse cx="122" cy="86" rx="12" ry="8" fill="#FFFFFF" opacity="0.7" />
            <text x="105" y="118" fill="#0284C7" fontSize="8" fontWeight="800" textAnchor="middle" letterSpacing="1">
              AURA
            </text>
          </g>
        );

      case 'matcha':
        return (
          <g>
            {/* Zen wavy organic bands */}
            <path d="M72 70 Q105 60 138 70" stroke={accentColorHex} strokeWidth="4" fill="none" />
            <path d="M72 82 Q105 92 138 82" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.9" />
            <path d="M72 94 Q105 84 138 94" stroke={accentColorHex} strokeWidth="4" fill="none" />
            <rect x="70" y="42" width="70" height="5" fill={accentColorHex} />
          </g>
        );

      case 'pixel-heart':
        return (
          <g transform="translate(93, 80)">
            {/* 8-bit pixel heart */}
            <rect x="3" y="0" width="6" height="3" fill="#EC4899" />
            <rect x="15" y="0" width="6" height="3" fill="#EC4899" />
            <rect x="0" y="3" width="12" height="3" fill="#EC4899" />
            <rect x="12" y="3" width="12" height="3" fill="#EC4899" />
            <rect x="0" y="6" width="24" height="6" fill="#F43F5E" />
            <rect x="3" y="12" width="18" height="3" fill="#F43F5E" />
            <rect x="6" y="15" width="12" height="3" fill="#E11D48" />
            <rect x="9" y="18" width="6" height="3" fill="#BE123C" />
          </g>
        );

      case 'blue-hour':
        return (
          <g>
            {/* High-voltage cobalt bar */}
            <rect x="72" y="44" width="66" height="6" fill="#06B6D4" />
            <rect x="72" y="56" width="66" height="2" fill="#06B6D4" opacity="0.6" />
            <text x="105" y="105" fill="#FFFFFF" fontSize="9" fontWeight="800" textAnchor="middle" letterSpacing="2">
              00:00
            </text>
          </g>
        );

      case 'strawberry':
        return (
          <g>
            {/* Drip wavy border */}
            <path
              d="M72 56 Q85 70 95 56 Q105 74 115 56 Q125 70 138 56"
              fill="none"
              stroke="#FFF1F2"
              strokeWidth="5"
            />
            <circle cx="100" cy="95" r="3" fill="#FB7185" />
            <circle cx="115" cy="85" r="2.5" fill="#FB7185" />
            <circle cx="92" cy="110" r="2.5" fill="#FB7185" />
          </g>
        );

      case 'acid':
        return (
          <g>
            {/* Multi-contour thermal map */}
            <ellipse cx="105" cy="85" rx="24" ry="16" fill="#84CC16" opacity="0.75" />
            <ellipse cx="105" cy="85" rx="16" ry="10" fill="#EAB308" opacity="0.8" />
            <ellipse cx="105" cy="85" rx="8" ry="5" fill="#F43F5E" opacity="0.9" />
            <path d="M72 110 Q90 125 105 110 Q120 95 138 110" stroke="#84CC16" strokeWidth="3" fill="none" />
          </g>
        );

      case 'cloud-nine':
        return (
          <g>
            <rect x="70" y="40" width="70" height="4" fill="#38BDF8" />
            <circle cx="95" cy="85" r="9" fill="#E0F2FE" />
            <circle cx="110" cy="82" r="12" fill="#BAE6FD" />
            <circle cx="122" cy="88" r="8" fill="#E0F2FE" />
            <text x="105" y="116" fill="#0369A1" fontSize="7" fontWeight="700" textAnchor="middle" letterSpacing="1">
              CLOUD 9
            </text>
          </g>
        );

      case 'off-duty':
        return (
          <g>
            {/* Heavy athletic collegiate double stripes */}
            <rect x="70" y="46" width="70" height="6" fill="#18181B" />
            <rect x="70" y="56" width="70" height="3" fill="#18181B" />
            <text x="105" y="105" fill="#18181B" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="2">
              AP-01
            </text>
          </g>
        );

      case 'neon-wave':
        return (
          <g>
            <polygon points="72,50 85,62 98,50 112,62 125,50 138,62 138,70 125,58 112,70 98,58 85,70 72,58" fill="#B7FF3C" />
            <polygon points="72,80 85,92 98,80 112,92 125,80 138,92 138,100 125,88 112,100 98,88 85,100 72,88" fill="#B7FF3C" opacity="0.8" />
          </g>
        );

      default:
        return null;
    }
  };

  // 1. Classic Sock Showcase View
  if (mode === 'sock') {
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center p-4 transition-transform duration-300 ${
          isHovered ? 'scale-105' : ''
        } ${className}`}
        style={{
          background: `radial-gradient(circle at 50% 40%, ${product.bgColor || '#FAFAF7'} 0%, #FAFAF7 85%)`,
        }}
      >
        <svg
          viewBox="0 0 220 260"
          className="w-full h-full max-h-64 object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
        >
          {/* Subtle floor shadow */}
          <ellipse cx="110" cy="246" rx="60" ry="8" fill="rgba(0,0,0,0.08)" />

          {/* Ribbed top cuff */}
          <path
            d="M 70 32 L 140 32 Q 142 36 140 40 L 70 40 Q 68 36 70 32 Z"
            fill={accentColorHex || '#111111'}
          />
          {/* Vertical rib lines on cuff */}
          {[76, 84, 92, 100, 108, 116, 124, 132].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1="32"
              x2={x}
              y2="40"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              opacity="0.4"
            />
          ))}

          {/* Main Sock Body */}
          <path
            d="M 70 40 
               L 72 145 
               C 72 170, 75 190, 60 215 
               C 50 230, 65 240, 85 240 
               C 125 240, 155 235, 175 220 
               C 185 212, 180 198, 168 198 
               C 145 198, 138 185, 138 145 
               L 140 40 
               Z"
            fill={colorHex}
          />

          {/* 3D shading along left/back edge */}
          <path
            d="M 70 40 L 72 145 C 72 170, 75 190, 60 215 C 50 230, 58 238, 72 238 C 65 220, 68 170, 68 145 L 70 40 Z"
            fill="black"
            opacity="0.12"
          />

          {/* Knit vertical rib texture on shaft */}
          {[78, 86, 94, 102, 110, 118, 126, 134].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1="40"
              x2={x}
              y2="140"
              stroke={accentColorHex}
              strokeWidth="0.6"
              opacity="0.25"
            />
          ))}

          {/* Product pattern layer */}
          {renderPattern()}

          {/* Reinforced Heel patch */}
          <path
            d="M 72 145 C 70 175, 55 195, 60 215 C 65 225, 80 220, 85 200 C 88 175, 80 150, 72 145 Z"
            fill={accentColorHex || '#111111'}
            opacity="0.85"
          />

          {/* Reinforced Toe wrap */}
          <path
            d="M 152 205 C 165 200, 182 208, 175 220 C 165 230, 145 235, 135 232 C 142 225, 146 215, 152 205 Z"
            fill={accentColorHex || '#111111'}
            opacity="0.85"
          />

          {/* Underfoot arch grip compression band */}
          <path
            d="M 95 205 L 125 210 L 120 222 L 90 216 Z"
            fill="black"
            opacity="0.08"
          />
        </svg>

        {/* Small sticker tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black text-white rounded">
          <span>{product.vibe}</span>
          <span>✦</span>
        </div>
      </div>
    );
  }

  // 2. Styled with Sneaker View
  if (mode === 'sneaker') {
    return (
      <div
        className={`relative w-full h-full flex items-center justify-center p-4 ${className}`}
        style={{
          background: `radial-gradient(circle at 50% 50%, #F5F5F0 0%, #E8E8E2 100%)`,
        }}
      >
        <svg viewBox="0 0 240 240" className="w-full h-full max-h-64 object-contain">
          {/* Sock rising up from sneaker collar */}
          <path
            d="M 85 40 L 88 135 C 88 145, 95 155, 105 160 L 140 160 C 145 155, 148 145, 148 135 L 148 40 Z"
            fill={colorHex}
          />
          {/* Top cuff */}
          <rect x="85" y="36" width="63" height="8" fill={accentColorHex || '#111111'} rx="1" />
          {/* Render pattern inside sock collar */}
          <g transform="translate(10, 0)">{renderPattern()}</g>

          {/* Chunky Streetwear Sneaker Outline */}
          <ellipse cx="130" cy="215" rx="90" ry="10" fill="rgba(0,0,0,0.12)" />

          {/* Chunky Sole */}
          <path
            d="M 45 185 C 45 175, 60 172, 80 172 L 180 172 C 205 172, 225 180, 225 195 C 225 210, 210 215, 195 215 L 55 215 C 45 215, 45 200, 45 185 Z"
            fill="#FFFFFF"
            stroke="#111111"
            strokeWidth="3.5"
          />
          {/* Sole tread grooves */}
          <line x1="75" y1="200" x2="75" y2="215" stroke="#111111" strokeWidth="2.5" />
          <line x1="105" y1="200" x2="105" y2="215" stroke="#111111" strokeWidth="2.5" />
          <line x1="135" y1="200" x2="135" y2="215" stroke="#111111" strokeWidth="2.5" />
          <line x1="165" y1="200" x2="165" y2="215" stroke="#111111" strokeWidth="2.5" />

          {/* Sneaker Upper */}
          <path
            d="M 65 172 C 60 155, 75 140, 95 142 L 125 145 C 135 135, 150 135, 165 145 L 200 160 C 215 168, 220 172, 220 175 L 65 175 Z"
            fill="#111111"
          />

          {/* Sneaker Laces & Details */}
          <line x1="110" y1="148" x2="130" y2="152" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="112" y1="156" x2="134" y2="160" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="114" y1="164" x2="138" y2="168" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

          {/* Sneaker Swoosh / Accent wave */}
          <path
            d="M 90 162 Q 130 168 185 152"
            stroke={colorHex}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute bottom-3 right-3 text-[11px] font-bold tracking-wider text-neutral-500 uppercase">
          Fit Check: Sneaker Styled
        </span>
      </div>
    );
  }

  // 3. Full Streetwear Fit View
  if (mode === 'fit') {
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center p-6 bg-neutral-900 text-white ${className}`}>
        <div className="w-full max-w-xs space-y-4 text-center">
          <div className="inline-block px-2.5 py-1 text-[11px] font-bold tracking-widest uppercase bg-lime-400 text-black rounded">
            THE STREETWEAR FIT
          </div>
          <div className="p-4 bg-neutral-800/80 rounded-xl border border-neutral-700/60 text-left space-y-2 text-xs">
            <div className="flex justify-between items-center pb-1.5 border-b border-neutral-700">
              <span className="text-neutral-400">TOP</span>
              <span className="font-semibold">Heavyweight Boxy Tee (Washed Charcoal)</span>
            </div>
            <div className="flex justify-between items-center pb-1.5 border-b border-neutral-700">
              <span className="text-neutral-400">BOTTOM</span>
              <span className="font-semibold">Wide-Leg Raw Indigo Denim or Cargos</span>
            </div>
            <div className="flex justify-between items-center pb-1.5 border-b border-neutral-700">
              <span className="text-neutral-400">SOCKS</span>
              <span className="font-bold text-lime-300">{name} (Mid-Calf Ribbed)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">KICKS</span>
              <span className="font-semibold">Retro Chunky Runners or Skate Lows</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
            <span>✦</span>
            <span>SOCKS ARE 40% OF THE VISUAL WEIGHT</span>
            <span>✦</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. Fabric Close-Up Detail View
  if (mode === 'fabric') {
    return (
      <div
        className={`relative w-full h-full flex flex-col items-center justify-center p-6 ${className}`}
        style={{
          backgroundColor: colorHex,
          color: '#FFFFFF',
        }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />
        <div className="relative z-10 text-center space-y-2 bg-black/60 backdrop-blur-md p-5 rounded-xl border border-white/20 max-w-xs">
          <p className="text-xs font-mono uppercase tracking-widest text-lime-300">
            MACRO WEAVE SPEC
          </p>
          <h4 className="font-bold text-base tracking-tight">{product.material}</h4>
          <p className="text-xs text-neutral-300 leading-relaxed">
            200-needle high-density knit for razor-sharp graphic precision, 360° arch compression, and pill-resistant combed cotton softness.
          </p>
        </div>
      </div>
    );
  }

  // 5. Packaging Collectible Unboxing View
  return (
    <div className={`relative w-full h-full flex items-center justify-center p-6 bg-neutral-950 text-white ${className}`}>
      <div className="w-56 p-4 rounded-xl border-2 border-neutral-700 bg-neutral-900 shadow-2xl relative rotate-[-2deg] hover:rotate-0 transition-transform">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-2 mb-3">
          <span className="font-extrabold text-sm tracking-wider font-display text-white">AURAPLUS</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-lime-400">DROP 01</span>
        </div>
        <div className="h-28 rounded-lg flex items-center justify-center font-bold text-xs uppercase tracking-widest text-center p-3" style={{ backgroundColor: colorHex, color: '#111111' }}>
          <div>
            <div className="text-sm font-extrabold mb-1">{name}</div>
            <div className="text-[10px] opacity-80">COLLECTIBLE PAIR #AP-{product.id.slice(0, 4).toUpperCase()}</div>
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center text-[10px] text-neutral-400 font-mono">
          <span>COMED COTTON</span>
          <span>100% RECYCLABLE</span>
        </div>
      </div>
    </div>
  );
};

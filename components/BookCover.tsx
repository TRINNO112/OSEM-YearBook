import React from 'react';

interface BookCoverProps {
  title: string;
  author: string;
  onOpen?: () => void;
  variant: 'front' | 'back';
}

export const BookCover: React.FC<BookCoverProps> = ({ title, author, onOpen, variant }) => {
  const isFront = variant === 'front';

  return (
    <div className="w-full h-full relative overflow-hidden cursor-pointer group" onClick={onOpen}>

      {/* ============================================= */}
      {/* BASE LEATHER MATERIAL - Multiple Layers */}
      {/* ============================================= */}

      {/* Deep base color with rich browns */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2c1a0f] via-[#1f140b] to-[#150d07]" />

      {/* Leather grain texture - Primary */}
      <div
        className="absolute inset-0 opacity-60 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Secondary fine grain overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Color variation patches for authentic leather look */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[20%] left-[30%] w-32 h-32 bg-[#3a2015] rounded-full blur-3xl" />
        <div className="absolute bottom-[30%] right-[20%] w-40 h-40 bg-[#2a1508] rounded-full blur-3xl" />
        <div className="absolute top-[60%] left-[10%] w-24 h-24 bg-[#3d2518] rounded-full blur-2xl" />
      </div>

      {/* ============================================= */}
      {/* LIGHTING & ATMOSPHERE */}
      {/* ============================================= */}

      {/* Dramatic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.6)_80%,rgba(0,0,0,0.85)_100%)]" />

      {/* Top-left ambient light source */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,220,180,0.12)_0%,transparent_40%)]" />

      {/* Subtle warm highlight */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#d4a574]/5 to-transparent" />

      {/* ============================================= */}
      {/* SPINE & BOOK EDGES */}
      {/* ============================================= */}

      {/* Deep spine shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black via-black/80 to-transparent" />

      {/* Spine ridge - raised effect */}
      <div className="absolute left-6 top-0 bottom-0 w-[3px] bg-gradient-to-r from-[#2a1a10] via-[#3a2a1a] to-[#2a1a10] shadow-[1px_0_3px_rgba(0,0,0,0.5)]" />

      {/* Spine decorative line */}
      <div className="absolute left-8 top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/30 to-transparent" />

      {/* Page edges - visible stack effect */}
      <div className="absolute right-0 top-3 bottom-3 w-1 rounded-r-sm overflow-hidden">
        <div className="w-full h-full bg-gradient-to-l from-[#f8f4ec] via-[#f0ebe0] to-[#e8e0d4] opacity-25" />
        {/* Individual page lines */}
        <div className="absolute inset-0 flex flex-col justify-evenly opacity-40">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-[1px] bg-[#d0c8bc]" />
          ))}
        </div>
      </div>

      {/* ============================================= */}
      {/* DECORATIVE FRAMES - Gold Foil */}
      {/* ============================================= */}

      {/* Outer frame - thick gold line */}
      <div className="absolute inset-4 rounded border-2 border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.1)]" />

      {/* Middle frame - main decorative border */}
      <div className="absolute inset-6 rounded-sm overflow-hidden">
        <div className="absolute inset-0 border-[3px] border-[#d4af37]/60" />
        {/* Inner glow of the frame */}
        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(212,175,55,0.15)]" />
      </div>

      {/* Inner frame - thin accent */}
      <div className="absolute inset-8 rounded-sm border border-[#d4af37]/25" />

      {/* Innermost embossed panel */}
      <div className="absolute inset-10 rounded-sm bg-gradient-to-br from-white/[0.02] to-black/10 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.03),inset_-2px_-2px_6px_rgba(0,0,0,0.2)]" />

      {/* ============================================= */}
      {/* ORNATE CORNER DECORATIONS */}
      {/* ============================================= */}

      {[
        { pos: 'top-5 left-5', rotate: '' },
        { pos: 'top-5 right-5', rotate: 'rotate-90' },
        { pos: 'bottom-5 left-5', rotate: '-rotate-90' },
        { pos: 'bottom-5 right-5', rotate: 'rotate-180' },
      ].map((corner, i) => (
        <div key={i} className={`absolute ${corner.pos} w-24 h-24 ${corner.rotate} pointer-events-none`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <defs>
              <linearGradient id={`goldGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="30%" stopColor="#d4af37" />
                <stop offset="60%" stopColor="#b8960b" />
                <stop offset="100%" stopColor="#8a6b14" />
              </linearGradient>
            </defs>

            {/* Main corner flourish */}
            <path
              d="M8,8 Q8,35 20,45 Q32,55 50,55 Q50,32 40,20 Q30,8 8,8 Z"
              fill={`url(#goldGrad${i})`}
              fillOpacity="0.3"
              stroke={`url(#goldGrad${i})`}
              strokeWidth="1.5"
            />

            {/* Outer decorative curves */}
            <path
              d="M5,5 C5,20 8,30 15,40 C22,50 35,58 55,58"
              fill="none"
              stroke="#d4af37"
              strokeWidth="1"
              opacity="0.7"
            />
            <path
              d="M5,5 C20,5 30,8 40,15 C50,22 58,35 58,55"
              fill="none"
              stroke="#d4af37"
              strokeWidth="1"
              opacity="0.7"
            />

            {/* Inner spiral details */}
            <path
              d="M12,12 C12,22 18,28 25,32 C32,36 40,38 48,38"
              fill="none"
              stroke="#d4af37"
              strokeWidth="0.75"
              opacity="0.5"
            />
            <path
              d="M12,12 C22,12 28,18 32,25 C36,32 38,40 38,48"
              fill="none"
              stroke="#d4af37"
              strokeWidth="0.75"
              opacity="0.5"
            />

            {/* Decorative dots and accents */}
            <circle cx="10" cy="10" r="2.5" fill="#d4af37" opacity="0.9" />
            <circle cx="10" cy="10" r="1.5" fill="#ffd700" />
            <circle cx="20" cy="12" r="1.2" fill="#d4af37" opacity="0.6" />
            <circle cx="12" cy="20" r="1.2" fill="#d4af37" opacity="0.6" />
            <circle cx="28" cy="16" r="0.8" fill="#d4af37" opacity="0.4" />
            <circle cx="16" cy="28" r="0.8" fill="#d4af37" opacity="0.4" />

            {/* Small flourish lines */}
            <path d="M18,18 L24,24" stroke="#d4af37" strokeWidth="0.5" opacity="0.5" />
            <path d="M22,15 C25,18 28,20 32,22" stroke="#d4af37" strokeWidth="0.5" opacity="0.4" />
            <path d="M15,22 C18,25 20,28 22,32" stroke="#d4af37" strokeWidth="0.5" opacity="0.4" />
          </svg>
        </div>
      ))}

      {/* ============================================= */}
      {/* DECORATIVE BORDER FLOURISHES */}
      {/* ============================================= */}

      {/* Top center ornament */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 pointer-events-none">
        <svg width="180" height="28" viewBox="0 0 180 28" className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]">
          <defs>
            <linearGradient id="topOrnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#8a6b14" />
            </linearGradient>
          </defs>
          {/* Center diamond */}
          <path d="M90,4 L98,14 L90,24 L82,14 Z" fill="url(#topOrnGrad)" opacity="0.8" />
          <path d="M90,7 L95,14 L90,21 L85,14 Z" fill="none" stroke="#ffd700" strokeWidth="0.5" opacity="0.6" />
          {/* Side curves */}
          <path d="M80,14 Q60,14 50,8 Q40,2 25,6" stroke="url(#topOrnGrad)" fill="none" strokeWidth="1.5" opacity="0.7" />
          <path d="M100,14 Q120,14 130,8 Q140,2 155,6" stroke="url(#topOrnGrad)" fill="none" strokeWidth="1.5" opacity="0.7" />
          {/* Outer curves */}
          <path d="M75,14 Q55,16 40,22 Q30,26 15,22" stroke="#d4af37" fill="none" strokeWidth="0.75" opacity="0.4" />
          <path d="M105,14 Q125,16 140,22 Q150,26 165,22" stroke="#d4af37" fill="none" strokeWidth="0.75" opacity="0.4" />
          {/* End dots */}
          <circle cx="20" cy="8" r="2" fill="#d4af37" opacity="0.6" />
          <circle cx="160" cy="8" r="2" fill="#d4af37" opacity="0.6" />
        </svg>
      </div>

      {/* Bottom center ornament */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 rotate-180 pointer-events-none">
        <svg width="180" height="28" viewBox="0 0 180 28" className="drop-shadow-[0_-2px_3px_rgba(0,0,0,0.4)]">
          <defs>
            <linearGradient id="botOrnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#8a6b14" />
            </linearGradient>
          </defs>
          <path d="M90,4 L98,14 L90,24 L82,14 Z" fill="url(#botOrnGrad)" opacity="0.8" />
          <path d="M80,14 Q60,14 50,8 Q40,2 25,6" stroke="url(#botOrnGrad)" fill="none" strokeWidth="1.5" opacity="0.7" />
          <path d="M100,14 Q120,14 130,8 Q140,2 155,6" stroke="url(#botOrnGrad)" fill="none" strokeWidth="1.5" opacity="0.7" />
          <circle cx="20" cy="8" r="2" fill="#d4af37" opacity="0.6" />
          <circle cx="160" cy="8" r="2" fill="#d4af37" opacity="0.6" />
        </svg>
      </div>

      {/* Side ornaments */}
      <div className="absolute left-7 top-[58%] -translate-y-1/2 -rotate-90 pointer-events-none">
        <svg width="100" height="20" viewBox="0 0 100 20">
          <path d="M10,10 Q25,5 40,10 Q55,15 70,10 Q85,5 90,10" stroke="#d4af37" fill="none" strokeWidth="1" opacity="0.4" />
          <circle cx="50" cy="10" r="2" fill="#d4af37" opacity="0.5" />
        </svg>
      </div>

      <div className="absolute right-7 top-[58%] -translate-y-1/2 rotate-90 pointer-events-none">
        <svg width="100" height="20" viewBox="0 0 100 20">
          <path d="M10,10 Q25,5 40,10 Q55,15 70,10 Q85,5 90,10" stroke="#d4af37" fill="none" strokeWidth="1" opacity="0.4" />
          <circle cx="50" cy="10" r="2" fill="#d4af37" opacity="0.5" />
        </svg>
      </div>

      {/* ============================================= */}
      {/* MAIN CONTENT */}
      {/* ============================================= */}

      {isFront ? (
        <div className="relative z-10 flex flex-col items-center justify-between h-full py-20 px-12">

          {/* ===== TOP: Institution Badge ===== */}
          <div className="flex flex-col items-center gap-5">

            {/* Small decorative element above emblem */}
            <div className="text-[#d4af37] opacity-50">
              <svg width="60" height="16" viewBox="0 0 60 16">
                <path d="M0,8 Q15,2 30,8 Q45,14 60,8" stroke="currentColor" fill="none" strokeWidth="1" />
                <circle cx="30" cy="8" r="2" fill="currentColor" opacity="0.8" />
              </svg>
            </div>

            {/* Main Emblem - 3D Embossed Effect */}
            <div className="relative group/emblem">
              {/* Deep shadow for 3D pop */}
              <div className="absolute inset-0 translate-y-2 blur-lg bg-black/60 rounded-full scale-90" />

              {/* Outer ring glow */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-b from-[#d4af37]/30 to-transparent blur-md" />

              {/* Main emblem container */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden
                bg-gradient-to-br from-[#2a1810] via-[#1a0f08] to-[#0f0805]
                border-[3px] border-[#d4af37]/70
                shadow-[inset_0_4px_8px_rgba(255,255,255,0.05),inset_0_-4px_8px_rgba(0,0,0,0.4),0_8px_16px_rgba(0,0,0,0.5),0_0_30px_rgba(212,175,55,0.15)]
              ">
                {/* Inner decorative ring */}
                <div className="absolute inset-2 rounded-full border border-[#d4af37]/40" />
                <div className="absolute inset-3 rounded-full border border-[#d4af37]/20" />

                {/* Center icon with metallic effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="iconGold" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fff8dc" />
                        <stop offset="20%" stopColor="#ffd700" />
                        <stop offset="50%" stopColor="#d4af37" />
                        <stop offset="80%" stopColor="#b8960b" />
                        <stop offset="100%" stopColor="#8a6b14" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"
                      fill="url(#iconGold)"
                      style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.6))' }}
                    />
                  </svg>
                </div>

                {/* Highlight reflection */}
                <div className="absolute top-0 left-1/4 right-1/4 h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-sm" />
              </div>
            </div>

            {/* Institution Name - Engraved Effect */}
            <div className="relative">
              <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.35em] font-serif
                text-transparent bg-clip-text bg-gradient-to-b from-[#d4c4a8] via-[#b8a890] to-[#8a7a68]"
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 -1px 0 rgba(255,255,255,0.05)'
                }}>
                Om Shanti English Medium School
              </p>
              <div className="mt-3 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
            </div>
          </div>

          {/* ===== CENTER: Main Title Block ===== */}
          <div className="relative flex flex-col items-center py-8">

            {/* Subtle glow behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-40 bg-[#d4af37] opacity-[0.06] blur-3xl rounded-full" />

            {/* Decorative line with star above title */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center transform translate-y-4">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/40" />
                <div className="w-4 h-[1px] bg-[#d4af37]/60" />
                <div className="w-2 h-[1px] bg-[#d4af37]/80" />
              </div>
              <div className="w-6 h-6 text-[#d4af37] opacity-70 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transform translate-y-4">
                 <svg viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
                 </svg>
              </div>
              <div className="flex items-center transform translate-y-4">
                <div className="w-2 h-[1px] bg-[#d4af37]/80" />
                <div className="w-4 h-[1px] bg-[#d4af37]/60" />
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/40" />
              </div>
            </div>

            {/* ===== THE MAIN TITLE - Ultimate Gold Embossed Effect ===== */}
            <div className="relative">
              {/* Layer 1: Deep shadow for 3D depth */}
              <h1
                className="absolute font-serif text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider
                  text-black blur-md translate-y-2 opacity-70"
                style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', serif" }}
              >
                {title}
              </h1>

              {/* Layer 2: Shadow layer */}
              <h1
                className="absolute font-serif text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider
                  text-[#3d2a10] blur-[2px] translate-y-[3px]"
                style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', serif" }}
              >
                {title}
              </h1>

              {/* Layer 3: Main gold text */}
              <h1
                className="relative font-serif text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider
                  text-transparent bg-clip-text 
                  bg-gradient-to-b from-[#fffacd] via-[#ffd700] via-[45%] to-[#8b7014]"
                style={{
                  fontFamily: "'Cinzel Decorative', 'Playfair Display', serif",
                  WebkitTextStroke: '0.3px rgba(139,112,20,0.5)'
                }}
              >
                {title}
              </h1>

              {/* Layer 4: Top highlight for metallic shine */}
              <h1
                className="absolute inset-0 font-serif text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider
                  text-transparent bg-clip-text 
                  bg-gradient-to-b from-white/40 via-transparent via-[30%] to-transparent
                  pointer-events-none"
                style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', serif" }}
              >
                {title}
              </h1>

              {/* Layer 5: Diagonal shine effect */}
              <h1
                className="absolute inset-0 font-serif text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider
                  text-transparent bg-clip-text 
                  bg-gradient-to-br from-white/20 via-transparent via-[40%] to-transparent
                  pointer-events-none"
                style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', serif" }}
              >
                {title}
              </h1>
            </div>

            {/* Decorative line below title */}
            <div className="mt-6 w-40 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent" />

            {/* Author Name - Elegant Script Style */}
            <div className="flex items-center gap-5 mt-6">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rotate-45 bg-[#d4af37]/50" />
                <div className="w-10 h-[1px] bg-gradient-to-r from-[#d4af37]/60 to-transparent" />
              </div>

              <div className="relative">
                {/* Author shadow */}
                <span
                  className="absolute font-serif text-sm md:text-lg italic tracking-[0.2em]
                    text-black/50 blur-[1px] translate-y-[1px]"
                >
                  {author}
                </span>
                {/* Author text */}
                <span
                  className="relative font-serif text-sm md:text-lg italic tracking-[0.2em]
                    text-transparent bg-clip-text bg-gradient-to-b from-[#e8d48b] via-[#d4af37] to-[#9a7b20]"
                >
                  {author}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <div className="w-10 h-[1px] bg-gradient-to-l from-[#d4af37]/60 to-transparent" />
                <div className="w-2 h-2 rotate-45 bg-[#d4af37]/50" />
              </div>
            </div>
          </div>

          {/* ===== BOTTOM: Year Badge ===== */}
          <div className="flex flex-col items-center gap-5">

            {/* Decorative flourish */}
            <svg width="100" height="24" viewBox="0 0 100 24" className="text-[#d4af37] opacity-50">
              <path d="M10,12 Q25,6 40,12 Q50,16 60,12 Q75,6 90,12" stroke="currentColor" fill="none" strokeWidth="1" />
              <path d="M10,12 Q25,18 40,12 Q50,8 60,12 Q75,18 90,12" stroke="currentColor" fill="none" strokeWidth="1" />
              <circle cx="50" cy="12" r="3" fill="currentColor" opacity="0.6" />
              <circle cx="50" cy="12" r="1.5" fill="#ffd700" />
            </svg>

            {/* Year badge - Embossed metal plate */}
            <div className="relative">
              {/* Shadow */}
              <div className="absolute inset-0 translate-y-1 blur-md bg-black/50 rounded" />

              {/* Badge container */}
              <div className="relative px-10 py-3 rounded-sm
                bg-gradient-to-b from-[#1a1208] via-[#150f06] to-[#0f0a04]
                border border-[#d4af37]/60
                shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-2px_4px_rgba(0,0,0,0.3),0_4px_10px_rgba(0,0,0,0.4)]"
              >
                {/* Inner border accent */}
                <div className="absolute inset-[2px] rounded-sm border border-[#d4af37]/20" />

                <span className="relative text-xs md:text-sm font-bold uppercase tracking-[0.5em] font-serif
                  text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#d4af37] to-[#8a6b2e]"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                  Est. 2025
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ============================================= */
        /* BACK COVER DESIGN */
        /* ============================================= */
        <div className="relative z-10 flex flex-col items-center justify-between h-full py-20 px-12">

          {/* Top ornamental element */}
          <div className="text-[#d4af37] opacity-30">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="35" stroke="currentColor" fill="none" strokeWidth="0.5" />
              <circle cx="40" cy="40" r="28" stroke="currentColor" fill="none" strokeWidth="0.5" />
              <circle cx="40" cy="40" r="20" stroke="currentColor" fill="none" strokeWidth="0.5" />
              <path d="M40,5 L40,75 M5,40 L75,40" stroke="currentColor" strokeWidth="0.3" opacity="0.5" />
              <path d="M15,15 L65,65 M15,65 L65,15" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
            </svg>
          </div>

          {/* Central content */}
          <div className="flex flex-col items-center gap-8">
            {/* Shield emblem */}
            <div className="relative">
              <div className="absolute inset-0 translate-y-1 blur-md bg-black/40" />
              <div className="relative w-20 h-20 text-[#d4af37] opacity-50">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v5.7c0 4.47-3.07 8.67-7 9.93-3.93-1.26-7-5.46-7-9.93V6.3l7-3.12z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
            </div>

            {/* Tagline */}
            <div className="text-center">
              <p className="text-[#9a8a78] font-serif text-sm tracking-[0.25em] uppercase opacity-60 leading-relaxed">
                Memories<br />
                <span className="text-[0.7rem] tracking-[0.15em] opacity-80">That Last Forever</span>
              </p>
            </div>
          </div>

          {/* Bottom credits section */}
          <div className="flex flex-col items-center w-full max-w-sm">
            {/* Decorative separator */}
            <div className="relative w-full mb-8">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#d4af37]/60 border border-[#d4af37]" />
            </div>

            {/* Credits text */}
            <p className="text-[#7a6a5a] font-serif italic text-xs mb-3 opacity-60">
              Crafted with passion by
            </p>

            {/* Creator name - embossed */}
            <div className="relative">
              <h3 className="absolute font-serif text-lg tracking-[0.25em] uppercase text-black/40 blur-[1px] translate-y-[1px]">
                Trinno Asphalt
              </h3>
              <h3 className="relative font-serif text-lg tracking-[0.25em] uppercase
                text-transparent bg-clip-text bg-gradient-to-b from-[#e8d48b] via-[#d4af37] to-[#8a6b2e]">
                Trinno Asphalt
              </h3>
            </div>

            {/* Details */}
            <div className="flex items-center gap-3 mt-4">
              <div className="w-6 h-[1px] bg-[#d4af37]/30" />
              <p className="text-[#5a4a3a] text-[0.3rem] tracking-[0.15em] uppercase font-mono opacity-50">
                Grade 11th • Batch 2025
              </p>
              <div className="w-6 h-[1px] bg-[#d4af37]/30" />
            </div>
          </div>
        </div>
      )}

      {/* ============================================= */}
      {/* FINAL EFFECTS & OVERLAYS */}
      {/* ============================================= */}

      {/* Edge wear and aging effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#d4a574]/10 to-transparent rounded-br-full" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#d4a574]/8 to-transparent rounded-tl-full" />
        <div className="absolute top-1/4 right-0 w-8 h-24 bg-gradient-to-l from-[#d4a574]/5 to-transparent" />
      </div>

      {/* Subtle glossy reflection */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />

      {/* Interactive hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#d4af37]/0 group-hover:from-[#d4af37]/5 group-hover:to-transparent transition-all duration-700 pointer-events-none" />
    </div>
  );
};

export default BookCover;
import React from 'react';
import { StoryPage } from '../types';
import { resolveImagePath } from '../utils/imageUtils';

interface BookPageProps {
  pageNumber: number;
  data: StoryPage;
  side: 'left' | 'right';
}

export const BookPage: React.FC<BookPageProps> = ({ pageNumber, data, side }) => {
  const isProfile = data.type === 'profile';
  const isFullImage = data.layout === 'full-image';

  // Resolve image source: prefer direct URL, fallback to keyword, then placeholder
  const imageSource = data.imageUrl
    ? resolveImagePath(data.imageUrl)
    : data.imageKeyword
        ? `https://picsum.photos/seed/${data.imageKeyword + pageNumber}/600/800`
        : null;

  return (
    <div className={`
      w-full h-full relative overflow-hidden
      bg-[#f4efe6]
      shadow-[inset_0_0_40px_rgba(0,0,0,0.1)]
      flex flex-col
      ${side === 'left' ? 'rounded-l-sm border-r border-[#d4c5b0]' : 'rounded-r-sm border-l border-[#d4c5b0]'}
    `}>
      {/* ============================================= */}
      {/* BACKGROUND TEXTURES & ATMOSPHERE */}
      {/* ============================================= */}

      {/* Custom Vintage Paper Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${resolveImagePath('/images/chapters/page.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1
        }}
      />

      {/* ============================================= */}
      {/* ORNAMENTAL BORDERS */}
      {/* ============================================= */}

      {/* Corner Flourishes */}
      <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-20 text-[#8a6b4e]">
         <svg viewBox="0 0 100 100" fill="currentColor">
           <path d="M0,0 L40,0 C20,0 10,10 10,30 L10,0 Z" />
           <path d="M15,15 C25,15 30,20 30,30" fill="none" stroke="currentColor" strokeWidth="1" />
         </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-20 text-[#8a6b4e] transform rotate-180">
         <svg viewBox="0 0 100 100" fill="currentColor">
           <path d="M0,0 L40,0 C20,0 10,10 10,30 L10,0 Z" />
           <path d="M15,15 C25,15 30,20 30,30" fill="none" stroke="currentColor" strokeWidth="1" />
         </svg>
      </div>

      {/* ============================================= */}
      {/* PAGE CONTENT */}
      {/* ============================================= */}
      <div className="relative z-10 flex flex-col h-full p-6 md:p-10 lg:p-12 font-serif text-[#2c1810]">

        {/* Header Section */}
        <div className="flex justify-between items-end mb-6 pb-2 border-b-2 border-[#d4c5b0] relative">
           <div className="absolute bottom-[-1px] left-0 w-1/3 h-[1px] bg-[#8a6b4e]" />

           <span className="font-['Cinzel'] text-xs md:text-sm text-[#8a6b4e] tracking-[0.2em] uppercase font-bold">
             {data.chapterTitle || (isProfile ? 'Class of 2025' : `Chapter ${pageNumber}`)}
           </span>
           <span className="font-['Caveat'] text-[#d4af37] font-bold text-2xl md:text-3xl transform translate-y-1 drop-shadow-sm">
             {pageNumber}
           </span>
        </div>

        {isProfile ? (
            // --- Student Profile Layout ---
            <div className="flex flex-col items-center h-full text-center">
                {/* Photo Frame - Vintage Style */}
                <div className="relative w-40 h-52 mb-6 p-3 bg-white shadow-[0_5px_15px_rgba(0,0,0,0.15)] transform rotate-[-1deg] transition-all duration-500 hover:rotate-0 hover:scale-105 group">
                    <div className="absolute inset-0 border border-gray-200 pointer-events-none" />

                    {/* Inner Image Container */}
                    <div className="w-full h-full overflow-hidden bg-[#f0f0f0] relative grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700">
                        {imageSource ? (
                            <img
                                src={imageSource}
                                alt={data.studentName}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-[#d4c5b0] bg-[#f9f9f9]">
                               <svg className="w-8 h-8 opacity-50 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                               <span className="font-['Cinzel'] text-xs">No Photo</span>
                            </div>
                        )}
                        {/* Inner shadow/vignette */}
                        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] pointer-events-none" />
                    </div>

                    {/* Tape effect */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-[#fdfbf7]/80 backdrop-blur-[2px] shadow-sm rotate-[1deg] opacity-90 border-l border-r border-[#d4c5b0]/30" />
                </div>

                {/* Name - Elegant Typography */}
                <div className="relative mb-4">
                  <h2 className="font-['Cinzel'] text-2xl md:text-3xl text-[#3d2a10] font-bold tracking-wide">
                      {data.studentName}
                  </h2>
                  <div className="w-24 h-[2px] mx-auto mt-2 bg-gradient-to-r from-transparent via-[#cfaa68] to-transparent" />
                </div>

                {/* Nickname pill */}
                {data.nickname && (
                  <div className="mb-6 px-4 py-1 rounded-full border border-[#d4c5b0] bg-[#fdfbf7]/50 inline-block">
                    <span className="font-['Caveat'] text-[#8a6b4e] text-xl">
                      "{data.nickname}"
                    </span>
                  </div>
                )}

                {/* Quote / Message */}
                <div className="relative px-6 max-w-sm mx-auto flex-grow flex flex-col justify-center">
                    <div className="absolute top-0 left-2 text-4xl text-[#d4af37] font-serif opacity-40">"</div>
                    <p className="font-['Caveat'] text-2xl md:text-3xl text-[#4a3b32] leading-relaxed">
                        {data.text}
                    </p>
                    <div className="absolute bottom-0 right-2 text-4xl text-[#d4af37] font-serif opacity-40 rotate-180">"</div>
                </div>

                {/* Footer Signature */}
                <div className="mt-auto w-full pt-6 border-t border-[#d4c5b0]/30">
                    <div className="flex justify-between items-center opacity-60 font-['Cinzel'] text-[0.6rem] tracking-widest text-[#8a6b4e] uppercase">
                        <span>Batch of 2025</span>
                        <span>OSEM Yearbook</span>
                    </div>
                </div>
            </div>
        ) : isFullImage ? (
            // --- Full Image Layout ---
            <div className="flex flex-col h-full bg-white p-2 shadow-sm transform -rotate-[0.5deg]">
                {/* Large Photo Area */}
                <div className="flex-grow relative border border-gray-100">
                     <div className="w-full h-full overflow-hidden bg-gray-100">
                         {imageSource && (
                             <img
                                src={imageSource}
                                alt="Full page memory"
                                className="w-full h-full object-cover filter contrast-[1.05] sepia-[0.1]"
                             />
                         )}
                     </div>

                     {/* Photo Corner Accents - Golden */}
                     <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-[#d4af37] opacity-60"></div>
                     <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-[#d4af37] opacity-60"></div>
                     <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-[#d4af37] opacity-60"></div>
                     <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-[#d4af37] opacity-60"></div>
                </div>

                {/* Caption Area */}
                <div className="mt-3 text-center border-t border-dotted border-gray-300 pt-3">
                    <p className="font-['Caveat'] text-2xl md:text-3xl text-[#4a3b32]">
                        {data.text}
                    </p>
                </div>
            </div>
        ) : (
            // --- Standard Chapter Layout ---
            <>
                {/* Image Area - Postcard Style */}
                {imageSource && (
                  <div className="relative w-full h-48 md:h-64 mb-8 p-2 bg-white shadow-md transform rotate-1 mx-auto max-w-lg">
                     <div className="w-full h-full overflow-hidden border border-gray-100">
                       <img
                         src={imageSource}
                         alt="illustration"
                         className="w-full h-full object-cover sepia-[0.15] opacity-95"
                       />
                     </div>
                     {/* "Tape" on corners for scrapbook look */}
                     <div className="absolute -top-2 -left-2 w-12 h-4 bg-[#fdfbf7]/90 shadow-sm transform -rotate-45 z-10 opacity-80" />
                     <div className="absolute -bottom-2 -right-2 w-12 h-4 bg-[#fdfbf7]/90 shadow-sm transform -rotate-45 z-10 opacity-80" />
                  </div>
                )}

                {/* Text Content */}
                <div className="flex-grow px-2 md:px-6">
                   {/* Drop Cap */}
                   <div className="float-left mr-3 mb-1 font-['Cinzel'] text-5xl text-[#d4af37] leading-[0.8]">
                     {data.text.charAt(0)}
                   </div>
                   <p className="font-['Caveat'] text-2xl md:text-3xl leading-relaxed text-[#2c1810]">
                     {data.text.slice(1)}
                   </p>
                </div>

                {/* Footer Decoration - Flourish */}
                <div className="mt-auto pt-8 flex justify-center opacity-40 text-[#d4af37]">
                   <svg width="60" height="15" viewBox="0 0 60 15" fill="none" stroke="currentColor">
                      <path d="M0,7 Q15,0 30,7 T60,7" strokeWidth="1" />
                      <circle cx="30" cy="7" r="2" fill="currentColor" stroke="none" />
                   </svg>
                </div>
            </>
        )}
      </div>

      {/* Binding Shadow Gradient for 3D effect */}
      <div className={`
        absolute top-0 bottom-0 w-12 pointer-events-none z-20 mix-blend-multiply
        ${side === 'left' ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'}
        from-[rgba(60,40,30,0.2)] to-transparent
      `}></div>
    </div>
  );
};
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
    <div className={`
      w-full h-full relative overflow-hidden
      bg-[#4a2c20] 
      border-4 border-[#2c1810]
      flex flex-col items-center justify-center
      shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]
    `}>
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] pointer-events-none mix-blend-overlay"></div>
      
      {/* Golden Border Frame */}
      <div className="absolute inset-4 border-2 border-[#cfaa68] rounded-sm opacity-70 pointer-events-none"></div>
      <div className="absolute inset-6 border border-[#cfaa68] rounded-sm opacity-50 pointer-events-none"></div>
      
      {/* Inner Decorative Corners */}
      <div className="absolute inset-8 border border-[#cfaa68] opacity-20 rounded-sm pointer-events-none"></div>

      {/* Corners */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#cfaa68] rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#cfaa68] rounded-tr-lg"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#cfaa68] rounded-bl-lg"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#cfaa68] rounded-br-lg"></div>

      {isFront ? (
        <div className="z-10 text-center p-8 flex flex-col items-center h-full justify-between py-16 transform translate-z-[2px]">
          {/* Top Crest */}
          <div className="w-20 h-20 rounded-full bg-[#2c1810] border-2 border-[#cfaa68] flex items-center justify-center shadow-lg mb-4">
             <svg className="w-10 h-10 text-[#cfaa68]" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12 2L4 7v6.5c0 4.42 3.34 8.05 7.67 8.95L12 22.5l.33-.05C16.66 21.55 20 17.92 20 13.5V7l-8-5zm0 2.18l6 3.75v5.57c0 3.55-2.53 6.49-6 7.16-3.47-.67-6-3.61-6-7.16V7.93l6-3.75z"/>
               <path d="M12 8l-3 3 3 3 3-3-3-3z"/>
             </svg>
          </div>

          <div className="space-y-6">
            <div className="text-[#8a6b4e] text-[0.6rem] md:text-xs uppercase tracking-[0.25em] font-['Cinzel'] border-b border-[#cfaa68]/30 pb-2 mb-2">
              Om Shanti English Medium School
            </div>
            
            <h1 className="text-6xl md:text-7xl font-['Cinzel'] font-bold text-[#e8d5b5] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-tighter leading-none">
              {title}
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#cfaa68] to-transparent mx-auto opacity-80"></div>
            
            <p className="text-xl font-['Playfair_Display'] text-[#cfaa68] italic tracking-widest">
              {author}
            </p>
          </div>

          <div className="mt-8 text-[#8a6b4e] text-[0.65rem] uppercase tracking-[0.3em] font-['Cinzel'] opacity-80">
            Est. 2025
          </div>
        </div>
      ) : (
         <div className="z-10 text-center flex flex-col items-center justify-between h-full py-16 px-8">
            <div className="flex-grow flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-[#cfaa68] flex items-center justify-center opacity-50 mb-4">
                 <svg className="w-8 h-8 text-[#cfaa68]" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M12 2L4 7v6.5c0 4.42 3.34 8.05 7.67 8.95L12 22.5l.33-.05C16.66 21.55 20 17.92 20 13.5V7l-8-5zm0 2.18l6 3.75v5.57c0 3.55-2.53 6.49-6 7.16-3.47-.67-6-3.61-6-7.16V7.93l6-3.75z"/>
                   <path d="M12 8l-3 3 3 3 3-3-3-3z"/>
                 </svg>
              </div>
              <p className="text-[#8a6b4e] font-['Cinzel'] text-xs tracking-widest uppercase">
                OSEM Yearbook
              </p>
              <p className="text-[#8a6b4e]/60 font-['Cinzel'] text-[0.6rem] tracking-widest uppercase mt-2">
                Class of 2025
              </p>
            </div>

            {/* Creator Credit at Bottom */}
            <div className="border-t border-[#cfaa68]/20 pt-6 mt-auto">
              <p className="text-[#8a6b4e]/60 font-['Crimson_Pro'] text-[0.65rem] mb-2">
                Designed & Created by
              </p>
              <p className="text-[#cfaa68] font-['Cinzel'] text-sm tracking-widest uppercase">
                Trinno Asphalt
              </p>
              <p className="text-[#8a6b4e]/50 font-['Cinzel'] text-[0.6rem] tracking-wider uppercase mt-1">
                Grade 11th • 2025
              </p>
            </div>
         </div>
      )}
    </div>
  );
};
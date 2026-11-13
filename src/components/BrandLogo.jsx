import React from "react";

export default function BrandLogo({
  compact = false,
  showTagline = false,
  className = "",
}) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Sikandar's Mobile Store Circular Gold Monogram Emblem */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#D4AF37]/60 shadow-[0_4px_16px_rgba(212,175,55,0.25)] shrink-0 bg-[#08090C] flex items-center justify-center p-0.5">
        <img
          src="/images/store-stock/store-logo.jpg"
          alt="Sikandar's Mobile Store Official Logo"
          className="w-full h-full object-cover rounded-full"
          width="44"
          height="44"
          loading="eager"
        />
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#3478F6] border-2 border-[#08090C] shadow-[0_0_8px_#3478F6]" />
      </div>

      {/* Metallic Wordmark */}
      {!compact && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="text-sm sm:text-base font-extrabold tracking-[0.14em] uppercase wordmark-shine">
              SIKANDAR’S
            </span>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase px-1.5 py-0.5 rounded bg-[#3478F6]/15 border border-[#3478F6]/35 text-[#93C5FD]">
              MOBILE STORE
            </span>
          </div>
          {showTagline && (
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-[#858A94] mt-1">
              PREMIUM PHONES. SMARTER PRICES.
            </span>
          )}
        </div>
      )}
    </div>
  );
}

import React from "react";

export default function BrandLogo({
  compact = false,
  showTagline = false,
  className = "",
}) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Bespoke Geometric Titanium Emblem (Chamfered Frame + Optical Lens Ring) */}
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B1E26] via-[#111318] to-[#08090C] border border-[#C5C7CC]/30 flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.2)] shrink-0">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="w-5 h-5"
        >
          <rect
            x="3"
            y="2.5"
            width="18"
            height="19"
            rx="4.5"
            stroke="url(#titaniumGrad)"
            strokeWidth="1.6"
          />
          <circle cx="9.5" cy="8.5" r="2.1" stroke="#3478F6" strokeWidth="1.5" />
          <circle cx="14.5" cy="11.5" r="2.1" stroke="#C5C7CC" strokeWidth="1.5" />
          <circle cx="9.5" cy="14.8" r="2.1" stroke="#C5C7CC" strokeWidth="1.5" />
          <defs>
            <linearGradient id="titaniumGrad" x1="3" y1="2.5" x2="21" y2="21.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.5" stopColor="#C5C7CC" />
              <stop offset="1" stopColor="#858A94" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#3478F6] border-2 border-[#08090C] shadow-[0_0_8px_#3478F6]" />
      </div>

      {/* Metallic Wordmark */}
      {!compact && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="text-sm sm:text-base font-extrabold tracking-[0.14em] uppercase wordmark-shine">
              SIKANDAR
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

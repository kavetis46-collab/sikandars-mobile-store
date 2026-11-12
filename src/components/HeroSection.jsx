import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  Layers,
  Aperture,
  RotateCw,
  Smartphone,
  SkipForward,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import { IPHONE_16_PRO_MAX_IMAGES } from "../data/storeData";

gsap.registerPlugin(ScrollTrigger);

// Lazy-load heavy Three.js WebGL scene so initial HTML/CSS paints rapidly
const Hero3DCanvas = lazy(() => import("./three/Hero3DCanvas"));

const SEQUENCES = [
  {
    id: "entrance",
    label: "01. Studio Drop",
    icon: Smartphone,
    headline: "YOUR NEXT IPHONE STARTS HERE.",
    description: "Discover premium pre-owned iPhones at smarter prices.",
    callout: "Grade-5 Titanium Enclosure • Studio Arrival",
  },
  {
    id: "camera-explode",
    label: "02. Camera Disassembly",
    icon: Aperture,
    headline: "OPTICAL PRECISION. VERIFIED LAYER BY LAYER.",
    description:
      "Every sapphire cover, machined ring, lens element, CMOS sensor & flash module is 100% genuine and diagnostics-checked before sale.",
    callout: "Sapphire Glass • Coated Lenses • OIS Sensor • True Tone Flash",
  },
  {
    id: "phone-explode",
    label: "03. Layered Architecture",
    icon: Layers,
    headline: "SEAMLESS INSIDE AND OUT.",
    description:
      "Front Ceramic Shield, Super Retina XDR OLED, anodized titanium frame, internal hardware, and matte back glass inspected for zero unauthorized repairs.",
    callout: "Synchronized Magnetic Reassembly Visualization",
  },
  {
    id: "showcase-360",
    label: "04. 360° Titanium View",
    icon: RotateCw,
    headline: "CRAFTED FINISHES. SMARTER VALUE.",
    description:
      "Drag anywhere on the phone or scroll to rotate 360° and inspect front bezels, textured rear glass, and tri-camera contour.",
    callout: "Drag to Orbit • Scroll to Rotate 360°",
  },
  {
    id: "lineup",
    label: "05. Flagship Lineup",
    icon: Sparkles,
    headline: "EVERY GENERATION. READY TODAY.",
    description:
      "Compare certified pre-owned iPhone 12 through iPhone 18 Pro Max models stocked and inspected at Sikandar Mobile Store.",
    callout: "Multi-Device Certified Stock",
  },
];

export default function HeroSection() {
  const sectionRef = useRef(null);
  const [activeSeq, setActiveSeq] = useState("entrance");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manualOverride, setManualOverride] = useState(false);
  const [introSkipped, setIntroSkipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onMq = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onMq);

    return () => {
      window.removeEventListener("resize", checkViewport);
      mq.removeEventListener?.("change", onMq);
    };
  }, []);

  // GSAP ScrollTrigger story progression as user scrolls down past hero
  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        if (manualOverride) return;
        const p = self.progress;
        if (p < 0.16) setActiveSeq("entrance");
        else if (p < 0.42) setActiveSeq("camera-explode");
        else if (p < 0.65) setActiveSeq("phone-explode");
        else if (p < 0.85) setActiveSeq("showcase-360");
        else setActiveSeq("lineup");
      },
    });

    return () => trigger.kill();
  }, [manualOverride, reducedMotion]);

  const handleSelectSeq = (seqId) => {
    setManualOverride(true);
    setActiveSeq(seqId);
  };

  const handleSkipIntro = () => {
    setIntroSkipped(true);
    document.getElementById("explore-catalogue")?.scrollIntoView({ behavior: "smooth" });
  };

  const currentChapter = SEQUENCES.find((s) => s.id === activeSeq) || SEQUENCES[0];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative bg-midnight-studio overflow-hidden border-b border-[#C5C7CC]/10"
    >
      {/* Subtle Impact Aura behind phone */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full bg-[#3478F6]/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 lg:py-16 min-h-[calc(100vh-4.5rem)] flex flex-col justify-between relative z-10">
        {/* Top Utility Strip inside Hero: Metallic Identity + Skip Intro */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BrandLogo showTagline={true} />
          </motion.div>

          <button
            type="button"
            onClick={handleSkipIntro}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#111318]/90 border border-[#C5C7CC]/20 hover:border-[#3478F6] text-xs font-bold text-[#C5C7CC] hover:text-white transition-all cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5 text-[#3478F6]" />
            <span>{introSkipped ? "Browse Inventory" : "Skip Intro & Shop"}</span>
          </button>
        </div>

        {/* Main Hero Split Stage: Copy (Left) + Real Interactive 3D Phone (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-6 lg:my-2">
          {/* Left Story Copy */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 pill-electric">
                  <currentChapter.icon className="w-3.5 h-3.5" />
                  <span>{currentChapter.label}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] text-gradient-titanium">
                  {currentChapter.headline}
                </h1>

                <p className="text-base sm:text-lg text-[#C5C7CC] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {currentChapter.description}
                </p>

                <div className="inline-block text-[11px] font-mono uppercase tracking-wider text-[#858A94] bg-[#111318] border border-[#C5C7CC]/15 px-3 py-1.5 rounded-lg">
                  {currentChapter.callout}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#explore-catalogue"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("explore-catalogue")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto btn-electric px-7 py-3.5 text-sm tracking-wide gap-2"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href="#location"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("location")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto btn-titanium px-7 py-3.5 text-sm tracking-wide gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#3478F6]" />
                <span>CONTACT US</span>
              </a>
            </div>
          </div>

          {/* Right WebGL 3D Stage */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative h-[370px] sm:h-[460px] lg:h-[540px] w-full rounded-3xl bg-gradient-to-b from-[#111318]/80 to-[#08090C]/90 border border-[#C5C7CC]/15 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.85)]">
              {/* Entrance Impact Ring Cue */}
              <div
                key={`ring-${activeSeq}`}
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-[#3478F6]/40 impact-ring"
              />

              <Suspense
                fallback={
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <img
                      src={IPHONE_16_PRO_MAX_IMAGES.desertCutout}
                      alt="Sikandar Mobile Store 3D iPhone Preview"
                      className="max-h-72 object-contain opacity-90"
                    />
                    <span className="text-xs text-[#858A94] font-mono">
                      Loading interactive 3D studio...
                    </span>
                  </div>
                }
              >
                <Hero3DCanvas
                  sequence={activeSeq}
                  scrollProgress={scrollProgress}
                  reducedMotion={reducedMotion}
                  isMobile={isMobile}
                  fallbackImage={IPHONE_16_PRO_MAX_IMAGES.desertCutout}
                />
              </Suspense>

              {/* Bottom-left live interactive telemetry overlay */}
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-[#858A94] px-3 py-1.5 rounded-xl bg-[#08090C]/75 border border-[#C5C7CC]/10 backdrop-blur-md">
                <span>SEQ: {currentChapter.id.toUpperCase()}</span>
                <span>{reducedMotion ? "2D STUDIO FALLBACK" : "WEBGL 3D • DRAG OR SCROLL"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Sequence Switcher (Trigger Camera Disassembly / Layers / 360° / Lineup anytime) */}
        <div className="pt-4 border-t border-[#C5C7CC]/10">
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#858A94] hidden lg:inline">
              Interactive 3D Story Sequences:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SEQUENCES.map((seq) => {
                const Icon = seq.icon;
                const active = activeSeq === seq.id;
                return (
                  <button
                    key={seq.id}
                    type="button"
                    onClick={() => handleSelectSeq(seq.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      active
                        ? "bg-[#3478F6] border-[#3478F6] text-white shadow-[0_4px_16px_rgba(52,120,246,0.45)]"
                        : "bg-[#111318] border-[#C5C7CC]/15 text-[#C5C7CC] hover:border-[#3478F6]/50 hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{seq.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { Suspense, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, Sparkles, OrbitControls, Html } from "@react-three/drei";
import IPhone3DModel from "./IPhone3DModel";

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function StudioFallbackVisual({ imageUrl }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="device-glow-backdrop" />
      <img
        src={imageUrl}
        alt="Certified Pre-Owned Flagship iPhone Showcase"
        className="relative z-10 max-h-[420px] w-auto object-contain drop-shadow-[0_25px_55px_rgba(52,120,246,0.35)]"
      />
    </div>
  );
}

const LINEUP_FINISHING = [
  { label: "iPhone 16 Pro Max", pos: [0, 0.08, 0.45], rot: -0.25, color: "#a89885", back: "#3c3228", scale: 0.96, delay: 0 },
  { label: "iPhone 15 Pro", pos: [-1.85, -0.1, -0.35], rot: 0.35, color: "#8e9096", back: "#26282e", scale: 0.86, delay: 0.18 },
  { label: "iPhone 14 Pro Max", pos: [1.85, -0.08, -0.35], rot: -0.65, color: "#685c75", back: "#2b2535", scale: 0.86, delay: 0.34 },
];

export default function Hero3DCanvas({
  sequence = "entrance",
  scrollProgress = 0,
  reducedMotion = false,
  fallbackImage,
  isMobile = false,
}) {
  if (reducedMotion) {
    return <StudioFallbackVisual imageUrl={fallbackImage} />;
  }

  return (
    <WebGLErrorBoundary fallback={<StudioFallbackVisual imageUrl={fallbackImage} />}>
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0.15, isMobile ? 6.2 : 5.1], fov: 38 }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        className="w-full h-full touch-pan-y"
      >
        <Suspense fallback={null}>
          {/* Atmospheric Studio Lighting */}
          <ambientLight intensity={0.35} />
          <spotLight
            position={[4, 6, 5]}
            angle={0.42}
            penumbra={0.8}
            intensity={2.4}
            color="#ffffff"
          />
          <pointLight position={[-4, 2, 3]} intensity={1.8} color="#3478F6" />
          <pointLight position={[0, -3, -4]} intensity={1.5} color="#C5C7CC" />

          {/* Procedural HDRI Reflection Rig */}
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer
                form="rect"
                intensity={3.2}
                color="#ffffff"
                scale={[10, 2.5, 1]}
                position={[0, 4, -5]}
              />
              <Lightformer
                form="rect"
                intensity={2.2}
                color="#3478F6"
                scale={[6, 4, 1]}
                position={[-6, 1, 2]}
                target={[0, 0, 0]}
              />
              <Lightformer
                form="ring"
                intensity={2}
                color="#C5C7CC"
                scale={4}
                position={[5, -2, -3]}
                target={[0, 0, 0]}
              />
            </group>
          </Environment>

          {/* Subtle Studio Particles */}
          {!isMobile && (
            <Sparkles
              count={28}
              scale={[7, 5, 4]}
              size={1.4}
              speed={0.25}
              opacity={0.32}
              color="#93C5FD"
            />
          )}

          {/* Sequence E: Multiple iPhone Entrances OR Single Hero Multi-Layer Assembly */}
          {sequence === "lineup" ? (
            <group>
              {LINEUP_FINISHING.map((item) => (
                <group key={item.label}>
                  <IPhone3DModel
                    sequence="lineup"
                    position={item.pos}
                    rotationOffset={item.rot}
                    titaniumColor={item.color}
                    backGlassColor={item.back}
                    accentScale={item.scale}
                    entranceDelay={item.delay}
                  />
                  <Html
                    position={[item.pos[0], item.pos[1] - 1.95 * item.scale, item.pos[2]]}
                    center
                    distanceFactor={8}
                  >
                    <div className="px-3 py-1 rounded-full bg-[#111318]/90 border border-[#C5C7CC]/25 text-[11px] font-bold tracking-wider uppercase text-[#FFFFFF] whitespace-nowrap shadow-xl backdrop-blur-md">
                      {item.label}
                    </div>
                  </Html>
                </group>
              ))}
            </group>
          ) : (
            <IPhone3DModel
              sequence={sequence}
              scrollProgress={scrollProgress}
              accentScale={isMobile ? 0.92 : 1.04}
            />
          )}

          <ContactShadows
            position={[0, -2.05, 0]}
            opacity={0.45}
            scale={7}
            blur={2.4}
            far={4}
            color="#000000"
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3.2}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}

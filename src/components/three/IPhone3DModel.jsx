import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const lerp = THREE.MathUtils.lerp;

/**
 * Procedural OLED Screen CanvasTexture so there are zero CORS texture failures
 */
function useScreenTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    // Deep studio lockscreen gradient
    const bg = ctx.createLinearGradient(0, 0, 512, 1024);
    bg.addColorStop(0, "#050609");
    bg.addColorStop(0.42, "#0d162b");
    bg.addColorStop(0.7, "#111829");
    bg.addColorStop(1, "#08090C");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 1024);

    // Subtle Titanium radial glow orb
    const orb = ctx.createRadialGradient(256, 480, 10, 256, 480, 240);
    orb.addColorStop(0, "rgba(52, 120, 246, 0.55)");
    orb.addColorStop(0.5, "rgba(197, 199, 204, 0.16)");
    orb.addColorStop(1, "rgba(8, 9, 12, 0)");
    ctx.fillStyle = orb;
    ctx.fillRect(0, 0, 512, 1024);

    // Minimalist clock & brand lockscreen typography
    ctx.fillStyle = "rgba(197, 199, 204, 0.72)";
    ctx.font = "600 22px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("CERTIFIED TITANIUM", 256, 170);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 116px system-ui, sans-serif";
    ctx.fillText("09:41", 256, 285);

    ctx.fillStyle = "#3478F6";
    ctx.fillRect(186, 980, 140, 8);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

/**
 * Multi-Layer Precision Pro iPhone Assembly
 * Separated into discrete 3D groups so both Camera Disassembly (Seq B)
 * and Full Phone Layer Disassembly (Seq C) animate independently & smoothly.
 */
export default function IPhone3DModel({
  sequence = "entrance",
  scrollProgress = 0,
  cameraExplode = 0,
  phoneExplode = 0,
  rotationOffset = 0,
  titaniumColor = "#8E9096",
  backGlassColor = "#23252A",
  accentScale = 1,
  position = [0, 0, 0],
  entranceDelay = 0,
}) {
  const rootRef = useRef();
  const frontGlassRef = useRef();
  const displayRef = useRef();
  const frameRef = useRef();
  const internalRef = useRef();
  const rearGlassRef = useRef();

  // Separate Camera Layer Refs (Section 2 Sequence B)
  const camHousingRef = useRef();
  const camMountsRef = useRef();
  const camSensorsRef = useRef();
  const camLensesRef = useRef();
  const camRingsRef = useRef();
  const camGlassRef = useRef();
  const camFlashRef = useRef();

  const screenTexture = useScreenTexture();
  const localClockRef = useRef(0);

  // Lens positions inside rear camera plateau (Pro Tri-Lens Triangle)
  const lensCoords = [
    [-0.24, 0.24],
    [-0.24, -0.22],
    [0.2, 0.01],
  ];

  useFrame((state, delta) => {
    if (!rootRef.current) return;
    localClockRef.current += delta;
    const t = Math.max(0, localClockRef.current - entranceDelay);

    // --------------------------------------------------------
    // Compute normalized animation weights from sequence + scroll
    // --------------------------------------------------------
    let targetPosX = position[0];
    let targetPosY = position[1];
    let targetPosZ = position[2];
    let targetRotX = 0.08;
    let targetRotY = -0.35 + rotationOffset;
    let targetRotZ = 0;

    let pExplode = phoneExplode;
    let cExplode = cameraExplode;

    if (sequence === "entrance") {
      // Smooth damped top entrance fall over first 1.5s, then calm hover + scroll steer
      const fallProgress = Math.min(1, t / 1.45);
      const easedFall = 1 - Math.pow(1 - fallProgress, 4);
      targetPosY = position[1] + (1 - easedFall) * 5.2 + Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
      targetRotY =
        rotationOffset +
        (1 - easedFall) * Math.PI * 1.35 +
        scrollProgress * Math.PI * 0.45 +
        state.pointer.x * 0.22;
      targetRotX = 0.06 + state.pointer.y * 0.12;
      targetPosZ = scrollProgress * 0.5;
    } else if (sequence === "camera-explode") {
      // Zoom & angle rear camera towards viewer and pulse disassembly/reassembly
      const cycle = (Math.sin(t * 1.15 - Math.PI / 2) + 1) / 2;
      // Hold slightly at peak exploded state using smoothstep plateau
      const explodedAmount = Math.min(1, Math.max(0, (cycle - 0.1) * 1.25));
      cExplode = Math.max(cameraExplode, explodedAmount);
      targetPosX = -0.45;
      targetPosY = -0.55;
      targetPosZ = 1.15;
      targetRotY = Math.PI * 0.84 + state.pointer.x * 0.16;
      targetRotX = -0.24 + state.pointer.y * 0.12;
      targetRotZ = 0.08;
    } else if (sequence === "phone-explode") {
      const cycle = (Math.sin(t * 1.0 - Math.PI / 2) + 1) / 2;
      pExplode = Math.max(phoneExplode, cycle);
      targetPosZ = -0.25;
      targetRotY = Math.PI * 0.34 + Math.sin(t * 0.45) * 0.22 + state.pointer.x * 0.2;
      targetRotX = 0.18 + state.pointer.y * 0.12;
    } else if (sequence === "showcase-360") {
      targetRotY = t * 0.65 + scrollProgress * Math.PI * 2 + rotationOffset;
      targetRotX = Math.sin(t * 0.5) * 0.12 + state.pointer.y * 0.15;
      targetPosY = Math.sin(state.clock.elapsedTime * 1.3) * 0.05;
    } else if (sequence === "lineup") {
      const fallProgress = Math.min(1, t / 1.2);
      const eased = 1 - Math.pow(1 - fallProgress, 3);
      targetPosY = position[1] + (1 - eased) * 2.5 + Math.sin(state.clock.elapsedTime * 1.4 + entranceDelay * 2) * 0.04;
      targetRotY = rotationOffset + (1 - eased) * Math.PI + Math.sin(t * 0.4 + entranceDelay) * 0.2;
      targetRotX = 0.06;
    }

    // Apply damping to main phone transform
    const k = Math.min(1, delta * 5.2);
    rootRef.current.position.x = lerp(rootRef.current.position.x, targetPosX, k);
    rootRef.current.position.y = lerp(rootRef.current.position.y, targetPosY, k);
    rootRef.current.position.z = lerp(rootRef.current.position.z, targetPosZ, k);
    rootRef.current.rotation.x = lerp(rootRef.current.rotation.x, targetRotX, k);
    rootRef.current.rotation.y = lerp(rootRef.current.rotation.y, targetRotY, k);
    rootRef.current.rotation.z = lerp(rootRef.current.rotation.z, targetRotZ, k);

    // --------------------------------------------------------
    // Sequence C: Full Phone Major Layer Disassembly (Z-axis)
    // --------------------------------------------------------
    if (frontGlassRef.current) {
      frontGlassRef.current.position.z = lerp(frontGlassRef.current.position.z, pExplode * 1.05, k);
    }
    if (displayRef.current) {
      displayRef.current.position.z = lerp(displayRef.current.position.z, pExplode * 0.55, k);
    }
    if (frameRef.current) {
      frameRef.current.position.z = lerp(frameRef.current.position.z, 0, k);
    }
    if (internalRef.current) {
      internalRef.current.position.z = lerp(internalRef.current.position.z, -pExplode * 0.22, k);
    }
    if (rearGlassRef.current) {
      rearGlassRef.current.position.z = lerp(rearGlassRef.current.position.z, -pExplode * 0.68, k);
    }

    // --------------------------------------------------------
    // Sequence B: Exploded 3D Camera Disassembly & Magnetic Reassembly
    // Rear side points toward -Z; exploding moves outward toward -Z!
    // --------------------------------------------------------
    const camBaseZ = -pExplode * 0.68;
    const hoverSpin = cExplode > 0.05 ? Math.sin(t * 1.8) * 0.14 * cExplode : 0;

    if (camMountsRef.current) {
      camMountsRef.current.position.z = lerp(camMountsRef.current.position.z, camBaseZ - cExplode * 0.28, k);
      camMountsRef.current.rotation.z = lerp(camMountsRef.current.rotation.z, hoverSpin * 0.4, k);
    }
    if (camHousingRef.current) {
      camHousingRef.current.position.z = lerp(camHousingRef.current.position.z, camBaseZ - cExplode * 0.52, k);
    }
    if (camSensorsRef.current) {
      camSensorsRef.current.position.z = lerp(camSensorsRef.current.position.z, camBaseZ - cExplode * 0.85, k);
      camSensorsRef.current.rotation.z = lerp(camSensorsRef.current.rotation.z, -hoverSpin * 0.6, k);
    }
    if (camLensesRef.current) {
      camLensesRef.current.position.z = lerp(camLensesRef.current.position.z, camBaseZ - cExplode * 1.25, k);
      camLensesRef.current.position.y = lerp(camLensesRef.current.position.y, cExplode * 0.06, k);
    }
    if (camRingsRef.current) {
      camRingsRef.current.position.z = lerp(camRingsRef.current.position.z, camBaseZ - cExplode * 1.62, k);
      camRingsRef.current.position.x = lerp(camRingsRef.current.position.x, -cExplode * 0.06, k);
    }
    if (camGlassRef.current) {
      camGlassRef.current.position.z = lerp(camGlassRef.current.position.z, camBaseZ - cExplode * 1.98, k);
    }
    if (camFlashRef.current) {
      camFlashRef.current.position.z = lerp(camFlashRef.current.position.z, camBaseZ - cExplode * 1.38, k);
      camFlashRef.current.position.x = lerp(camFlashRef.current.position.x, cExplode * 0.18, k);
      camFlashRef.current.position.y = lerp(camFlashRef.current.position.y, cExplode * 0.16, k);
    }
  });

  return (
    <group ref={rootRef} scale={accentScale}>
      {/* ========================================================
          LAYER 1: TITANIUM PRO CHASSIS FRAME + SIDE HARDWARE
          ======================================================== */}
      <group ref={frameRef}>
        <RoundedBox args={[1.66, 3.36, 0.17]} radius={0.22} smoothness={8}>
          <meshStandardMaterial
            color={titaniumColor}
            metalness={0.92}
            roughness={0.22}
            envMapIntensity={1.6}
          />
        </RoundedBox>

        {/* Action Button, Volume Up/Down & Power Button */}
        <mesh position={[-0.84, 0.72, 0]}>
          <boxGeometry args={[0.03, 0.14, 0.05]} />
          <meshStandardMaterial color={titaniumColor} metalness={0.95} roughness={0.18} />
        </mesh>
        <mesh position={[-0.84, 0.42, 0]}>
          <boxGeometry args={[0.03, 0.25, 0.05]} />
          <meshStandardMaterial color={titaniumColor} metalness={0.95} roughness={0.18} />
        </mesh>
        <mesh position={[-0.84, 0.09, 0]}>
          <boxGeometry args={[0.03, 0.25, 0.05]} />
          <meshStandardMaterial color={titaniumColor} metalness={0.95} roughness={0.18} />
        </mesh>
        <mesh position={[0.84, 0.32, 0]}>
          <boxGeometry args={[0.03, 0.36, 0.05]} />
          <meshStandardMaterial color={titaniumColor} metalness={0.95} roughness={0.18} />
        </mesh>

        {/* Bottom USB-C Port & Chamfered Rim */}
        <mesh position={[0, -1.685, 0]}>
          <boxGeometry args={[0.24, 0.02, 0.075]} />
          <meshStandardMaterial color="#0A0C10" metalness={0.8} roughness={0.35} />
        </mesh>
      </group>

      {/* ========================================================
          LAYER 2: STYLIZED INTERNAL ARCHITECTURE (Sequence C)
          Clean sculptural product visualization (no fake schematics)
          ======================================================== */}
      <group ref={internalRef}>
        {/* Brushed Dark Anodized Internal Chassis Plate */}
        <RoundedBox args={[1.48, 3.12, 0.06]} radius={0.16} smoothness={4}>
          <meshStandardMaterial color="#161922" metalness={0.85} roughness={0.32} />
        </RoundedBox>

        {/* Stylized Copper-Graphite Magnetic Coil Ring */}
        <mesh position={[0, 0.05, -0.035]}>
          <torusGeometry args={[0.42, 0.035, 16, 48]} />
          <meshStandardMaterial color="#b48a5a" metalness={0.92} roughness={0.22} />
        </mesh>

        {/* Matte Power Pack Block */}
        <RoundedBox args={[0.92, 1.55, 0.07]} radius={0.05} position={[-0.14, -0.25, 0]}>
          <meshStandardMaterial color="#0e1118" metalness={0.4} roughness={0.65} />
        </RoundedBox>

        {/* Sculptural Logic Shield Enclosure */}
        <RoundedBox args={[0.42, 1.35, 0.075]} radius={0.04} position={[0.44, 0.38, 0]}>
          <meshStandardMaterial color="#2c313d" metalness={0.9} roughness={0.2} />
        </RoundedBox>
      </group>

      {/* ========================================================
          LAYER 3: OLED SUPER RETINA XDR DISPLAY ASSEMBLY
          ======================================================== */}
      <group ref={displayRef}>
        <RoundedBox args={[1.55, 3.24, 0.028]} radius={0.19} smoothness={6} position={[0, 0, 0.072]}>
          <meshStandardMaterial color="#050608" metalness={0.3} roughness={0.45} />
        </RoundedBox>
        {/* Active OLED Artwork Face */}
        <mesh position={[0, 0, 0.088]}>
          <planeGeometry args={[1.46, 3.12]} />
          <meshStandardMaterial
            map={screenTexture}
            emissive="#1e3a8a"
            emissiveIntensity={0.28}
            roughness={0.18}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* ========================================================
          LAYER 4: FRONT CERAMIC SHIELD GLASS & DYNAMIC ISLAND
          ======================================================== */}
      <group ref={frontGlassRef}>
        <RoundedBox args={[1.57, 3.26, 0.018]} radius={0.2} smoothness={6} position={[0, 0, 0.092]}>
          <meshPhysicalMaterial
            color="#d8e3f5"
            transparent
            opacity={0.24}
            roughness={0.05}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            reflectivity={0.95}
          />
        </RoundedBox>

        {/* Dynamic Island Pill */}
        <RoundedBox args={[0.44, 0.11, 0.01]} radius={0.05} position={[0, 1.4, 0.102]}>
          <meshStandardMaterial color="#030406" roughness={0.12} metalness={0.4} />
        </RoundedBox>
      </group>

      {/* ========================================================
          LAYER 5: FROSTED REAR TITANIUM GLASS PANEL
          ======================================================== */}
      <group ref={rearGlassRef}>
        <RoundedBox args={[1.56, 3.25, 0.02]} radius={0.2} smoothness={6} position={[0, 0, -0.082]}>
          <meshPhysicalMaterial
            color={backGlassColor}
            roughness={0.42}
            metalness={0.15}
            clearcoat={0.65}
            clearcoatRoughness={0.25}
          />
        </RoundedBox>
      </group>

      {/* ========================================================
          REAR PRO CAMERA SYSTEM — SEPARATED LAYERS FOR EXPLODED VIEW
          ======================================================== */}

      {/* 5A. Structural Internal Camera Mounts & Brackets */}
      <group ref={camMountsRef}>
        <RoundedBox args={[0.74, 0.74, 0.03]} radius={0.12} position={[0.35, 1.15, -0.075]}>
          <meshStandardMaterial color="#1f232c" metalness={0.9} roughness={0.25} />
        </RoundedBox>
        {lensCoords.map(([lx, ly], idx) => (
          <mesh
            key={`mount-${idx}`}
            position={[0.35 + lx, 1.15 + ly, -0.085]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.175, 0.175, 0.03, 32]} />
            <meshStandardMaterial color="#454a54" metalness={0.95} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* 5B. Camera Module Plateau Housing */}
      <group ref={camHousingRef}>
        <RoundedBox args={[0.84, 0.84, 0.055]} radius={0.16} smoothness={6} position={[0.35, 1.15, -0.105]}>
          <meshPhysicalMaterial
            color={titaniumColor}
            metalness={0.75}
            roughness={0.2}
            clearcoat={0.9}
          />
        </RoundedBox>
      </group>

      {/* 5C. Photonic Sensor Layers & Gold OIS Frames */}
      <group ref={camSensorsRef}>
        {lensCoords.map(([lx, ly], idx) => (
          <group key={`sensor-${idx}`} position={[0.35 + lx, 1.15 + ly, -0.12]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <boxGeometry args={[0.16, 0.02, 0.16]} />
              <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.18} />
            </mesh>
            <mesh position={[0, 0, -0.012]}>
              <planeGeometry args={[0.11, 0.11]} />
              <meshStandardMaterial
                color="#0c264a"
                emissive="#1e40af"
                emissiveIntensity={0.45}
                metalness={0.8}
                roughness={0.1}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* 5D. Multi-Element Coated Optical Lens Stacks */}
      <group ref={camLensesRef}>
        {lensCoords.map(([lx, ly], idx) => (
          <group key={`lens-${idx}`} position={[0.35 + lx, 1.15 + ly, -0.135]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.11, 0.125, 0.05, 32]} />
              <meshStandardMaterial color="#090c14" metalness={0.85} roughness={0.15} />
            </mesh>
            <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.075, 0.075, 0.02, 32]} />
              <meshPhysicalMaterial
                color="#3478F6"
                emissive="#1d4ed8"
                emissiveIntensity={0.35}
                metalness={0.2}
                roughness={0.05}
                clearcoat={1}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* 5E. Machined Outer Titanium Camera Trim Rings */}
      <group ref={camRingsRef}>
        {lensCoords.map(([lx, ly], idx) => (
          <mesh key={`ring-${idx}`} position={[0.35 + lx, 1.15 + ly, -0.148]}>
            <torusGeometry args={[0.15, 0.024, 16, 40]} />
            <meshStandardMaterial
              color="#C5C7CC"
              metalness={0.98}
              roughness={0.12}
              envMapIntensity={2}
            />
          </mesh>
        ))}
      </group>

      {/* 5F. Sapphire Protective Camera Cover Glass Discs */}
      <group ref={camGlassRef}>
        {lensCoords.map(([lx, ly], idx) => (
          <mesh
            key={`glass-${idx}`}
            position={[0.35 + lx, 1.15 + ly, -0.158]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.145, 0.145, 0.01, 32]} />
            <meshPhysicalMaterial
              color="#dbeafe"
              transparent
              opacity={0.42}
              roughness={0.03}
              metalness={0.1}
              clearcoat={1}
            />
          </mesh>
        ))}
      </group>

      {/* 5G. Flash Assembly, LiDAR Scanner & Acoustic Mic Ring */}
      <group ref={camFlashRef}>
        {/* True Tone Flash Diffuser */}
        <mesh position={[0.55, 1.38, -0.135]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.025, 24]} />
          <meshStandardMaterial
            color="#fef3c7"
            emissive="#fde68a"
            emissiveIntensity={0.4}
            roughness={0.25}
          />
        </mesh>
        {/* LiDAR Time-of-Flight Scanner */}
        <mesh position={[0.55, 0.92, -0.135]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.025, 24]} />
          <meshStandardMaterial color="#050608" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Studio Microphone Mesh Pin */}
        <mesh position={[0.55, 1.15, -0.132]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.024, 0.024, 0.02, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

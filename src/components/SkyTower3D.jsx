import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/sky tower.glb');

// Lightweight radial shadow disc that eliminates secondary offscreen framebuffers
const SoftShadowDisc = ({ radius = 4.2, opacity = 0.55, position = [0, -3.1, 0] }) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0,0,0,0.85)');
    grad.addColorStop(0.5, 'rgba(0,0,0,0.3)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[radius * 2, radius * 2]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
};

const SkyTowerModel = ({ scrollProgress }) => {
  const meshRef = useRef();
  const skytower = useGLTF('/sky tower.glb');

  useFrame((state) => {
    if (meshRef.current) {
      const p = scrollProgress && typeof scrollProgress.get === 'function'
        ? Math.max(0, Math.min(1, scrollProgress.get()))
        : 0;
      // Dynamic 360-degree progressive rotation that reveals every architectural facet as user descends
      const scrollRotation = p * Math.PI * 1.5;
      const subtleFloat = Math.sin(state.clock.elapsedTime * 0.25) * 0.02;
      meshRef.current.rotation.y = scrollRotation + subtleFloat;
    }
  });

  const { size } = useThree();
  const isMobile = size.width < 768;
  // Monumental desktop scale, calibrated high-presence mobile scale
  const modelScale = isMobile ? 1.95 : 2.65;
  const modelY = isMobile ? 0.95 : 0.0;

  return (
    <Center position={[0, modelY, 0]}>
      {/* Dynamic scale tuned for monumental desktop widescreen vs mobile portrait */}
      <primitive ref={meshRef} object={skytower.scene} scale={modelScale} />
    </Center>
  );
};

// Calibrated 5-Act Architectural Drone Waypoints with dramatic altitude, lateral clearance, pitch, and optical zoom:
// Act 1 (p: 0.00): High soaring spire apex shot looking 30° down at antenna mast; Tower framed Right, Card Left
// Act 2 (p: 0.28): Intense telephoto optical zoom directly into 220m Observation Deck & revolving restaurant; Tower framed Right, Card Left
// Act 3 (p: 0.52): Ultra-wide 65° low-angle worm's-eye ascent looking up monolithic shaft; Tower swoops Left, Card Right
// Act 4 (p: 0.76): High-angle dynamic spiral orbit overlooking SkyDeck & SkyJump platforms; Tower framed Right, Card Left
// Act 5 (p: 1.00): Grand monumental panoramic pullback revealing full 328m tower beside consultation card
const DESKTOP_TOWER_WAYPOINTS = [
  { p: 0.00, pos: new THREE.Vector3(-0.6, 3.8, 4.8), look: new THREE.Vector3(-1.4, 1.8, 0), fov: 46 },
  { p: 0.28, pos: new THREE.Vector3(-0.4, 0.6, 3.0), look: new THREE.Vector3(-0.7, 0.4, 0), fov: 24 },
  { p: 0.52, pos: new THREE.Vector3(0.4, -2.6, 3.4), look: new THREE.Vector3(1.2, 1.0, 0), fov: 56 },
  { p: 0.76, pos: new THREE.Vector3(-0.5, 2.0, 4.0), look: new THREE.Vector3(-0.8, 0.7, 0), fov: 34 },
  { p: 1.00, pos: new THREE.Vector3(-0.3, 0.2, 7.2), look: new THREE.Vector3(-0.5, 0.2, 0), fov: 45 }
];

// Mobile: Close, dramatic portrait tracking with height-specific angles, optical zoom, and visible rotation in upper 55%
const MOBILE_TOWER_WAYPOINTS = [
  { p: 0.00, pos: new THREE.Vector3(0.0, 4.4, 4.6), look: new THREE.Vector3(0.0, 2.2, 0), fov: 42 },
  { p: 0.28, pos: new THREE.Vector3(0.0, 1.5, 3.2), look: new THREE.Vector3(0.0, 1.0, 0), fov: 28 },
  { p: 0.52, pos: new THREE.Vector3(0.0, -1.8, 3.6), look: new THREE.Vector3(0.0, 1.4, 0), fov: 52 },
  { p: 0.76, pos: new THREE.Vector3(0.35, 2.4, 4.2), look: new THREE.Vector3(0.0, 1.1, 0), fov: 36 },
  { p: 1.00, pos: new THREE.Vector3(0.0, 1.2, 7.2), look: new THREE.Vector3(0.0, 0.8, 0), fov: 46 }
];

const interpolateTowerWaypoints = (p, targetPos, targetLook, targetFovRef, waypoints) => {
  const clamped = Math.max(0, Math.min(1, p));
  let i = 0;
  while (i < waypoints.length - 1 && waypoints[i + 1].p < clamped) {
    i++;
  }
  const w1 = waypoints[i];
  const w2 = waypoints[Math.min(i + 1, waypoints.length - 1)];
  const range = w2.p - w1.p || 1;
  const rawT = (clamped - w1.p) / range;
  // Smooth cubic ease in-out
  const t = rawT * rawT * (3 - 2 * rawT);

  targetPos.lerpVectors(w1.pos, w2.pos, t);
  targetLook.lerpVectors(w1.look, w2.look, t);
  targetFovRef.current = THREE.MathUtils.lerp(w1.fov, w2.fov, t);
};

// Liquid-smooth Cinematic Drone Camera Rig with Dynamic Optical Zoom
const SkyTowerDroneRig = ({ scrollProgress }) => {
  const { size } = useThree();
  const isMobile = size.width < 768;
  const waypoints = isMobile ? MOBILE_TOWER_WAYPOINTS : DESKTOP_TOWER_WAYPOINTS;

  const targetPos = useRef(new THREE.Vector3(isMobile ? 0 : -0.6, isMobile ? 4.4 : 3.8, isMobile ? 4.6 : 4.8));
  const currentLookAt = useRef(new THREE.Vector3(isMobile ? 0 : -1.4, isMobile ? 2.2 : 1.8, 0));
  const targetLookAt = useRef(new THREE.Vector3(isMobile ? 0 : -1.4, isMobile ? 2.2 : 1.8, 0));
  const targetFov = useRef(isMobile ? 42 : 46);

  useFrame((state) => {
    const p = scrollProgress && typeof scrollProgress.get === 'function'
      ? Math.max(0, Math.min(1, scrollProgress.get()))
      : 0;

    interpolateTowerWaypoints(p, targetPos.current, targetLookAt.current, targetFov, waypoints);

    // Smooth exponential damping for fluid, cinematic crane/drone physics
    state.camera.position.lerp(targetPos.current, 0.06);
    currentLookAt.current.lerp(targetLookAt.current, 0.06);
    state.camera.lookAt(currentLookAt.current);

    // Dynamic optical zoom (FOV lerp with projection matrix update)
    if (Math.abs(state.camera.fov - targetFov.current) > 0.05) {
      state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, targetFov.current, 0.06);
      state.camera.updateProjectionMatrix();
    }
  });

  return null;
};

const SkyTower3D = ({ scrollProgress }) => {
  const [canvasKey, setCanvasKey] = useState(0);
  const recoveryAttempts = useRef(0);

  return (
    <div 
      className="skytower-fullscreen-canvas-wrapper"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        pointerEvents: 'none', 
        zIndex: 0,
        background: 'radial-gradient(circle at 50% 45%, #0e2b45 0%, #050E17 100%)'
      }}
    >
      <Canvas 
        key={canvasKey}
        camera={{ position: [-0.6, 3.8, 4.8], fov: 46 }} 
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: true
        }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn("Sky Tower 3D WebGL context lost - scheduling recovery");
            if (recoveryAttempts.current < 3) {
              recoveryAttempts.current += 1;
              setTimeout(() => {
                setCanvasKey((k) => k + 1);
              }, 150);
            }
          }, false);
          gl.domElement.addEventListener('webglcontextrestored', () => {
            console.info("Sky Tower 3D WebGL context restored successfully");
          }, false);
        }}
      >
        {/* Balanced Atmospheric Multi-Point Lighting */}
        <ambientLight intensity={1.8} />
        {/* Main Sun/City Key Light */}
        <directionalLight position={[14, 22, 12]} intensity={3.2} color="#FFFFFF" />
        {/* Warm Golden Hour Rim Accent */}
        <directionalLight position={[-14, 10, -8]} intensity={2.2} color="#F59E0B" />
        {/* Emerald Glow (Brand Accent) */}
        <directionalLight position={[-8, 2, 6]} intensity={1.6} color="#10B981" />
        {/* Oceanic Sky Fill */}
        <pointLight position={[2, 3, 6]} intensity={1.8} color="#38BDF8" />
        {/* Spire Beacon Highlight */}
        <pointLight position={[0, 4, 2]} intensity={1.5} color="#E0F2FE" distance={14} />

        <SkyTowerDroneRig scrollProgress={scrollProgress} />
        <SkyTowerModel scrollProgress={scrollProgress} />

        {/* Scaled Contact Shadow Disc */}
        <SoftShadowDisc radius={3.8} opacity={0.6} position={[0, -2.75, 0]} />
      </Canvas>
    </div>
  );
};

export default SkyTower3D;

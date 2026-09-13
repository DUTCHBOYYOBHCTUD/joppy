import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
      // Elegant cinematic rotation that reveals every facet of the tower as user descends
      const scrollRotation = p * Math.PI * 0.7;
      const subtleFloat = Math.sin(state.clock.elapsedTime * 0.2) * 0.025;
      meshRef.current.rotation.y = scrollRotation + subtleFloat;
    }
  });

  return (
    <Center>
      {/* Scale 2.0 perfectly balances majestic architectural presence with clean UI spacing */}
      <primitive ref={meshRef} object={skytower.scene} scale={2.0} />
    </Center>
  );
};

// Calibrated Cinematic Drone Waypoints with perfect lateral framing:
// Shot 1 (p: 0.00): High-angle aerial looking down at the needle spire and top pod (Tower framed right, Card left)
// Shot 2 (p: 0.38): Dramatic 140° orbital swoop level with the Observation Deck (Tower framed left, Card right)
// Shot 3 (p: 0.68): Low-angle ascending perspective gazing up the slender shaft towards the deck (Tower framed right, Card left)
// Shot 4 (p: 1.00): Grand full-tower panoramic finale pulling back to reveal spire to base (Tower framed right, Card left)
const TOWER_WAYPOINTS = [
  { p: 0.00, pos: new THREE.Vector3(-0.4, 2.0, 5.0), look: new THREE.Vector3(-1.2, 1.2, 0) },
  { p: 0.40, pos: new THREE.Vector3(0.6, 0.8, 4.8), look: new THREE.Vector3(1.4, 0.5, 0) },
  { p: 0.68, pos: new THREE.Vector3(-0.5, -0.6, 4.8), look: new THREE.Vector3(-1.2, 0.3, 0) },
  { p: 0.92, pos: new THREE.Vector3(-0.3, 0.0, 6.0), look: new THREE.Vector3(-1.2, 0.0, 0) }
];

const interpolateTowerWaypoints = (p, targetPos, targetLook) => {
  const clamped = Math.max(0, Math.min(1, p));
  let i = 0;
  while (i < TOWER_WAYPOINTS.length - 1 && TOWER_WAYPOINTS[i + 1].p < clamped) {
    i++;
  }
  const w1 = TOWER_WAYPOINTS[i];
  const w2 = TOWER_WAYPOINTS[Math.min(i + 1, TOWER_WAYPOINTS.length - 1)];
  const range = w2.p - w1.p || 1;
  const rawT = (clamped - w1.p) / range;
  const t = rawT * rawT * (3 - 2 * rawT);

  targetPos.lerpVectors(w1.pos, w2.pos, t);
  targetLook.lerpVectors(w1.look, w2.look, t);
};

// Liquid-smooth Cinematic Drone Camera Rig
const SkyTowerDroneRig = ({ scrollProgress }) => {
  const targetPos = useRef(new THREE.Vector3(-0.4, 2.0, 5.0));
  const currentLookAt = useRef(new THREE.Vector3(-1.1, 1.2, 0));
  const targetLookAt = useRef(new THREE.Vector3(-1.1, 1.2, 0));

  useFrame((state) => {
    const p = scrollProgress && typeof scrollProgress.get === 'function'
      ? Math.max(0, Math.min(1, scrollProgress.get()))
      : 0;

    interpolateTowerWaypoints(p, targetPos.current, targetLookAt.current);

    // Smooth exponential damping
    state.camera.position.lerp(targetPos.current, 0.05);
    currentLookAt.current.lerp(targetLookAt.current, 0.05);
    state.camera.lookAt(currentLookAt.current);
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
        camera={{ position: [-0.4, 2.0, 5.0], fov: 42 }} 
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
        <ambientLight intensity={1.7} />
        <directionalLight position={[12, 18, 10]} intensity={2.8} />
        <directionalLight position={[-12, 8, -6]} intensity={1.9} color="#CFA461" />
        <directionalLight position={[-6, 1, 4]} intensity={1.3} color="#10b981" />
        <pointLight position={[1, 2, 5]} intensity={1.4} color="#60a5fa" />

        <SkyTowerDroneRig scrollProgress={scrollProgress} />
        <SkyTowerModel scrollProgress={scrollProgress} />

        <SoftShadowDisc radius={2.4} opacity={0.5} position={[0, -1.92, 0]} />
      </Canvas>
    </div>
  );
};

export default SkyTower3D;

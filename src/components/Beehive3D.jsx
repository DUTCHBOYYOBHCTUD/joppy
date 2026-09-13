import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/beehive.glb');

// Lightweight radial shadow disc that eliminates secondary offscreen framebuffers
const SoftShadowDisc = ({ radius = 4.2, opacity = 0.55, position = [0, -2.1, 0] }) => {
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

const BeehiveModel = ({ scrollProgress }) => {
  const meshRef = useRef();
  const beehive = useGLTF('/beehive.glb');

  useFrame((state) => {
    if (meshRef.current) {
      const p = scrollProgress && typeof scrollProgress.get === 'function' 
        ? Math.max(0, Math.min(1, scrollProgress.get())) 
        : 0;
      // Elegant orbital rotation synchronized with the scrollytelling progression
      const scrollRot = p * Math.PI * 0.75;
      const subtleFloat = Math.sin(state.clock.elapsedTime * 0.2) * 0.025;
      meshRef.current.rotation.y = scrollRot + subtleFloat;
    }
  });

  return (
    <Center>
      {/* Scale 1.85 balances majestic landmark presence with clean, unobstructed UI layout */}
      <primitive ref={meshRef} object={beehive.scene} scale={1.85} />
    </Center>
  );
};

// Calibrated Cinematic Drone Waypoints:
// Act 1 (p: 0.00): Hero angle, landmark framed on right, hero card on left
// Act 2 (p: 0.28): 120° swoop to the right looking back at Beehive, about card on left
// Act 3 (p: 0.52): Sweep left, looking right at the tiered columns, services card on right
// Act 4 (p: 0.74): Dynamic elevated architectural angle, stories card on left
// Act 5 (p: 1.00): Grand consultation finale, Beehive framed majestically on right, CTA card on left
const WAYPOINTS = [
  { p: 0.00, pos: new THREE.Vector3(-2.4, 1.8, 5.0), look: new THREE.Vector3(0.8, 0.3, 0) },
  { p: 0.28, pos: new THREE.Vector3(3.0, 1.6, 4.4), look: new THREE.Vector3(-0.8, 0.3, 0) },
  { p: 0.52, pos: new THREE.Vector3(-3.4, 1.7, 4.2), look: new THREE.Vector3(0.8, 0.2, 0) },
  { p: 0.74, pos: new THREE.Vector3(2.8, 2.4, 4.6), look: new THREE.Vector3(-0.6, 0.4, 0) },
  { p: 1.00, pos: new THREE.Vector3(-1.8, 1.5, 5.2), look: new THREE.Vector3(0.7, 0.5, 0) }
];

const interpolateWaypoints = (p, targetPos, targetLook) => {
  const clamped = Math.max(0, Math.min(1, p));
  let i = 0;
  while (i < WAYPOINTS.length - 1 && WAYPOINTS[i + 1].p < clamped) {
    i++;
  }
  const w1 = WAYPOINTS[i];
  const w2 = WAYPOINTS[Math.min(i + 1, WAYPOINTS.length - 1)];
  const range = w2.p - w1.p || 1;
  const rawT = (clamped - w1.p) / range;
  // Smoothstep easing
  const t = rawT * rawT * (3 - 2 * rawT);

  targetPos.lerpVectors(w1.pos, w2.pos, t);
  targetLook.lerpVectors(w1.look, w2.look, t);
};

const BeehiveDroneRig = ({ scrollProgress }) => {
  const targetPos = useRef(new THREE.Vector3(-2.4, 1.8, 5.0));
  const currentLookAt = useRef(new THREE.Vector3(0.8, 0.3, 0));
  const targetLookAt = useRef(new THREE.Vector3(0.8, 0.3, 0));

  useFrame((state) => {
    const p = scrollProgress && typeof scrollProgress.get === 'function' 
      ? Math.max(0, Math.min(1, scrollProgress.get())) 
      : 0;

    interpolateWaypoints(p, targetPos.current, targetLookAt.current);

    // Liquid-smooth cinematic damping (lerp)
    state.camera.position.lerp(targetPos.current, 0.05);
    currentLookAt.current.lerp(targetLookAt.current, 0.05);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
};

const Beehive3D = ({ scrollProgress }) => {
  const [canvasKey, setCanvasKey] = useState(0);
  const recoveryAttempts = useRef(0);

  return (
    <div 
      className="beehive-fullscreen-canvas-wrapper"
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
        camera={{ position: [-2.4, 1.8, 5.0], fov: 42 }}
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
            console.warn("Beehive 3D WebGL context lost - scheduling recovery");
            if (recoveryAttempts.current < 3) {
              recoveryAttempts.current += 1;
              setTimeout(() => {
                setCanvasKey((k) => k + 1);
              }, 150);
            }
          }, false);
          gl.domElement.addEventListener('webglcontextrestored', () => {
            console.info("Beehive 3D WebGL context restored successfully");
          }, false);
        }}
      >
        <ambientLight intensity={1.7} />
        
        {/* Dynamic Studio Lighting that highlights architectural columns */}
        <directionalLight position={[12, 16, 10]} intensity={2.8} />
        <directionalLight position={[-12, 10, -8]} intensity={1.9} color="#CFA461" />
        <pointLight position={[0, -3, 5]} intensity={1.4} color="#93c5fd" />
        <pointLight position={[0, 4, 0]} intensity={1.0} color="#10b981" />

        <BeehiveDroneRig scrollProgress={scrollProgress} />
        <BeehiveModel scrollProgress={scrollProgress} />

        <SoftShadowDisc radius={3.4} opacity={0.55} position={[0, -1.78, 0]} />
      </Canvas>
    </div>
  );
};

export default Beehive3D;

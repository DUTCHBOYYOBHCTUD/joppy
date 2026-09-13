import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

useGLTF.preload('/beehive.glb');

// Lightweight radial shadow disc that eliminates secondary offscreen framebuffers
const SoftShadowDisc = ({ radius = 3.6, opacity = 0.55, position = [0, -1.78, 0] }) => {
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

  // Tune material specular reflections, roughness, and metalness on model load
  useMemo(() => {
    if (beehive.scene) {
      beehive.scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.envMapIntensity = 1.35;
          // Calibrate roughness and metalness so the bronze dome, copper roof, and marble columns catch rich specular reflections
          if (child.material.roughness !== undefined) {
            child.material.roughness = Math.min(child.material.roughness, 0.42);
          }
          if (child.material.metalness !== undefined) {
            child.material.metalness = Math.max(child.material.metalness, 0.22);
          }
          child.material.needsUpdate = true;
        }
      });
    }
  }, [beehive]);

  useFrame((state) => {
    if (meshRef.current) {
      const p = scrollProgress && typeof scrollProgress.get === 'function' 
        ? Math.max(0, Math.min(1, scrollProgress.get())) 
        : 0;
      // Elegant orbital rotation synchronized with the scrollytelling progression
      const scrollRot = p * Math.PI * 0.85;
      const subtleFloat = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
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

// Calibrated Creative Architectural Drone Waypoints:
// Act 1 (p: 0.00): Grand full-monument establishing hero shot. Entire Beehive visible from podium steps to dome, framed proudly on right, hero card on left
// Act 2 (p: 0.28): Intimate mid-level colonnade fly-by. Camera swoops close to the circular balconies and fluted pillars, framed on right, about card on left
// Act 3 (p: 0.52): Monumental ascending worm's-eye drone shot. Camera dives low to foundation steps and gazes upwards at spiraling tiers, framed on left, services card on right
// Act 4 (p: 0.74): Elevated high-altitude spiral sweep. Drone climbs high, tilting down over concentric roof rings and copper dome, framed on right, stories card on left
// Act 5 (p: 1.00): Grand wide-angle panoramic pullback finale. Full building centered in sunset glow behind consultation CTA
const WAYPOINTS = [
  { p: 0.00, pos: new THREE.Vector3(-1.8, -0.2, 5.4), look: new THREE.Vector3(0.95, 0.0, 0) },
  { p: 0.28, pos: new THREE.Vector3(2.8, -0.1, 4.4), look: new THREE.Vector3(-0.85, 0.1, 0) },
  { p: 0.52, pos: new THREE.Vector3(-2.7, -1.05, 4.5), look: new THREE.Vector3(0.95, 0.55, 0) },
  { p: 0.74, pos: new THREE.Vector3(2.6, 2.4, 4.6), look: new THREE.Vector3(-0.9, 0.1, 0) },
  { p: 1.00, pos: new THREE.Vector3(0.0, -0.15, 6.4), look: new THREE.Vector3(0.0, -0.1, 0) }
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
  const targetPos = useRef(new THREE.Vector3(-1.8, -0.2, 5.4));
  const currentLookAt = useRef(new THREE.Vector3(0.95, 0.0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0.95, 0.0, 0));

  useFrame((state) => {
    const p = scrollProgress && typeof scrollProgress.get === 'function' 
      ? Math.max(0, Math.min(1, scrollProgress.get())) 
      : 0;

    interpolateWaypoints(p, targetPos.current, targetLookAt.current);

    // Liquid-smooth cinematic damping (lerp)
    state.camera.position.lerp(targetPos.current, 0.06);
    currentLookAt.current.lerp(targetLookAt.current, 0.06);
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
        camera={{ position: [-1.8, -0.2, 5.4], fov: 40 }}
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
        {/* Procedural High-Dynamic-Range Reflection Environment (0 external network requests, zero WebGL overhead) */}
        <Environment resolution={256}>
          {/* Golden warm architectural sun glint reflection */}
          <Lightformer form="ring" intensity={2.8} color="#fde047" scale={6} position={[8, 10, 6]} target={[0, 0, 0]} />
          {/* Ocean horizon fill reflection */}
          <Lightformer form="rect" intensity={2.0} color="#38bdf8" scale={[12, 5, 1]} position={[-8, 3, 4]} />
          {/* Amber sunset rim reflection */}
          <Lightformer form="circle" intensity={1.8} color="#f97316" scale={5} position={[0, -2, -6]} />
          {/* Upper sky ambient reflection */}
          <Lightformer form="rect" intensity={1.4} color="#e0f2fe" scale={10} position={[0, 12, 0]} />
        </Environment>

        {/* Dynamic Studio Lighting calibrated for architectural depth */}
        <ambientLight intensity={1.4} />
        <directionalLight position={[12, 16, 10]} intensity={2.6} color="#fff7ed" />
        <directionalLight position={[-12, 10, -8]} intensity={2.0} color="#CFA461" />
        <directionalLight position={[-6, -4, 6]} intensity={1.4} color="#38bdf8" />
        <pointLight position={[0, -2.2, 3]} intensity={1.6} distance={10} color="#f59e0b" />
        <pointLight position={[0, 3, 1]} intensity={1.2} distance={8} color="#38bdf8" />

        <BeehiveDroneRig scrollProgress={scrollProgress} />
        <BeehiveModel scrollProgress={scrollProgress} />

        <SoftShadowDisc radius={3.6} opacity={0.55} position={[0, -1.78, 0]} />
      </Canvas>
    </div>
  );
};

export default Beehive3D;

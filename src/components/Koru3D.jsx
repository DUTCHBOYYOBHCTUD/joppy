import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, Center } from '@react-three/drei';
import * as THREE from 'three';

// Custom curve for the Koru (Māori Spiral)
class KoruCurve extends THREE.Curve {
  constructor(scale = 1) {
    super();
    this.scale = scale;
  }
  
  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const turns = 1.8;
    const theta = t * Math.PI * 2 * turns; 
    
    const maxRadius = 3;
    const r = maxRadius * (1 - t) + 0.2; 
    
    const x = r * Math.cos(theta) * this.scale;
    const y = r * Math.sin(theta) * this.scale;
    const z = Math.sin(t * Math.PI * 2) * 0.4 * this.scale;

    return optionalTarget.set(x, y, z);
  }
}

const KoruMesh = () => {
  const meshRef = useRef();
  
  // Set scale to 1.0 for a balanced size
  const curve = useMemo(() => new KoruCurve(1.0), []);
  
  // Smooth, elegant auto-rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5; // Constant slow spin
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.2; // Gentle tilt
    }
  });

  return (
    <Center>
      <mesh ref={meshRef} rotation={[0, 0, -Math.PI / 4]}>
        <tubeGeometry args={[curve, 150, 0.4, 32, false]} />
        
        {/* Solid Gold Material */}
        <meshStandardMaterial 
          color="#D4AF37"
          emissive="#4A3510"
          emissiveIntensity={0.2}
          metalness={1}
          roughness={0.15}
        />
      </mesh>
    </Center>
  );
};

const Koru3D = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <spotLight position={[-10, -10, -10]} intensity={1} color="#CFA461" />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={1.5}>
          <KoruMesh />
        </Float>

        <Environment preset="studio" />
        
        <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={15} blur={2.5} far={4} color="#000000" />
      </Canvas>
    </div>
  );
};

export default Koru3D;

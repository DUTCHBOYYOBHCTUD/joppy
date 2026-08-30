import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows, Center } from '@react-three/drei';
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
  
  // Increased scale from 0.8 to 1.5 to make it much larger
  const curve = useMemo(() => new KoruCurve(1.5), []);
  
  // Auto-rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Center>
      <mesh ref={meshRef} rotation={[0, 0, -Math.PI / 4]}>
        {/* Increased tube radius slightly to make it bolder */}
        <tubeGeometry args={[curve, 150, 0.6, 32, false]} />
        
        {/* Solid Gold Material for guaranteed visibility and premium look */}
        <meshStandardMaterial 
          color="#D4AF37" /* Classic Gold */
          emissive="#4A3510"
          emissiveIntensity={0.3}
          metalness={1}
          roughness={0.15}
        />
      </mesh>
    </Center>
  );
};

const Koru3D = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px', position: 'relative' }}>
      {/* Moved camera slightly closer by reducing Z from 8 to 7 */}
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        {/* Brightened lighting to make the gold pop */}
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <spotLight position={[-10, -10, -10]} intensity={1} color="#CFA461" />

        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 4, Math.PI / 4]} 
          azimuth={[-Math.PI / 3, Math.PI / 3]}
        >
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
            <KoruMesh />
          </Float>
        </PresentationControls>

        {/* Studio environment for sharp gold reflections */}
        <Environment preset="studio" />
        
        <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={15} blur={2.5} far={4} color="#000000" />
      </Canvas>
      
      {/* Overlay hint */}
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(9, 28, 46, 0.5)', fontSize: '0.8rem', fontWeight: 600, pointerEvents: 'none', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Interact to Rotate
      </div>
    </div>
  );
};

export default Koru3D;

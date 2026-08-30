import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Custom curve for the Koru (Māori Spiral)
class KoruCurve extends THREE.Curve {
  constructor(scale = 1) {
    super();
    this.scale = scale;
  }
  
  getPoint(t, optionalTarget = new THREE.Vector3()) {
    // t goes from 0 to 1
    // We want a spiral that curls inward. Let's make t=0 the outer base, t=1 the inner tip.
    const turns = 1.8;
    const theta = t * Math.PI * 2 * turns; 
    
    // Radius shrinks as it curls inward
    const maxRadius = 3;
    const r = maxRadius * (1 - t) + 0.2; // base radius to tip radius
    
    const x = r * Math.cos(theta) * this.scale;
    const y = r * Math.sin(theta) * this.scale;
    
    // Add some 3D depth so it's not perfectly flat
    const z = Math.sin(t * Math.PI * 2) * 0.4 * this.scale;

    return optionalTarget.set(x, y, z);
  }
}

const KoruMesh = () => {
  const meshRef = useRef();
  
  // Generate the geometry
  const curve = useMemo(() => new KoruCurve(0.8), []);
  
  // Auto-rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
      {/* Tube geometry follows the path. radius=0.4 */}
      <tubeGeometry args={[curve, 100, 0.4, 32, false]} />
      
      {/* Premium Frosted Gold Glass Material */}
      <meshPhysicalMaterial 
        color="#EAC170" /* Gold base */
        emissive="#5C4010" /* Warm internal glow */
        emissiveIntensity={0.2}
        roughness={0.15} /* Smooth but slightly frosted */
        metalness={0.8}
        transmission={0.9} /* Glass-like transparency */
        thickness={1.5}
        ior={1.5} /* Index of refraction for glass */
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
};

const Koru3D = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Soft studio lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#091C2E" />

        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
            <KoruMesh />
          </Float>
        </PresentationControls>

        {/* Environment map for realistic reflections on the glass */}
        <Environment preset="city" />
        
        {/* Subtle drop shadow underneath */}
        <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>
      
      {/* Overlay hint */}
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(9, 28, 46, 0.5)', fontSize: '0.8rem', fontWeight: 600, pointerEvents: 'none', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Interact to Rotate
      </div>
    </div>
  );
};

export default Koru3D;

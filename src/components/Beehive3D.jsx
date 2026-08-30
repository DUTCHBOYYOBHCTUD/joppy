import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, useGLTF, Center } from '@react-three/drei';

useGLTF.preload('/beehive.glb');

const BeehiveModel = () => {
  const meshRef = useRef();
  const beehive = useGLTF('/beehive.glb');

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Center position={[0, -0.5, 0]}>
      {/* Reduced scale from 3 to 2.2 to prevent clipping on the edges */}
      <primitive ref={meshRef} object={beehive.scene} scale={2.2} />
    </Center>
  );
};

const Beehive3D = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Pulled camera slightly back (z: 8.5) and up (y: 2) to frame the dome perfectly */}
      <Canvas camera={{ position: [0, 2, 8.5], fov: 45 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent' }}>
        <ambientLight intensity={1.5} />
        
        <spotLight position={[10, 20, 10]} angle={0.4} penumbra={1} intensity={3.5} castShadow />
        <spotLight position={[-15, 10, -10]} intensity={2.5} color="#CFA461" />
        <spotLight position={[0, -5, 5]} intensity={1.5} color="#ffffff" />

        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.5}>
          <BeehiveModel />
        </Float>

        <Environment preset="city" />
        
        <ContactShadows position={[0, -2, 0]} opacity={0.7} scale={20} blur={3} far={10} color="#000000" />
      </Canvas>
    </div>
  );
};

export default Beehive3D;

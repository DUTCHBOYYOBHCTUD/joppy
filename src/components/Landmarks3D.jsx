import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, useGLTF, Center } from '@react-three/drei';

// Preload models for faster rendering
useGLTF.preload('/beehive.glb');
useGLTF.preload('/sky tower.glb');

const LandmarkModels = () => {
  const groupRef = useRef();
  
  // Load the models
  const beehive = useGLTF('/beehive.glb');
  const skytower = useGLTF('/sky tower.glb');

  // Gentle, continuous auto-rotation of the entire group
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* We use Center to automatically center and normalize the pivot of the models */}
      <Center position={[-1.5, 0, 1]}>
        <primitive object={beehive.scene} scale={0.5} />
      </Center>
      
      <Center position={[1.5, 0, -1]}>
        <primitive object={skytower.scene} scale={0.7} />
      </Center>
    </group>
  );
};

const Landmarks3D = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '500px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 45 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {/* Soft, bright ambient lighting to showcase the original textures */}
        <ambientLight intensity={1.5} />
        
        {/* Key lights for dramatic shadowing */}
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2.5} castShadow />
        <spotLight position={[-10, 10, -10]} intensity={1.5} color="#CFA461" />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={1}>
          <LandmarkModels />
        </Float>

        {/* Studio environment for high-quality reflections */}
        <Environment preset="city" />
        
        {/* Ground shadow for depth */}
        <ContactShadows position={[0, -4, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#000000" />
      </Canvas>
    </div>
  );
};

export default Landmarks3D;

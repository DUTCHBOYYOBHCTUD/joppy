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
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Increased scale massively and brought them closer together */}
      <Center position={[-2.5, 0, 1.5]}>
        <primitive object={beehive.scene} scale={2.5} />
      </Center>
      
      <Center position={[1.5, 0, -1]}>
        <primitive object={skytower.scene} scale={3.5} />
      </Center>
    </group>
  );
};

const Landmarks3D = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Pulled camera much closer to make the models look huge and imposing */}
      <Canvas camera={{ position: [0, 1, 7], fov: 40 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {/* Adjusted lighting for more contrast and drama */}
        <ambientLight intensity={1.2} />
        
        <spotLight position={[10, 20, 10]} angle={0.4} penumbra={1} intensity={3} castShadow />
        <spotLight position={[-15, 10, -10]} intensity={2} color="#CFA461" />
        <spotLight position={[0, -5, 5]} intensity={1} color="#ffffff" /> {/* Uplight for detail */}

        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.5}>
          <LandmarkModels />
        </Float>

        <Environment preset="city" />
        
        {/* Adjusted ground shadow to match new scale */}
        <ContactShadows position={[0, -2, 0]} opacity={0.7} scale={30} blur={3} far={10} color="#000000" />
      </Canvas>
    </div>
  );
};

export default Landmarks3D;

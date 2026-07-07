import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './HeroSection.css';

const ReactiveGlobe = () => {
  const materialRef = useRef();
  const [active, setActive] = useState(false);
  
  useFrame(() => {
    if (materialRef.current) {
      // When hovering (active), increase distortion and speed. Otherwise, return to base.
      const targetDistort = active ? 0.6 : 0.3;
      const targetSpeed = active ? 3.0 : 1.5;

      // Smoothly interpolate current values to target values
      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.1);
      materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed, 0.1);
    }
  });

  return (
    <Sphere 
      args={[2, 64, 64]} 
      scale={1.2}
      onPointerOver={() => setActive(true)}
      onPointerOut={() => setActive(false)}
    >
      <MeshDistortMaterial 
        ref={materialRef}
        color="#00A86B" 
        attach="material" 
        distort={0.3} 
        speed={1.5} 
        roughness={0.2}
      />
    </Sphere>
  );
};

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="hero-title">
              <span className="block">STUDY.</span>
              <span className="block">MIGRATE.</span>
              <span className="block text-accent">SUCCEED.</span>
            </h1>
            <p className="hero-subtitle">
              Helping ambitious students secure admissions, visas, scholarships, and career pathways in New Zealand.
            </p>
            <div className="hero-ctas">
              <button className="btn btn-primary">Start Your Journey</button>
              <button className="btn btn-outline">Free Consultation</button>
            </div>
          </motion.div>
        </div>

        <div className="hero-visual">
          <Canvas>
            <ambientLight intensity={1.5} />
            <directionalLight position={[2, 5, 2]} intensity={2} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            <ReactiveGlobe />
          </Canvas>
          {/* Floating UI Elements */}
          <motion.div 
            className="floating-card glass top-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <strong>University of Auckland</strong>
            <small>Admissions Open</small>
          </motion.div>
          <motion.div 
            className="floating-card glass bottom-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <strong>100%</strong>
            <small>Visa Success Rate</small>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

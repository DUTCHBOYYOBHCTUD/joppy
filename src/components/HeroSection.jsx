import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './HeroSection.css';

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
            <h1 className="hero-title" style={{ fontSize: '4.5rem', lineHeight: '1.1' }}>
              <span className="block">STUDY.</span>
              <span className="block">MIGRATE.</span>
              <span className="block text-accent">SUCCEED.</span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1.5rem', marginTop: '1.5rem', color: 'var(--color-secondary-cream)', fontWeight: 300, fontStyle: 'italic' }}>
              Let's build a better future together.
            </p>
            <div className="hero-ctas">
              <Link to="/contact" className="btn btn-primary">Start Your Journey</Link>
              <Link to="/why-nz" className="btn btn-outline">Discover NZ</Link>
            </div>
          </motion.div>
        </div>

        <div className="hero-visual">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hero-image-wrapper"
            style={{ width: '100%', height: '600px', borderRadius: '30px', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Students in New Zealand" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(11,61,46,0.6), transparent)' }}></div>
          </motion.div>

          {/* Floating UI Elements */}
          <motion.div 
            className="floating-card glass top-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <strong>New Zealand</strong>
            <small>World-Class Education</small>
          </motion.div>
          <motion.div 
            className="floating-card glass bottom-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <strong>100%</strong>
            <small>Dedicated Support</small>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

import { motion } from 'framer-motion';
import './AnimatedHero.css';

const AnimatedHero = ({ title, subtitle, bgImage }) => {
  return (
    <section className="animated-hero" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="hero-overlay"></div>
      <div className="container hero-content-wrapper">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="page-hero-title"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="page-hero-subtitle"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default AnimatedHero;

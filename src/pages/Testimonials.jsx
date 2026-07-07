import AnimatedHero from '../components/AnimatedHero';
import SuccessStories from '../components/SuccessStories';
import { motion } from 'framer-motion';
import { Video } from 'lucide-react';
import './PageLayouts.css';

const Testimonials = () => {
  return (
    <div className="page-wrapper">
      <AnimatedHero 
        title="Student Success Stories" 
        subtitle="Hear from our successful students who are living their dream in New Zealand."
        bgImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      
      <SuccessStories />

      <section className="section-padding bg-dark">
        <div className="container">
          <div className="section-header text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title text-secondary-cream"
            >
              VIDEO <span className="text-accent">DIARIES</span>
            </motion.h2>
            <p className="text-secondary-cream opacity-80">Watch our students share their journey from application to arrival.</p>
          </div>

          <div className="campus-grid">
            {[
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            ].map((imgUrl, idx) => (
              <motion.div 
                key={idx}
                className="campus-img-wrapper"
                style={{ position: 'relative', cursor: 'pointer' }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <img src={imgUrl} alt={`Video ${idx + 1}`} className="campus-img" style={{ filter: 'brightness(0.7)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--color-secondary-cream)' }}>
                  <Video size={64} opacity={0.8} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;

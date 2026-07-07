import AnimatedHero from '../components/AnimatedHero';
import TopUniversities from '../components/TopUniversities';
import { motion } from 'framer-motion';
import './PageLayouts.css';

const campusImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
];

const Universities = () => {
  return (
    <div className="page-wrapper">
      <AnimatedHero 
        title="World-Class Institutions" 
        subtitle="Explore our partner universities and find the perfect fit for your academic journey."
        bgImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      
      <TopUniversities />

      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              CAMPUS <span className="text-accent">LIFE</span>
            </motion.h2>
            <p>Experience vibrant student communities and state-of-the-art facilities.</p>
          </div>

          <div className="campus-grid">
            {campusImages.map((img, idx) => (
              <motion.div 
                key={idx}
                className="campus-img-wrapper"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <img src={img} alt={`Campus ${idx + 1}`} className="campus-img" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Universities;

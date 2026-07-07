import AnimatedHero from '../components/AnimatedHero';
import ScholarshipFinder from '../components/ScholarshipFinder';
import { motion } from 'framer-motion';
import { Award, Star } from 'lucide-react';
import './PageLayouts.css';

const Scholarships = () => {
  return (
    <div className="page-wrapper">
      <AnimatedHero 
        title="Fund Your Future" 
        subtitle="Identify and apply for eligible financial aid, grants, and prestigious scholarships."
        bgImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      
      <ScholarshipFinder />

      <section className="section-padding bg-dark">
        <div className="container">
          <div className="section-header text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title text-secondary-cream"
            >
              TOP <span className="text-accent">GRANTS</span>
            </motion.h2>
            <p className="text-secondary-cream opacity-80">Popular scholarships for international students.</p>
          </div>

          <div className="pathways-grid">
            <motion.div className="pathway-card glass-dark" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Award size={40} className="text-accent mb-4" />
              <h3>Manaaki New Zealand Scholarships</h3>
              <p>Full funding provided by the NZ government for eligible international students from developing countries.</p>
            </motion.div>
            
            <motion.div className="pathway-card glass-dark" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Star size={40} className="text-accent mb-4" />
              <h3>University Excellence Awards</h3>
              <p>Merit-based scholarships offered directly by top universities, typically ranging from $5,000 to $20,000 NZD.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Scholarships;

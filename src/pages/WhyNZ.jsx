import AnimatedHero from '../components/AnimatedHero';
import WhyNewZealand from '../components/WhyNewZealand';
import { motion } from 'framer-motion';
import { Briefcase, Building, Route } from 'lucide-react';
import './PageLayouts.css';

const WhyNZ = () => {
  return (
    <div className="page-wrapper">
      <AnimatedHero 
        title="Discover Aotearoa" 
        subtitle="A destination that balances academic excellence with an unmatched lifestyle and clear pathways to your global future."
        bgImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      
      <WhyNewZealand />

      <section className="section-padding bg-dark pr-pathways">
        <div className="container">
          <div className="section-header text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title text-secondary-cream"
            >
              WORK & <span className="text-accent">SETTLE</span>
            </motion.h2>
            <p className="text-secondary-cream opacity-80">New Zealand offers some of the most welcoming post-study work policies in the world.</p>
          </div>

          <div className="pathways-grid">
            <motion.div className="pathway-card glass-dark" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Briefcase size={40} className="text-accent mb-4" />
              <h3>Post-Study Work Visa</h3>
              <p>Stay and work in New Zealand for up to 3 years after completing your degree. Gain valuable international experience.</p>
            </motion.div>
            
            <motion.div className="pathway-card glass-dark" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Building size={40} className="text-accent mb-4" />
              <h3>Skill Shortage Opportunities</h3>
              <p>Graduates in fields like IT, Engineering, and Healthcare are in high demand and often find immediate placement.</p>
            </motion.div>

            <motion.div className="pathway-card glass-dark" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Route size={40} className="text-accent mb-4" />
              <h3>PR Pathways</h3>
              <p>Clear, points-based pathways to transition from a post-study work visa to Permanent Residency.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyNZ;

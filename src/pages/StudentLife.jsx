import AnimatedHero from '../components/AnimatedHero';
import { motion } from 'framer-motion';
import { Coffee, Home, Bus, HeartPulse } from 'lucide-react';
import './PageLayouts.css';

const StudentLife = () => {
  return (
    <div className="page-wrapper">
      <AnimatedHero 
        title="Live, Learn, Thrive" 
        subtitle="Experience a vibrant culture, breathtaking landscapes, and a safe community."
        bgImage="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section-padding bg-dark">
        <div className="container">
          <div className="section-header text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title text-secondary-cream"
            >
              CULTURE & <span className="text-accent">SAFETY</span>
            </motion.h2>
            <p className="text-secondary-cream opacity-80">Ranked as one of the safest countries globally with a welcoming society.</p>
          </div>

          <div className="pathways-grid">
            <motion.div className="pathway-card glass-dark" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <HeartPulse size={40} className="text-accent mb-4" />
              <h3>Wellbeing First</h3>
              <p>Universities prioritize student mental and physical health with dedicated international support teams.</p>
            </motion.div>
            
            <motion.div className="pathway-card glass-dark" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Coffee size={40} className="text-accent mb-4" />
              <h3>Vibrant Social Scene</h3>
              <p>From coffee culture in Wellington to adventure sports in Queenstown, there's always something to do.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              ESTIMATED <span className="text-accent">LIVING COSTS</span>
            </motion.h2>
            <p>A quick breakdown of average monthly expenses (NZD).</p>
          </div>

          <div className="cost-grid">
            <motion.div className="cost-card" whileHover={{ y: -10 }}>
              <Home size={32} className="text-accent" style={{margin: '0 auto'}} />
              <h3>Accommodation</h3>
              <div className="cost-value">$800 - $1200</div>
              <p className="opacity-80 mt-2">Shared flat or student hall</p>
            </motion.div>
            <motion.div className="cost-card" whileHover={{ y: -10 }}>
              <Coffee size={32} className="text-accent" style={{margin: '0 auto'}} />
              <h3>Food & Groceries</h3>
              <div className="cost-value">$400 - $600</div>
              <p className="opacity-80 mt-2">Depending on dietary habits</p>
            </motion.div>
            <motion.div className="cost-card" whileHover={{ y: -10 }}>
              <Bus size={32} className="text-accent" style={{margin: '0 auto'}} />
              <h3>Transport</h3>
              <div className="cost-value">$100 - $150</div>
              <p className="opacity-80 mt-2">Public transit with student discount</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLife;

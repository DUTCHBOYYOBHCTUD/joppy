import AnimatedHero from '../components/AnimatedHero';
import JourneyTimeline from '../components/JourneyTimeline';
import { motion } from 'framer-motion';
import { FileText, GraduationCap, CheckCircle } from 'lucide-react';
import './PageLayouts.css';

const Admissions = () => {
  return (
    <div className="page-wrapper">
      <AnimatedHero 
        title="Your Path to Admission" 
        subtitle="Expert guidance to secure your spot at top-tier universities."
        bgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      
      <JourneyTimeline />

      <section className="section-padding bg-dark">
        <div className="container">
          <div className="section-header text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title text-secondary-cream"
            >
              DOCUMENT <span className="text-accent">CHECKLIST</span>
            </motion.h2>
            <p className="text-secondary-cream opacity-80">Prepare these essentials for a smooth application process.</p>
          </div>

          <div className="pathways-grid">
            <motion.div className="pathway-card glass-dark" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <FileText size={40} className="text-accent mb-4" />
              <h3>Statement of Purpose</h3>
              <p>A compelling essay detailing your academic goals and reasons for choosing New Zealand.</p>
            </motion.div>
            
            <motion.div className="pathway-card glass-dark" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <GraduationCap size={40} className="text-accent mb-4" />
              <h3>Academic Transcripts</h3>
              <p>Official records from your previous educational institutions, translated if necessary.</p>
            </motion.div>

            <motion.div className="pathway-card glass-dark" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <CheckCircle size={40} className="text-accent mb-4" />
              <h3>Proof of English</h3>
              <p>Valid IELTS, TOEFL, or PTE scores meeting your university's specific requirements.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;

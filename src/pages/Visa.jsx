import AnimatedHero from '../components/AnimatedHero';
import VisaSuccessMetrics from '../components/VisaSuccessMetrics';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck2, Plane } from 'lucide-react';
import './PageLayouts.css';

const Visa = () => {
  return (
    <div className="page-wrapper visa-page-root">
      <AnimatedHero 
        title="Visa Assistance" 
        subtitle="End-to-end guidance and licensed immigration advisory for your New Zealand journey."
        bgImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      
      <VisaSuccessMetrics />

      {/* Official Licensed Immigration Advisory Partnership */}
      <section className="section-padding bg-dark" style={{ paddingTop: '3.5rem', paddingBottom: '1.5rem' }}>
        <div className="container">
          <motion.div 
            className="immigration-partner-card"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="partner-card-glow"></div>
            <div className="partner-card-header">
              <div className="partner-badge">
                <ShieldCheck size={18} className="partner-badge-icon" />
                <span>LICENSED IMMIGRATION ADVISER SERVICE</span>
              </div>
            </div>
            <h3 className="partner-card-title">
              Professional Immigration Advisory
            </h3>
            <p className="partner-card-text">
              NECL collaborates with Auckland South Immigration Consultants Limited, a Licensed Immigration Adviser service provider, to support students who require professional immigration advice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step-by-Step Visa Process */}
      <section className="section-padding bg-dark" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="section-header text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title text-secondary-cream"
            >
              VISA <span className="text-accent">PROCESS</span>
            </motion.h2>
            <p className="text-secondary-cream opacity-80">We simplify complex immigration and visa requirements.</p>
          </div>

          <div className="pathways-grid">
            <motion.div className="pathway-card glass-dark" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <FileCheck2 size={40} className="text-accent mb-4" />
              <h3>1. Documentation</h3>
              <p>We help you compile financial proof, medical certificates, and police clearances thoroughly.</p>
            </motion.div>
            
            <motion.div className="pathway-card glass-dark" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <ShieldCheck size={40} className="text-accent mb-4" />
              <h3>2. Application Lodgement</h3>
              <p>Our licensed experts carefully review and submit your INZ application to avoid delays.</p>
            </motion.div>

            <motion.div className="pathway-card glass-dark" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Plane size={40} className="text-accent mb-4" />
              <h3>3. Approval &amp; Travel</h3>
              <p>Receive your eVisa and attend our pre-departure briefing to prepare for your flight.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Visa;

import AnimatedHero from '../components/AnimatedHero';
import VisaSuccessMetrics from '../components/VisaSuccessMetrics';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck2, Plane } from 'lucide-react';
import './PageLayouts.css';

const Visa = () => {
  return (
    <div className="page-wrapper">
      <AnimatedHero 
        title="Seamless Visa Processing" 
        subtitle="End-to-end support for a hassle-free student visa application."
        bgImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      
      <VisaSuccessMetrics />

      <section className="section-padding">
        <div className="container">
          <div className="section-header text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              VISA <span className="text-accent">PROCESS</span>
            </motion.h2>
            <p>We simplify the complex immigration requirements.</p>
          </div>

          <div className="pathways-grid">
            <motion.div className="pathway-card glass" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <FileCheck2 size={40} className="text-accent mb-4" />
              <h3 style={{color: 'var(--color-primary-black)'}}>1. Documentation</h3>
              <p style={{color: 'rgba(10,10,10,0.7)'}}>We help you compile financial proof, medical certificates, and police clearances perfectly.</p>
            </motion.div>
            
            <motion.div className="pathway-card glass" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <ShieldCheck size={40} className="text-accent mb-4" />
              <h3 style={{color: 'var(--color-primary-black)'}}>2. Application Lodgement</h3>
              <p style={{color: 'rgba(10,10,10,0.7)'}}>Our licensed experts carefully review and submit your INZ application to avoid delays.</p>
            </motion.div>

            <motion.div className="pathway-card glass" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Plane size={40} className="text-accent mb-4" />
              <h3 style={{color: 'var(--color-primary-black)'}}>3. Approval & Travel</h3>
              <p style={{color: 'rgba(10,10,10,0.7)'}}>Receive your eVisa and attend our pre-departure briefing to prepare for your flight.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Visa;

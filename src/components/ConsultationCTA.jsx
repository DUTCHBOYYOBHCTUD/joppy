import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ConsultationCTA.css';

const ConsultationCTA = () => {
  return (
    <section className="cta-section section-padding">
      <div className="aurora-bg"></div>
      <div className="container cta-container">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2>READY FOR<br/><span className="text-accent">NEW ZEALAND?</span></h2>
          <p>Take the first step towards a global future. Book a free session with our expert counselors today.</p>
          <Link 
            to="/consultation" 
            className="btn btn-primary cta-btn" 
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Book Free Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultationCTA;

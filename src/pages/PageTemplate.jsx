import { motion } from 'framer-motion';

const PageTemplate = ({ title, subtitle }) => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: 'var(--color-secondary-cream)' }}>
      <div className="container">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'var(--font-heading)', color: 'var(--color-primary-green)', marginBottom: '1rem', textTransform: 'uppercase' }}
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.2rem', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
};

export default PageTemplate;

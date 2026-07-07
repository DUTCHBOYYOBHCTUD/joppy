import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import './FloatingWidgets.css';

const FloatingWidgets = () => {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);

  useEffect(() => {
    // Push a dummy state into the history stack so the first "back" click triggers popstate
    // without actually leaving the site or the current page.
    window.history.pushState({ exitIntentDummy: true }, '');

    const handlePopState = () => {
      if (!hasShownExitIntent) {
        setShowExitIntent(true);
        setHasShownExitIntent(true);
        // Push the dummy state again so if they close the popup, they don't immediately go back
        window.history.pushState({ exitIntentDummy: true }, '');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [hasShownExitIntent]);

  return (
    <>
      <a href="#" className="floating-whatsapp" aria-label="Chat on WhatsApp">
        <MessageCircle size={28} />
      </a>

      <AnimatePresence>
        {showExitIntent && (
          <motion.div 
            className="exit-intent-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="exit-intent-popup"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <button className="close-btn" onClick={() => setShowExitIntent(false)}>
                <X size={24} />
              </button>
              <h2>Wait! Don't leave your dreams behind.</h2>
              <p>Get a FREE profile evaluation before you go.</p>
              <form className="exit-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <button type="submit" className="btn btn-primary btn-block">Get Free Evaluation</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingWidgets;

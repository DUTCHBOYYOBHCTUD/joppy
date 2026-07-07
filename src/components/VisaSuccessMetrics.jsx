import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './VisaSuccessMetrics.css';

const Counter = ({ from, to, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // Easing function: easeOutQuart
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * (to - from) + from));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return (
    <span ref={nodeRef} className="counter-number">
      {count}{suffix}
    </span>
  );
};

const VisaSuccessMetrics = () => {
  return (
    <section className="metrics-section section-padding">
      <div className="container metrics-container">
        <motion.div 
          className="metric-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0 }}
        >
          <Counter from={0} to={95} suffix="%+" />
          <p>Visa Success Rate</p>
        </motion.div>

        <motion.div 
          className="metric-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Counter from={0} to={300} suffix="+" />
          <p>Students Placed</p>
        </motion.div>

        <motion.div 
          className="metric-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Counter from={0} to={25} suffix="+" />
          <p>Partner Universities</p>
        </motion.div>

        <motion.div 
          className="metric-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Counter from={0} to={5} suffix="+" />
          <p>Years Experience</p>
        </motion.div>
      </div>
    </section>
  );
};

export default VisaSuccessMetrics;

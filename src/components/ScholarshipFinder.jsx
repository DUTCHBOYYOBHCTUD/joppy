import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import './ScholarshipFinder.css';

const ScholarshipFinder = () => {
  const [course, setCourse] = useState('');
  const [budget, setBudget] = useState('');

  return (
    <section className="scholarship-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            SCHOLARSHIP <span className="text-accent">FINDER</span>
          </motion.h2>
          <p>Discover financial aid options tailored to your profile.</p>
        </div>

        <motion.div 
          className="finder-card glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="finder-form">
            <div className="input-group">
              <label>Course Level</label>
              <select value={course} onChange={(e) => setCourse(e.target.value)}>
                <option value="">Select Level</option>
                <option value="ug">Undergraduate</option>
                <option value="pg">Postgraduate</option>
                <option value="phd">PhD / Research</option>
              </select>
            </div>
            
            <div className="input-group">
              <label>Field of Study</label>
              <select>
                <option value="">Select Field</option>
                <option value="it">IT & Computer Science</option>
                <option value="business">Business & Management</option>
                <option value="engineering">Engineering</option>
                <option value="health">Healthcare</option>
              </select>
            </div>

            <div className="input-group">
              <label>Intake</label>
              <select>
                <option value="">Select Intake</option>
                <option value="feb">February / March</option>
                <option value="july">July / August</option>
              </select>
            </div>
            
            <button className="btn btn-primary search-btn">
              <Search size={20} /> Find Scholarships
            </button>
          </div>
          
          <div className="finder-results">
            <div className="result-placeholder">
              <Filter size={48} className="placeholder-icon" />
              <p>Enter your details above to view tailored scholarship opportunities.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScholarshipFinder;

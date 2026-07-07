import AnimatedHero from '../components/AnimatedHero';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './PageLayouts.css';

const Contact = () => {
  return (
    <div className="page-wrapper">
      <AnimatedHero 
        title="Get in Touch" 
        subtitle="Our expert counselors are ready to help you start your journey to New Zealand."
        bgImage="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      
      <section className="section-padding">
        <div className="container">
          <div className="contact-grid">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="contact-info"
            >
              <h2 className="section-title mb-4">OUR <span className="text-accent">OFFICES</span></h2>
              <p className="mb-4 opacity-80">Visit us at our headquarters or reach out via phone or email for a quick response.</p>
              
              <div className="office-card">
                <MapPin size={28} className="text-accent" />
                <div>
                  <h4>Auckland Headquarters</h4>
                  <p className="opacity-80">123 Education Blvd, Level 4<br/>Auckland CBD, 1010<br/>New Zealand</p>
                </div>
              </div>

              <div className="office-card">
                <Phone size={28} className="text-accent" />
                <div>
                  <h4>Phone Support</h4>
                  <p className="opacity-80">+64 123 456 789<br/>Mon - Fri, 9am - 5pm NZST</p>
                </div>
              </div>

              <div className="office-card">
                <Mail size={28} className="text-accent" />
                <div>
                  <h4>Email Us</h4>
                  <p className="opacity-80">info@nzeducational.com<br/>admissions@nzeducational.com</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="contact-form-wrapper glass-dark"
              style={{ padding: '3rem', borderRadius: '20px', background: 'var(--color-primary-black)' }}
            >
              <h3 className="text-secondary-cream mb-4" style={{fontFamily: 'var(--font-heading)', fontSize: '2rem'}}>SEND A MESSAGE</h3>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Your Full Name" required />
                <input type="email" placeholder="Your Email Address" required />
                <input type="tel" placeholder="Your Phone Number" />
                <select style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'var(--font-body)', outline: 'none', background: 'var(--color-secondary-cream)' }}>
                  <option value="">Subject of Inquiry</option>
                  <option value="admission">University Admission</option>
                  <option value="visa">Visa Assistance</option>
                  <option value="scholarship">Scholarships</option>
                  <option value="other">Other</option>
                </select>
                <textarea placeholder="How can we help you?" rows="5" required></textarea>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Submit Inquiry</button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

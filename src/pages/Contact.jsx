import AnimatedHero from '../components/AnimatedHero';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, MessageSquare } from 'lucide-react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './PageLayouts.css';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // If EmailJS credentials exist, send email
    if (import.meta.env.VITE_EMAILJS_SERVICE_ID) {
      try {
        const sendToCompany = emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID_COMPANY,
          form.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        const sendToStudent = emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID_STUDENT,
          form.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        Promise.all([sendToCompany, sendToStudent]).catch((err) => {
          console.warn("EmailJS notification error:", err);
        });
      } catch (err) {
        console.warn("EmailJS error:", err);
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Redirect to Pinnacle Education portal as requested
      window.open('https://www.pinnacleeducation.co.nz', '_blank');
      e.target.reset();
    }, 600);
  };

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
              <p className="mb-4 opacity-80">Visit us at our headquarters or reach out via phone, WhatsApp, or email for a quick response.</p>
              
              <div className="office-card">
                <MapPin size={28} className="text-accent" />
                <div>
                  <h4>Auckland Headquarters</h4>
                  <p className="opacity-80">109 Oakdale Road, Hillsborough<br/>Auckland 1041<br/>New Zealand</p>
                </div>
              </div>

              <div className="office-card">
                <Phone size={28} className="text-accent" />
                <div>
                  <h4>Phone Support</h4>
                  <p className="opacity-80">
                    <a href="tel:00642102302460" style={{ color: 'inherit', textDecoration: 'none' }}>0064 21023 02460</a> / <br/>
                    <a href="tel:0064220391397" style={{ color: 'inherit', textDecoration: 'none' }}>0064 220391397</a><br/>
                    Mon - Fri, 9am - 5pm NZST
                  </p>
                </div>
              </div>

              <div className="office-card">
                <MessageSquare size={28} className="text-accent" />
                <div>
                  <h4>WhatsApp Support</h4>
                  <p className="opacity-80">
                    <a href="https://wa.me/64220391397" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-emerald)', textDecoration: 'none', fontWeight: 600 }}>
                      0064 220391397
                    </a><br/>
                    Direct admissions & consultancy chat
                  </p>
                </div>
              </div>

              <div className="office-card">
                <Mail size={28} className="text-accent" />
                <div>
                  <h4>Email Us</h4>
                  <p className="opacity-80">
                    <a href="mailto:support@necl.co.nz" style={{ color: 'inherit', textDecoration: 'none' }}>support@necl.co.nz</a><br/>
                    <a href="mailto:support.necl@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>support.necl@gmail.com</a>
                  </p>
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
              <h3 className="text-secondary-cream mb-2" style={{fontFamily: 'var(--font-heading)', fontSize: '2rem'}}>SEND A MESSAGE</h3>
              <p className="opacity-80 mb-4" style={{ fontSize: '0.95rem' }}>
                You can submit your inquiry below or connect directly through our portal at{' '}
                <a href="https://www.pinnacleeducation.co.nz" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent-emerald)', fontWeight: 600, textDecoration: 'underline' }}>
                  www.pinnacleeducation.co.nz
                </a>.
              </p>

              <a 
                href="https://www.pinnacleeducation.co.nz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ 
                  width: '100%', 
                  marginBottom: '1.75rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px',
                  textDecoration: 'none',
                  padding: '0.85rem'
                }}
              >
                <Globe size={18} /> Send Message via www.pinnacleeducation.co.nz &rarr;
              </a>

              <form ref={form} className="contact-form" onSubmit={sendEmail}>
                <div className="form-row">
                  <input type="text" name="name" placeholder="Full Name" required />
                  <input type="email" name="email" placeholder="Email Address" required />
                </div>
                
                <div className="form-row">
                  <input type="tel" name="phone" placeholder="Phone Number" required />
                  <input type="text" name="country" placeholder="Country of Interest" required />
                </div>

                <div className="form-row">
                  <input type="text" name="course" placeholder="Preferred Course (e.g. IT, Nursing)" required />
                  <select name="intake" required>
                    <option value="">Preferred Intake</option>
                    <option value="February / March">February / March</option>
                    <option value="July / August">July / August</option>
                    <option value="November">November</option>
                  </select>
                </div>

                <div className="form-row">
                  <select name="qualification" required>
                    <option value="">Highest Qualification</option>
                    <option value="High School">High School</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelors Degree">Bachelor's Degree</option>
                    <option value="Masters Degree">Master's Degree</option>
                  </select>
                  <input type="text" name="english_score" placeholder="IELTS / PTE Score (if any)" />
                </div>

                <select name="budget" required>
                  <option value="">Estimated Budget (NZD)</option>
                  <option value="$15k - $25k">$15k - $25k</option>
                  <option value="$25k - $35k">$25k - $35k</option>
                  <option value="$35k+">$35k+</option>
                </select>

                <textarea name="message" placeholder="Any specific questions or details?" rows="4" required></textarea>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1 }} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending to Pinnacle Education...' : 'Send Message (via www.pinnacleeducation.co.nz)'}
                </button>
                
                {submitStatus === 'success' && (
                  <p style={{color: 'var(--color-accent-emerald)', marginTop: '1rem', textAlign: 'center'}}>Opening www.pinnacleeducation.co.nz! We look forward to assisting you.</p>
                )}
                {submitStatus === 'error' && (
                  <p style={{color: '#ff4444', marginTop: '1rem', textAlign: 'center'}}>Failed to send message. Please reach us directly at www.pinnacleeducation.co.nz or support@necl.co.nz.</p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

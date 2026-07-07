import AnimatedHero from '../components/AnimatedHero';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
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

    // Send email to company
    const sendToCompany = emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID_COMPANY,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    // Send auto-reply to student
    const sendToStudent = emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID_STUDENT,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    Promise.all([sendToCompany, sendToStudent])
      .then(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        e.target.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setIsSubmitting(false);
        setSubmitStatus('error');
      });
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
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                </button>
                
                {submitStatus === 'success' && (
                  <p style={{color: 'var(--color-accent-emerald)', marginTop: '1rem', textAlign: 'center'}}>Message sent successfully! We'll be in touch soon.</p>
                )}
                {submitStatus === 'error' && (
                  <p style={{color: '#ff4444', marginTop: '1rem', textAlign: 'center'}}>Failed to send message. Please try again later or check your EmailJS keys.</p>
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

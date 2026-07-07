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

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        e.target.reset();
    }, (error) => {
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
                <input type="text" name="from_name" placeholder="Your Full Name" required />
                <input type="email" name="user_email" placeholder="Your Email Address" required />
                <input type="tel" name="phone_number" placeholder="Your Phone Number" />
                <select name="subject" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'var(--font-body)', outline: 'none', background: 'var(--color-secondary-cream)' }}>
                  <option value="">Subject of Inquiry</option>
                  <option value="admission">University Admission</option>
                  <option value="visa">Visa Assistance</option>
                  <option value="scholarship">Scholarships</option>
                  <option value="other">Other</option>
                </select>
                <textarea name="message" placeholder="How can we help you?" rows="5" required></textarea>
                
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

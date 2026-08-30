import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Beehive3D from './Beehive3D';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <section className="section-padding bg-light">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="about-content"
          >
            <h2 className="section-title mb-4">ABOUT <span className="text-accent">US</span></h2>
            <h3 className="mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-black)', fontSize: '1.8rem' }}>Your New Zealand Study Journey Starts Here</h3>
            <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}>
              NZ Educational Services Limited (NECL) is a New Zealand-based education consultancy helping international students explore the right study options in New Zealand.
            </p>
            <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}>
              We provide personalised, clear and practical guidance based on each student's academic background, career goals and future plans.
            </p>

            <h3 className="mb-3 mt-5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-black)', fontSize: '1.5rem' }}>Our Services</h3>
            <ul className="about-services-list mb-5">
              <li><CheckCircle className="text-accent" size={20} /> Course and study pathway guidance</li>
              <li><CheckCircle className="text-accent" size={20} /> Education provider selection</li>
              <li><CheckCircle className="text-accent" size={20} /> Application support</li>
              <li><CheckCircle className="text-accent" size={20} /> Entry requirement guidance</li>
              <li><CheckCircle className="text-accent" size={20} /> Student preparation and support</li>
              <li><CheckCircle className="text-accent" size={20} /> Information about studying and living in New Zealand</li>
            </ul>

            <h3 className="mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary-black)', fontSize: '1.5rem' }}>Our Commitment</h3>
            <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#444' }}>
              At NECL, we believe every student deserves honest advice, personalised support and the confidence to make informed decisions about their education and future.
            </p>
            <p className="mb-0 fw-bold text-accent" style={{ fontSize: '1.2rem' }}>
              Start your New Zealand study journey with NECL.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="about-image-wrapper"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <Suspense fallback={<div style={{ textAlign: 'center', color: '#888' }}>Loading The Beehive...</div>}>
              <Beehive3D />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

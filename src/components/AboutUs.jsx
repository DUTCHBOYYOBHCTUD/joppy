import React, { Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle, Compass, Sparkles, ChevronDown } from 'lucide-react';
import Beehive3D from './Beehive3D';
import { ModelErrorBoundary, ModelLoadingFallback } from './Model3DLoader';
import './AboutUs.css';

const AboutUs = () => {
  const containerRef = useRef(null);

  // Track scroll progress through this specific 260vh section [0, 1]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Chapter 1: Introduction (Scroll 0.00 -> 0.28)
  const opacity1 = useTransform(scrollYProgress, [0, 0.20, 0.28], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.20, 0.28], [0, 0, -25]);
  const pointerEvents1 = useTransform(scrollYProgress, (p) => (p <= 0.28 ? 'auto' : 'none'));

  // Chapter 2: Highlighted Services Card (Scroll 0.30 -> 0.70)
  const opacity2 = useTransform(scrollYProgress, [0.30, 0.38, 0.62, 0.70], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.30, 0.38, 0.62, 0.70], [25, 0, 0, -25]);
  const pointerEvents2 = useTransform(scrollYProgress, (p) => (p > 0.28 && p <= 0.70 ? 'auto' : 'none'));

  // Chapter 3: Our Commitment & Call to Action (Scroll 0.72 -> 1.0)
  const opacity3 = useTransform(scrollYProgress, [0.72, 0.80, 1.0], [0, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.72, 0.80, 1.0], [25, 0, 0]);
  const pointerEvents3 = useTransform(scrollYProgress, (p) => (p > 0.70 ? 'auto' : 'none'));

  // Scroll prompt opacity: fades out once user begins scrolling
  const promptOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={containerRef} className="beehive-scroll-section">
      <div className="beehive-sticky-stage">
        {/* Ambient background glow */}
        <div className="beehive-stage-backdrop"></div>

        <div className="container beehive-stage-container">
          {/* Left Column: Progressive Scrollytelling Narrative Cards */}
          <div className="beehive-story-column">
            {/* Chapter 1: About Us Introduction */}
            <motion.div 
              className="beehive-story-card" 
              style={{ opacity: opacity1, y: y1, pointerEvents: pointerEvents1 }}
            >
              <span className="story-step-badge">
                <Compass size={14} style={{ marginRight: '6px' }} /> DISCOVER AOTEAROA
              </span>
              <h2 className="section-title text-secondary-cream mb-3">ABOUT <span className="text-accent">US</span></h2>
              <h3 className="story-heading mb-4">Your New Zealand Study Journey Starts Here</h3>
              <p className="story-paragraph mb-3">
                NZ Educational Services Limited (NECL) is a New Zealand-based education consultancy helping international students explore the right study options in New Zealand.
              </p>
              <p className="story-paragraph">
                We provide personalised, clear and practical guidance based on each student's academic background, career goals and future plans.
              </p>
            </motion.div>

            {/* Chapter 2: Highlighted Our Services */}
            <motion.div 
              className="beehive-story-card" 
              style={{ opacity: opacity2, y: y2, pointerEvents: pointerEvents2 }}
            >
              <div className="about-services-highlight-card" style={{ margin: 0 }}>
                <div className="services-card-header">
                  <span className="services-badge">OUR EXPERT PATHWAYS</span>
                  <h3 className="services-card-title">Our Services</h3>
                </div>
                <ul className="about-services-list">
                  <li><CheckCircle className="service-check-icon" size={20} /> <span>Course and study pathway guidance</span></li>
                  <li><CheckCircle className="service-check-icon" size={20} /> <span>Education provider selection</span></li>
                  <li><CheckCircle className="service-check-icon" size={20} /> <span>Application support</span></li>
                  <li><CheckCircle className="service-check-icon" size={20} /> <span>Entry requirement guidance</span></li>
                  <li><CheckCircle className="service-check-icon" size={20} /> <span>Student preparation and support</span></li>
                  <li><CheckCircle className="service-check-icon" size={20} /> <span>Information about studying and living in New Zealand</span></li>
                </ul>
              </div>
            </motion.div>

            {/* Chapter 3: Commitment & Consultation */}
            <motion.div 
              className="beehive-story-card" 
              style={{ opacity: opacity3, y: y3, pointerEvents: pointerEvents3 }}
            >
              <span className="story-step-badge">
                <Sparkles size={14} style={{ marginRight: '6px' }} /> ETHICAL & TRANSPARENT
              </span>
              <h3 className="story-heading mb-3">Our Commitment</h3>
              <p className="story-paragraph mb-4">
                At NECL, we believe every student deserves honest advice, personalised support and the confidence to make informed decisions about their education and future.
              </p>
              <p className="mb-4 fw-bold text-accent" style={{ fontSize: '1.25rem', lineHeight: 1.6 }}>
                Start your New Zealand study journey with NECL today.
              </p>
              <Link 
                to="/contact#consultation-form" 
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
              >
                Book Free Consultation &rarr;
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Beehive Landmark with Drone Orbit */}
          <div className="beehive-3d-stage">
            <ModelErrorBoundary title="The Beehive (Wellington)" description="Executive wing of the New Zealand Parliament Buildings.">
              {({ onContextLost }) => (
                <Suspense fallback={<ModelLoadingFallback title="The Beehive (Parliament Buildings)" />}>
                  <Beehive3D scrollProgress={scrollYProgress} onContextLost={onContextLost} />
                </Suspense>
              )}
            </ModelErrorBoundary>
          </div>
        </div>

        {/* Floating Scroll Indicator Badge */}
        <motion.div className="beehive-scroll-indicator" style={{ opacity: promptOpacity }}>
          <span>Scroll down to orbit 3D landmark</span>
          <ChevronDown size={18} className="scroll-chevron-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;

import React, { Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Building, Route, Compass, ChevronDown, Award, Phone, Send } from 'lucide-react';
import SkyTower3D from '../components/SkyTower3D';
import { ModelErrorBoundary, ModelLoadingFallback } from '../components/Model3DLoader';
import './PageLayouts.css';

const WhyNZ = () => {
  const containerRef = useRef(null);

  // Track scroll progress through this 420vh section [0, 1]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Milestone 1: Spire Apex (328m) - Left Card (Scroll 0.00 -> 0.24)
  const opacity1 = useTransform(scrollYProgress, (p) => {
    if (p <= 0.16) return 1;
    if (p >= 0.24) return 0;
    return Math.max(0, Math.min(1, 1 - (p - 0.16) / 0.08));
  });
  const y1 = useTransform(scrollYProgress, (p) => {
    if (p <= 0.16) return 0;
    if (p >= 0.24) return -30;
    return ((p - 0.16) / 0.08) * -30;
  });
  const pointerEvents1 = useTransform(scrollYProgress, (p) => (p <= 0.24 ? 'auto' : 'none'));

  // Milestone 2: Observation Deck (220m) - Right Card (Scroll 0.27 -> 0.53)
  const opacity2 = useTransform(scrollYProgress, (p) => {
    if (p < 0.27 || p > 0.53) return 0;
    if (p >= 0.33 && p <= 0.47) return 1;
    if (p < 0.33) return Math.max(0, Math.min(1, (p - 0.27) / 0.06));
    return Math.max(0, Math.min(1, 1 - (p - 0.47) / 0.06));
  });
  const y2 = useTransform(scrollYProgress, (p) => {
    if (p < 0.27) return 30;
    if (p > 0.53) return -30;
    if (p >= 0.33 && p <= 0.47) return 0;
    if (p < 0.33) return (1 - (p - 0.27) / 0.06) * 30;
    return ((p - 0.47) / 0.06) * -30;
  });
  const pointerEvents2 = useTransform(scrollYProgress, (p) => (p >= 0.27 && p <= 0.53 ? 'auto' : 'none'));

  // Milestone 3: Mid-Shaft (120m) - Left Card (Scroll 0.55 -> 0.80)
  const opacity3 = useTransform(scrollYProgress, (p) => {
    if (p < 0.55 || p > 0.80) return 0;
    if (p >= 0.61 && p <= 0.74) return 1;
    if (p < 0.61) return Math.max(0, Math.min(1, (p - 0.55) / 0.06));
    return Math.max(0, Math.min(1, 1 - (p - 0.74) / 0.06));
  });
  const y3 = useTransform(scrollYProgress, (p) => {
    if (p < 0.55) return 30;
    if (p > 0.80) return -30;
    if (p >= 0.61 && p <= 0.74) return 0;
    if (p < 0.61) return (1 - (p - 0.55) / 0.06) * 30;
    return ((p - 0.74) / 0.06) * -30;
  });
  const pointerEvents3 = useTransform(scrollYProgress, (p) => (p >= 0.55 && p <= 0.80 ? 'auto' : 'none'));

  // Milestone 4: Permanent Future (Scroll 0.81 -> 0.98) with clean exit before footer
  const opacity4 = useTransform(scrollYProgress, (p) => {
    if (p < 0.81 || p > 0.99) return 0;
    if (p >= 0.86 && p <= 0.96) return 1;
    if (p < 0.86) return Math.max(0, Math.min(1, (p - 0.81) / 0.05));
    return Math.max(0, Math.min(1, 1 - (p - 0.96) / 0.03));
  });
  const y4 = useTransform(scrollYProgress, (p) => {
    if (p < 0.81) return 25;
    if (p > 0.99) return -20;
    if (p >= 0.86 && p <= 0.96) return 0;
    if (p < 0.86) return (1 - (p - 0.81) / 0.05) * 25;
    return ((p - 0.96) / 0.03) * -20;
  });
  const pointerEvents4 = useTransform(scrollYProgress, (p) => (p >= 0.81 && p <= 0.97 ? 'auto' : 'none'));

  // Scroll indicator fade
  const promptOpacity = useTransform(scrollYProgress, (p) => (p <= 0.08 ? 1 - p / 0.08 : 0));

  return (
    <div className="skytower-3d-universe" ref={containerRef}>
      {/* 1. Full-Screen 3D Sky Tower in Fixed Background Layer */}
      <div className="skytower-3d-canvas-fixed-layer" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <ModelErrorBoundary 
          title="Auckland Sky Tower" 
          description="New Zealand's tallest iconic landmark standing 328 meters high."
        >
          <Suspense fallback={<ModelLoadingFallback title="Auckland Sky Tower" />}>
            <SkyTower3D scrollProgress={scrollYProgress} />
          </Suspense>
        </ModelErrorBoundary>
      </div>

      {/* Atmospheric Radial Gradient Overlay */}
      <div className="skytower-stage-ambient-overlay"></div>

      {/* 2. Sticky Viewport: Holds floating milestone cards */}
      <div className="skytower-sticky-viewport">
        <div className="container skytower-content-canvas">

          {/* Milestone 1: Apex Spire (Left Side while tower is framed on right) */}
          <motion.div 
            className="skytower-act-card side-left-card"
            style={{ opacity: opacity1, y: y1, pointerEvents: pointerEvents1 }}
          >
            <div className="act-badge">
              <Compass size={14} style={{ marginRight: '6px' }} />
              <span>AUCKLAND ICON • 328 METERS</span>
            </div>
            <h2 className="act-title">SOARING <span className="text-accent">HIGH</span></h2>
            <h3 className="act-subtitle">World-Class Horizons in New Zealand</h3>
            <p className="act-desc">
              Standing 328 meters above Auckland, the Sky Tower represents New Zealand's towering ambition, world-ranked universities, and future-ready academic ecosystem.
            </p>
            <p className="act-desc">
              Scroll down to descend through the tower's architectural levels and discover your post-study career opportunities.
            </p>
            <div className="act-footer-highlight">
              <strong>Ranked Top 3% of Universities Globally</strong>
            </div>
          </motion.div>

          {/* Milestone 2: Observation Deck (Right Side while tower is framed on left) */}
          <motion.div 
            className="skytower-act-card side-right-card highlighted-services-act"
            style={{ opacity: opacity2, y: y2, pointerEvents: pointerEvents2 }}
          >
            <div className="act-badge emerald-badge">
              <Briefcase size={14} style={{ marginRight: '6px' }} />
              <span>STAGE 01 • GRADUATION</span>
            </div>
            <h2 className="act-title text-accent">Post-Study Work Visa</h2>
            <h3 className="act-subtitle" style={{ color: '#ffffff' }}>Work in NZ for Up to 3 Years</h3>
            <p className="act-desc">
              Stay and work in New Zealand after completing eligible qualifications. Gain invaluable international work experience and build an enviable global resume.
            </p>
            <p className="act-desc">
              New Zealand's strong economy and competitive wage rates allow international graduates to recover their educational investment rapidly.
            </p>
          </motion.div>

          {/* Milestone 3: Slender Shaft (Left Side while tower is framed on right) */}
          <motion.div 
            className="skytower-act-card side-left-card"
            style={{ opacity: opacity3, y: y3, pointerEvents: pointerEvents3 }}
          >
            <div className="act-badge">
              <Building size={14} style={{ marginRight: '6px' }} />
              <span>STAGE 02 • IN HIGH DEMAND</span>
            </div>
            <h2 className="act-title">SKILL SHORTAGE <span className="text-accent">CAREERS</span></h2>
            <h3 className="act-subtitle">Fast-Track Green List Opportunities</h3>
            <p className="act-desc">
              Graduates in Information Technology, Software Engineering, Construction, Healthcare, and Biotechnology are in immense demand across Auckland and nationwide.
            </p>
            <p className="act-desc">
              New Zealand's Green List provides direct, streamlined residence pathways for qualified professionals in key sectors.
            </p>
          </motion.div>

          {/* Milestone 4: Ground Foundation (Side-docked so full tower is visible) */}
          <motion.div 
            className="skytower-act-card side-left-card outro-side-card"
            style={{ opacity: opacity4, y: y4, pointerEvents: pointerEvents4 }}
          >
            <div className="act-badge">
              <Award size={14} style={{ marginRight: '6px' }} />
              <span>STAGE 03 • PERMANENT FUTURE</span>
            </div>
            <h2 className="outro-headline">
              PR PATHWAYS &amp; <span className="text-gradient-emerald">SETTLEMENT</span>
            </h2>
            <p className="outro-subtext">
              Clear, points-based pathways empower international graduates to transition smoothly from student visas to Permanent Residency in one of the safest, most peaceful countries on Earth.
            </p>
            <div className="outro-contact-actions">
              <a 
                href="mailto:support@necl.co.nz?subject=Plan%20PR%20and%20Study%20Pathway%20-%20NECL" 
                className="btn btn-primary outro-btn-primary"
              >
                Plan Your Pathway with NECL <Send size={16} style={{ marginLeft: '8px' }} />
              </a>
              <a 
                href="https://wa.me/64220391397" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-glass outro-btn-whatsapp"
              >
                WhatsApp: 0064 220391397
              </a>
            </div>

            <div className="outro-phone-numbers">
              <Phone size={15} color="var(--color-accent-emerald)" />
              <span>Direct Phone Support: <strong>0064 21023 02460</strong> / <strong>0064 220391397</strong></span>
            </div>
          </motion.div>

        </div>

        {/* Floating scroll prompt */}
        <motion.div className="home-scroll-cue" style={{ opacity: promptOpacity }}>
          <span>Scroll to explore New Zealand</span>
          <ChevronDown size={18} className="cue-chevron-bounce" />
        </motion.div>

      </div>
    </div>
  );
};

export default WhyNZ;

import React, { Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Sparkles, 
  CheckCircle, 
  MessageSquare, 
  ChevronDown, 
  Phone, 
  GraduationCap, 
  Send,
  Award
} from 'lucide-react';
import SkyTower3D from '../components/SkyTower3D';
import { ModelErrorBoundary, ModelLoadingFallback } from '../components/Model3DLoader';
import logoImage from '../assets/image1.png';
import './Home.css';

const Home = () => {
  const containerRef = useRef(null);


  // Track overall scroll progress through the 520vh 3D container [0, 1]
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Act 1: Hero (0.00 -> 0.16)
  const heroOpacity = useTransform(scrollYProgress, (p) => {
    if (p <= 0.08) return 1;
    if (p >= 0.16) return 0;
    return Math.max(0, Math.min(1, 1 - (p - 0.08) / 0.08));
  });
  const heroY = useTransform(scrollYProgress, () => 0);
  const heroPointer = useTransform(scrollYProgress, (p) => (p <= 0.16 ? 'auto' : 'none'));

  // Act 2: About Us (0.19 -> 0.41) - Left Aligned
  const aboutOpacity = useTransform(scrollYProgress, (p) => {
    if (p < 0.19 || p > 0.41) return 0;
    if (p >= 0.24 && p <= 0.36) return 1;
    if (p < 0.24) return Math.max(0, Math.min(1, (p - 0.19) / 0.05));
    return Math.max(0, Math.min(1, 1 - (p - 0.36) / 0.05));
  });
  const aboutY = useTransform(scrollYProgress, (p) => {
    if (p < 0.19) return 20;
    if (p < 0.24) return (1 - (p - 0.19) / 0.05) * 20;
    return 0;
  });
  const aboutPointer = useTransform(scrollYProgress, (p) => (p >= 0.19 && p <= 0.41 ? 'auto' : 'none'));

  // Act 3: Highlighted Services (0.43 -> 0.65) - Right Aligned
  const servicesOpacity = useTransform(scrollYProgress, (p) => {
    if (p < 0.43 || p > 0.65) return 0;
    if (p >= 0.48 && p <= 0.59) return 1;
    if (p < 0.48) return Math.max(0, Math.min(1, (p - 0.43) / 0.05));
    return Math.max(0, Math.min(1, 1 - (p - 0.59) / 0.06));
  });
  const servicesY = useTransform(scrollYProgress, (p) => {
    if (p < 0.43) return 20;
    if (p < 0.48) return (1 - (p - 0.43) / 0.05) * 20;
    return 0;
  });
  const servicesPointer = useTransform(scrollYProgress, (p) => (p >= 0.43 && p <= 0.65 ? 'auto' : 'none'));

  // Act 4: Success Stories (0.67 -> 0.88) - Left Aligned
  const storiesOpacity = useTransform(scrollYProgress, (p) => {
    if (p < 0.67 || p > 0.88) return 0;
    if (p >= 0.72 && p <= 0.82) return 1;
    if (p < 0.72) return Math.max(0, Math.min(1, (p - 0.67) / 0.05));
    return Math.max(0, Math.min(1, 1 - (p - 0.82) / 0.06));
  });
  const storiesY = useTransform(scrollYProgress, (p) => {
    if (p < 0.67) return 20;
    if (p < 0.72) return (1 - (p - 0.67) / 0.05) * 20;
    return 0;
  });
  const storiesPointer = useTransform(scrollYProgress, (p) => (p >= 0.67 && p <= 0.88 ? 'auto' : 'none'));

  // Act 5: Consultation CTA (0.89 -> 0.98) - Centered Hero with clean exit before footer
  const ctaOpacity = useTransform(scrollYProgress, (p) => {
    if (p < 0.89 || p > 0.99) return 0;
    if (p >= 0.92 && p <= 0.97) return 1;
    if (p < 0.92) return Math.max(0, Math.min(1, (p - 0.89) / 0.03));
    return Math.max(0, Math.min(1, 1 - (p - 0.97) / 0.02));
  });
  const ctaY = useTransform(scrollYProgress, (p) => {
    if (p < 0.89) return 20;
    if (p < 0.92) return (1 - (p - 0.89) / 0.03) * 20;
    return 0;
  });
  const ctaPointer = useTransform(scrollYProgress, (p) => (p >= 0.89 && p <= 0.98 ? 'auto' : 'none'));

  // Floating prompt opacity inside 3D section
  const promptOpacity = useTransform(scrollYProgress, (p) => (p <= 0.08 ? 1 - p / 0.08 : 0));

  // 3D Canvas opacity - fades out cleanly as user approaches the footer
  const canvasOpacity = useTransform(scrollYProgress, (p) => {
    if (p >= 0.97) return Math.max(0, 1 - (p - 0.97) / 0.025);
    return 1;
  });

  const handleScrollToDrone = () => {
    const droneEl = document.getElementById('drone-tour-section');
    if (droneEl) {
      droneEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page-root">
      
      {/* =========================================================================
          0. Dedicated Brand Showcase Header (Starting of Website)
          ========================================================================= */}
      <section className="brand-showcase-header">
        <div className="container brand-showcase-container">
          
          {/* Accreditation Pill */}
          <div className="brand-official-pill">
            <span className="pill-dot"></span>
            <Sparkles size={14} />
            <span>OFFICIAL NEW ZEALAND EDUCATION CONSULTANCY • LICENSED PATHWAYS</span>
          </div>

          {/* Centerpiece Logo & Full Company Name */}
          <div className="brand-identity-showcase">
            <div className="brand-logo-frame">
              <img src={logoImage} alt="NECL - New Zealand Education Consultancy Limited" className="brand-showcase-logo" />
              <div className="brand-logo-glow"></div>
            </div>
            
            <div className="brand-titles-block">
              <h1 className="brand-display-title">NECL</h1>
              <h2 className="brand-display-subtitle">
                NEW ZEALAND EDUCATION CONSULTANCY LIMITED
              </h2>
            </div>
          </div>

          {/* Lead Tagline */}
          <p className="brand-showcase-lead">
            Your premier gateway to world-class education, post-study work rights, and permanent residency pathways across New Zealand's top universities.
          </p>

          {/* Call to Actions */}
          <div className="brand-showcase-actions">
            <button 
              type="button"
              className="btn btn-primary brand-tour-launch-btn"
              onClick={handleScrollToDrone}
            >
              <Compass size={18} style={{ marginRight: '8px' }} />
              Explore Academic Pathways
              <ChevronDown size={18} style={{ marginLeft: '6px' }} />
            </button>

            <a 
              href="mailto:support@necl.co.nz?subject=Free%20Consultancy%20Inquiry%20-%20NECL"
              className="btn btn-glass"
            >
              Book Free Consultation &rarr;
            </a>
          </div>

          {/* Trust & Metric Cards */}
          <div className="brand-metrics-strip">
            <div className="brand-metric-card">
              <div className="metric-icon-wrap"><GraduationCap size={20} /></div>
              <div className="metric-content">
                <strong>Top 8 NZ Universities</strong>
                <small>Direct Admission Guidance</small>
              </div>
            </div>

            <div className="brand-metric-card">
              <div className="metric-icon-wrap"><Award size={20} /></div>
              <div className="metric-content">
                <strong>$500,000+ NZD</strong>
                <small>Scholarships Facilitated</small>
              </div>
            </div>

            <div className="brand-metric-card">
              <div className="metric-icon-wrap"><CheckCircle size={20} /></div>
              <div className="metric-content">
                <strong>100% Compliant</strong>
                <small>Licensed &amp; Ethical Advisory</small>
              </div>
            </div>

            <div className="brand-metric-card">
              <div className="metric-icon-wrap"><Phone size={20} /></div>
              <div className="metric-content">
                <strong>Direct NZ Support</strong>
                <small>Auckland Headquartered Team</small>
              </div>
            </div>
          </div>

          {/* Animated Scroll Prompt to Explore */}
          <div className="brand-scroll-down-hint" onClick={handleScrollToDrone}>
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={20} className="hint-chevron-pulse" />
          </div>

        </div>
      </section>

      {/* =========================================================================
          1. 3D Scrollytelling Universe (Beehive Landmark)
          ========================================================================= */}
      <div className="home-3d-universe" ref={containerRef} id="drone-tour-section">
        
        {/* Full-Screen 3D Sky Tower Landmark in Fixed Background Layer */}
        <motion.div 
          className="home-3d-canvas-fixed-layer" 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 0, 
            pointerEvents: 'none',
            opacity: canvasOpacity
          }}
        >
          <ModelErrorBoundary 
            title="Auckland Sky Tower" 
            description="New Zealand's tallest iconic landmark standing 328 meters high in full 3D."
          >
            <Suspense fallback={<ModelLoadingFallback title="Auckland Sky Tower" />}>
              <SkyTower3D scrollProgress={scrollYProgress} />
            </Suspense>
          </ModelErrorBoundary>
        </motion.div>

        {/* Atmospheric Vignette & Lighting Depth Overlays */}
        <div className="home-stage-ambient-overlay"></div>

        {/* Sticky Scrollytelling Viewport: Holds floating content layers */}
        <div className="home-sticky-viewport">
          <div className="container home-content-canvas">

            {/* Act 1: Cinematic Hero */}
            <motion.div 
              className="home-act-card hero-act-card"
              style={{ opacity: heroOpacity, y: heroY, pointerEvents: heroPointer }}
            >
              <div className="act-badge">
                <Compass size={14} style={{ marginRight: '6px' }} />
                <span>YOUR FUTURE • OUR GUIDANCE</span>
              </div>
              <h2 className="home-hero-headline">
                Study in New Zealand<br />
                <span className="text-gradient-emerald">Build Your Tomorrow</span>
              </h2>
              <p className="home-hero-subtext">
                Expert advice and personalised support from NZ Educational Services Limited (NECL). Helping international students explore the best study pathways in New Zealand.
              </p>
              
              <div className="home-hero-actions">
                <Link to="/universities" className="btn btn-primary">
                  Explore Courses &rarr;
                </Link>
                <Link to="/contact" className="btn btn-glass">
                  Talk to an Advisor <MessageSquare size={16} style={{ marginLeft: '6px' }} />
                </Link>
              </div>

              <div className="home-hero-chips">
                <div className="chip-pill"><GraduationCap size={15} /> Top 3% Global Unis</div>
                <div className="chip-pill"><Award size={15} /> Post-Study Work Visas</div>
                <div className="chip-pill"><Sparkles size={15} /> Green List Pathways</div>
              </div>
            </motion.div>

            {/* Act 2: About Us (Left Side while camera swoops around Beehive) */}
            <motion.div 
              className="home-act-card side-left-card"
              style={{ opacity: aboutOpacity, y: aboutY, pointerEvents: aboutPointer }}
            >
              <div className="act-badge">
                <Compass size={14} style={{ marginRight: '6px' }} />
                <span>DISCOVER AOTEAROA</span>
              </div>
              <h2 className="act-title">ABOUT <span className="text-accent">US</span></h2>
              <h3 className="act-subtitle">Your New Zealand Study Journey Starts Here</h3>
              <p className="act-desc">
                NZ Educational Services Limited (NECL) is a New Zealand-based education consultancy helping international students explore the right study options across New Zealand's top universities and institutes.
              </p>
              <p className="act-desc">
                We provide personalised, clear and practical guidance based on each student's academic background, career ambitions and long-term settlement goals.
              </p>
              <div className="act-footer-highlight">
                <strong>100% Ethical &amp; Licensed Advisory</strong>
              </div>
            </motion.div>

            {/* Act 3: Highlighted Services (Right Side, 2-Column Sleek Layout) */}
            <motion.div 
              className="home-act-card side-right-card highlighted-services-act"
              style={{ opacity: servicesOpacity, y: servicesY, pointerEvents: servicesPointer }}
            >
              <div className="services-card-inner">
                <div className="act-badge emerald-badge">
                  <Sparkles size={14} style={{ marginRight: '6px' }} />
                  <span>EXPERT GUIDANCE</span>
                </div>
                <h2 className="act-title text-accent">Our Services</h2>
                <p className="services-lead-text">
                  Comprehensive support at every milestone of your international journey:
                </p>
                <ul className="highlighted-services-list">
                  <li><CheckCircle className="service-icon-emerald" size={18} /> <span>Course &amp; pathway guidance</span></li>
                  <li><CheckCircle className="service-icon-emerald" size={18} /> <span>University provider selection</span></li>
                  <li><CheckCircle className="service-icon-emerald" size={18} /> <span>Application &amp; offer support</span></li>
                  <li><CheckCircle className="service-icon-emerald" size={18} /> <span>Entry requirement &amp; SOP advice</span></li>
                  <li><CheckCircle className="service-icon-emerald" size={18} /> <span>Pre-departure briefings</span></li>
                  <li><CheckCircle className="service-icon-emerald" size={18} /> <span>NZ living &amp; accommodation info</span></li>
                </ul>
                <Link to="/contact" className="btn btn-primary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}>
                  Inquire About Services &rarr;
                </Link>
              </div>
            </motion.div>

            {/* Act 4: Success Stories (Left Side, Compact Emoji Layout) */}
            <motion.div 
              className="home-act-card side-left-card stories-act"
              style={{ opacity: storiesOpacity, y: storiesY, pointerEvents: storiesPointer }}
            >
              <div className="act-badge">
                <Award size={14} style={{ marginRight: '6px' }} />
                <span>PROVEN RESULTS</span>
              </div>
              <h2 className="act-title">SUCCESS <span className="text-accent">STORIES</span></h2>
              <p className="stories-intro">Hear from real students who achieved their dreams with NECL:</p>
              
              <div className="stories-mini-grid">
                <div className="story-mini-box">
                  <div className="story-emoji-avatar">👩‍🎓</div>
                  <div className="story-mini-info">
                    <div className="story-name-row">
                      <strong>Priya Sharma</strong>
                      <span className="story-badge-highlight">$10,000 NZD Scholarship</span>
                    </div>
                    <small>University of Auckland</small>
                    <p>"NECL made my dream a reality. The visa guidance was effortless!"</p>
                  </div>
                </div>

                <div className="story-mini-box">
                  <div className="story-emoji-avatar">👨‍🎓</div>
                  <div className="story-mini-info">
                    <div className="story-name-row">
                      <strong>Rahul Verma</strong>
                      <span className="story-badge-highlight">Full Tuition Waiver</span>
                    </div>
                    <small>University of Otago</small>
                    <p>"The SOP guidance and course mapping was truly world-class."</p>
                  </div>
                </div>

                <div className="story-mini-box">
                  <div className="story-emoji-avatar">🧑‍🎓</div>
                  <div className="story-mini-info">
                    <div className="story-name-row">
                      <strong>Sneha Patel</strong>
                      <span className="story-badge-highlight">$5,000 NZD Grant</span>
                    </div>
                    <small>Victoria University of Wellington</small>
                    <p>"Always transparent and genuinely caring from day one."</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Act 5: Consultation Outro (Side-Docked so Beehive remains prominent) */}
            <motion.div 
              className="home-act-card side-left-card outro-side-card"
              style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointer }}
            >
              <div className="act-badge">
                <Sparkles size={14} style={{ marginRight: '6px' }} />
                <span>TAKE THE FIRST STEP</span>
              </div>
              <h2 className="outro-headline">
                READY FOR <span className="text-gradient-emerald">NEW ZEALAND?</span>
              </h2>
              <p className="outro-subtext">
                At NECL, we believe every student deserves honest advice, personalised support and the confidence to make informed decisions about their education and future.
              </p>
              <div className="outro-contact-actions">
                <a 
                  href="mailto:support@necl.co.nz?subject=Book%20Free%20Consultancy%20Session%20-%20NECL" 
                  className="btn btn-primary outro-btn-primary"
                >
                  Book Free Consultation <Send size={16} style={{ marginLeft: '8px' }} />
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

          {/* Floating scroll indicator at the bottom */}
          <motion.div className="home-scroll-cue" style={{ opacity: promptOpacity }}>
            <span>Scroll to explore</span>
            <ChevronDown size={18} className="cue-chevron-bounce" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};


export default Home;


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

  // Act 1: Hero (0.00 -> 0.19) - Heli-Cam looking down on the 328m spire apex
  const heroOpacity = useTransform(scrollYProgress, (p) => {
    if (p <= 0.12) return 1;
    if (p >= 0.19) return 0;
    return Math.max(0, Math.min(1, 1 - (p - 0.12) / 0.07));
  });
  const heroY = useTransform(scrollYProgress, (p) => {
    if (p <= 0.08) return 0;
    return -Math.min(24, ((p - 0.08) / 0.11) * 24);
  });
  const heroPointer = useTransform(scrollYProgress, (p) => (p <= 0.18 ? 'auto' : 'none'));

  // Act 2: About Us (0.14 -> 0.45) - Telephoto zoom into 220m Observation Deck (Waypoint at 0.28)
  const aboutOpacity = useTransform(scrollYProgress, (p) => {
    if (p < 0.14 || p > 0.45) return 0;
    if (p >= 0.22 && p <= 0.38) return 1;
    if (p < 0.22) return Math.max(0, Math.min(1, (p - 0.14) / 0.08));
    return Math.max(0, Math.min(1, 1 - (p - 0.38) / 0.07));
  });
  const aboutY = useTransform(scrollYProgress, (p) => {
    if (p < 0.14) return 24;
    if (p < 0.22) return (1 - (p - 0.14) / 0.08) * 24;
    if (p <= 0.38) return -((p - 0.22) / 0.16) * 14;
    return -14 - ((p - 0.38) / 0.07) * 20;
  });
  const aboutPointer = useTransform(scrollYProgress, (p) => (p >= 0.15 && p <= 0.44 ? 'auto' : 'none'));

  // Act 3: Highlighted Services (0.39 -> 0.70) - 65° Low-angle worm's-eye monolith shaft ascent (Waypoint at 0.52)
  const servicesOpacity = useTransform(scrollYProgress, (p) => {
    if (p < 0.39 || p > 0.70) return 0;
    if (p >= 0.46 && p <= 0.63) return 1;
    if (p < 0.46) return Math.max(0, Math.min(1, (p - 0.39) / 0.07));
    return Math.max(0, Math.min(1, 1 - (p - 0.63) / 0.07));
  });
  const servicesY = useTransform(scrollYProgress, (p) => {
    if (p < 0.39) return 24;
    if (p < 0.46) return (1 - (p - 0.39) / 0.07) * 24;
    if (p <= 0.63) return -((p - 0.46) / 0.17) * 14;
    return -14 - ((p - 0.63) / 0.07) * 20;
  });
  const servicesPointer = useTransform(scrollYProgress, (p) => (p >= 0.40 && p <= 0.69 ? 'auto' : 'none'));

  // Act 4: Success Stories (0.64 -> 0.92) - Dynamic spiral orbit overlooking SkyDeck (Waypoint at 0.76)
  const storiesOpacity = useTransform(scrollYProgress, (p) => {
    if (p < 0.64 || p > 0.92) return 0;
    if (p >= 0.71 && p <= 0.85) return 1;
    if (p < 0.71) return Math.max(0, Math.min(1, (p - 0.64) / 0.07));
    return Math.max(0, Math.min(1, 1 - (p - 0.85) / 0.07));
  });
  const storiesY = useTransform(scrollYProgress, (p) => {
    if (p < 0.64) return 24;
    if (p < 0.71) return (1 - (p - 0.64) / 0.07) * 24;
    if (p <= 0.85) return -((p - 0.71) / 0.14) * 14;
    return -14 - ((p - 0.85) / 0.07) * 20;
  });
  const storiesPointer = useTransform(scrollYProgress, (p) => (p >= 0.65 && p <= 0.91 ? 'auto' : 'none'));

  // Act 5: Consultation CTA (0.86 -> 1.00) - Grand panoramic pullback reveal
  const ctaOpacity = useTransform(scrollYProgress, (p) => {
    if (p < 0.86) return 0;
    if (p >= 0.92 && p <= 0.985) return 1;
    if (p < 0.92) return Math.max(0, Math.min(1, (p - 0.86) / 0.06));
    return Math.max(0, Math.min(1, 1 - (p - 0.985) / 0.015));
  });
  const ctaY = useTransform(scrollYProgress, (p) => {
    if (p < 0.86) return 24;
    if (p < 0.92) return (1 - (p - 0.86) / 0.06) * 24;
    return -((p - 0.92) / 0.08) * 10;
  });
  const ctaPointer = useTransform(scrollYProgress, (p) => (p >= 0.87 && p <= 0.995 ? 'auto' : 'none'));

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
            Your premier gateway to world-class education, post-study work opportunities, and academic excellence across New Zealand's top universities.
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

            <Link 
              to="/consultation" 
              className="btn btn-glass"
            >
              Book Free Consultation &rarr;
            </Link>
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

        {/* Artistic Atmospheric Transition Divider into 3D Night Universe */}
        <div className="brand-header-transition-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 180" fill="none" preserveAspectRatio="none" className="transition-svg-wave">
            <defs>
              <linearGradient id="waveAtmosphereGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0E2B45" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="waveDeepBlueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#103657" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#050E17" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* Ambient Aurora Wave Layer 1 */}
            <path 
              d="M0,70 C320,130 540,20 820,95 C1100,165 1280,60 1440,85 L1440,180 L0,180 Z" 
              fill="url(#waveAtmosphereGrad)" 
            />
            {/* Deep Twilight Oceanic Wave Layer 2 */}
            <path 
              d="M0,110 C240,50 480,140 760,80 C1040,25 1260,120 1440,95 L1440,180 L0,180 Z" 
              fill="url(#waveDeepBlueGrad)" 
            />
            {/* Seamless Solid Midnight Horizon Base Layer 3 */}
            <path 
              d="M0,145 C380,115 720,160 1080,130 C1240,115 1380,140 1440,145 L1440,180 L0,180 Z" 
              fill="#050E17" 
            />
          </svg>
          <div className="transition-ambient-glow" />
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

            {/* Act 1: Hero */}
            <motion.div 
              className="home-act-card hero-act-card"
              style={{ opacity: heroOpacity, y: heroY, pointerEvents: heroPointer }}
            >
              <div className="act-badge">
                <Compass size={14} style={{ marginRight: '6px' }} />
                <span>OFFICIAL NZ EDUCATION CONSULTANCY</span>
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
                <div className="chip-pill"><Sparkles size={15} /> Student Visa Support</div>
              </div>
            </motion.div>

            {/* Act 2: About Us */}
            <motion.div 
              className="home-act-card side-left-card"
              style={{ opacity: aboutOpacity, y: aboutY, pointerEvents: aboutPointer }}
            >
              <div className="act-badge">
                <GraduationCap size={14} style={{ marginRight: '6px' }} />
                <span>ABOUT NECL</span>
              </div>

              <h2 className="act-title">ABOUT <span className="text-accent">US</span></h2>
              <h3 className="act-subtitle">Your Premier Gateway to New Zealand Higher Education</h3>
              <p className="act-desc">
                NZ Educational Services Limited (NECL) is an Auckland-headquartered consultancy providing licensed, transparent and strategic admissions guidance for international scholars.
              </p>

              <div className="about-act-highlights-grid">
                <div className="about-highlight-pill">
                  <GraduationCap size={15} className="highlight-icon" />
                  <span>Top 8 NZ Universities</span>
                </div>
                <div className="about-highlight-pill">
                  <Award size={15} className="highlight-icon" />
                  <span>Post-Study Work Pathways</span>
                </div>
                <div className="about-highlight-pill">
                  <CheckCircle size={15} className="highlight-icon" />
                  <span>100% Ethical &amp; Licensed</span>
                </div>
                <div className="about-highlight-pill">
                  <Sparkles size={15} className="highlight-icon" />
                  <span>Career &amp; Study Guidance</span>
                </div>
              </div>

              <div className="act-footer-highlight">
                <strong>Direct Auckland Support • Ethical Advisory</strong>
              </div>
            </motion.div>

            {/* Act 3: Highlighted Services */}
            <motion.div 
              className="home-act-card side-right-card highlighted-services-act"
              style={{ opacity: servicesOpacity, y: servicesY, pointerEvents: servicesPointer }}
            >
              <div className="services-card-inner">
                <div className="act-badge emerald-badge">
                  <CheckCircle size={14} style={{ marginRight: '6px' }} />
                  <span>OUR SERVICES</span>
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

            {/* Act 4: Success Stories */}
            <motion.div 
              className="home-act-card side-left-card stories-act"
              style={{ opacity: storiesOpacity, y: storiesY, pointerEvents: storiesPointer }}
            >
              <div className="act-badge">
                <Award size={14} style={{ marginRight: '6px' }} />
                <span>STUDENT SUCCESS</span>
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

            {/* Act 5: Consultation Outro */}
            <motion.div 
              className="home-act-card side-left-card outro-side-card"
              style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointer }}
            >
              <div className="act-badge">
                <Sparkles size={14} style={{ marginRight: '6px' }} />
                <span>GET STARTED</span>
              </div>

              <h2 className="outro-headline">
                READY FOR <span className="text-gradient-emerald">NEW ZEALAND?</span>
              </h2>
              <p className="outro-subtext">
                At NECL, we believe every student deserves honest advice, personalised support and the confidence to make informed decisions about their education and future.
              </p>
              <div className="outro-contact-actions">
                <Link 
                  to="/consultation" 
                  className="btn btn-primary outro-btn-primary"
                >
                  Book Free Consultation <Send size={16} style={{ marginLeft: '8px' }} />
                </Link>
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


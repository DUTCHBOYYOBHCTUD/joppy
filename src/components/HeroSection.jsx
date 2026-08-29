import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, CheckSquare, Home, Users, MapPin, MessageSquare } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="hero-pretitle">YOUR FUTURE. OUR GUIDANCE.</p>
            <h1 className="hero-title">
              Study in New Zealand<br />Build Your Tomorrow
            </h1>
            <p className="hero-subtitle">
              Expert advice and personalised support for international students to achieve their dreams in New Zealand.
            </p>
            <div className="hero-ctas">
              <Link to="/universities" className="btn btn-primary">Explore Courses &rarr;</Link>
              <Link to="/contact" className="btn btn-icon">
                TALK TO AN ADVISOR <MessageSquare size={18} style={{ marginLeft: '8px' }} />
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Silver Fern Graphic Overlay */}
        <motion.svg 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.85, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="fern-graphic"
          viewBox="0 0 400 800" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Abstract simple fern shape representing the silver fern */}
          <path d="M200,800 C150,600 50,400 50,100 C150,200 180,400 200,800 Z" fill="#88A870" opacity="0.6" />
          <path d="M200,800 C250,650 350,500 350,250 C250,400 220,550 200,800 Z" fill="#6A8D55" opacity="0.8" />
          <path d="M200,800 C200,600 200,300 150,50 C250,250 200,500 200,800 Z" fill="#9CC183" />
          {/* Branches */}
          <path d="M200,600 Q300,550 380,450 Q280,520 200,600 Z" fill="#88A870" />
          <path d="M195,500 Q280,450 360,350 Q260,420 195,500 Z" fill="#6A8D55" />
          <path d="M190,400 Q260,350 340,250 Q240,320 190,400 Z" fill="#9CC183" />
          <path d="M200,650 Q100,600 20,500 Q120,570 200,650 Z" fill="#88A870" />
          <path d="M195,550 Q120,500 40,400 Q140,470 195,550 Z" fill="#6A8D55" />
          <path d="M190,450 Q140,400 60,300 Q160,370 190,450 Z" fill="#9CC183" />
        </motion.svg>
      </div>

      {/* Overlapping Feature Bar */}
      <motion.div 
        className="feature-bar"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="feature-item">
          <GraduationCap size={32} strokeWidth={1.5} />
          <div className="feature-text">
            <strong>Top Universities</strong>
            <small>Study at world-class<br/>universities in New Zealand</small>
          </div>
        </div>
        <div className="feature-item">
          <BookOpen size={32} strokeWidth={1.5} />
          <div className="feature-text">
            <strong>Wide Range of Courses</strong>
            <small>Choose from diplomas,<br/>bachelors to postgraduate</small>
          </div>
        </div>
        <div className="feature-item">
          <CheckSquare size={32} strokeWidth={1.5} />
          <div className="feature-text">
            <strong>Visa Guidance</strong>
            <small>Complete support for student<br/>visa application</small>
          </div>
        </div>
        <div className="feature-item">
          <Home size={32} strokeWidth={1.5} />
          <div className="feature-text">
            <strong>Accommodation</strong>
            <small>Safe and comfortable<br/>accommodation options</small>
          </div>
        </div>
        <div className="feature-item">
          <Users size={32} strokeWidth={1.5} />
          <div className="feature-text">
            <strong>Career Support</strong>
            <small>Guidance for a successful<br/>career in New Zealand</small>
          </div>
        </div>
        <div className="feature-item">
          <MapPin size={32} strokeWidth={1.5} />
          <div className="feature-text">
            <strong>Life in NZ</strong>
            <small>Explore a safe, diverse<br/>beautiful country</small>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

import logoImage from '../assets/image1.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled glass-dark' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="brand">
          <img src={logoImage} alt="NECL Logo" className="brand-logo-img" />
          <div className="brand-text-block">
            <span className="brand-title">NECL</span>
            <span className="brand-subtitle">NEW ZEALAND EDUCATION CONSULTANCY LIMITED</span>
          </div>
        </Link>

        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="nav-item">
            <span>Study in NZ <ChevronDown size={16} /></span>
            <div className="dropdown glass-dark">
              <Link to="/why-nz">Why New Zealand</Link>
              <Link to="/universities">Our Universities</Link>
            </div>
          </div>
          <div className="nav-item">
            <span>Services <ChevronDown size={16} /></span>
            <div className="dropdown glass-dark">
              <Link to="/admissions">Admissions</Link>
              <Link to="/visa">Visa Assistance</Link>
            </div>
          </div>
          <Link to="/contact" className="nav-item">Contact</Link>
          
          <a href="mailto:support@necl.co.nz?subject=Book%20a%20Consultation%20-%20NECL" className="btn btn-primary nav-cta">BOOK A CONSULTATION</a>
        </nav>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;

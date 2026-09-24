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

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled glass-dark' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="brand" onClick={closeMenu}>
            <img src={logoImage} alt="NECL Logo" className="brand-logo-img" />
            <div className="brand-text-block">
              <span className="brand-title">NECL</span>
              <span className="brand-subtitle">NEW ZEALAND EDUCATION CONSULTANCY LIMITED</span>
            </div>
          </Link>

          <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <div className="nav-item">
              <span className="nav-item-label">Study in NZ <ChevronDown size={16} /></span>
              <div className="dropdown glass-dark">
                <Link to="/why-nz" onClick={closeMenu}>Why New Zealand</Link>
                <Link to="/universities" onClick={closeMenu}>Our Universities</Link>
              </div>
            </div>
            <div className="nav-item">
              <span className="nav-item-label">Services <ChevronDown size={16} /></span>
              <div className="dropdown glass-dark">
                <Link to="/admissions" onClick={closeMenu}>Admissions</Link>
                <Link to="/visa" onClick={closeMenu}>Visa Assistance</Link>
              </div>
            </div>
            <Link to="/contact" className="nav-item" onClick={closeMenu}>Contact</Link>
            
            <Link 
              to="/contact#consultation-form" 
              className="btn btn-primary nav-cta"
              onClick={() => {
                closeMenu();
                if (window.location.pathname === '/contact') {
                  const formEl = document.getElementById('consultation-form');
                  if (formEl) {
                    formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }
              }}
            >
              BOOK A CONSULTATION
            </Link>
          </nav>

          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={closeMenu} />
      )}
    </>
  );
};

export default Navbar;

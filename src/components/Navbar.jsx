import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import './Navbar.css';

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
          <Globe className="brand-icon" size={28} />
          <span className="brand-text">NZ EDUCATIONAL<br/><small>SERVICES LTD</small></span>
        </Link>

        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="nav-item">
            <span>Study in NZ <ChevronDown size={16} /></span>
            <div className="dropdown glass-dark">
              <Link to="/why-nz">Why New Zealand</Link>
              <Link to="/universities">Top Universities</Link>
              <Link to="/student-life">Student Life</Link>
            </div>
          </div>
          <div className="nav-item">
            <span>Services <ChevronDown size={16} /></span>
            <div className="dropdown glass-dark">
              <Link to="/admissions">Admissions</Link>
              <Link to="/visa">Visa Assistance</Link>
              <Link to="/scholarships">Scholarships</Link>
            </div>
          </div>
          <Link to="/testimonials" className="nav-item">Testimonials</Link>
          <Link to="/contact" className="nav-item">Contact</Link>
          
          <Link to="/contact" className="btn btn-primary nav-cta">Free Consultation</Link>
        </nav>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;

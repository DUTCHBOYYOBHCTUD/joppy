import { Globe, Mail, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/image1.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <Link to="/" className="footer-brand-link">
            <img src={logoImage} alt="NECL Logo" className="footer-logo-img" />
            <div className="footer-brand-text">
              <span className="footer-brand-title">NECL</span>
              <span className="footer-brand-subtitle">NEW ZEALAND EDUCATION CONSULTANCY LIMITED</span>
            </div>
          </Link>
          <p>Your premium gateway to world-class education and living in New Zealand.</p>
          <div className="social-links">
            <a href="https://www.pinnacleeducation.co.nz" target="_blank" rel="noopener noreferrer" aria-label="Website"><Globe size={20} /></a>
            <a href="mailto:support@necl.co.nz" aria-label="Email"><Mail size={20} /></a>
            <a href="tel:00642102302460" aria-label="Phone"><Phone size={20} /></a>
            <a href="https://wa.me/64220391397" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/why-nz">Study in New Zealand</Link></li>
            <li><Link to="/universities">Our Universities</Link></li>
            <li><Link to="/visa">Visa Services</Link></li>
            <li><Link to="/consultation">Book a Consultation</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul>
            <li>109 Oakdale Road, Hillsborough</li>
            <li>Auckland 1041, New Zealand</li>
            <li>
              Phone: <br/>
              <a href="tel:00642102302460" style={{ color: 'inherit', textDecoration: 'none' }}>0064 21023 02460</a> / <br/>
              <a href="tel:0064220391397" style={{ color: 'inherit', textDecoration: 'none' }}>0064 220391397</a>
            </li>
            <li>
              Email: <br/>
              <a href="mailto:support@necl.co.nz" style={{ color: 'inherit', textDecoration: 'none' }}>support@necl.co.nz</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Need Help?</h3>
          <a href="https://wa.me/64220391397" target="_blank" rel="noopener noreferrer" className="btn btn-primary whatsapp-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageCircle size={20} style={{marginRight: '8px'}} /> WhatsApp: 0064 220391397
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} New Zealand Education Consultancy Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

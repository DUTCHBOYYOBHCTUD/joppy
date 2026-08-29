import { Globe, Mail, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/image1.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '1rem' }}>
            <img src={logoImage} alt="NECL Logo" style={{ height: '40px', objectFit: 'contain' }} />
            <h2 className="footer-brand" style={{ margin: 0 }}>NECL<br/><small style={{ fontSize: '0.45em', opacity: 0.8, letterSpacing: '1px', fontWeight: 400 }}>NEW ZEALAND EDUCATION CONSULTANCY LTD</small></h2>
          </Link>
          <p>Your premium gateway to world-class education and living in New Zealand.</p>
          <div className="social-links">
            <a href="#"><Globe size={20} /></a>
            <a href="mailto:support@necl.co.nz"><Mail size={20} /></a>
            <a href="tel:02102302460"><Phone size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/why-nz">Study in New Zealand</Link></li>
            <li><Link to="/universities">Our Universities</Link></li>
            <li><Link to="/visa">Visa Services</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul>
            <li>109 Oakdale Road, Hillsborough</li>
            <li>Auckland 1041, New Zealand</li>
            <li>Phone: 021 023 02460</li>
            <li>Email: support@necl.co.nz</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Need Help?</h3>
          <a href="https://wa.me/642102302460" target="_blank" rel="noreferrer" className="btn btn-primary whatsapp-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            <MessageCircle size={20} style={{marginRight: '8px'}} /> Chat on WhatsApp
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

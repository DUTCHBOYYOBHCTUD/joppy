import { Globe, Mail, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <h2 className="footer-brand">NZ EDUCATIONAL<br/>SERVICES LTD</h2>
          <p>Your premium gateway to world-class education and living in New Zealand.</p>
          <div className="social-links">
            <a href="#"><Globe size={20} /></a>
            <a href="#"><Mail size={20} /></a>
            <a href="#"><Phone size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="#">Study in New Zealand</Link></li>
            <li><Link to="#">Universities</Link></li>
            <li><Link to="#">Visa Services</Link></li>
            <li><Link to="#">Scholarships</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul>
            <li>123 Education Blvd, Auckland, NZ</li>
            <li>+64 123 456 789</li>
            <li>info@nzeducational.com</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Need Help?</h3>
          <button className="btn btn-primary whatsapp-btn">
            <MessageCircle size={20} style={{marginRight: '8px'}} /> Chat on WhatsApp
          </button>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} NZ Educational Services Limited. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

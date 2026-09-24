import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageSquare, Clock, ArrowRight, ExternalLink, Sparkles, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Read configured Vercel EmailJS environment variables for Outlook
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const welcomeTemplateId = import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID_COMPANY;
    const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID_STUDENT;

    if (serviceId && publicKey && formRef.current) {
      const dispatchTasks = [];

      // 1. Dispatch Notification / Welcome Template (to Outlook inbox)
      if (welcomeTemplateId) {
        dispatchTasks.push(
          emailjs.sendForm(serviceId, welcomeTemplateId, formRef.current, publicKey)
            .then(res => console.log('EmailJS welcome/notification sent:', res.status, res.text))
            .catch(err => console.error('EmailJS welcome error:', err))
        );
      }

      // 2. Dispatch Auto-Reply Template (to applicant)
      if (autoReplyTemplateId) {
        dispatchTasks.push(
          emailjs.sendForm(serviceId, autoReplyTemplateId, formRef.current, publicKey)
            .then(res => console.log('EmailJS auto-reply sent:', res.status, res.text))
            .catch(err => console.error('EmailJS auto-reply error:', err))
        );
      }

      if (dispatchTasks.length > 0) {
        try {
          await Promise.allSettled(dispatchTasks);
        } catch (err) {
          console.warn('EmailJS batch warning:', err);
        }
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setInquiryData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 600);
  };
  return (
    <div className="contact-page-root">
      <div className="contact-container">
        
        {/* Header Section */}
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact-badge">
            <MapPin size={15} />
            <span>OFFICIAL CONTACT INFORMATION</span>
          </div>
          <h1 className="contact-main-heading">Get in Touch with NECL</h1>
          <p className="contact-intro-description">
            NZ Educational Services Limited (NECL) is centrally headquartered in Auckland, New Zealand. Connect directly with our educational advisory team through our official channels or schedule a consultation.
          </p>
        </motion.div>

        {/* 4 Official Contact Cards */}
        <div className="contact-cards-grid">
          
          {/* Card 1: Auckland Headquarters */}
          <motion.div 
            className="contact-info-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div>
              <div className="card-top">
                <div className="card-icon-wrap">
                  <MapPin size={24} />
                </div>
                <div className="card-heading-group">
                  <h3>Auckland Headquarters</h3>
                  <span>Central Operations Office</span>
                </div>
              </div>
              <p className="card-body-text">
                109 Oakdale Road, Hillsborough,<br />
                Auckland 1041, New Zealand
              </p>
            </div>
            <a 
              href="https://maps.google.com/?q=109+Oakdale+Road,+Hillsborough,+Auckland+1041,+New+Zealand" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="card-action-link"
            >
              Open in Google Maps <ExternalLink size={15} />
            </a>
          </motion.div>

          {/* Card 2: Direct Phone Support */}
          <motion.div 
            className="contact-info-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <div className="card-top">
                <div className="card-icon-wrap">
                  <Phone size={24} />
                </div>
                <div className="card-heading-group">
                  <h3>Direct Phone Support</h3>
                  <span>Telephone Assistance</span>
                </div>
              </div>
              <p className="card-body-text">
                Primary Line: <a href="tel:00642102302460">0064 21023 02460</a><br />
                Direct Desk: <a href="tel:0064220391397">0064 220391397</a>
              </p>
            </div>
            <a href="tel:00642102302460" className="card-action-link">
              Call Auckland Office <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* Card 3: WhatsApp Consultation */}
          <motion.div 
            className="contact-info-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div>
              <div className="card-top">
                <div className="card-icon-wrap">
                  <MessageSquare size={24} />
                </div>
                <div className="card-heading-group">
                  <h3>WhatsApp Online</h3>
                  <span>Fast Student Inquiries</span>
                </div>
              </div>
              <p className="card-body-text">
                Chat directly with our admissions coordinator:<br />
                <strong>0064 220391397</strong>
              </p>
            </div>
            <a 
              href="https://wa.me/64220391397" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="card-action-link"
            >
              Start WhatsApp Chat <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* Card 4: Official Email */}
          <motion.div 
            className="contact-info-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <div className="card-top">
                <div className="card-icon-wrap">
                  <Mail size={24} />
                </div>
                <div className="card-heading-group">
                  <h3>Official Email</h3>
                  <span>Inquiries &amp; Admissions</span>
                </div>
              </div>
              <p className="card-body-text">
                Email inquiries are reviewed promptly within 24 hours:<br />
                <a href="mailto:support@necl.co.nz">support@necl.co.nz</a>
              </p>
            </div>
            <a href="mailto:support@necl.co.nz" className="card-action-link">
              Send Email Inquiry <ArrowRight size={15} />
            </a>
          </motion.div>

        </div>

        {/* Operating Hours & Interactive Map */}
        <div className="contact-details-row">
          
          {/* Office Hours */}
          <motion.div 
            className="office-hours-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="hours-header">
              <Clock size={22} color="#10B981" />
              <h3>Office Operating Hours</h3>
            </div>
            <ul className="hours-list">
              <li className="hours-item">
                <span className="day">Monday – Friday</span>
                <span className="time">9:00 AM – 5:30 PM</span>
              </li>
              <li className="hours-item">
                <span className="day">Saturday</span>
                <span className="time">By Prior Appointment</span>
              </li>
              <li className="hours-item">
                <span className="day">Sunday &amp; Holidays</span>
                <span className="time">Closed</span>
              </li>
            </ul>
            <p className="hours-note">
              *All timings are in New Zealand Standard Time (NZST / UTC+12). Virtual consultations are available worldwide via Zoom/Google Meet.
            </p>
          </motion.div>

          {/* Map Preview Embed */}
          <motion.div 
            className="map-embed-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="map-header-bar">
              <strong>Auckland Office Location</strong>
              <span>Hillsborough, Auckland</span>
            </div>
            <div className="map-iframe-wrapper">
              <iframe
                title="NECL Office Location Map"
                src="https://maps.google.com/maps?q=109+Oakdale+Road,+Hillsborough,+Auckland+1041,+New+Zealand&t=&z=14&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

        </div>

        {/* Direct Inquiry Message Form */}
        <motion.div 
          className="contact-inquiry-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="inquiry-card-header">
            <span className="inquiry-badge">
              <Mail size={14} style={{ marginRight: '6px' }} />
              SEND A DIRECT MESSAGE
            </span>
            <h2 className="inquiry-title">Have a Question? Message Us Directly</h2>
            <p className="inquiry-subtitle">
              Send an inquiry to our Auckland team. Your message will be delivered straight to our official Outlook inbox.
            </p>
          </div>

          <form ref={formRef} className="inquiry-form-grid" onSubmit={handleInquirySubmit}>
            {/* Hidden aliases for standard EmailJS templates */}
            <input type="hidden" name="from_name" value={inquiryData.name} />
            <input type="hidden" name="user_name" value={inquiryData.name} />
            <input type="hidden" name="from_email" value={inquiryData.email} />
            <input type="hidden" name="user_email" value={inquiryData.email} />
            <input type="hidden" name="reply_to" value={inquiryData.email} />
            <input type="hidden" name="contact_number" value={inquiryData.phone} />
            <input type="hidden" name="message" value={inquiryData.message} />
            <input type="hidden" name="submission_date" value={new Date().toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' })} />

            <div className="form-row-2col">
              <input 
                type="text" 
                name="name" 
                placeholder="Your Full Name*" 
                value={inquiryData.name}
                onChange={handleInputChange}
                required 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address*" 
                value={inquiryData.email}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="form-row-2col">
              <input 
                type="tel" 
                name="phone" 
                placeholder="Contact Number (with country code)" 
                value={inquiryData.phone}
                onChange={handleInputChange}
              />
              <input 
                type="text" 
                name="subject" 
                placeholder="Subject (e.g. University Admissions / General Inquiry)" 
                value={inquiryData.subject}
                onChange={handleInputChange}
                required 
              />
            </div>

            <textarea 
              name="message" 
              placeholder="How can our Auckland educational counsellors assist you?*" 
              value={inquiryData.message}
              onChange={handleInputChange}
              required 
            ></textarea>

            <div className="inquiry-submit-row">
              <button 
                type="submit" 
                className="btn-inquiry-submit"
                disabled={isSubmitting}
              >
                <Send size={16} style={{ marginRight: '8px' }} />
                {isSubmitting ? 'Sending to Outlook...' : 'Send Message'}
              </button>
            </div>

            {submitStatus === 'success' && (
              <motion.div 
                className="inquiry-alert-banner success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle size={20} color="#10B981" />
                <span>Thank you! Your message has been sent to our Outlook inbox. We will get back to you shortly.</span>
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Callout Bridge to Consultation Form */}
        <motion.div 
          className="consultation-cta-banner"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="cta-banner-content">
            <div className="cta-banner-badge">
              <Sparkles size={14} />
              <span>STUDENT ADMISSIONS EVALUATION</span>
            </div>
            <h2>Ready to Assess Your Study Options?</h2>
            <p>
              Looking to study in New Zealand? Fill out our dedicated online consultation form to receive a customized evaluation of top universities and scholarship eligibility.
            </p>
          </div>
          <Link to="/consultation" className="btn-open-form">
            Open Consultation Form <ArrowRight size={18} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;

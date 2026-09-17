import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    title: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    marital_status: '',
    dependents: '',
    street_address: '',
    city: '',
    state: '',
    zip: '',
    qualification: '',
    current_position: '',
    experience_years: '',
    comments: ''
  });

  const [cvFile, setCvFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (!file) {
      setCvFile(null);
      return;
    }

    // 2MB validation (2 * 1024 * 1024 bytes)
    const maxSizeBytes = 2 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setFileError('File size exceeds the 2MB limit. Please upload a smaller document.');
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setCvFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFileError('');

    if (cvFile && cvFile.size > 2 * 1024 * 1024) {
      setFileError('Please ensure your uploaded CV is under 2MB.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // If EmailJS credentials are configured, dispatch email notification
    if (import.meta.env.VITE_EMAILJS_SERVICE_ID && formRef.current) {
      try {
        await emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID_COMPANY || 'template_default',
          formRef.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      } catch (err) {
        console.warn('EmailJS delivery error:', err);
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      // Reset form fields
      setFormData({
        title: '',
        name: '',
        email: '',
        phone: '',
        gender: '',
        dob: '',
        marital_status: '',
        dependents: '',
        street_address: '',
        city: '',
        state: '',
        zip: '',
        qualification: '',
        current_position: '',
        experience_years: '',
        comments: ''
      });
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 600);
  };

  return (
    <div className="contact-page-root">
      <div className="container contact-main-section">
        <div className="contact-layout-grid">
          
          {/* =========================================================================
              Left Column: Information & Direct Official Channels
              ========================================================================= */}
          <motion.div 
            className="contact-intro-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="contact-main-heading">Contact Us</h1>
            <p className="contact-intro-description">
              Please complete the provided form with your details and submit it. We will then promptly reach out to you. Your provided details will offer us valuable insight into your needs and preferences.
            </p>

            {/* Direct Official Contact Channels */}
            <div className="contact-channels-block">
              <div className="contact-channel-item">
                <div className="channel-icon-wrap">
                  <MapPin size={18} />
                </div>
                <div className="channel-details">
                  <strong>Auckland Headquarters</strong>
                  <p>109 Oakdale Road, Hillsborough, Auckland 1041, New Zealand</p>
                </div>
              </div>

              <div className="contact-channel-item">
                <div className="channel-icon-wrap">
                  <Phone size={18} />
                </div>
                <div className="channel-details">
                  <strong>Direct Phone Line</strong>
                  <p>
                    <a href="tel:00642102302460">0064 21023 02460</a> / <br/>
                    <a href="tel:0064220391397">0064 220391397</a>
                  </p>
                </div>
              </div>

              <div className="contact-channel-item">
                <div className="channel-icon-wrap">
                  <MessageSquare size={18} />
                </div>
                <div className="channel-details">
                  <strong>WhatsApp Consultation</strong>
                  <p>
                    <a href="https://wa.me/64220391397" target="_blank" rel="noopener noreferrer">
                      0064 220391397 (Chat Online)
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-channel-item">
                <div className="channel-icon-wrap">
                  <Mail size={18} />
                </div>
                <div className="channel-details">
                  <strong>Email Inquiries</strong>
                  <p>
                    <a href="mailto:support@necl.co.nz">support@necl.co.nz</a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* =========================================================================
              Right Column: The Application & Inquiry Form (Matching Pasted Pictures)
              ========================================================================= */}
          <motion.div 
            className="contact-form-container"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form ref={formRef} className="client-custom-form" onSubmit={handleSubmit}>
              
              {/* Row 1: Title */}
              <input 
                type="text" 
                name="title" 
                placeholder="Title" 
                value={formData.title} 
                onChange={handleInputChange} 
              />

              {/* Row 2: Your Name* */}
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name*" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
              />

              {/* Row 3: Email Address* and Contact Number */}
              <div className="form-row-2col">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email Address*" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Contact Number" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                />
              </div>

              {/* Row 4: Gender* and Date Of Birth */}
              <div className="form-row-2col">
                <div className="form-field-group">
                  <span className="field-header-label">Gender*</span>
                  <div className="radio-options-row">
                    <label className="radio-item-label">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="Male" 
                        checked={formData.gender === 'Male'} 
                        onChange={handleInputChange} 
                        required 
                      />
                      Male
                    </label>
                    <label className="radio-item-label">
                      <input 
                        type="radio" 
                        name="gender" 
                        value="Female" 
                        checked={formData.gender === 'Female'} 
                        onChange={handleInputChange} 
                        required 
                      />
                      Female
                    </label>
                  </div>
                </div>

                <div className="form-field-group">
                  <span className="field-header-label">Date Of Birth</span>
                  <input 
                    type="date" 
                    name="dob" 
                    placeholder="dd-mm-yyyy" 
                    value={formData.dob} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>

              {/* Row 5: Martial Status* and Number of Dependent */}
              <div className="form-row-2col">
                <div className="form-field-group">
                  <span className="field-header-label">Martial Status*</span>
                  <div className="radio-options-row">
                    <label className="radio-item-label">
                      <input 
                        type="radio" 
                        name="marital_status" 
                        value="Single" 
                        checked={formData.marital_status === 'Single'} 
                        onChange={handleInputChange} 
                        required 
                      />
                      Single
                    </label>
                    <label className="radio-item-label">
                      <input 
                        type="radio" 
                        name="marital_status" 
                        value="Married" 
                        checked={formData.marital_status === 'Married'} 
                        onChange={handleInputChange} 
                        required 
                      />
                      Married
                    </label>
                  </div>
                </div>

                <div className="form-field-group" style={{ justifyContent: 'flex-end' }}>
                  <input 
                    type="text" 
                    name="dependents" 
                    placeholder="Number of Dependent" 
                    value={formData.dependents} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>

              {/* Row 6: Street Address */}
              <input 
                type="text" 
                name="street_address" 
                placeholder="Street Address" 
                value={formData.street_address} 
                onChange={handleInputChange} 
              />

              {/* Row 7: City and State/Province */}
              <div className="form-row-2col">
                <input 
                  type="text" 
                  name="city" 
                  placeholder="City" 
                  value={formData.city} 
                  onChange={handleInputChange} 
                />
                <input 
                  type="text" 
                  name="state" 
                  placeholder="State/Province" 
                  value={formData.state} 
                  onChange={handleInputChange} 
                />
              </div>

              {/* Row 8: ZIP/Postel code */}
              <input 
                type="text" 
                name="zip" 
                placeholder="ZIP/Postel code" 
                value={formData.zip} 
                onChange={handleInputChange} 
              />

              {/* Row 9: Highest Education Qualification* */}
              <input 
                type="text" 
                name="qualification" 
                placeholder="Highest Education Qualification*" 
                value={formData.qualification} 
                onChange={handleInputChange} 
                required 
              />

              {/* Subsection: Employment Status */}
              <h3 className="form-subsection-heading">Employment Status</h3>

              {/* Row 10: Current Position */}
              <input 
                type="text" 
                name="current_position" 
                placeholder="Current Position" 
                value={formData.current_position} 
                onChange={handleInputChange} 
              />

              {/* Row 11: Number of Years Experience */}
              <input 
                type="text" 
                name="experience_years" 
                placeholder="Number of Years Experience" 
                value={formData.experience_years} 
                onChange={handleInputChange} 
              />

              {/* Row 12: Comments or Queries */}
              <textarea 
                name="comments" 
                placeholder="Comments or Queries" 
                rows="4" 
                value={formData.comments} 
                onChange={handleInputChange} 
              />

              {/* Row 13: Upload Your CV (Max: 2MB) */}
              <div className="cv-upload-container">
                <span className="field-header-label">Upload Your CV (Max: 2MB)</span>
                <div className="cv-file-wrapper">
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    name="cv_file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileChange} 
                  />
                </div>
                {fileError && <p className="file-error-message">{fileError}</p>}
                {cvFile && (
                  <p className="file-limit-hint" style={{ color: '#047857', fontWeight: 600 }}>
                    Selected: {cvFile.name} ({(cvFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>

              {/* Row 14: Submit Button */}
              <div className="form-submit-row">
                <button 
                  type="submit" 
                  className="btn-contact-submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>

              {/* Feedback status messages */}
              {submitStatus === 'success' && (
                <div className="submit-status-banner success">
                  <CheckCircle size={20} />
                  <span>
                    Thank you! Your information has been received successfully. Our Auckland advisory team will reach out to you promptly.
                  </span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="submit-status-banner error">
                  <AlertCircle size={20} />
                  <span>
                    Submission error. Please verify your details or reach us directly at support@necl.co.nz.
                  </span>
                </div>
              )}

            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;

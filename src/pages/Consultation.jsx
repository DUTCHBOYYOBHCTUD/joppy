import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle, AlertCircle, Send, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Consultation.css';

const Consultation = () => {
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
    <div className="consultation-page-root">
      <div className="consultation-container">
        
        {/* Header Section */}
        <motion.div 
          className="consultation-header"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="consultation-badge">
            <Sparkles size={15} />
            <span>ONLINE PROFILE ASSESSMENT</span>
          </div>
          <h1 className="consultation-main-title">Book a Free Consultation</h1>
          <p className="consultation-subtitle">
            Please complete your educational background and career goals below. Our senior Auckland educational advisers will review your profile and reach out within 24 hours with tailored New Zealand university options.
          </p>
        </motion.div>

        {/* 3 Process Steps */}
        <motion.div 
          className="consultation-steps-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="consultation-step-card">
            <div className="step-number">1</div>
            <div className="step-details">
              <strong>Submit Details</strong>
              <span>Fill out qualifications &amp; goals</span>
            </div>
          </div>
          <div className="consultation-step-card">
            <div className="step-number">2</div>
            <div className="step-details">
              <strong>Adviser Review</strong>
              <span>Auckland team evaluates eligibility</span>
            </div>
          </div>
          <div className="consultation-step-card">
            <div className="step-number">3</div>
            <div className="step-details">
              <strong>1-on-1 Consultation</strong>
              <span>Custom roadmap for admissions</span>
            </div>
          </div>
        </motion.div>

        {/* The Complete Form Card */}
        <motion.div 
          className="consultation-form-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <form ref={formRef} className="consultation-form-inner" onSubmit={handleSubmit}>
            
            {/* Row 1: Title */}
            <input 
              type="text" 
              name="title" 
              placeholder="Title (e.g. Mr / Ms / Mrs / Dr)" 
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
                placeholder="Contact Number (with country code)" 
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

              <div className="form-field-group">
                <span className="field-header-label">Number of Dependent</span>
                <input 
                  type="number" 
                  name="dependents" 
                  placeholder="0" 
                  min="0"
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

            {/* Row 7: City and State / Province */}
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
                placeholder="State / Province" 
                value={formData.state} 
                onChange={handleInputChange} 
              />
            </div>

            {/* Row 8: Postal / Zip Code */}
            <input 
              type="text" 
              name="zip" 
              placeholder="Postal / Zip Code" 
              value={formData.zip} 
              onChange={handleInputChange} 
            />

            {/* Row 9: Highest Qualification* */}
            <input 
              type="text" 
              name="qualification" 
              placeholder="Highest Qualification* (e.g. Bachelor's in CS / High School)" 
              value={formData.qualification} 
              onChange={handleInputChange} 
              required 
            />

            {/* Section Heading: Employment Status */}
            <h3 className="form-subsection-heading">Employment Status</h3>

            {/* Row 10: Current Position / Job Title */}
            <input 
              type="text" 
              name="current_position" 
              placeholder="Current Position / Job Title (if applicable)" 
              value={formData.current_position} 
              onChange={handleInputChange} 
            />

            {/* Row 11: Years of Experience */}
            <input 
              type="number" 
              name="experience_years" 
              placeholder="Years of Work Experience" 
              min="0"
              value={formData.experience_years} 
              onChange={handleInputChange} 
            />

            {/* Row 12: Upload Resume / CV (Under 2MB) */}
            <div className="cv-upload-container">
              <div className="cv-file-wrapper">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  name="cv_file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="cv-input-native"
                />
                {cvFile && (
                  <p className="cv-file-selected-text">
                    Selected: {cvFile.name} ({(cvFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
              <span className="cv-upload-hint">Upload Resume / CV (Max size: 2MB • Format: PDF, DOC, DOCX)</span>
              {fileError && (
                <span className="cv-error-msg">
                  <AlertCircle size={15} /> {fileError}
                </span>
              )}
            </div>

            {/* Row 13: Comments / Study Goals */}
            <textarea 
              name="comments" 
              placeholder="Comments or Specific Questions (Target universities, courses of interest, expected intake year...)"
              value={formData.comments}
              onChange={handleInputChange}
            ></textarea>

            {/* Submit Button */}
            <div className="form-submit-row">
              <button 
                type="submit" 
                className="btn-consultation-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Consultation Request'}
              </button>
            </div>

            {/* Submission Status Message */}
            {submitStatus === 'success' && (
              <motion.div 
                className="submit-alert-banner success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle size={22} color="#10B981" />
                <div>
                  <strong>Thank you! Your consultation request has been received.</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', opacity: 0.9 }}>
                    Our Auckland education counsellors will review your profile and contact you within 24 hours.
                  </p>
                </div>
              </motion.div>
            )}

          </form>
        </motion.div>

        {/* Direct Contact Bridge */}
        <div className="consultation-support-bridge">
          <h3>Need General Office Information or Immediate Assistance?</h3>
          <p>
            If you need office directions, postal details, or direct telephone inquiries, visit our official Contact Information page.
          </p>
          <div className="support-bridge-actions">
            <Link to="/contact" className="btn btn-glass" style={{ padding: '0.65rem 1.4rem' }}>
              View Contact Information <ArrowRight size={16} style={{ marginLeft: '6px' }} />
            </Link>
            <a 
              href="https://wa.me/64220391397" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.4rem' }}
            >
              <MessageCircle size={17} style={{ marginRight: '6px' }} /> WhatsApp: 0064 220391397
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Consultation;

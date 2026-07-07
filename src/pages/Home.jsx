import React from 'react';
import HeroSection from '../components/HeroSection';
import WhyNewZealand from '../components/WhyNewZealand';
import ServicesSection from '../components/ServicesSection';
import TopUniversities from '../components/TopUniversities';
import JourneyTimeline from '../components/JourneyTimeline';
import SuccessStories from '../components/SuccessStories';
import ScholarshipFinder from '../components/ScholarshipFinder';
import VisaSuccessMetrics from '../components/VisaSuccessMetrics';
import ConsultationCTA from '../components/ConsultationCTA';

import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="grain-overlay"></div>
      <HeroSection />
      <WhyNewZealand />
      <ServicesSection />
      <TopUniversities />
      <JourneyTimeline />
      <SuccessStories />
      <ScholarshipFinder />
      <VisaSuccessMetrics />
      <ConsultationCTA />
    </div>
  );
};

export default Home;

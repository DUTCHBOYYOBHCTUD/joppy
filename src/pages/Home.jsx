import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutUs from '../components/AboutUs';
import ServicesSection from '../components/ServicesSection';
import SuccessStories from '../components/SuccessStories';
import ConsultationCTA from '../components/ConsultationCTA';

import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="grain-overlay"></div>
      <HeroSection />
      <AboutUs />
      <ServicesSection />
      <SuccessStories />
      <ConsultationCTA />
    </div>
  );
};

export default Home;

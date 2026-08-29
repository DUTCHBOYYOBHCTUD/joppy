import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './SuccessStories.css';

const stories = [
  {
    name: "Priya Sharma",
    uni: "University of Auckland",
    scholarship: "$10,000 NZD Scholarship",
    quote: "NZ Educational Services made my dream a reality. Their visa process was seamless and they helped me secure a massive scholarship!",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Rahul Verma",
    uni: "University of Otago",
    scholarship: "Full Tuition Waiver",
    quote: "The SOP guidance I received was game-changing. I am now pursuing my Masters in Data Science with a full tuition waiver.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Sneha Patel",
    uni: "Victoria University",
    scholarship: "$5,000 NZD Grant",
    quote: "From course selection to finding accommodation, they were there for me. Highly recommend to anyone planning to study in NZ.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % stories.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <section className="success-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            SUCCESS <span className="text-accent">STORIES</span>
          </motion.h2>
        </div>

        <div className="testimonial-wrapper">
          <button className="carousel-btn prev" onClick={prev}><ChevronLeft size={24} /></button>
          
          <div className="testimonial-content">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                className="testimonial-card glass"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <div style={{ marginBottom: '1.5rem', opacity: 0.2 }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--color-accent-emerald)" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <p className="quote-text">"{stories[currentIndex].quote}"</p>
                <div className="student-info">
                  <img src={stories[currentIndex].image} alt={stories[currentIndex].name} className="student-img" />
                  <div>
                    <h4>{stories[currentIndex].name}</h4>
                    <span className="student-uni">{stories[currentIndex].uni}</span>
                    <span className="student-schol">{stories[currentIndex].scholarship}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="carousel-btn next" onClick={next}><ChevronRight size={24} /></button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;

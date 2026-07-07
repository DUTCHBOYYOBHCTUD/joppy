import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Award } from 'lucide-react';
import './TopUniversities.css';

const universities = [
  { name: "University of Auckland", city: "Auckland", rank: "Top 100 Global", tuition: "$35k - $45k NZD", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { name: "University of Otago", city: "Dunedin", rank: "Top 1% Global", tuition: "$32k - $40k NZD", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { name: "Victoria University", city: "Wellington", rank: "Top 250 Global", tuition: "$30k - $38k NZD", image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { name: "University of Canterbury", city: "Christchurch", rank: "Top 300 Global", tuition: "$31k - $39k NZD", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { name: "Massey University", city: "Palmerston North", rank: "Top 300 Global", tuition: "$29k - $36k NZD", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { name: "AUT", city: "Auckland", rank: "Top 1% Global", tuition: "$32k - $38k NZD", image: "https://images.unsplash.com/photo-1571260899304-42507011ec6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
];

const TopUniversities = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <section className="top-universities section-padding bg-dark">
      <div className="container">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            TOP <span className="text-accent">UNIVERSITIES</span>
          </motion.h2>
          <p>Partnering with New Zealand's finest educational institutions.</p>
        </div>

        <motion.div ref={carousel} className="carousel no-scrollbar" whileTap={{ cursor: "grabbing" }}>
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            className="inner-carousel"
          >
            {universities.map((uni, idx) => (
              <motion.div key={idx} className="uni-card">
                <div className="uni-image" style={{ backgroundImage: `url(${uni.image})` }}>
                  <div className="uni-overlay"></div>
                </div>
                <div className="uni-content glass-dark">
                  <h3>{uni.name}</h3>
                  <div className="uni-stats">
                    <span><Award size={16}/> {uni.rank}</span>
                    <span><MapPin size={16}/> {uni.city}</span>
                    <span><DollarSign size={16}/> {uni.tuition}</span>
                  </div>
                  <button className="btn btn-primary uni-btn">Explore Courses</button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TopUniversities;

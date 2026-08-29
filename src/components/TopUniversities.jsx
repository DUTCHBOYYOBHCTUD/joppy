import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import './TopUniversities.css';

import logo2 from '../assets/image2.png';
import logo3 from '../assets/image3.png';
import logo4 from '../assets/image4.png';
import logo5 from '../assets/image5.png';
import logo6 from '../assets/image6.png';
import logo7 from '../assets/image7.png';
import logo8 from '../assets/image8.png';

const universities = [
  { name: "Skill New Zealand", image: logo2 },
  { name: "Whitecliffe", image: logo3 },
  { name: "Yoobee", image: logo4 },
  { name: "Auckland Institute of Studies", image: logo5 },
  { name: "New Zealand Tertiary College", image: logo6 },
  { name: "NZMA", image: logo7 },
  { name: "AKA Education Group", image: logo8 }
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
            OUR <span className="text-accent">PARTNERS</span>
          </motion.h2>
          <p>We work with New Zealand's finest educational institutions.</p>
        </div>

        <motion.div ref={carousel} className="carousel no-scrollbar" whileTap={{ cursor: "grabbing" }}>
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            className="inner-carousel"
          >
            {universities.map((uni, idx) => (
              <motion.div key={idx} className="uni-card" style={{ background: '#fff', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', height: '250px', minWidth: '250px' }}>
                <img src={uni.image} alt={uni.name} style={{ maxWidth: '180px', maxHeight: '100px', objectFit: 'contain', marginBottom: '1rem' }} />
                <h3 style={{ color: '#000', fontSize: '1.2rem', textAlign: 'center', margin: 0 }}>{uni.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TopUniversities;

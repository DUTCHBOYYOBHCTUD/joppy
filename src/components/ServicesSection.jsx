import { motion } from 'framer-motion';
import { BookOpen, MapPin, FileText, GraduationCap, Plane, Home, Users, CheckSquare } from 'lucide-react';
import './ServicesSection.css';

const services = [
  { icon: MapPin, title: "University Selection", desc: "Expert guidance in finding the right institution for your goals." },
  { icon: BookOpen, title: "Course Selection", desc: "Aligning your career aspirations with the best programs." },
  { icon: FileText, title: "SOP Guidance", desc: "Crafting compelling Statements of Purpose that stand out." },
  { icon: GraduationCap, title: "Scholarship Assistance", desc: "Identifying and applying for eligible financial aid." },
  { icon: CheckSquare, title: "Visa Filing", desc: "End-to-end support for a hassle-free visa process." },
  { icon: Users, title: "Interview Prep", desc: "Mock interviews to build your confidence." },
  { icon: Home, title: "Accommodation", desc: "Finding safe and comfortable living arrangements." },
  { icon: Plane, title: "Pre-departure", desc: "Comprehensive briefing for your journey ahead." }
];

const ServicesSection = () => {
  return (
    <section className="services-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            COMPREHENSIVE <span className="text-accent">SERVICES</span>
          </motion.h2>
          <p>From dreaming to departing, we are with you at every step of your journey.</p>
        </div>

        <div className="services-grid">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              className="service-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="service-icon">
                <service.icon size={28} />
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <button className="service-cta">Learn More &rarr;</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

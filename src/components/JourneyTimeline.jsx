import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PhoneCall, Building, FileCheck, MailOpen, PlaneTakeoff, GraduationCap, MapPin } from 'lucide-react';
import './JourneyTimeline.css';

const steps = [
  { icon: PhoneCall, title: "Free Counseling", desc: "Discuss your goals with our experts." },
  { icon: Building, title: "University Selection", desc: "Shortlist the best institutions." },
  { icon: FileCheck, title: "Application", desc: "Submit docs and SOPs." },
  { icon: MailOpen, title: "Offer Letter", desc: "Receive your conditional/unconditional offer." },
  { icon: MapPin, title: "Visa Processing", desc: "Lodge your student visa application." },
  { icon: PlaneTakeoff, title: "Departure", desc: "Pre-departure briefing & travel." },
  { icon: GraduationCap, title: "Arrival Support", desc: "Settle into your new life in NZ." }
];

const JourneyTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="timeline-section section-padding" ref={containerRef}>
      <div className="container">
        <div className="section-header text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            YOUR <span className="text-accent">JOURNEY</span>
          </motion.h2>
          <p>A step-by-step path from your dream to your destination.</p>
        </div>

        <div className="timeline-container">
          <div className="timeline-line-bg"></div>
          <motion.div className="timeline-line-fill" style={{ height: lineHeight }}></motion.div>

          {steps.map((step, idx) => (
            <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
              <motion.div 
                className="timeline-content glass"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="timeline-icon">
                  <step.icon size={24} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
              <div className="timeline-dot"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;

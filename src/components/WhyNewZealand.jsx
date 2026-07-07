import { motion } from 'framer-motion';
import { Award, Briefcase, TrendingUp, ShieldCheck, DollarSign, Globe2 } from 'lucide-react';
import './WhyNewZealand.css';

const reasons = [
  { icon: Award, title: "World-Class Education", desc: "Universities ranked in the top 3% globally." },
  { icon: Briefcase, title: "Post-Study Work", desc: "Up to 3 years of post-study work rights." },
  { icon: TrendingUp, title: "PR Pathways", desc: "Clear pathways to Permanent Residency for skilled graduates." },
  { icon: ShieldCheck, title: "Safe Environment", desc: "Ranked as one of the safest countries in the world." },
  { icon: DollarSign, title: "Affordable Living", desc: "Competitive tuition fees and reasonable living costs." },
  { icon: Globe2, title: "Global Recognition", desc: "Degrees recognized and respected worldwide." }
];

const WhyNewZealand = () => {
  return (
    <section className="why-nz section-padding">
      <div className="container">
        <div className="section-header text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            WHY <span className="text-accent">NEW ZEALAND?</span>
          </motion.h2>
          <p>Discover a destination that balances academic excellence with an unmatched lifestyle.</p>
        </div>

        <div className="reasons-grid">
          {reasons.map((reason, idx) => (
            <motion.div 
              key={idx}
              className="reason-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="reason-icon-wrapper">
                <reason.icon size={32} className="reason-icon" />
              </div>
              <h3>{reason.title}</h3>
              <p>{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mountain-bg"></div>
    </section>
  );
};

export default WhyNewZealand;

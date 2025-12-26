import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HiShieldCheck, HiEye, HiLightningBolt, HiLockClosed,
  HiCheckCircle, HiArrowRight, HiStar 
} from 'react-icons/hi';
import CountUp from 'react-countup';
import './Home.css';

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const yPos = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 50);
      mouseY.set((clientY - innerHeight / 2) / 50);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const stats = [
    { value: 2.5, prefix: '$', suffix: 'M+', label: 'Total Volume Processed', decimals: 1 },
    { value: 1234, suffix: '', label: 'Projects Completed', decimals: 0 },
    { value: 98.5, suffix: '%', label: 'Success Rate', decimals: 1 },
    { value: 30, prefix: '<', suffix: 's', label: 'Avg Settlement Time', decimals: 0 },
  ];

  const features = [
    {
      icon: HiShieldCheck,
      title: 'Trustless Escrow Vault',
      description: 'Funds locked in smart contracts—no human control until AI verification completes.',
      color: 'primary',
    },
    {
      icon: HiEye,
      title: 'AI-Powered Verification',
      description: 'Objective AI oracle evaluates work and signs cryptographic verdicts—zero bias.',
      color: 'secondary',
    },
    {
      icon: HiLightningBolt,
      title: 'Instant Proportional Payments',
      description: 'AI completion score (0-100%) determines automatic fund distribution.',
      color: 'accent',
    },
    {
      icon: HiLockClosed,
      title: 'AI Dispute Resolution',
      description: 'Level 1: AI analyzes evidence & calculates fair settlement. Level 2: Human arbitrators step in.',
      color: 'success',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Project',
      description: 'Post requirements and budget. Funds instantly lock in smart contract.',
    },
    {
      number: '02',
      title: 'Work Delivered',
      description: 'Freelancer submits completed work with verification proof.',
    },
    {
      number: '03',
      title: 'AI Verifies',
      description: 'AI analyzes quality and generates completion score (0-100%).',
    },
    {
      number: '04',
      title: 'Auto Payment',
      description: 'Smart contract releases proportional payment. Instant. Fair.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Freelance Designer',
      avatar: 'SC',
      rating: 5,
      text: 'Finally, a platform where I get paid immediately after delivering quality work. No more chasing clients.',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Startup Founder',
      avatar: 'MR',
      rating: 5,
      text: 'AI verification gives me confidence. I only pay for what was actually delivered. Complete game changer.',
    },
    {
      name: 'Priya Sharma',
      role: 'Blockchain Developer',
      avatar: 'PS',
      rating: 5,
      text: 'Blockchain + AI = perfect solution. No disputes, no delays, just fair automatic payments.',
    },
  ];

  return (
    <div className="home-page">
      {/* Animated Background */}
      <div className="animated-background">
        <motion.div className="gradient-orb orb-1" style={{ x, y: yPos }} />
        <motion.div className="gradient-orb orb-2" style={{ x: useTransform(x, v => v * -1), y: yPos }} />
        <motion.div className="gradient-orb orb-3" style={{ x, y: useTransform(yPos, v => v * -1) }} />
        <div className="grid-overlay" />
      </div>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="hero-section"
        style={{ opacity, scale, y }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-badge"
          >
            <HiLightningBolt />
            <span>Powered by Blockchain & AI</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="gradient-text">Decentralized Escrow Vault</span>
            <br />
            for Freelance Payments
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We're not a marketplace. We're the <span className="highlight">trustless vault</span> between you and your freelancer.
          </motion.p>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Smart contracts + AI verification = Fair automatic payments
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/new-escrow" className="btn-primary btn-large">
              <span>Start Using Escrow</span>
              <HiArrowRight />
            </Link>
            <button className="btn-secondary btn-large">
              <span>How It Works</span>
            </button>
          </motion.div>

          <motion.div
            className="hero-features"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {['Non-custodial', 'Open source', 'Audited contracts'].map((feature, i) => (
              <div key={i} className="feature-tag">
                <HiCheckCircle />
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Features Section */}
      <section className="features-section section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2 className="section-title">
              Why <span className="gradient-text">Choose Us</span>
            </h2>
            <p className="section-subtitle">
              Traditional platforms are broken. We built something better.
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="section-subtitle">
              Four simple steps to secure, automated freelance payments
            </p>
          </motion.div>

          <div className="steps-container">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">
              Trusted by <span className="gradient-text">Thousands</span>
            </h2>
            <p className="section-subtitle">
              See what freelancers and clients are saying
            </p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>
              Ready to experience <span className="gradient-text">trustless payments</span>?
            </h2>
            <p>Join thousands building the future of freelance work. No signup fees. No monthly charges.</p>
            <Link to="/new-escrow" className="btn-primary btn-large">
              <span>Start Free</span>
              <HiArrowRight />
            </Link>
            <p className="cta-note">Connect your wallet in 30 seconds. No credit card required.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Stats Section Component
const StatsSection = ({ stats }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <h3>
                {stat.prefix}
                {isInView && (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={3.5}
                    decimals={stat.decimals || 0}
                    separator=",">
                  </CountUp>
                )}
                {stat.suffix}
              </h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Feature Card Component with stagger
const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      className={`feature-card feature-${feature.color}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
    >
      <motion.div 
        className="feature-icon"
        whileHover={{ rotate: 360, scale: 1.2 }}
        transition={{ duration: 0.6 }}
      >
        <Icon />
      </motion.div>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </motion.div>
  );
};

// Step Card Component
const StepCard = ({ step, index }) => {
  return (
    <motion.div
      className="step-card"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="step-number">{step.number}</div>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
      {index < 3 && <div className="step-connector" />}
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      className="testimonial-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="testimonial-header">
        <div className="avatar">{testimonial.avatar}</div>
        <div className="testimonial-info">
          <h4>{testimonial.name}</h4>
          <p>{testimonial.role}</p>
        </div>
      </div>
      <div className="rating">
        {[...Array(testimonial.rating)].map((_, i) => (
          <HiStar key={i} />
        ))}
      </div>
      <p className="testimonial-text">"{testimonial.text}"</p>
    </motion.div>
  );
};

export default Home;

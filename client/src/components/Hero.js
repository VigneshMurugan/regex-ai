import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Code, Zap } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={16} />
            <span>Powered by AI</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform English to
            <br />
            <span className="gradient-text">Perfect Regex</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Generate precise regular expressions from natural language descriptions.
            Test, validate, and perfect your regex patterns with our AI-powered tool.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="btn btn-gradient hero-cta"
              onClick={scrollToGenerator}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap size={20} />
              Generate Regex
              <ArrowRight size={16} />
            </motion.button>

            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code size={20} />
              View Examples
            </motion.button>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="stat">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Regex Generated</div>
            </div>
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat">
              <div className="stat-number">5K+</div>
              <div className="stat-label">Happy Users</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="code-preview">
            <div className="code-header">
              <div className="code-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="code-title">RegexAI Generator</span>
            </div>
            <div className="code-content">
              <div className="code-line">
                <span className="code-comment">// Input: "Match email addresses"</span>
              </div>
              <div className="code-line">
                <span className="code-keyword">const</span> <span className="code-variable">emailRegex</span> = 
                <span className="code-string">/^[^\s@]+@[^\s@]+\.[^\s@]+$/</span>;
              </div>
              <div className="code-line">
                <span className="code-comment">// ✅ Matches: user@example.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

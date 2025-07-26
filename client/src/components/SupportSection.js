import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Star, Users } from 'lucide-react';
import './SupportSection.css';

const SupportSection = () => {
  useEffect(() => {
    // Load Google AdSense script
    const adsenseScript = document.createElement('script');
    adsenseScript.async = true;
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9712912051292347';
    adsenseScript.crossOrigin = 'anonymous';
    document.head.appendChild(adsenseScript);

    // Initialize ads after script loads
    adsenseScript.onload = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    };

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(adsenseScript)) {
        document.head.removeChild(adsenseScript);
      }
    };
  }, []);

  const handleBuyMeCoffee = () => {
    // Replace 'yourusername' with your actual Buy Me a Coffee username
    window.open('https://www.buymeacoffee.com/vignesh328g', '_blank');
  };

  const stats = [
    { icon: Users, value: '10K+', label: 'Happy Users' },
    { icon: Star, value: '99.9%', label: 'Success Rate' },
    { icon: Coffee, value: '24/7', label: 'Available' }
  ];

  return (
    <section id="support" className="support-section section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Support RegexAI</h2>
          <p>Help us keep this tool free and continuously improving for developers worldwide.</p>
        </motion.div>

        <div className="support-content">
          {/* Buy Me a Coffee Section */}
          <motion.div
            className="coffee-section"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="coffee-card">
              <div className="coffee-icon">
                <Coffee size={48} />
              </div>
              <h3>Buy Me a Coffee</h3>
              <p>
                If RegexAI has saved you time and made your development easier, 
                consider supporting us with a coffee! Every contribution helps us 
                maintain and improve the service.
              </p>
              <motion.button
                className="btn btn-gradient coffee-button"
                onClick={handleBuyMeCoffee}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={20} />
                Buy Me a Coffee
              </motion.button>
              <div className="coffee-benefits">
                <div className="benefit-item">
                  <Star size={16} />
                  <span>Support development</span>
                </div>
                <div className="benefit-item">
                  <Star size={16} />
                  <span>Keep the service free</span>
                </div>
                <div className="benefit-item">
                  <Star size={16} />
                  <span>Fund new features</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google AdSense Section */}
          <motion.div
            className="ads-section"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="ad-container">
              <div className="ad-label">Advertisement</div>
              {/* Google AdSense Ad Unit */}
              <ins 
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-9712912051292347"
                data-ad-slot="4741713215"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            </div>

            {/* Alternative ad placeholder for development */}
            <div className="ad-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">📢</div>
                <h4>Advertisement Space</h4>
                <p>Google AdSense ads will appear here once configured</p>
                <small>Replace YOUR_PUBLISHER_ID and YOUR_AD_SLOT_ID in the code</small>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="stats-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="stat-icon">
                  <stat.icon size={24} />
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          className="thank-you-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="thank-you-card">
            <Heart className="thank-you-icon" size={32} />
            <h3>Thank You!</h3>
            <p>
              RegexAI is made possible by amazing developers like you. 
              Whether you support us with a coffee or simply use and share our tool, 
              you're helping make regex more accessible to everyone.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SupportSection;

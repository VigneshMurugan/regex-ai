import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Generator', href: '#generator' },
      { name: 'Tester', href: '#tester' },
      { name: 'Examples', href: '#examples' },
      { name: 'API', href: '#api' }
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Contact', href: '#contact' },
      { name: 'Support Us', href: '#support' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Documentation', href: '#docs' },
      { name: 'Buy Me Coffee', href: 'https://www.buymeacoffee.com/yourusername' },
      { name: 'Community', href: '#community' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@regexai.com' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="brand-logo">
              <Zap className="logo-icon" />
              <span className="logo-text">RegexAI</span>
            </div>
            <p className="brand-description">
              Transform natural language into perfect regular expressions with the power of AI.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div className="footer-links">
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                className="link-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 + 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="link-group-title">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h4>
                <ul className="link-list">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: categoryIndex * 0.1 + linkIndex * 0.05 + 0.4 }}
                      viewport={{ once: true }}
                    >
                      <a 
                        href={link.href} 
                        className="footer-link"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} RegexAI. All rights reserved.
            </p>
            <p className="made-with-love">
              Made with <Heart size={16} className="heart-icon" /> by developers, for developers
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

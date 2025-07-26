import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import RegexGenerator from './components/RegexGenerator';
import RegexTester from './components/RegexTester';
import SupportSection from './components/SupportSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
        <RegexGenerator />
        <RegexTester />
        <SupportSection />
      </motion.main>
      <Footer />
    </div>
  );
}

export default App;

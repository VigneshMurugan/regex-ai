import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Copy, Check, Loader, Sparkles, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './RegexGenerator.css';

const RegexGenerator = () => {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('/api/generate-regex', {
        description: description.trim()
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate regex. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (result?.regex) {
      await navigator.clipboard.writeText(result.regex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  const examplePrompts = [
    "Match email addresses",
    "Find phone numbers in US format",
    "Extract URLs from text",
    "Match dates in MM/DD/YYYY format",
    "Find hexadecimal color codes"
  ];

  return (
    <section id="generator" className="generator-section section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>AI-Powered Regex Generator</h2>
          <p>Describe what you want to match in plain English, and our AI will create the perfect regex for you.</p>
        </motion.div>

        <div className="generator-container">
          <motion.div
            className="generator-input-section"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="input-container">
              <label htmlFor="description" className="input-label">
                <Sparkles size={16} />
                Describe your pattern
              </label>
              <textarea
                id="description"
                className="description-input"
                placeholder="e.g., Match email addresses, Find phone numbers, Extract URLs..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={4}
              />
              <div className="input-hint">
                Press Cmd+Enter to generate
              </div>
            </div>

            <div className="example-prompts">
              <span className="example-label">Try these examples:</span>
              <div className="example-buttons">
                {examplePrompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    className="example-button"
                    onClick={() => setDescription(prompt)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              className="generate-button btn btn-gradient"
              onClick={handleGenerate}
              disabled={loading || !description.trim()}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <>
                  <Loader className="spinner" size={20} />
                  Generating...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Generate Regex
                </>
              )}
            </motion.button>
          </motion.div>

          <motion.div
            className="generator-output-section"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  className="error-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <AlertCircle size={20} />
                  {error}
                </motion.div>
              )}

              {loading && (
                <motion.div
                  className="loading-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="loading-animation">
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <p>AI is crafting your regex...</p>
                  </div>
                </motion.div>
              )}

              {result && (
                <motion.div
                  className="result-container"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="result-header">
                    <h3>Generated Regex</h3>
                    <motion.button
                      className="copy-button"
                      onClick={handleCopy}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy'}
                    </motion.button>
                  </div>

                  <div className="regex-output">
                    <SyntaxHighlighter
                      language="javascript"
                      style={tomorrow}
                      customStyle={{
                        background: 'var(--background-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        fontSize: '16px',
                        padding: '20px'
                      }}
                    >
                      {`/${result.regex}/${result.flags || 'g'}`}
                    </SyntaxHighlighter>
                  </div>

                  {result.explanation && (
                    <div className="explanation">
                      <h4>Explanation</h4>
                      <p>{result.explanation}</p>
                    </div>
                  )}

                  <div className="regex-flags">
                    <span className="flags-label">Suggested flags:</span>
                    <code className="flags-code">{result.flags || 'g'}</code>
                  </div>
                </motion.div>
              )}

              {!result && !loading && !error && (
                <motion.div
                  className="placeholder-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="placeholder-content">
                    <Sparkles size={48} className="placeholder-icon" />
                    <h3>Ready to generate</h3>
                    <p>Enter a description above and click generate to see your regex pattern appear here.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegexGenerator;

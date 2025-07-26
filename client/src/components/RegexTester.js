import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, XCircle, Target, Hash, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import './RegexTester.css';

const RegexTester = () => {
  const [regex, setRegex] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const validateRegex = (pattern) => {
      try {
        new RegExp(pattern, flags);
        setIsValid(true);
        setError('');
      } catch (err) {
        setIsValid(false);
        setError(err.message);
      }
    };

    if (regex) {
      validateRegex(regex);
    }
  }, [regex, flags]);

  const handleTest = async () => {
    if (!regex || !isValid) return;

    try {
      const response = await axios.post('/api/test-regex', {
        regex,
        testString,
        flags
      });

      setResult(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to test regex');
      setResult(null);
    }
  };

  const highlightMatches = (text, matches) => {
    if (!matches || matches.length === 0) return text;

    let highlightedText = text;
    let offset = 0;

    matches.forEach((match, index) => {
      const startTag = `<mark class="match-highlight" data-match="${index}">`;
      const endTag = '</mark>';
      const start = match.index + offset;
      const end = start + match.match.length;

      highlightedText = 
        highlightedText.slice(0, start) + 
        startTag + 
        highlightedText.slice(start, end) + 
        endTag + 
        highlightedText.slice(end);

      offset += startTag.length + endTag.length;
    });

    return highlightedText;
  };

  const exampleTests = [
    {
      regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      testString: 'user@example.com\ninvalid-email\ntest@domain.org',
      description: 'Email validation'
    },
    {
      regex: '\\b\\d{3}-\\d{3}-\\d{4}\\b',
      testString: 'Call me at 555-123-4567 or 123-456-7890',
      description: 'Phone number extraction'
    },
    {
      regex: '#[0-9A-Fa-f]{6}\\b',
      testString: 'Colors: #FF5733, #33FF57, #3357FF, invalid-#GG5533',
      description: 'Hex color codes'
    }
  ];

  const loadExample = (example) => {
    setRegex(example.regex);
    setTestString(example.testString);
    setFlags('g');
  };

  return (
    <section id="tester" className="tester-section section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Test Your Regex</h2>
          <p>Validate and test your regular expressions against sample text to ensure they work perfectly.</p>
        </motion.div>

        <div className="tester-container">
          <motion.div
            className="tester-input-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="regex-input-container">
              <label className="input-label">
                <Target size={16} />
                Regular Expression
              </label>
              <div className="regex-input-wrapper">
                <span className="regex-delimiter">/</span>
                <input
                  type="text"
                  className={`regex-input ${!isValid ? 'invalid' : ''}`}
                  placeholder="Enter your regex pattern..."
                  value={regex}
                  onChange={(e) => setRegex(e.target.value)}
                />
                <span className="regex-delimiter">/</span>
                <input
                  type="text"
                  className="flags-input"
                  placeholder="flags"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                />
              </div>
              {error && (
                <motion.div
                  className="validation-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <AlertTriangle size={16} />
                  {error}
                </motion.div>
              )}
            </div>

            <div className="test-string-container">
              <label className="input-label">
                <Hash size={16} />
                Test String
              </label>
              <textarea
                className="test-string-input"
                placeholder="Enter text to test against your regex..."
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                rows={6}
              />
            </div>

            <motion.button
              className="test-button btn btn-primary"
              onClick={handleTest}
              disabled={!regex || !isValid || !testString}
              whileHover={{ scale: !regex || !isValid || !testString ? 1 : 1.02 }}
              whileTap={{ scale: !regex || !isValid || !testString ? 1 : 0.98 }}
            >
              <Play size={20} />
              Test Regex
            </motion.button>

            <div className="examples-section">
              <h4>Try these examples:</h4>
              <div className="example-cards">
                {exampleTests.map((example, index) => (
                  <motion.div
                    key={index}
                    className="example-card"
                    onClick={() => loadExample(example)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h5>{example.description}</h5>
                    <code>{example.regex}</code>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="tester-output-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  className="test-results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="results-header">
                    <div className="match-status">
                      {result.isMatch ? (
                        <>
                          <CheckCircle className="status-icon success" size={20} />
                          <span className="status-text success">Match Found</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="status-icon error" size={20} />
                          <span className="status-text error">No Match</span>
                        </>
                      )}
                    </div>
                    <div className="match-count">
                      {result.matchCount} match{result.matchCount !== 1 ? 'es' : ''}
                    </div>
                  </div>

                  <div className="highlighted-text">
                    <h4>Highlighted Matches</h4>
                    <div 
                      className="text-preview"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatches(testString, result.matches)
                      }}
                    />
                  </div>

                  {result.matches && result.matches.length > 0 && (
                    <div className="matches-list">
                      <h4>Match Details</h4>
                      <div className="matches-container">
                        {result.matches.map((match, index) => (
                          <motion.div
                            key={index}
                            className="match-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="match-header">
                              <span className="match-index">#{index + 1}</span>
                              <span className="match-position">Position: {match.index}</span>
                            </div>
                            <div className="match-content">
                              <code>{match.match}</code>
                            </div>
                            {match.groups && match.groups.length > 0 && (
                              <div className="match-groups">
                                <span className="groups-label">Groups:</span>
                                {match.groups.map((group, groupIndex) => (
                                  <code key={groupIndex} className="group-item">
                                    {group || '(empty)'}
                                  </code>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {!result && (
                <motion.div
                  className="placeholder-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="placeholder-content">
                    <Target size={48} className="placeholder-icon" />
                    <h3>Ready to test</h3>
                    <p>Enter a regex pattern and test string above to see the results here.</p>
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

export default RegexTester;

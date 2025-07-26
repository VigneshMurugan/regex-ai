const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 AI requests per minute
  message: 'Too many AI requests, please try again later.'
});

app.use(limiter);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/generate-regex', aiLimiter, async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file.' 
      });
    }

    const prompt = `Convert this English description to a regular expression. Only return the regex pattern without delimiters or flags, and provide a brief explanation.

Description: "${description}"

Format your response as JSON:
{
  "regex": "the regex pattern",
  "explanation": "brief explanation of what the regex does",
  "flags": "suggested flags (g, i, m, etc.)"
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a regex expert. Convert English descriptions to accurate regular expressions. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.3,
    });

    const responseText = completion.choices[0].message.content.trim();
    
    try {
      const parsedResponse = JSON.parse(responseText);
      res.json(parsedResponse);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      res.json({
        regex: responseText,
        explanation: "Generated regex pattern",
        flags: "g"
      });
    }

  } catch (error) {
    console.error('Error generating regex:', error);
    res.status(500).json({ 
      error: 'Failed to generate regex. Please try again.',
      details: error.message 
    });
  }
});

app.post('/api/test-regex', (req, res) => {
  try {
    const { regex, testString, flags = 'g' } = req.body;

    if (!regex || testString === undefined) {
      return res.status(400).json({ error: 'Regex and test string are required' });
    }

    const regexObj = new RegExp(regex, flags);
    const matches = [...testString.matchAll(regexObj)];
    const isMatch = regexObj.test(testString);

    res.json({
      isMatch,
      matches: matches.map(match => ({
        match: match[0],
        index: match.index,
        groups: match.slice(1)
      })),
      matchCount: matches.length
    });

  } catch (error) {
    console.error('Error testing regex:', error);
    res.status(400).json({ 
      error: 'Invalid regular expression',
      details: error.message 
    });
  }
});

// Monetization endpoints
app.get('/api/usage/:userId', (req, res) => {
  // In a real app, this would check a database
  res.json({
    userId: req.params.userId,
    requestsToday: Math.floor(Math.random() * 50),
    requestsThisMonth: Math.floor(Math.random() * 500),
    plan: 'free', // free, pro, enterprise
    limit: 100
  });
});

app.post('/api/upgrade', (req, res) => {
  const { userId, plan } = req.body;
  // In a real app, this would integrate with Stripe or similar
  res.json({
    success: true,
    message: `Upgrade to ${plan} plan initiated`,
    redirectUrl: '/payment'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

# RegexAI - AI-Powered Regex Generator

Transform natural language descriptions into perfect regular expressions with the power of AI.

## 🚀 Features

- **AI-Powered Generation**: Convert English descriptions to regex patterns using OpenAI
- **Interactive Testing**: Test your regex patterns against sample text with real-time highlighting
- **Apple-Inspired UI**: Beautiful, animated interface with smooth transitions
- **Monetization Ready**: Built-in pricing tiers and subscription management
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Validation**: Instant feedback on regex syntax and matches

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express
- **OpenAI API** for AI-powered regex generation
- **CORS** for cross-origin requests
- **Rate limiting** for API protection
- **Helmet** for security

### Frontend
- **React** with functional components and hooks
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **React Syntax Highlighter** for code display
- **Axios** for API requests

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd regex-ai-generator
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run dev
   ```

2. **Start the frontend (in a new terminal)**
   ```bash
   npm run client
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Mode

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the server**
   ```bash
   npm start
   ```

## 🔧 API Endpoints

### POST /api/generate-regex
Generate a regex pattern from natural language description.

**Request Body:**
```json
{
  "description": "Match email addresses"
}
```

**Response:**
```json
{
  "regex": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
  "explanation": "Matches valid email addresses",
  "flags": "g"
}
```

### POST /api/test-regex
Test a regex pattern against a string.

**Request Body:**
```json
{
  "regex": "\\d+",
  "testString": "Hello 123 World 456",
  "flags": "g"
}
```

**Response:**
```json
{
  "isMatch": true,
  "matches": [
    {
      "match": "123",
      "index": 6,
      "groups": []
    },
    {
      "match": "456",
      "index": 16,
      "groups": []
    }
  ],
  "matchCount": 2
}
```

## 🎨 UI Components

- **Header**: Navigation with smooth animations
- **Hero**: Eye-catching landing section with floating particles
- **RegexGenerator**: AI-powered regex generation interface
- **RegexTester**: Interactive regex testing with syntax highlighting
- **PricingSection**: Monetization with subscription tiers
- **Footer**: Links and social media integration

## 💰 Monetization Features

- **Free Tier**: 10 generations per day
- **Pro Tier**: Unlimited generations + advanced features
- **Enterprise Tier**: Team collaboration + API access
- **Stripe Integration Ready**: Payment processing infrastructure

## 🔒 Security Features

- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet security headers
- Environment variable protection

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interactions
- Optimized performance on all devices

## 🎭 Animations

- Framer Motion for smooth transitions
- Apple-inspired micro-interactions
- Loading states and skeleton screens
- Hover effects and button animations

## 🚀 Deployment

The application is ready for deployment on platforms like:
- **Heroku**: Includes heroku-postbuild script
- **Vercel**: Frontend deployment ready
- **Netlify**: Static site generation support
- **DigitalOcean**: Docker containerization ready

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support, email hello@regexai.com or join our community Discord.

---

Made with ❤️ by the RegexAI Team

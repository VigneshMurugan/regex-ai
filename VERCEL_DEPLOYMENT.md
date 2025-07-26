# Vercel Deployment Guide for RegexAI

This guide will help you deploy the RegexAI application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **OpenAI API Key**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
3. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Connect Your Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Select the repository containing this RegexAI code

### 2. Configure Build Settings

Vercel should automatically detect this as a React application. The configuration is already set in `vercel.json`:

- **Build Command**: `cd client && npm run build`
- **Output Directory**: `client/build`
- **Install Command**: `npm install && cd client && npm install`

### 3. Set Environment Variables

In your Vercel project settings, add the following environment variable:

- **Key**: `OPENAI_API_KEY`
- **Value**: Your OpenAI API key (starts with `sk-...`)

### 4. Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be available at `https://your-project-name.vercel.app`

## Project Structure for Vercel

```
regex-ai-generator/
├── api/                    # Vercel serverless functions
│   ├── generate-regex.js   # AI regex generation endpoint
│   ├── test-regex.js       # Regex testing endpoint
│   └── health.js          # Health check endpoint
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── vercel.json            # Vercel configuration
└── package.json           # Root dependencies (OpenAI)
```

## API Endpoints

Once deployed, your API endpoints will be available at:

- `https://your-app.vercel.app/api/generate-regex` - Generate regex from description
- `https://your-app.vercel.app/api/test-regex` - Test regex against strings
- `https://your-app.vercel.app/api/health` - Health check

## Frontend Features

The React frontend includes:

- **AI-Powered Regex Generator**: Natural language to regex conversion
- **Interactive Regex Tester**: Test patterns with real-time highlighting
- **Apple-Inspired UI**: Smooth animations and modern design
- **Responsive Design**: Works on desktop and mobile
- **Pricing Section**: Monetization features ready

## Environment Variables

Make sure to set these in your Vercel project:

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS

## Monitoring and Analytics

Vercel provides built-in:
- **Analytics**: Page views and performance metrics
- **Functions**: Serverless function logs and metrics
- **Speed Insights**: Core Web Vitals monitoring

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all dependencies are installed
2. **API Errors**: Verify your OpenAI API key is set correctly
3. **404 Errors**: Ensure `vercel.json` rewrites are configured properly

### Checking Logs

1. Go to your Vercel project dashboard
2. Click on a deployment
3. View "Build Logs" or "Function Logs"

### Testing Locally

To test the Vercel setup locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Run locally
vercel dev
```

## Performance Optimization

The app is optimized for Vercel with:

- **Static Generation**: React build creates optimized static files
- **Serverless Functions**: API routes run on-demand
- **CDN**: Global content delivery network
- **Caching**: Automatic caching of static assets

## Security

- **CORS**: Configured for cross-origin requests
- **Rate Limiting**: Implemented in API functions
- **Environment Variables**: Secure storage of API keys
- **HTTPS**: Automatic SSL certificates

## Cost Considerations

- **Vercel Pro**: Required for commercial use
- **OpenAI API**: Pay per request to OpenAI
- **Function Execution**: Vercel charges for serverless function usage

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Visit [Vercel Community](https://github.com/vercel/vercel/discussions)
- Contact Vercel Support (Pro plan required)

---

**Ready to deploy?** Push your code to Git and import it to Vercel!

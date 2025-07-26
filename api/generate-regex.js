import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.' 
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
      res.status(200).json(parsedResponse);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      res.status(200).json({
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
}

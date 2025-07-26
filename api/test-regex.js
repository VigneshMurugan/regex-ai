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
    const { regex, testString, flags = 'g' } = req.body;

    if (!regex || testString === undefined) {
      return res.status(400).json({ error: 'Regex and test string are required' });
    }

    const regexObj = new RegExp(regex, flags);
    const matches = [...testString.matchAll(regexObj)];
    const isMatch = regexObj.test(testString);

    res.status(200).json({
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
}

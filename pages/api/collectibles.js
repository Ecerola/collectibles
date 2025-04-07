// /pages/api/collectibles.js

import fetch from 'node-fetch';

const handler = async (req, res) => {
  const { profile } = req.query;

  if (!profile) {
    return res.status(400).json({ error: 'Profile is required' });
  }

  try {
    // Fetch the profile data from Bell Tree Forums API
    const response = await fetch(`https://www.belltreeforums.com/members/${profile}/inventory`);
    const data = await response.text();
    
    // Process the response to extract item images (simplified)
    const items = []; // Parse the HTML or use an API to get the correct data.
    
    // Return the items as a response
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile data' });
  }
};

export default handler;

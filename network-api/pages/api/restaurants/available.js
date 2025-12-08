export default async function handler(req, res) {
  const { RESTAURANT_API_URL, RESTAURANT_API_KEY } = process.env;

  if (!RESTAURANT_API_URL || !RESTAURANT_API_KEY) {
    console.error('Restaurant API URL or Key is not configured in environment variables.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

  try {
    const externalApiResponse = await fetch(RESTAURANT_API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${RESTAURANT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!externalApiResponse.ok) {
      let errorMessage = 'Failed to fetch data from the restaurant service.';
      switch (externalApiResponse.status) {
        case 401:
          errorMessage = 'Authentication failed with the restaurant service. Invalid API key.';
          break;
        case 404:
          errorMessage = 'Restaurant service endpoint not found.';
          break;
        case 500:
        case 503:
          errorMessage = 'The restaurant service is currently unavailable.';
          break;
      }
      console.error(`External API error: ${externalApiResponse.status} ${externalApiResponse.statusText}`);
      // Use 502 Bad Gateway to indicate an issue with an upstream server
      return res.status(502).json({ message: errorMessage });
    }

    const data = await externalApiResponse.json();
    
    // Standardize the output format, assuming the external API returns an array of restaurants
    res.status(200).json({ restaurants: data || [] });

  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.error('Request to external restaurant API timed out.');
      return res.status(504).json({ message: 'The restaurant service took too long to respond.' });
    }
    console.error('Error fetching from external restaurant API:', error);
    res.status(500).json({ message: 'An internal server error occurred while contacting the restaurant service.' });
  }
}
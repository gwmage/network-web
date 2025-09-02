const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const vercelToken = process.env.VERCEL_AUTH_BYPASS_TOKEN;  // Retrieve Vercel token from environment variables
    if (!vercelToken) {
      throw new Error("VERCEL_AUTH_BYPASS_TOKEN not found in environment variables.");
    }

    const testedPaths = ['/', '/login', '/forgot-password'];
    const checkedUrl = process.env.VERCEL_URL || 'https://network-m8z0tid1h-van-ryus-projects.vercel.app/';

    for (const path of testedPaths) {
      const url = new URL(path, checkedUrl).toString();
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${vercelToken}` }, // Add token to headers 
      });

      if (!response.ok) {
        const body = await response.text();

        console.error(`Health check failed for ${url}. Status: ${response.status}, Body: ${body}`);
        return {
          statusCode: response.status,
          body: JSON.stringify({
            checkedUrl: url,
            errorMessage: `Request failed with status code ${response.status}`,
            statusCode: response.status,
            responseBody: body,
            testedPaths
          })
        };
      }

      console.log(`Health check successful for ${url}`);
    }

    return { statusCode: 200, body: JSON.stringify({ status: 'OK', testedPaths }) };
  } catch (error) {
    console.error('Error during health check:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

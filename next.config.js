module.exports = {
  output: 'standalone',
  experimental: {
    // Enable the experimental outputStandalone option
    // This allows bypassing the Vercel authentication check for preview deployments
    outputStandalone: true,
  },
};
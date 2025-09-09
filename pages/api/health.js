export default async function handler(req, res) {
  try {
    // Perform any necessary health checks here (e.g., database connection)
    // The following check is useful locally but can be simplified for Vercel deployments
    // where environment variables are guaranteed to be present if set in the project settings.
    // const environmentVariables = [
    //   "NEXT_PUBLIC_API_URL",
    //   "NEXT_PUBLIC_SOME_OTHER_KEY",
    // ];
    // const missingVariables = environmentVariables.filter((variable) => !process.env[variable]);

    // if (missingVariables.length > 0) {
    //   throw new Error(`Missing environment variables: ${missingVariables.join(', ')}`);
    // }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    // Respond with a 500 status code if unhealthy
    console.error("Health check failed:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
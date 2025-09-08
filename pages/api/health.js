export default async function handler(req, res) {
  try {
    // Perform any necessary health checks here (e.g., database connection)
    const environmentVariables = [
      "NEXT_PUBLIC_API_URL",
      "NEXT_PUBLIC_SOME_OTHER_KEY",
    ];
    const missingVariables = environmentVariables.filter((variable) => !process.env[variable]);

    if (missingVariables.length > 0) {
      throw new Error(`Missing environment variables: ${missingVariables.join(', ')}`);
    }

    // Simulate a short delay for demonstration purposes
    // In a real application, replace this with actual health checks
    // await new Promise(resolve => setTimeout(resolve, 500));

    // Respond with a 200 status code if healthy
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    // Respond with a 500 status code if unhealthy
    console.error("Health check failed:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
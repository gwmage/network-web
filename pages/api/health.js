export default async function handler(req, res) {
  try {
    // Perform any necessary health checks here (e.g., database connection)

    // Respond with a 200 status code if healthy
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    // Respond with a 500 status code if unhealthy
    console.error("Health check failed:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
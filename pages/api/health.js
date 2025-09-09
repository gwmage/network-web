export default async function handler(req, res) {
  try {
    // Perform any necessary health checks here (e.g., database connection)
    // In a production environment, you'd likely want to perform real checks here.
    // For this example, we'll keep it simple and return a 200 status immediately.

    console.log("Health check request received");

    const healthCheckResult = {
      status: 'ok',
      message: 'Health check successful',
      timestamp: new Date().toISOString()
    };

    console.log("Health check result:", healthCheckResult);
    res.status(200).json(healthCheckResult);
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
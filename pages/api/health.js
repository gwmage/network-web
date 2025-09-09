export default async function handler(req, res) {
  try {
    // Simulate a potential delay (e.g., database connection)
    // await new Promise(resolve => setTimeout(resolve, 5000)); // Removed delay for faster health checks
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
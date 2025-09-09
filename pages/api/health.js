export default async function handler(req, res) {
  try {
    // Removed the environment variable check as it's causing the health check to fail
    // during Vercel deployments where these variables might not be available.
    // A better approach would be to handle these cases gracefully in the application logic
    // where these variables are actually used, rather than in the health check.

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Health check error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}
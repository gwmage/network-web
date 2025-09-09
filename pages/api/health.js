export default async function handler(req, res) {
  try {
    console.log("Health check requested"); // Log to see if the route is hit
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Health check error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}
export default async function handler(req, res) {
  try {
    // Perform any necessary health checks here (e.g., database connection)

    // If all checks pass, return a 200 status code
    res.status(200).json({ status: "ok" });
  } catch (error) {
    // If any check fails, return a 500 status code
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
}
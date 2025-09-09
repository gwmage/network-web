export default async function handler(req, res) {
  try {
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
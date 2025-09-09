export default async function handler(req, res) {
  try {
    // Perform any necessary health checks here (e.g., database connection)
    // Example: Check database connection
    // const db = await connectToDatabase();
    // if (!db) {
    //   throw new Error('Database connection failed');
    // }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
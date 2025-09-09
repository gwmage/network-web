export default async function handler(req, res) {
  try {
    // Simulate a database or service check that could potentially fail
    // await new Promise(resolve => setTimeout(resolve, 500)); // Simulate a 500ms delay for testing

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({ status: 'error', message: 'Health check failed' });
  }
}
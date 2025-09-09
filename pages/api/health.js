export default async function handler(req, res) {
  try {
    // Simulate a database or external service check
    // await new Promise(resolve => setTimeout(resolve, 50)); // Simulate a short delay (optional)

    // Check for environment variables. If any are missing, return an error
    const requiredEnvVars = [
      "NEXT_PUBLIC_API_URL",
      "NEXT_PUBLIC_SOME_OTHER_KEY"
    ];
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    if (missingEnvVars.length > 0) {
      console.error("Missing environment variables:", missingEnvVars.join(', '));
      return res.status(500).json({ message: "Missing required environment variables" });
    }

    // Log environment variables for debugging during build
    console.log("Environment Variables:", {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_SOME_OTHER_KEY: process.env.NEXT_PUBLIC_SOME_OTHER_KEY
    });

    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Health check error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}
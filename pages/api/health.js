export default function handler(req, res) {
  console.log('Health check request:', req.method, req.url);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  console.log('Environment variables:', process.env);  

  res.status(200).json({ status: 'ok' });
}

# Network API

This is the backend API for the Network application, built with Next.js API routes.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file.

### Database
- `MONGODB_URI`: Your MongoDB connection string.

### Restaurant API Integration
- `RESTAURANT_API_URL`: The base URL for the external restaurant reservation API.
- `RESTAURANT_API_KEY`: The API key required to authenticate with the restaurant reservation service.

Example `.env.local` file:
```
MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
RESTAURANT_API_URL="https://api.example-restaurant.com/v1/restaurants/available"
RESTAURANT_API_KEY="your-secret-api-key"
```
# API Documentation

This document provides details on the available API endpoints for the Network application.

## Posts

### `GET /api/posts/list`

Fetches a paginated list of community posts.

**Query Parameters:**
- `page` (optional, number, default: 1): The page number to retrieve.
- `limit` (optional, number, default: 10): The number of posts per page.
- `category` (optional, string): Filter posts by a specific category.
- `tags` (optional, string): A comma-separated list of tags to filter by.

**Success Response (200 OK):**
```json
{
  "posts": [
    {
      "_id": "60d...e9d",
      "title": "My First Post",
      "content": "This is the content.",
      "category": "General",
      "tags": ["welcome", "discussion"]
    }
  ],
  "currentPage": 1,
  "totalPages": 5,
  "totalPosts": 50
}
```

## Restaurants

### `GET /api/restaurants/available`

Retrieves a list of currently available restaurants from the external reservation service.

**Description:**
This endpoint acts as a proxy to an external restaurant reservation API. It securely handles authentication and standardizes the response and error messages.

**Success Response (200 OK):**
The response is a JSON object containing a list of available restaurants.

*Example Payload:*
```json
{
  "restaurants": [
    {
      "id": "rest_123",
      "name": "The Gourmet Place",
      "cuisine": "Italian",
      "availability": "high"
    },
    {
      "id": "rest_456",
      "name": "Quick Bites",
      "cuisine": "Fast Food",
      "availability": "medium"
    }
  ]
}
```

**Error Responses:**

- **500 Internal Server Error:** Indicates a server-side problem, such as missing environment variables or an unexpected error while processing the request.
  ```json
  {
    "message": "Server configuration error."
  }
  ```

- **502 Bad Gateway:** The external restaurant service is either down or returned an error (e.g., invalid API key, server error).
  ```json
  {
    "message": "The restaurant service is currently unavailable."
  }
  ```

- **504 Gateway Timeout:** The request to the external restaurant service timed out.
  ```json
  {
    "message": "The restaurant service took too long to respond."
  }
  ```
---[END_OF_FILES]---
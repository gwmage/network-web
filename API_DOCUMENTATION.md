# API Documentation

This document provides details on the authentication API endpoints, including user signup and social authentication flows.

## Environment Variables

The following environment variables must be set in your `.env.local` file for the API to function correctly.

```
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

# Nodemailer (for sending welcome emails)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
EMAIL_FROM="Your App Name" <noreply@example.com>

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Kakao OAuth
KAKAO_CLIENT_ID=your_kakao_rest_api_key
KAKAO_CALLBACK_URL=http://localhost:3000/api/auth/kakao/callback
```

---

## Authentication Endpoints

### 1. User Signup

- **Endpoint:** `POST /api/auth/signup`
- **Description:** Registers a new user with their email, password, name, and contact number.
- **Content-Type:** `application/json`

#### Request Body

| Field     | Type   | Description                                                                                             | Required |
| :-------- | :----- | :------------------------------------------------------------------------------------------------------ | :------- |
| `email`   | String | The user's email address. Must be unique.                                                               | Yes      |
| `password`| String | The user's password. Must be at least 8 characters long and contain letters, numbers, and special characters. | Yes      |
| `name`    | String | The user's full name.                                                                                   | Yes      |
| `contact` | String | The user's contact phone number.                                                                        | Yes      |

#### Responses

- **`201 Created`**: User was successfully created.
  ```json
  {
    "message": "User registered successfully",
    "userId": "60c72b2f9b1d8e001f8e4c5f"
  }
  ```
- **`400 Bad Request`**: Input validation failed.
  ```json
  {
    "message": "Invalid input: <error details>"
  }
  ```
- **`409 Conflict`**: An account with the provided email already exists.
  ```json
  {
    "message": "Email already in use"
  }
  ```
- **`500 Internal Server Error`**: An unexpected server error occurred.
  ```json
  {
    "message": "Internal server error"
  }
  ```

---

### 2. Social Authentication

#### Google Signup/Login

- **Initiation Endpoint:** `GET /api/auth/google`
- **Description:** Initiates the Google OAuth2 flow. Redirects the user to Google's authentication screen.

- **Callback Endpoint:** `GET /api/auth/google/callback`
- **Description:** Handles the callback from Google after the user grants permission. It creates a new user if one doesn't exist or logs in an existing user. On success, it redirects the user to the application's home page (`/`).

#### Kakao Signup/Login

- **Initiation Endpoint:** `GET /api/auth/kakao`
- **Description:** Initiates the Kakao OAuth2 flow. Redirects the user to Kakao's authentication screen.

- **Callback Endpoint:** `GET /api/auth/kakao/callback`
- **Description:** Handles the callback from Kakao. It creates a new user if one doesn't exist or logs in an existing user. On success, it redirects the user to the application's home page (`/`).
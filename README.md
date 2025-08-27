```markdown
# 네트워킹2

This repository is for the '네트워킹2' project, managed through Eposo.

## Getting Started

To run this application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your environment variables.  See `.env.example` for guidance. This will include database connection details, any API keys, and other sensitive information.  For development, you can use a local development database.

4. **Run the database migrations:**
   ```bash
   npm run typeorm migration:run
   ```
   This creates the necessary tables in your database based on the defined entities.

5. **Start the development server:**
   ```bash
   npm run start:dev
   ```

## API Documentation
The API documentation is available at `http://localhost:3000/api`.  You can use tools like Swagger or Postman to interact with the API.


## User Registration
You can register a new user by sending a POST request to the `/auth/register` endpoint with the following parameters:

* `email`: The user's email address (required, unique, valid format).
* `password`: The user's password (required, minimum 8 characters, at least one uppercase, one lowercase, and one number).
* `firstName`: The user's first name (optional).
* `lastName`: The user's last name (optional).

## Notification Settings

Users can configure their notification preferences through the following API endpoints:

* **GET /notifications/preferences:** Retrieves the current notification preferences for the logged-in user.
* **POST /notifications/preferences:** Updates the notification preferences for the logged-in user.  The request body should be in JSON format:
    ```json
    {
      "push": true,  // Whether to receive push notifications
      "email": false // Whether to receive email notifications
    }
    ```

* **GET /notifications:** Retrieves all notifications for the logged-in user.

## Reservation Cancellation

Users can cancel their reservations through the following API endpoint:

* **DELETE /reservations/:id:** Cancels the reservation with the specified ID.  Requires authentication.  A 400 error will be returned if cancellation is attempted within the cancellation window (defined by `CANCELLATION_WINDOW_HOURS` environment variable, defaults to 24 hours).



## Key Features:

* **User Registration:** Allows users to create new accounts with email, password, first name, and last name. Input validation is performed to ensure data integrity, including email format, password complexity, and uniqueness checks.  A confirmation email is sent upon successful registration.
* **Notification Settings:** Allows users to customize their notification preferences for various events, such as receiving match results and reservation updates via push notifications or email.
* **Reservation Cancellation:** Allows users to cancel existing reservations, subject to time restrictions.  A cancellation reason can optionally be provided.
* **(Other features can be listed here as they are developed)**


## Contributing
Contributions are welcome! Please create a pull request with a clear description of your changes.
```

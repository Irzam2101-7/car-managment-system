Project Features:

Random Password Generation: Generates a random password for new users during registration.
Password Delivery: Sends the randomly generated password via email to the user for login.
Email Service: Helper function to send emails using a reliable service (e.g., Nodemailer).
Authentication System: Handles registration and login with hashed passwords, ensuring secure storage.
JWT Authentication: Implements JWT tokens for session management after successful login.
Category Management: Create, Read, Update, Delete (CRUD) operations for car categories (e.g., SUV, Sedan).
Car Management: Create, Read, Update, Delete (CRUD) operations for car details (color, model, make, registration number, etc.).
Data Validation: Validates incoming data to ensure correct and secure input.
Standardized Responses: Implements a uniform structure for API responses with proper HTTP status codes.
Error Handling: Implements comprehensive error handling for various potential issues.

Software Requirements:

Node.js: v8 or higher (recommended v14+)
MongoDB: v3.6 or higher (recommended v4+)

## Environment Variables

- `JWT_SECRET`: Secret key used to sign JWT tokens.
- `SALT_ROUNDS`: Number of salt rounds for hashing passwords (default is 10).
- `MONGO_URI`: MongoDB connection string.
- `EMAIL_USER`: Your email service username.
- `EMAIL_PASS`: Your email service password.


## Dependencies

- `express`: Web framework for Node.js.
- `mongoose`: MongoDB ORM for Node.js.
- `bcrypt`: Password hashing.
- `jsonwebtoken`: For JWT authentication.
- `nodemailer`: For sending emails.


## Deployment

To deploy this project, follow the steps:
1. Set up environment variables.
2. Run `npm install` to install dependencies.
3. Run `npm run build` to build.
4. Run `npm start` to start the server.

#Two-Way Email Verification System
A secure email-based two-way authorization system built with Express.js and NodeMailer, designed for integration with Python projects like Git_Repo_Scanner. It sends a 6-digit verification code via email, allowing up to 5 attempts within a 1-minute expiration period, returning True or False based on verification success.
Features

Email Verification: Generates and sends a 6-digit code using NodeMailer (Gmail SMTP).
Security: Enforces 1-minute code expiration and 5-attempt limit to prevent unauthorized access.
Python Client: Includes auth_client.py for seamless integration with Python applications.
Testing: Provides main.py to test code sending, verification, expiration, and attempt limits.
GitHub-Ready: Uses .env for sensitive credentials and .gitignore to exclude package-lock.json, .env, and node_modules.

##Tech Stack

Backend: Node.js, Express.js, NodeMailer, dotenv
Client: Python with requests library
Environment: Managed via .env for secure configuration

##Project Structure
two-way-veri/
├── server.js           # Express.js API
├── .env.example        # Sample environment variables
├── .gitignore          # Excludes sensitive files
├── package.json        # Node.js dependencies
├── python/
│   ├── auth_client.py  # Python client for authentication
│   └── main.py         # Test script for API
├── README.md           # Project documentation

##Setup Instructions
Prerequisites

Node.js (v16 or later) and npm
Python 3.8 or later
A Gmail account with an app-specific password

Backend (Node.js API)

Clone the repository:git clone https://github.com/your-username/two-way-veri.git
cd two-way-veri


Install Node.js dependencies:npm install


Create a .env file from .env.example:cp .env.example .env

Edit .env with your Gmail credentials:EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password


Start the API:node server.js

The API runs at http://localhost:3000.

Python Client

Install Python dependencies:pip install requests


Run the authentication client:python python/auth_client.py


Enter an email address.
Enter the verification code (up to 5 attempts for the same code).


Integrate with your Python project (e.g., Git_Repo_Scanner):from python.auth_client import authenticate_with_retries
if authenticate_with_retries("your-email@example.com"):
    print("Access granted")
else:
    print("Access denied")



Testing
Run the test script to verify API functionality:
python python/main.py


Enter a test email.
Follow prompts to test code sending, verification, expiration, and attempt limits.

API Endpoints

POST /auth/request:
Request: {"email": "user@example.com"}
Response: {"message": "Verification code sent"}


POST /auth/verify:
Request: {"email": "user@example.com", "code": "123456"}
Response: {"success": true} or {"success": false}



Security Notes

Sensitive Data: Store credentials in .env (excluded by .gitignore).
Production:
Use HTTPS (e.g., deploy via Vercel or AWS).
Replace in-memory storage with Redis or a database.


Gmail: Ensure your app-specific password is secure and not committed.
Rate-Limiting: Consider adding express-rate-limit for production.

Contributing

Fork the repository.
Create a feature branch: git checkout -b feature/your-feature.
Commit changes: git commit -m "Add your feature".
Push to the branch: git push origin feature/your-feature.
Open a pull request.

Report issues via GitHub Issues.
###License
MIT License (see LICENSE)

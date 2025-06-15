# Two-Way Email Verification System

A secure email-based two-way authorization system built with **Express.js** and **NodeMailer**, designed for integration with Python projects like `Git_Repo_Scanner`. It sends a 6-digit verification code via email, allowing up to **5 attempts within a 1-minute expiration period**, returning `True` or `False` based on verification success.

> 🔗 **GitHub Repository:** [Two-Way Email Verification System](https://github.com/Rahul-Raval-2912/2FA)

---

## Features

- **Email Verification:** Generates and sends a 6-digit code using NodeMailer (Gmail SMTP).
- **Security:** Enforces 1-minute code expiration and 5-attempt limit to prevent unauthorized access.
- **Python Client:** Includes `auth_client.py` for seamless integration with Python applications.
- **Testing:** Provides `main.py` to test code sending, verification, expiration, and attempt limits.
- **GitHub-Ready:** Uses `.env` for sensitive credentials and `.gitignore` to exclude unnecessary files.

---

## Tech Stack

- **Backend:** Node.js, Express.js, NodeMailer, dotenv
- **Client:** Python with `requests` library
- **Environment:** Managed via `.env` for secure configuration

---

## Project Structure

```bash
two-way-veri/
├── server.js           
├── .env.example        
├── .gitignore                 
├── auth_client.py           
├── README.md           
```
## Installation
### Backend
Clone the repo:
git clone https://github.com/Rahul-Raval-2912/2FA.git
cd 2FA
npm install
cp .env.example .env
(Edit .env with your credentials)
node server.js

### python client
pip install requests
python python/auth_client.py

### Usage
from python.auth_client import authenticate_with_retries

if authenticate_with_retries("your-email@example.com"):
    print("Access granted")
else:
    print("Access denied")
## APi Endpoint
### POST/auth/request
{ "email": "user@example.com" }
###POST/auth/verify
{ "email": "user@example.com", "code": "123456" }

### Security
Store credentials in .env (never commit to GitHub).
Use Gmail app-specific password.
Add rate-limiting for brute force protection.

```
```
git clone https://github.com/Rahul-Raval-2912/2FA.git
cd 2FA
npm install




===============================
```markdown
```
# Security Policy

## Supported Versions

| Version | Supported          |
|---------|---------------------|
| 1.0.0   | Fully Supported |

## Reporting a Vulnerability

If you find any security issue:

- Please open a GitHub Issue, or
- Contact me directly via email.

## Security Guidelines

- Do not hard-code credentials.
- Use `.env` to store secrets.
- Use HTTPS in production.
- Enable Gmail two-factor authentication.
- Use Redis/Database for token storage.
- Use rate-limiting to protect against brute force attacks.


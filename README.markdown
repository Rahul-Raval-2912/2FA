# Two-Way Email Verification System

![Project Status](https://img.shields.io/badge/status-active-brightgreen.svg)

A secure email-based two-way authorization system built with **Express.js** and **NodeMailer**, designed for integration with Python projects like `Git_Repo_Scanner`. It sends a 6-digit verification code via email, allowing up to **5 attempts within a 1-minute expiration period**, returning `True` or `False` based on verification success.

> 🔗 **GitHub Repository:** [Two-Way Email Verification System](https://github.com/Rahul-Raval-2912/2FA)

**Last Updated:** 01:56 PM IST on Sunday, June 15, 2025

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Security Policy](#security-policy)
- [Contributing](#contributing)
- [License](#license)

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
├── main.py
├── LICENSE
├── README.md           
```

---

## Prerequisites

- **Node.js** (v14+), **npm**
- **Python** (v3.6+), **pip**
- Gmail account with app-specific password

---

## Installation

### Backend

- Clone the repo:

  ```bash
  git clone https://github.com/Rahul-Raval-2912/2FA.git
  ```
- Navigate to the directory:

  ```bash
  cd 2FA
  ```
- Install dependencies:

  ```bash
  npm install
  ```
- Copy the `.env` file:

  ```bash
  cp .env.example .env
  ```

  Edit `.env` with your credentials (e.g., `GMAIL_USER`, `GMAIL_PASS`).
- Start server:

  ```bash
  node server.js
  ```

### Python Client

- Install dependencies:

  ```bash
  pip install requests
  ```
- Run client:

  ```bash
  cd python
  python auth_client.py
  ```

---

## Usage

```python
from auth_client import authenticate_with_retries

if authenticate_with_retries("your-email@example.com"):
    print("Access granted")
else:
    print("Access denied")
```

Test with `main.py`:

```bash
python main.py
```

---

## API Endpoints

### `POST /auth/request`

```json
{ "email": "user@example.com" }
```

### `POST /auth/verify`

```json
{ "email": "user@example.com", "code": "123456" }
```

---

## Security

- Store credentials in `.env` (never commit to GitHub).
- Use Gmail app-specific password.
- Add rate-limiting for brute force protection.

---

## Security Policy

### Supported Versions

| Version | Supported        |
|---------|------------------|
| 1.0.0   | Fully Supported  |

### Reporting a Vulnerability

- Open a GitHub Issue, or
- Contact via email.

### Security Guidelines

- Do not hard-code credentials.
- Use `.env` for secrets.
- Use HTTPS in production.
- Enable Gmail 2FA.
- Use Redis/Database for token storage.
- Add rate-limiting.

---

## Contributing

- Fork the repo.
- Create a branch (`git checkout -b feature/your-feature`).
- Commit changes (`git commit -m "Add feature"`).
- Push branch (`git push origin feature/your-feature`).
- Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.markdown) file for details.

---

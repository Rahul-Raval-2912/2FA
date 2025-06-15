# Two-Way Email Verification System

A secure email-based two-way authorization system built with **Express.js** and **NodeMailer**, designed for integration with Python projects like `Git_Repo_Scanner`. It sends a 6-digit verification code via email, allowing up to **5 attempts within a 1-minute expiration period**, returning `True` or `False` based on verification success.

🔗 **GitHub Repository:** [Two-Way Email Verification System](https://github.com/Rahul-Raval-2912/2FA)

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
- [Author](#author)

---

## Features

- Email Verification via NodeMailer (Gmail SMTP).
- 6-digit code generation with 1-minute expiration and 5-attempt limit.
- Python client support (`auth_client.py`) for easy integration.
- Test support via `main.py`.
- Secure configuration via `.env`.
- GitHub-ready `.gitignore` and clean repo management.

---

## Tech Stack

- Backend: Node.js, Express.js, NodeMailer, dotenv
- Client: Python with `requests` library
- Environment: Managed via `.env`

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
---



##  **PREREQUISITES**

- Node.js (v14+), npm
- Python (v3.6+), pip
- Gmail account with app-specific password

## Installation

### Backend

```bash
git clone https://github.com/Rahul-Raval-2912/2FA.git
cd 2FA
npm install
cp .env.example .env (edit as example.env)

```
 ### Python Client
 
```cmd
- pip install requests
- cd python
- python auth_client.py
```


## Usage

Example Python integration:

```python
from auth_client import authenticate_with_retries

if authenticate_with_retries("your-email@example.com"):
    print("Access granted")
else:
    print("Access denied")
```



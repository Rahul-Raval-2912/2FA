import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

def create_session():

    session = requests.Session()
    retries = Retry(total=3, backoff_factor=1, status_forcelist=[500, 502, 503, 504])
    session.mount('http://', HTTPAdapter(max_retries=retries))
    return session

def request_code(email, api_url="http://localhost:3000"):

    session = create_session()
    try:
        response = session.post(f"{api_url}/auth/request", json={"email": email}, timeout=10)
        if response.status_code == 200:
            print(f"Verification code sent to {email}")
            return True
        else:
            print(f"Error requesting code: {response.status_code} - {response.json().get('error', 'Unknown error')}")
            return False
    except requests.RequestException as e:
        print(f"Error connecting to API: {e}")
        return False

def authenticate(email, code, api_url="http://localhost:3000"):

    if not email or not code:
        print("Email and code are required")
        return False

    session = create_session()
    try:
        response = session.post(f"{api_url}/auth/verify", json={"email": email, "code": code}, timeout=10)
        if response.status_code == 200:
            success = response.json().get("success", False)
            if not success:
                print("Verification failed: Invalid code")
            return success
        else:
            print(f"Verification failed: {response.status_code} - {response.json().get('error', 'Unknown error')}")
            return False
    except requests.RequestException as e:
        print(f"Error connecting to API: {e}")
        return False

def authenticate_with_retries(email, max_attempts=5, api_url="http://localhost:3000"):
    
    if not request_code(email, api_url):
        return False

    # Allow up to max_attempts to enter the correct code
    for attempt in range(1, max_attempts + 1):
        print(f"Attempt {attempt} of {max_attempts}")
        code = input("Enter the verification code sent to your email: ")
        if authenticate(email, code, api_url):
            return True
        if attempt < max_attempts:
            print("Try again.")

    print("Maximum attempts exceeded or code expired")
    return False

if __name__ == "__main__":
    test_email = input("Enter email address: ")
    result = authenticate_with_retries(test_email)
    print("Authentication successful" if result else "Authentication failed")
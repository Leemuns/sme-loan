import re

import jwt
from jwt.exceptions import InvalidTokenError
from datetime import datetime, timedelta
from pwdlib import PasswordHash
from dotenv import load_dotenv
import os


load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))


password_hash = PasswordHash.recommended()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return password_hash.hash(password)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> (str | None):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get("sub")
        if id is None:
            return None
        return id 
    except InvalidTokenError as err:
        return None

pattern = re.compile(r'(?<!^)(?=[A-Z])')
def camel_to_snake(text: str) -> (str):
    return pattern.sub('_', text).lower()

def snake_to_camel(text: str) -> (str):
    parts = text.split('_')
    return parts[0].lower() + ''.join(word.capitalize() for word in parts[1:])
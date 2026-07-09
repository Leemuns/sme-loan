from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    username: str
    fullname: str
    email: EmailStr


class UserCreate(UserBase):
    password: str
    pass


class User(UserBase):
    id: int
    password_hash: str

    class config: 
        from_attribute = True
        

class Token(BaseModel):
    access_token: str
    token_type: str
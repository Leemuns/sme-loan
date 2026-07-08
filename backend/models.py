from database import Base
from sqlalchemy import Column, Integer, String


class User(Base):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    fullname = Column(String)
    password_hash = Column(String)
    email = Column(String, unique=True, index=True)
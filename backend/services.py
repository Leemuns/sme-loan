from sqlalchemy import or_
from sqlalchemy.orm import Session
from typing import List

import auth
from models import User
from schemas import UserCreate


def get_users(db: Session) -> List[User]:
    return db.query(User).all()


def get_user(db: Session, user_id: int) -> (User | None):
    return db.query(User).filter(User.id==user_id).first()


def create_user(db: Session, user: UserCreate) -> (User | None):
    db_user = db.query(User).filter(or_(
        User.username == user.username,
        User.email == user.email
    )).first()

    if db_user:
        return None
    
    user_data = user.model_dump(exclude={'password'})
    user_data['password_hash'] = auth.get_password_hash(user.password)
    new_user = User(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

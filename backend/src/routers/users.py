from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas, services
from ..database import get_db
from ..dependencies import get_current_user


router = APIRouter(
    prefix="/users",
    responses={404: {"description": "Not found"}},
)


# @router.get("", response_model=list[schemas.User])
# def get_all_users(db: Session = Depends(get_db)):
#     return services.get_users(db)


# @app.get("api/users/{id}", response_model=schemas.User)
# def get_user_by_id(id: int, db: Session = Depends(get_db)):
#     db_user = services.get_user(db, id)
#     if not db_user:
#         raise HTTPException(status_code=404, detail="Invalid user id provided")
    
#     return db_user


@router.post("", response_model=schemas.User)
def create_new_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_db_user = services.create_user(db, user)
    if not new_db_user:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    
    return new_db_user


@router.get("/me", response_model=schemas.UserBase)
async def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user
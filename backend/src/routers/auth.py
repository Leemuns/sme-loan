from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import models, schemas, utils
from ..database import get_db


router = APIRouter(
    prefix="/auth",
    responses={404: {"description": "Not found"}},
)


@router.post("/login", response_model=schemas.Token)
def login_for_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not utils.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = utils.create_access_token({"sub": str(user.id)})
    # secure=True
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        samesite="strict",
        max_age=3600,
        path="/")
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/logout", response_model=schemas.Token)
def logout_for_clearing_cookie(response: Response):
    response.set_cookie(
        key="access_token",
        value="",
        httponly=True,
        samesite="strict",
        max_age=0,
        path="/"
    )
    return {"access_token": "", "token_type": "bearer"}

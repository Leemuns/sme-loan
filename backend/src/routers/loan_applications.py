from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import schemas, services, models
from ..database import get_db
from ..dependencies import get_current_user


router = APIRouter(
    prefix="/loans",
    responses={404: {"description": "Not found"}},
)


# @router.get("", response_model=list[schemas.LoanApplication])
# def get_all_loan_applications(db: Session = Depends(get_db)):
#     return services.get_loan_applications(db)


@router.get("", response_model=list[schemas.LoanApplication])
def get_all_loan_applications_for_current_user(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return services.get_loan_applications_by_user(db, current_user)


# add auth
@router.post("", response_model=schemas.LoanApplication)
def create_new_loan_application(loan_application: schemas.LoanApplicationCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_loan_application = services.create_loan_application(db, loan_application, current_user)
    if not new_loan_application:
        raise HTTPException(status_code=400, detail="Malformed data")
    
    return new_loan_application

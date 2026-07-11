from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import schemas, services
from ..database import get_db


router = APIRouter(
    prefix="/loans",
    responses={404: {"description": "Not found"}},
)


@router.get("", response_model=list[schemas.LoanApplication])
def get_all_loan_applications(db: Session = Depends(get_db)):
    test = services.get_loan_applications(db)
    return test


# add auth
@router.post("", response_model=schemas.LoanApplication)
def create_new_loan_application(user: schemas.LoanApplicationCreate, db: Session = Depends(get_db)):
    new_loan_application = services.create_loan_application(db, user)
    if not new_loan_application:
        raise HTTPException(status_code=400, detail="Malformed data")
    
    return new_loan_application

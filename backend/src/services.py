from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload, selectinload
from typing import List

from . import utils, schemas
from .models import User, LoanApplication, BankName, BusinessStructure, Language, LoanLanguage
from .schemas import UserCreate, LoanApplicationCreate


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
    
    user_data = user.model_dump(exclude={"password"})
    user_data['password_hash'] = utils.get_password_hash(user.password)
    new_user = User(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_loan_applications(db: Session) -> List[schemas.LoanApplication]:
    db_loan_applications = db.query(LoanApplication)\
        .options(
            joinedload(LoanApplication.business_structure),
            joinedload(LoanApplication.bank_name),
            selectinload(LoanApplication.loan_languages).selectinload(LoanLanguage.language)
        )\
        .all()

    loanApplications = []
    for loan_application in db_loan_applications:
        loan_application_dict = {utils.snake_to_camel(k): v for k, v in loan_application.__dict__.items()}
        loan_application_dict["businessStructure"] = loan_application.business_structure.business_structure
        loan_application_dict["bankName"] = loan_application.bank_name.bank_name
        loan_application_dict["status"] = loan_application.status.status
        loan_application_dict["contactLanguagePreferences"] = []
        for language in loan_application.loan_languages:
            loan_application_dict["contactLanguagePreferences"].append(language.language.language)

        loanApplications.append(schemas.LoanApplication(**loan_application_dict))

    return loanApplications
    
    # return [ schemas.LoanApplication(**{utils.snake_to_camel(k): v for k, v in loan_application.__dict__.items()}) for loan_application in db_loan_applications]


def create_loan_application(db: Session, loanApplication: LoanApplicationCreate) -> (schemas.LoanApplication | None):
    businessStructure = db.query(BusinessStructure).filter_by(business_structure=loanApplication.businessStructure).first()
    if not businessStructure:
        return None
    
    bankName = db.query(BankName).filter_by(bank_name=loanApplication.bankName).first()
    if not bankName:
        return None

    loan_application_dict = loanApplication.model_dump()

    loan_application_data = {utils.camel_to_snake(k): v for k, v in loan_application_dict.items()}
    loan_application_data["business_commencement_date"] = loanApplication.businessCommencementDate.date()
    del loan_application_data["business_structure"]
    loan_application_data["business_structure_id"] = businessStructure.id
    del loan_application_data["contact_language_preferences"]
    del loan_application_data["bank_name"]
    loan_application_data["bank_name_id"] = bankName.id
    
    new_loan_application = LoanApplication(**loan_application_data)
    db.add(new_loan_application)
    db.flush()

    for languagePreference in loanApplication.contactLanguagePreferences:
        language = db.query(Language).filter_by(language=languagePreference).first()
        new_loan_language = LoanLanguage(loan_id=new_loan_application.id, language_id=language.id)
        db.add(new_loan_language)

    db.commit()
    db.refresh(new_loan_application)

    # there's gotta be a better way
    # loanApplicationDict = {utils.snake_to_camel(k): v for k, v in new_loan_application.__dict__.items()}
    # loanApplicationDict["businessStructure"] = new_loan_application.business_structure
    # loanApplicationDict["contactLanguagePreferences"] = loanApplication["contactLanguagePreferences"]
    # loanApplicationDict["bankName"] = new_loan_application.bank_name

    loan_application_dict["id"] = new_loan_application.id
    loan_application_dict["status"] = "Submitted"
    return schemas.LoanApplication(**loan_application_dict)
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload, selectinload
from typing import List

from . import utils, schemas
from .models import User, LoanApplication, BankName, BusinessStructure, Language, LoanLanguage


# users


def get_users(db: Session) -> List[User]:
    return db.query(User).all()


def get_user(db: Session, user_id: int) -> (User | None):
    return db.query(User).filter(User.id==user_id).first()


def create_user(db: Session, user: schemas.UserCreate) -> (User | None):
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


# loan applications


# def get_loan_applications(db: Session) -> List[schemas.LoanApplication]:
#     db_loan_applications = db.query(LoanApplication)\
#         .options(
#             joinedload(LoanApplication.business_structure),
#             joinedload(LoanApplication.bank_name),
#             selectinload(LoanApplication.loan_languages).selectinload(LoanLanguage.language)
#         )\
#         .all()

#     loanApplications = []
#     for loan_application_object in db_loan_applications:
#         loan_application_dict = {utils.snake_to_camel(k): v for k, v in loan_application_object.__dict__.items()}
#         loan_application_dict["businessStructure"] = loan_application_object.business_structure.business_structure
#         loan_application_dict["bankName"] = loan_application_object.bank_name.bank_name
#         loan_application_dict["status"] = loan_application_object.status.status
#         loan_application_dict["contactLanguagePreferences"] = []
#         for language in loan_application_object.loan_languages:
#             loan_application_dict["contactLanguagePreferences"].append(language.language.language)

#         loanApplications.append(schemas.LoanApplication(**loan_application_dict))

#     return loanApplications


def get_loan_application(db: Session, loan_id: str, user: User) -> schemas.LoanApplication:
    db_loan_application = db.query(LoanApplication)\
        .options(
            joinedload(LoanApplication.business_structure),
            joinedload(LoanApplication.bank_name),
            selectinload(LoanApplication.loan_languages).selectinload(LoanLanguage.language)
        )\
        .filter(LoanApplication.id==loan_id)\
        .first()
    
    if not db_loan_application:
        return None
    
    if db_loan_application.user_id != user.id:
        return None

    loan_application_dict = {utils.snake_to_camel(k): v for k, v in db_loan_application.__dict__.items()}
    loan_application_dict["businessStructure"] = db_loan_application.business_structure.business_structure
    loan_application_dict["bankName"] = db_loan_application.bank_name.bank_name
    loan_application_dict["status"] = db_loan_application.status.status
    loan_application_dict["contactLanguagePreferences"] = []
    for language in db_loan_application.loan_languages:
        loan_application_dict["contactLanguagePreferences"].append(language.language.language)

    return schemas.LoanApplication(**loan_application_dict)


def get_loan_applications_by_user(db: Session, user: User) -> List[schemas.LoanApplication]:
    db_loan_applications = db.query(LoanApplication)\
        .options(
            joinedload(LoanApplication.business_structure),
            joinedload(LoanApplication.bank_name),
            selectinload(LoanApplication.loan_languages).selectinload(LoanLanguage.language)
        )\
        .filter(LoanApplication.user_id==user.id)\
        .all()
    
    if not db_loan_applications:
        return None

    loanApplications = []
    for loan_application_object in db_loan_applications:
        loan_application_dict = {utils.snake_to_camel(k): v for k, v in loan_application_object.__dict__.items()}
        loan_application_dict["status"] = loan_application_object.status.status
        loanApplications.append(schemas.LoanApplicationMinimal(**loan_application_dict))

    return loanApplications


def create_loan_application(db: Session, loan_application: schemas.LoanApplicationCreate, current_user: User) -> (schemas.LoanApplication | None):
    businessStructure = db.query(BusinessStructure).filter_by(business_structure=loan_application.businessStructure).first()
    if not businessStructure:
        return None
    
    bankName = db.query(BankName).filter_by(bank_name=loan_application.bankName).first()
    if not bankName:
        return None

    loan_application_dict = loan_application.model_dump()

    loan_application_data = {utils.camel_to_snake(k): v for k, v in loan_application_dict.items()}
    loan_application_data["user_id"] = current_user.id
    loan_application_data["business_commencement_date"] = loan_application.businessCommencementDate.date()
    del loan_application_data["business_structure"]
    loan_application_data["business_structure_id"] = businessStructure.id
    del loan_application_data["contact_language_preferences"]
    del loan_application_data["bank_name"]
    loan_application_data["bank_name_id"] = bankName.id
    
    new_loan_application = LoanApplication(**loan_application_data)
    db.add(new_loan_application)
    db.flush()

    for languagePreference in loan_application.contactLanguagePreferences:
        language = db.query(Language).filter_by(language=languagePreference).first()
        new_loan_language = LoanLanguage(loan_id=new_loan_application.id, language_id=language.id)
        db.add(new_loan_language)

    db.commit()
    db.refresh(new_loan_application)

    loan_application_dict["id"] = new_loan_application.id
    loan_application_dict["status"] = "Submitted"
    return schemas.LoanApplication(**loan_application_dict)
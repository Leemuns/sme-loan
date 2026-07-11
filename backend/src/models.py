from sqlalchemy import (
    Column, 
    Integer, 
    String,
    Date,
    Numeric,
    SmallInteger,
    Boolean,
    ForeignKey,
)
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    fullname = Column(String)
    password_hash = Column(String)
    email = Column(String, unique=True, index=True)


class Status(Base):
    __tablename__ = "statuses"

    id = Column(Integer, primary_key=True)
    status = Column(String, unique=True, index=True)


class BankName(Base):
    __tablename__ = "bank_names"

    id = Column(Integer, primary_key=True)
    bank_name = Column(String, unique=True, index=True)


class BusinessStructure(Base):
    __tablename__ = "business_structures"

    id = Column(Integer, primary_key=True)
    business_structure = Column(String, unique=True, index=True)


class Language(Base):
    __tablename__ = "languages"

    id = Column(Integer, primary_key=True)
    language = Column(String, unique=True, index=True)

    loan_languages = relationship("LoanLanguage", back_populates="language")


class LoanLanguage(Base):
    __tablename__ = "loan_language"

    loan_id = Column(Integer, ForeignKey("loan_applications.id", onupdate="CASCADE", ondelete="CASCADE"), primary_key=True)
    language_id = Column(Integer, ForeignKey("languages.id", onupdate="CASCADE"), primary_key=True)

    loan = relationship("LoanApplication", back_populates="loan_languages")
    language = relationship("Language", back_populates="loan_languages")


class LoanApplication(Base):
    __tablename__ = "loan_applications"

    id = Column(Integer, primary_key=True)
    status_id = Column(SmallInteger, ForeignKey("statuses.id"), nullable=False, default=1)

    business_name = Column(String)
    business_registration_no = Column(String(12))
    business_commencement_date = Column(Date)
    business_address = Column(String)
    business_structure_id = Column(SmallInteger, ForeignKey("business_structures.id"))
    business_email = Column(String)
    business_phone_no = Column(String)
    business_employee_count = Column(Integer)
    business_is_shariah = Column(Boolean)
    business_activities_description = Column(String)

    contact_name = Column(String)
    contact_position = Column(String)
    contact_email = Column(String)
    contact_phone_no = Column(String)
    contact_address = Column(String)

    annual_revenue = Column(Numeric(12, 2))
    net_profit = Column(Numeric(12, 2))
    monthly_cash_flow = Column(Numeric(12, 2))
    bank_name_id = Column(SmallInteger, ForeignKey("bank_names.id"))
    bank_number = Column(String)

    loan_amount = Column(Numeric(12, 2))
    loan_tenure_years = Column(SmallInteger)
    loan_purpose = Column(String)

    status = relationship("Status")
    business_structure = relationship("BusinessStructure")
    bank_name = relationship("BankName")
    loan_languages = relationship("LoanLanguage", back_populates="loan")


    @property
    def contact_language_preferences(self):
        return [ll.language for ll in self.loan_languages]

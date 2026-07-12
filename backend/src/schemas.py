from datetime import datetime
from decimal import Decimal
from typing import List

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserBase(BaseModel):
    username: str
    fullname: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class config: 
        from_attribute = True


class BusinessStructureModel(BaseModel):
    id: int
    business_structure: str


class BankNameModel(BaseModel):
    id: int
    bank_name: str


class LanguageModel(BaseModel):
    id: int
    language: str


class StatusModel(BaseModel):
    id: int
    status: str


class LoanApplicationBase(BaseModel):
    businessName: str
    businessRegistrationNo: str
    businessCommencementDate: datetime
    businessActivitiesDescription: str
    businessAddress: str
    businessStructure: str
    businessEmail: str
    businessPhoneNo: str
    businessEmployeeCount: int
    businessIsShariah: bool

    contactName: str
    contactPosition: str
    contactEmail: str
    contactPhoneNo: str
    contactAddress: str
    contactLanguagePreferences: List[str]

    annualRevenue: Decimal
    netProfit: Decimal
    monthlyCashFlow: Decimal
    bankName: str
    bankNumber: str

    loanAmount: Decimal
    loanTenureYears: int
    loanPurpose: str


class LoanApplicationCreate(LoanApplicationBase):
    pass


class LoanApplication(LoanApplicationBase):
    id: int
    status: str


class Token(BaseModel):
    access_token: str
    token_type: str
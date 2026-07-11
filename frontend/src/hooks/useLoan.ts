import { useLoanStore } from "@/providers/LoanStoreProvider";

export const useLoanBusiness = () => {
  return {
    businessName: useLoanStore((state) => state.businessName),
    businessRegistrationNo: useLoanStore(
      (state) => state.businessRegistrationNo,
    ),
    businessCommencementDate: useLoanStore(
      (state) => state.businessCommencementDate,
    ),
    businessActivitiesDescription: useLoanStore(
      (state) => state.businessActivitiesDescription,
    ),
    businessAddress: useLoanStore((state) => state.businessAddress),
    businessStructure: useLoanStore((state) => state.businessStructure),
    businessEmail: useLoanStore((state) => state.businessEmail),
    businessPhoneNo: useLoanStore((state) => state.businessPhoneNo),
    businessEmployeeCount: useLoanStore((state) => state.businessEmployeeCount),
    businessIsShariah: useLoanStore((state) => state.businessIsShariah),
  };
};

export const useLoanContact = () => {
  return {
    contactName: useLoanStore((state) => state.contactName),
    contactPosition: useLoanStore((state) => state.contactPosition),
    contactEmail: useLoanStore((state) => state.contactEmail),
    contactPhoneNo: useLoanStore((state) => state.contactPhoneNo),
    contactAddress: useLoanStore((state) => state.contactAddress),
    contactLanguagePreferences: useLoanStore(
      (state) => state.contactLanguagePreferences,
    ),
  };
};

export const useLoanFinance = () => {
  return {
    annualRevenue: useLoanStore((state) => state.annualRevenue),
    netProfit: useLoanStore((state) => state.netProfit),
    monthlyCashFlow: useLoanStore((state) => state.monthlyCashFlow),
    bankName: useLoanStore((state) => state.bankName),
    bankNumber: useLoanStore((state) => state.bankNumber),
  };
};

export const useLoanRequirements = () => {
  return {
    loanAmount: useLoanStore((state) => state.loanAmount),
    loanTenureYears: useLoanStore((state) => state.loanTenureYears),
    loanPurpose: useLoanStore((state) => state.loanPurpose),
  };
};

export const useLoan = () => {
  return {
    ...useLoanBusiness(),
    ...useLoanContact(),
    ...useLoanFinance(),
    ...useLoanRequirements(),
  };
};

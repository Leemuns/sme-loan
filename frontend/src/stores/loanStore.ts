import { createStore } from "zustand/vanilla";
import { BusinessStructures, LoanFields } from "../types";

export type LoanActions = {
  setField: (fields: Partial<LoanFields>) => void;
  clearFields: () => void;
};

export type LoanStore = LoanFields & LoanActions;

export const defaultInitFields: LoanFields = {
  businessName: "",
  businessRegistrationNumber: "",
  businessCommencementDate: new Date(),
  businessStructure: BusinessStructures.Proprietorship,
  businessIsShariah: false,
  contactName: "",
  contactPosition: "",
  contactEmail: "",
  annualRevenue: 0,
};

export const createLoanStore = (initFields: LoanFields = defaultInitFields) => {
  return createStore<LoanStore>()((set) => ({
    ...initFields,
    setField: (fields) => set((state) => ({ ...state, ...fields })),
    clearFields: () => set(defaultInitFields),
  }));
};

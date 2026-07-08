import { createStore } from "zustand/vanilla";

export type LoanFields = {
  name: string;
  phone: string;
  companyName: string;
  industryType: string;
  loanAmount: number;
  tenure: number;
};

export type LoanActions = {
  setField: (fields: Partial<LoanFields>) => void;
  clearFields: () => void;
};

export type LoanStore = LoanFields & LoanActions;

export const defaultInitFields: LoanFields = {
  name: "",
  phone: "",
  companyName: "",
  industryType: "",
  loanAmount: 0,
  tenure: 0,
};

export const createLoanStore = (initFields: LoanFields = defaultInitFields) => {
  return createStore<LoanStore>()((set) => ({
    ...initFields,
    setField: (fields) => set((state) => ({ ...state, ...fields })),
    clearFields: () => set(defaultInitFields),
  }));
};

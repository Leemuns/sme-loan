import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BankNames, BusinessStructures, LoanFields } from "../types";

export interface LoanStoreState extends LoanFields {
  isStarted: boolean;
  // activeStepNumber: number;
}

export type LoanActions = {
  setField: (fields: Partial<LoanStoreState>) => void;
  clearFields: () => void;
};

export type LoanStore = LoanFields & LoanActions & LoanStoreState;

const defaultInitFields: LoanStoreState = {
  isStarted: false,
  // activeStepNumber: 0,

  businessName: "",
  businessRegistrationNo: "",
  businessCommencementDate: new Date(),
  businessActivitiesDescription: "",
  businessAddress: "",
  businessStructure: BusinessStructures.Proprietorship,
  businessEmail: "",
  businessPhoneNo: "",
  businessEmployeeCount: 0,
  businessIsShariah: false,

  contactName: "",
  contactPosition: "",
  contactEmail: "",
  contactPhoneNo: "",
  contactAddress: "",
  contactLanguagePreferences: [],

  annualRevenue: 0,
  netProfit: 0,
  monthlyCashFlow: 0,
  bankName: BankNames.MayBank,
  bankNumber: "",

  loanAmount: 0,
  loanTenureYears: 0,
  loanPurpose: "",
};

type SerializedDate = {
  type: "date";
  value: string;
};

function isSerializedDate(val: unknown): val is SerializedDate {
  return (
    val !== null &&
    typeof val === "object" &&
    "type" in val &&
    val.type === "date" &&
    "value" in val &&
    typeof val.value === "string"
  );
}

const customStorage = createJSONStorage(() => sessionStorage, {
  reviver: (_key, val) => {
    if (isSerializedDate(val)) {
      return new Date(val.value);
    }
    return val;
  },
  replacer: (key: string, value: any) => {
    // value already serialized here, can't check with instanceof
    if (key === "businessCommencementDate") return { type: "date", value };
    return value;
  },
});

export const createLoanStore = (
  initFields: LoanStoreState = defaultInitFields,
) => {
  return createStore<LoanStore>()(
    persist(
      (set) => ({
        ...initFields,
        setField: (fields) => set((state) => ({ ...state, ...fields })),
        clearFields: () => set(defaultInitFields),
      }),
      {
        name: "loan-storage",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !["setField", "clearFields"].includes(key),
            ),
          ),
        storage: customStorage,
      },
    ),
  );
};

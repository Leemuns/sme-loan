"use client";

import { type ReactNode, createContext, useState, useContext } from "react";
import { useStore } from "zustand";

import { type LoanStore, createLoanStore } from "@/stores/loanStore";

export type LoanStoreApi = ReturnType<typeof createLoanStore>;

export const LoanStoreContext = createContext<LoanStoreApi | undefined>(
  undefined,
);

export interface LoanStoreProviderProps {
  children: ReactNode;
}

export const LoanStoreProvider = ({ children }: LoanStoreProviderProps) => {
  const [store] = useState(() => createLoanStore());
  return (
    <LoanStoreContext.Provider value={store}>
      {children}
    </LoanStoreContext.Provider>
  );
};

export const useLoanStore = <T,>(selector: (store: LoanStore) => T): T => {
  const loanStoreContext = useContext(LoanStoreContext);
  if (!loanStoreContext) {
    throw new Error(`useLoanStore must be used within LoanStoreProvider`);
  }

  return useStore(loanStoreContext, selector);
};

import { LoanApplication, LoanFields } from "../types";

const baseUrl = "/api/loans";

// const getLoan = async (): Promise<LoanApplication> => {
// };

// const getLoansCurrentUser = (): Promise<LoanApplication[]> => {
// };

const addLoanApplication = async (
  newLoanApplication: LoanFields,
): Promise<LoanApplication | null> => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLoanApplication),
  });
  if (res.status === 400) return null;
  return await res.json();
};

export default {
  // getLoan,
  // getLoansCurrentUser,
  addLoanApplication,
};

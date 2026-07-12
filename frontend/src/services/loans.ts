import { LoanApplication, LoanApplicationMinimal, LoanFields } from "../types";

const baseUrl = "/api/loans";

const getLoanApplication = async (
  loanId: string,
): Promise<LoanApplication | null> => {
  const res = await fetch(`${baseUrl}/${loanId}`);
  if (res.status === 401) return null;
  if (res.status === 404) return null;
  return await res.json();
};

const getLoanApplicationsCurrentUser = async (): Promise<
  LoanApplicationMinimal[] | null
> => {
  const res = await fetch(baseUrl);
  if (res.status === 404) return null;
  return await res.json();
};

const addLoanApplication = async (
  newLoanApplication: LoanFields,
): Promise<LoanApplication> => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLoanApplication),
  });
  if (res.status === 400) throw new Error("Malformed data");
  return await res.json();
};

export default {
  getLoanApplication,
  getLoanApplicationsCurrentUser,
  addLoanApplication,
};

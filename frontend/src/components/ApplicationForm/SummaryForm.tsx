"use client";

import { type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

import { useLoanStore } from "@/providers/LoanStoreProvider";
import { useLoan } from "@/hooks/useLoan";
import loansService from "@/services/loans";
import BusinessForm from "./BusinessForm";
import ContactForm from "./ContactForm";
import FinanceForm from "./FinanceForm";
import RequirementsForm from "./RequirementsForm";

export default function SummaryForm() {
  const router = useRouter();
  const fields = useLoan();
  const clearFields = useLoanStore((state) => state.clearFields);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const createdLoanApplication =
      await loansService.addLoanApplication(fields);
    if (!createdLoanApplication) {
      console.error("Fail to create loan applications");
      return;
    }

    // clearFields();
    router.push("/loan/completion");
  };

  return (
    <form onSubmit={handleSubmit}>
      <BusinessForm readOnly />
      <ContactForm readOnly />
      <FinanceForm readOnly />
      <RequirementsForm readOnly />
      <Button
        type="submit"
        variant="contained"
        size="small"
        color="info"
        sx={{ flexShrink: 0, mb: 2 }}
      >
        Submit Loan Application
      </Button>
    </form>
  );
}

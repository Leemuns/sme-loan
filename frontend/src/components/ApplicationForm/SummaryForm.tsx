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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoanApplication } from "../../types";

export default function SummaryForm() {
  const router = useRouter();
  const fields = useLoan();
  const queryClient = useQueryClient();
  const clearFields = useLoanStore((state) => state.clearFields);

  const createLoanApplicationMutation = useMutation({
    mutationFn: loansService.addLoanApplication,
    onSuccess: (createdLoan) => {
      const loanApplications = queryClient.getQueryData([
        "userLoanApplications",
      ]) as LoanApplication[];
      queryClient.setQueryData(
        ["userLoanApplications"],
        loanApplications.concat(createdLoan),
      );
    },
    onError: () => {
      console.error("Failed to create loan applications");
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    createLoanApplicationMutation.mutate(fields);

    clearFields();
    router.push("/loan-form/completion");
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

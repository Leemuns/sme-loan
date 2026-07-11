"use client";

import { useRef, useState, type SyntheticEvent } from "react";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";

import { loanRequirementsFieldsSchema } from "../../types";
import LoanTextField from "../formInputs/LoanTextField";
import { useLoanRequirements } from "@/hooks/useLoan";
import LoanCurrencyField from "../formInputs/LoanCurrencyField";
import LoanNumberField from "../formInputs/LoanNumberField";

interface RequirementsFormProps {
  readOnly?: boolean;
}

export default function RequirementsForm({
  readOnly = false,
}: RequirementsFormProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const fields = useLoanRequirements();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const parseResult = loanRequirementsFieldsSchema.safeParse(fields);

    if (!parseResult.success) {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = null;
      }

      setErrorMessage(parseResult.error.issues[0].message);

      errorTimeoutRef.current = setTimeout(() => {
        setErrorMessage("");
        errorTimeoutRef.current = null;
      }, 3000);

      return;
    }

    router.push("/loan/summary");
  };

  const Wrapper = readOnly ? "div" : "form";

  return (
    <Wrapper onSubmit={readOnly ? undefined : handleSubmit}>
      {errorMessage !== "" && <Alert severity="error">{errorMessage}</Alert>}

      <LoanCurrencyField
        label="Loan Amount"
        fieldName="loanAmount"
        disabled={readOnly}
      />

      <LoanNumberField
        label="Preferred Tenure (year)"
        fieldName="loanTenureYears"
        disabled={readOnly}
      />

      <LoanTextField
        label="Loan Purpose"
        fieldName="loanPurpose"
        disabled={readOnly}
      />

      {!readOnly && <button type="submit">Next</button>}
    </Wrapper>
  );
}

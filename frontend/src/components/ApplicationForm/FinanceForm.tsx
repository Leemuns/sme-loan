"use client";

import { useRef, useState, type SyntheticEvent } from "react";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";

import { BankNameValues, loanFinanceFieldsSchema } from "../../types";
import LoanTextField from "../formInputs/LoanTextField";
import { useLoanFinance } from "@/hooks/useLoan";
import LoanCurrencyField from "../formInputs/LoanCurrencyField";
import LoanSelectField from "../formInputs/LoanPickField";

interface FinanceFormProps {
  readOnly?: boolean;
}

export default function FinanceForm({ readOnly = false }: FinanceFormProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const fields = useLoanFinance();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const parseResult = loanFinanceFieldsSchema.safeParse(fields);

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

    router.push("/loan/requirements");
  };

  const Wrapper = readOnly ? "div" : "form";

  return (
    <Wrapper onSubmit={readOnly ? undefined : handleSubmit}>
      {errorMessage !== "" && <Alert severity="error">{errorMessage}</Alert>}

      <LoanCurrencyField
        label="Annual Revenue"
        fieldName="annualRevenue"
        disabled={readOnly}
      />

      <LoanCurrencyField
        label="Net profit"
        fieldName="netProfit"
        disabled={readOnly}
      />

      <LoanCurrencyField
        label="Monthly Cash Flow"
        fieldName="monthlyCashFlow"
        disabled={readOnly}
      />

      <LoanSelectField
        label="Bank Name"
        fieldName="bankName"
        options={BankNameValues}
        disabled={readOnly}
      />

      <LoanTextField
        label="Bank Number"
        fieldName="bankNumber"
        disabled={readOnly}
      />

      {!readOnly && <button type="submit">Next</button>}
    </Wrapper>
  );
}

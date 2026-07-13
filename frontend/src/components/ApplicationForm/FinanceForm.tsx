"use client";

import { BankNameValues, loanFinanceFieldsSchema } from "../../types";
import { useLoanFinance } from "@/hooks/useLoan";
import FormWrapper from "./FormWrapper";
import LoanTextField from "../formInputs/LoanTextField";
import LoanCurrencyField from "../formInputs/LoanCurrencyField";
import LoanSelectField from "../formInputs/LoanPickField";

interface FinanceFormProps {
  readOnly?: boolean;
}

export default function FinanceForm({ readOnly = false }: FinanceFormProps) {
  const fields = useLoanFinance();

  const validator = () => {
    return loanFinanceFieldsSchema.safeParse(fields);
  };

  return (
    <FormWrapper
      validator={validator}
      backPath="/loan-form/contact"
      nextPath="/loan-form/requirements"
      selfPath="/loan-form/finance"
      readOnly={readOnly}
    >
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
    </FormWrapper>
  );
}

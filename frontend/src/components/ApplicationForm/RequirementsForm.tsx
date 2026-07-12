"use client";

import { loanRequirementsFieldsSchema } from "../../types";
import { useLoanRequirements } from "@/hooks/useLoan";
import FormWrapper from "./FormWrapper";
import LoanTextField from "../formInputs/LoanTextField";
import LoanCurrencyField from "../formInputs/LoanCurrencyField";
import LoanNumberField from "../formInputs/LoanNumberField";

interface RequirementsFormProps {
  readOnly?: boolean;
}

export default function RequirementsForm({
  readOnly = false,
}: RequirementsFormProps) {
  const fields = useLoanRequirements();

  const validator = () => {
    return loanRequirementsFieldsSchema.safeParse(fields);
  };

  return (
    <FormWrapper
      validator={validator}
      nextPath="/loan/summary"
      selfPath="/loan/requirements"
      readOnly={readOnly}
    >
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
    </FormWrapper>
  );
}

"use client";

import { LanguagesValues, loanContactFieldsSchema } from "../../types";
import { useLoanContact } from "@/hooks/useLoan";
import FormWrapper from "./FormWrapper";
import LoanTextField from "../formInputs/LoanTextField";
import LoanPatternField from "../formInputs/LoanPatternField";
import LoanMultipleField from "../formInputs/LoanMultipleField";

interface ContactFormProps {
  readOnly?: boolean;
}

export default function ContactForm({ readOnly = false }: ContactFormProps) {
  const fields = useLoanContact();

  const validator = () => {
    return loanContactFieldsSchema.safeParse(fields);
  };

  return (
    <FormWrapper
      validator={validator}
      backPath="/loan-form/business"
      nextPath="/loan-form/finance"
      selfPath="/loan-form/contact"
      readOnly={readOnly}
    >
      <LoanTextField
        label="Contact Name"
        fieldName="contactName"
        disabled={readOnly}
      />

      <LoanTextField
        label="Position in business"
        fieldName="contactPosition"
        disabled={readOnly}
      />

      <LoanTextField
        label="Personal Email"
        fieldName="contactEmail"
        disabled={readOnly}
      />

      <LoanPatternField
        label="Personal Phone Number"
        fieldName="contactPhoneNo"
        format="###-########"
        disabled={readOnly}
      />

      <LoanTextField
        label="Personal address"
        fieldName="contactAddress"
        disabled={readOnly}
      />

      <LoanMultipleField
        label="Language preferences"
        fieldName="contactLanguagePreferences"
        options={LanguagesValues}
        disabled={readOnly}
      />
    </FormWrapper>
  );
}

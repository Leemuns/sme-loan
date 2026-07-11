"use client";

import { useRef, useState, type SyntheticEvent } from "react";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";

import { LanguagesValues, loanContactFieldsSchema } from "../../types";
import LoanTextField from "../formInputs/LoanTextField";
import LoanPatternField from "../formInputs/LoanPatternField";
import { useLoanContact } from "@/hooks/useLoan";
import LoanMultipleField from "../formInputs/LoanMultipleField";

interface ContactFormProps {
  readOnly?: boolean;
}

export default function ContactForm({ readOnly = false }: ContactFormProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const fields = useLoanContact();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const parseResult = loanContactFieldsSchema.safeParse(fields);

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

    router.push("/loan/finance");
  };
  const Wrapper = readOnly ? "div" : "form";

  return (
    <Wrapper onSubmit={readOnly ? undefined : handleSubmit}>
      {errorMessage !== "" && <Alert severity="error">{errorMessage}</Alert>}

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

      {!readOnly && <button type="submit">Next</button>}
    </Wrapper>
  );
}

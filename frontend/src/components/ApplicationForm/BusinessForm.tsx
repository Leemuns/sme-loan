"use client";

import { useRef, useState, type SyntheticEvent } from "react";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";

import { BusinessStructureValues, loanBusinessFieldsSchema } from "../../types";
import LoanTextField from "../formInputs/LoanTextField";
import LoanDateField from "../formInputs/LoanDateField";
import LoanSelectField from "../formInputs/LoanPickField";
import LoanCheckBox from "../formInputs/LoanCheckBox";
import LoanPatternField from "../formInputs/LoanPatternField";
import LoanNumberField from "../formInputs/LoanNumberField";
import { useLoanBusiness } from "@/hooks/useLoan";

interface BusinessFormProps {
  readOnly?: boolean;
}

export default function BusinessForm({ readOnly = false }: BusinessFormProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const fields = useLoanBusiness();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const parseResult = loanBusinessFieldsSchema.safeParse(fields);

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

    router.push("/loan/contact");
  };

  const Wrapper = readOnly ? "div" : "form";

  return (
    <Wrapper onSubmit={readOnly ? undefined : handleSubmit}>
      {errorMessage !== "" && <Alert severity="error">{errorMessage}</Alert>}

      <LoanTextField
        label="Business Name"
        fieldName="businessName"
        disabled={readOnly}
      />

      <LoanPatternField
        label="Business Registration Number"
        fieldName="businessRegistrationNumber"
        format="############"
        disabled={readOnly}
      />

      <LoanDateField
        label="Business Commencement Date"
        fieldName="businessCommencementDate"
        disabled={readOnly}
      />

      <LoanTextField
        label="Describe your business activities"
        fieldName="businessActivitiesDescription"
        disabled={readOnly}
      />

      <LoanTextField
        label="Business Address"
        fieldName="businessAddress"
        disabled={readOnly}
      />

      <LoanSelectField
        label="Business Structure"
        fieldName="businessStructure"
        options={BusinessStructureValues}
        disabled={readOnly}
      />

      <LoanTextField
        label="Business Email"
        fieldName="businessEmail"
        disabled={readOnly}
      />

      <LoanPatternField
        label="Business Phone Number"
        fieldName="businessPhoneNo"
        format="###-########"
        disabled={readOnly}
      />

      <LoanNumberField
        label="Employee Count"
        fieldName="businessEmployeeCount"
        disabled={readOnly}
      />

      <LoanCheckBox
        label="Is shariah-law compliant?"
        fieldName="businessIsShariah"
        disabled={readOnly}
      />

      {!readOnly && <button type="submit">Next</button>}
    </Wrapper>
  );
}

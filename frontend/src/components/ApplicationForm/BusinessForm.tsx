"use client";

import { BusinessStructureValues, loanBusinessFieldsSchema } from "../../types";
import { useLoanBusiness } from "@/hooks/useLoan";
import FormWrapper from "./FormWrapper";
import LoanTextField from "../formInputs/LoanTextField";
import LoanDateField from "../formInputs/LoanDateField";
import LoanSelectField from "../formInputs/LoanPickField";
import LoanCheckBox from "../formInputs/LoanCheckBox";
import LoanPatternField from "../formInputs/LoanPatternField";
import LoanNumberField from "../formInputs/LoanNumberField";

interface BusinessFormProps {
  readOnly?: boolean;
}

export default function BusinessForm({ readOnly = false }: BusinessFormProps) {
  const fields = useLoanBusiness();

  const validator = () => {
    return loanBusinessFieldsSchema.safeParse(fields);
  };

  return (
    <FormWrapper
      validator={validator}
      nextPath="/loan/contact"
      selfPath="/loan/business"
      readOnly={readOnly}
    >
      <LoanTextField
        label="Business Name"
        fieldName="businessName"
        disabled={readOnly}
      />

      <LoanPatternField
        label="Business Registration Number"
        fieldName="businessRegistrationNo"
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
    </FormWrapper>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { type SyntheticEvent } from "react";

import { BusinessStructureValues } from "../../types";
import LoanTextField from "../formInputs/LoanTextField";
import LoanDateField from "../formInputs/LoanDateField";
import LoanSelectField from "../formInputs/LoanPickField";
import LoanCheckBox from "../formInputs/LoanCheckBox";
import LoanCurrencyField from "../formInputs/LoanCurrencyField";
import LoanPatternField from "../formInputs/LoanPatternField";

export default function BusinessForm() {
  const router = useRouter();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push("/loan/requirements");
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoanTextField label="Business Name" fieldName="businessName" />
      <LoanPatternField
        label="Business Registration Number"
        fieldName="businessRegistrationNumber"
        format="############"
      />
      <LoanDateField
        label="Business Commencement Date"
        fieldName="businessCommencementDate"
      />
      <LoanSelectField
        label="Business Structure"
        fieldName="businessStructure"
        options={BusinessStructureValues}
      />
      <LoanCheckBox
        label="Is shariah-law compliant?"
        fieldName="businessIsShariah"
      />
      <LoanCurrencyField label="test" fieldName="annualRevenue" />
      <button type="submit">Next</button>
    </form>
  );
}

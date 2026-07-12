import { TextField } from "@mui/material";
import { PatternFormat } from "react-number-format";

import { useLoanStore } from "../../providers/LoanStoreProvider";
import { LoanFields, loanFieldsSchema } from "../../types";

type LoanPatternFieldProps = {
  label: string;
  fieldName: keyof LoanFields;
  format: string;
  disabled?: boolean;
};

export default function LoanPatternField({
  label,
  fieldName,
  format,
  disabled = false,
}: LoanPatternFieldProps) {
  const value = useLoanStore((state) => state[fieldName]);
  const setField = useLoanStore((state) => state.setField);

  const handleChange = ({ value }: { value: string | undefined }) => {
    setField({ [fieldName]: value || "" });
  };

  if (typeof value !== "string") {
    throw new Error("LoanPatternField value must be of type string");
  }

  const parseResult = loanFieldsSchema.shape[fieldName].safeParse(value);
  const error = value.length > 0 && !parseResult.success;

  return (
    <PatternFormat
      label={label}
      value={value}
      onValueChange={handleChange}
      customInput={TextField}
      format={format}
      error={error}
      helperText={error && parseResult.error?.issues[0].message}
      size="small"
      margin="normal"
      fullWidth
      disabled={disabled}
    />
  );
}

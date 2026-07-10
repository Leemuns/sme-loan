import { TextField } from "@mui/material";
import { PatternFormat } from "react-number-format";

import { useLoanStore } from "@/providers/LoanStoreProvider";
import { LoanFields, loanFieldsSchema } from "../../types";

type LoanPatternFieldProps = {
  label: string;
  fieldName: keyof LoanFields;
  format: string;
};

export default function LoanPatternField({
  label,
  fieldName,
  format,
}: LoanPatternFieldProps) {
  const value = useLoanStore((state) => state[fieldName]);
  const setField = useLoanStore((state) => state.setField);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField({ [fieldName]: e.target.value.trim() });
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
      onChange={handleChange}
      customInput={TextField}
      format={format}
      error={error}
      helperText={error && parseResult.error?.issues[0].message}
      size="small"
      margin="normal"
      fullWidth
    />
  );
}

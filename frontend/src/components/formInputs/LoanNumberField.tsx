import { InputAdornment, TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

import { useLoanStore } from "@/providers/LoanStoreProvider";
import { LoanFields, loanFieldsSchema } from "../../types";

type LoanNumberFieldProps = {
  label: string;
  fieldName: keyof LoanFields;
  disabled?: boolean;
};

export default function LoanNumberField({
  label,
  fieldName,
  disabled = false,
}: LoanNumberFieldProps) {
  const value = useLoanStore((state) => state[fieldName]);
  const setField = useLoanStore((state) => state.setField);

  const handleChange = ({ floatValue }: { floatValue: number | undefined }) => {
    setField({ [fieldName]: floatValue || 0 });
  };

  if (typeof value !== "number") {
    throw new Error("LoanNumberField value must be of type number");
  }

  const parseResult = loanFieldsSchema.shape[fieldName].safeParse(value);
  const error = value > 0 && !parseResult.success;

  return (
    <NumericFormat
      label={label}
      value={value}
      customInput={TextField}
      onValueChange={handleChange}
      error={error}
      helperText={error && parseResult.error?.issues[0].message}
      size="small"
      margin="normal"
      fullWidth
      thousandSeparator
      valueIsNumericString
      allowNegative={false}
      disabled={disabled}
    />
  );
}

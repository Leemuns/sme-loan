import { MenuItem, TextField, TextFieldProps } from "@mui/material";

import { useLoanStore } from "../../providers/LoanStoreProvider";
import { LoanFields, loanFieldsSchema } from "../../types";

type LoanSelectFieldProps = {
  label: string;
  fieldName: keyof LoanFields;
  options: string[];
} & Omit<TextFieldProps, "value" | "onChange">;

export default function LoanSelectField({
  label,
  fieldName,
  options,
  ...textFieldProps
}: LoanSelectFieldProps) {
  const value = useLoanStore((state) => state[fieldName]);
  const setField = useLoanStore((state) => state.setField);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField({ [fieldName]: e.target.value });
  };

  if (typeof value !== "string") {
    throw new Error("LoanSelectField value must be of type string");
  }

  const parseResult = loanFieldsSchema.shape[fieldName].safeParse(value);
  const error = value.length > 0 && !parseResult.success;

  return (
    <TextField
      {...textFieldProps}
      label={label}
      value={value}
      onChange={handleChange}
      error={error}
      helperText={error && parseResult.error?.issues[0].message}
      select
      size="small"
      margin="normal"
      fullWidth
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}

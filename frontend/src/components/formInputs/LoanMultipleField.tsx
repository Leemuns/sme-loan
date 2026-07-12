import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { useLoanStore } from "../../providers/LoanStoreProvider";
import { LoanFields } from "../../types";

type LoanMultipleFieldProps = {
  label: string;
  fieldName: keyof LoanFields;
  options: string[];
  disabled?: boolean;
};

export default function LoanMultipleField({
  label,
  fieldName,
  options,
  disabled = false,
}: LoanMultipleFieldProps) {
  const value = useLoanStore((state) => state[fieldName]);
  const setField = useLoanStore((state) => state.setField);

  const handleChange = (e: SelectChangeEvent<any>) => {
    const value = e.target.value;
    const selected = typeof value === "string" ? value.split(",") : value;
    setField({ [fieldName]: selected });
  };

  return (
    <FormControl fullWidth margin="normal" size="small" disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={handleChange} multiple>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

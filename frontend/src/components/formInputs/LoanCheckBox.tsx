import {
  Checkbox,
  Box,
  FormControlLabel,
  FormControlLabelProps,
} from "@mui/material";

import { useLoanStore } from "@/providers/LoanStoreProvider";
import { LoanFields, loanFieldsSchema } from "../../types";

type LoanCheckBoxProps = {
  label: string;
  fieldName: keyof LoanFields;
} & Omit<FormControlLabelProps, "value" | "onChange" | "control">;

export default function LoanCheckBox({
  label,
  fieldName,
  ...checkBoxProps
}: LoanCheckBoxProps) {
  const value = useLoanStore((state) => state[fieldName]);
  const setField = useLoanStore((state) => state.setField);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField({ [fieldName]: e.target.checked });
  };

  if (typeof value !== "boolean") {
    throw new Error("LoanCheckBox value must be of type boolean");
  }

  return (
    <Box>
      <FormControlLabel
        {...checkBoxProps}
        control={<Checkbox value={value} onChange={handleChange} />}
        label={label}
      />
    </Box>
  );
}

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";

import { useLoanStore } from "@/providers/LoanStoreProvider";
import { LoanFields, loanFieldsSchema } from "../../types";
import dayjs from "dayjs";
import { PickerValue } from "@mui/x-date-pickers/internals";

type LoanDateFieldProps = {
  label: string;
  fieldName: keyof LoanFields;
} & Omit<DatePickerProps, "value" | "onChange">;

export default function LoanDateField({
  label,
  fieldName,
  ...dateFieldProps
}: LoanDateFieldProps) {
  const value = useLoanStore((state) => state[fieldName]);
  const setField = useLoanStore((state) => state.setField);

  const handleChange = (value: PickerValue) => {
    setField({ [fieldName]: value!.toDate() });
  };

  if (!(value instanceof Date)) {
    throw new Error("LoanDateField value must be of type Date");
  }

  const parseResult = loanFieldsSchema.shape[fieldName].safeParse(value);
  const error = !parseResult.success;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DatePicker
        {...dateFieldProps}
        label={label}
        value={dayjs(value)}
        onChange={handleChange}
        slotProps={{
          textField: {
            size: "small",
            margin: "normal",
            error: error,
            helperText: error && parseResult.error?.issues[0].message,
            fullWidth: true,
          },
        }}
      />
    </LocalizationProvider>
  );
}

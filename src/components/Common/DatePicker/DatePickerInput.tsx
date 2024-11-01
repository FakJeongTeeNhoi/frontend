import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface DatePickerProps {
  onChange: (newValue: Dayjs | null) => void;
}

const newTheme = createTheme({
  components: {
    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: "#1565c0",
          borderRadius: "2px",
          borderWidth: "1px",
          borderColor: "#2196f3",
          border: "1px solid",
          backgroundColor: "#90caf9",
        },
      },
    },
  },
});

export default function DatePickerInput({ onChange }: DatePickerProps) {
  const today = dayjs();
  const [date, setDate] = useState<Dayjs | null>(null);

  const onDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-fit bg-white rounded-md">
      <ThemeProvider theme={newTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={(newValue) => onDateChange(newValue)}
            minDate={today}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

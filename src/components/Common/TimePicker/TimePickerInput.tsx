import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";
import { useState } from "react";

interface TimePickerProps {
  onChange: (newValue: Dayjs | null) => void;
  disabled?: boolean;
  minTime?: Dayjs | null;
}

export default function TimePickerInput({
  onChange,
  disabled,
  minTime,
}: TimePickerProps) {
  const [time, setTime] = useState<Dayjs | null>(null);

  const onTimeChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setTime(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="w-fit bg-white rounded-md">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          value={time}
          onChange={(newValue) => onTimeChange(newValue)}
          disabled={disabled}
          minTime={minTime? minTime: undefined}
        />
      </LocalizationProvider>
    </div>
  );
}

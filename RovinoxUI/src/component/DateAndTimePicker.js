import { useState } from "react";
import moment from "moment";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

export default function DateAndTimePicker() {
  const [value, setValue] = useState(moment());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileDateTimePicker
        value={value}
        disablePast={true}
        onChange={(newValue) => {
          handleChange(newValue);
        }}
        label="Schedule 1 and1"
        onError={console.log}
        //minDate={moment("2018-01-01T00:00")}
        inputFormat="MM/DD/YYYY hh:mm a"
        mask="____/__/__ __:__ _M"
        renderInput={(params) => <TextField {...params} />}
        //views={[moment("2022-10-28T00:00")]}
      />
    </LocalizationProvider>
  );
}

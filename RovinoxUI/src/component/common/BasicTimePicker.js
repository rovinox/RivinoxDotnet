import  React, {memo} from 'react';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import TextField from "@mui/material/TextField";
import moment from 'moment';

 const BasicTimePicker = ({value, onChange, label}) =>{
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
     
        <TimePicker label={label}
            value={value}
            defaultValue={moment('2022-04-17T15:30')}
            onChange={(newValue) => onChange(newValue)}
            renderInput={(params) => <TextField {...params} />}
         />
    </LocalizationProvider>


  );
}


export default  memo(BasicTimePicker);
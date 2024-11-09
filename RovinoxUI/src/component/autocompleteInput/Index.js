import React, {useRef, useState} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { apiService } from '../../api/axios';

export default function AutocompleteInput({onChange, returnTypeObject, label= "Select an Approver"}) {
    const [options, setOptions] = useState([]);
const previousController = useRef();


const getUser = async (value) => {
  if (previousController.current) {
    previousController.current.abort();
  }
  const controller = new AbortController();
  const signal = controller.signal;
  previousController.current = controller;
    try {
      const result = await apiService.get(
        "http://localhost:5122/api/account/search/users?searchTerm=" + value, {signal}
      );
      console.log("result: ", result);
      if (result?.data) {
        const updatedOptions = result?.data.map((p) => {
          return { label: `${p.firstName} ${p.lastName} <${p.email}>`, value: p.id, firstName: p.firstName, lastName: p.lastName};
        });
        setOptions(updatedOptions);
      }
    } catch (e) {
      console.log(e);
    }
}

const onInputChange = (event, value, reason) => {
  if (value) {
   // getData(value);
    getUser(value);
  } else {
    setOptions([]);
  }
};

  return (
   <Autocomplete
    id="combo-box-demo"
    options={options}
    onInputChange={onInputChange}
    getOptionLabel={(option) => option.label}
    style={{ width: '100%' }}
    onChange={(event, option) =>{
      onChange(returnTypeObject ? option : option.value)
    }}
    renderInput={(params) => (
      <TextField {...params} label={label}  fullWidth />
    )}
  />
  )
}

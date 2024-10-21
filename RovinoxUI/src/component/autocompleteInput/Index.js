import React, {useRef, useState} from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { apiService } from '../../api/axios';

export default function Index({onChange}) {
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
          return { label: `${p.firstName} ${p.lastName} <${p.email}>`, value: p.id };
        });
        setOptions(updatedOptions);
      }
    } catch (e) {
      console.log(e);
    }
}

const getData = (searchTerm) => {
  if (previousController.current) {
    previousController.current.abort();
  }
  const controller = new AbortController();
  const signal = controller.signal;
  previousController.current = controller;
  fetch("https://dummyjson.com/products/search?q=" + searchTerm, {
    signal,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(
        "search term: " + searchTerm + ", results: ",
        myJson.products
      );
      const updatedOptions = myJson.products.map((p) => {
        return { title: p.title };
      });
      setOptions(updatedOptions);
    });
};

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
      onChange(option.value)
    }}
    renderInput={(params) => (
      <TextField {...params} label="Select an Approver"  fullWidth />
    )}
  />
  )
}


import React, { useState, useEffect } from "react";
import { apiService } from "../../api/axios.js";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import moment from "moment";



export default function ListOfBatch({onClick, defaultValue}) {

    const [batch, setBatch] = useState([]);
    useEffect(() => {
        const getBatch = async () => {
          try {
            const result = await apiService.get("http://localhost:5122/api/batch");
            console.log("result: ", result);
    
            setBatch(result.data);
          } catch (e) {
            console.log(e);
          }
        };
        getBatch();
    
      }, []);
      const batchList =
      batch?.length > 0 &&
      batch.map((option) => {
        console.log(option);
        return {
          value: option.id,
          label: ` ${option.course} / ${moment(option.startDate).format("MMM Do YY")} -
                            ${moment(option.endDate).format("MMM Do YY")}`,
        };
      });
  return (
    <div> <TextField
    required
    fullWidth
    name="course"
    select
    label="Course"
    // value={selectedBatch}
    defaultValue={defaultValue}
  >
    {batchList.length > 0 &&
      batchList.map((option) => (
        <MenuItem
          onClick={() => onClick(option.value)}
          key={option.value}
          value={option.value}
        
        >
          {option.label}
        </MenuItem>
      ))}
  </TextField></div>
  )
}

import React ,{useState} from 'react'
import DropzoneFileUploader from '../fileUploader/DropzoneFileUploader'
import { useSelector } from "react-redux";
import moment from "moment";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
export default function AddCurriculum() {

  const batches = useSelector(
    (state) => state.batch.batches
  );
  const [selectedBatch, setSelectedBatch] = useState('');

  const batchList =
  batches?.length > 0 &&
  batches.map((option) => {
    console.log(option);
    return {
      value: option.id,
      label: ` ${option.course} / ${moment(option.startDate).format("MMM Do YY")} -
                        ${moment(option.endDate).format("MMM Do YY")}`,
    };
  });
  return (
    <div style={{minWidth:"500px"}}> 
       <Grid Grid container spacing={2}>

     
         <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="course"
                  select
                  label="Course"
                  value={selectedBatch}
                  defaultValue={selectedBatch}
                >
                  {batchList.length > 0 &&
                    batchList.map((option) => (
                      <MenuItem
                        onClick={() => setSelectedBatch(option.value)}
                        key={option.value}
                        value={option.value}
                      
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
      <DropzoneFileUploader/>
              </Grid>
              </Grid>
       </div>
  )
}

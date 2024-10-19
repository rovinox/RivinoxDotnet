import React ,{useState} from 'react'
import DropzoneFileUploader from '../fileUploader/DropzoneFileUploader'
import { useSelector } from "react-redux";
import moment from "moment";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { apiService } from '../../api/axios';
import ReactToastify from '../ReactToastify';
import { toast } from "react-toastify";
import { Button } from '@mui/material';
import ListOfBatch from '../common/ListOfBatch';


export default function AddCurriculum() {

  const batches = useSelector(
    (state) => state.batch.batches
  );
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [file, setFile] = useState([])
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(file.length === 0){
      toast.warning("Please add a xlsx file" );
      return
    }
    if(!selectedBatchId){
      toast.warning("Please select a batch" );
      return
    }
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append('excelFile', file[0]);
      const result = await apiService.post(`http://localhost:5122/api/curriculum/upload/${selectedBatchId}`, formData);
      console.log(result);
      if (result?.data) {
        toast.success("Created Successfully" );
        setLoading(false)
      }
    } catch (err) {
      toast.error(`${err?.message}`);
    }
  };
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
        <ReactToastify />
       <Grid Grid container spacing={2}>

     
         <Grid item xs={12}>
          <ListOfBatch  onClick={setSelectedBatchId} />
      <DropzoneFileUploader   acceptedFilesArray={['.xlsx']} onChange={setFile} />
              </Grid>
              </Grid>
              <Button 
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }} onClick={handleSubmit} >upload</Button>
       </div>
  )
}

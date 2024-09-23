import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { toast } from "react-toastify";
import ReactToastify from "../ReactToastify";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import MultiSelectDropdown from "../common/MultiSelectDropdown";
import BasicTimePicker from "../common/BasicTimePicker";
import { apiService } from "../../api/axios";



export default function AddBatch() {
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(moment(new Date()));
  const [startTime, setStartTime] = useState(moment(new Date()));
  const [endTime, setEndTime] = useState(moment(new Date()));
  const [selectedCost, setSelectedCost] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [newBatch, setNewBatch] = useState('');
  const [loading, setLoading] = useState(false);
  const batches = useSelector(
    (state) => state.batch.batches
  );

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };
  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const batch = {
      startDate: moment(startDate).format(),
      endDate: moment(endDate).format(),
      startTime: moment(startTime).format(),
      endTime: moment(endTime).format(),
      cost: selectedCost,
      daysOfTheWeek: selectedDays,
      course: selectedCourse === "CREATE-NEW" ?  newBatch : selectedCourse,
    };
    try {
      const result = await apiService.post("http://localhost:5122/api/batch", batch);
      console.log(result);
      if (result?.data) {
        toast.success("Created Successfully" );
        setLoading(false)
      }
    } catch (err) {
      toast.error(`${err?.message}`);
    }
  };
  const courseList = batches.map(batch => {
    return {
      value: batch.id,
      label: batch.course
    }
  });
  courseList.unshift({
    value: "CREATE-NEW",
    label: "Create new course",
  })
    

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>

        <ReactToastify />
        <Box
        >
          <Box
            component="form"
            Validate
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "400px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MobileDatePicker
                  label="Start Date"
                  inputFormat="MM/DD/YYYY"
                  value={startDate}
                  disablePast
                  onChange={handleStartDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MobileDatePicker
                  label="End Date"
                  inputFormat="MM/DD/YYYY"
                  value={endDate}
                  onChange={handleEndDate}
                  disablePast
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BasicTimePicker label="Start Time" value={startTime} onChange={setStartTime}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <BasicTimePicker label="End Time" value={endTime} onChange={setEndTime}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ mt: 1, mb: 2 }}
                  required
                  fullWidth
                  name="course"
                  select
                  label="Course"
                  //value={courseList.value}
                >
                  {courseList.map((option) => (
                    <MenuItem
                      onClick={() => setSelectedCourse(option.value)}
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
               { selectedCourse === "CREATE-NEW" && <TextField
                         sx={{ mb: 2 }}
                  required
                  fullWidth
                  id="newCourse"
                  label="Enter new Course"
                  name="newCourse"
                  onChange={(e)=>{setNewBatch(e.target.value)}}

                />}
                <TextField
       
                  required
                  fullWidth
                  name="cost"
                  label="Cost"
                  type="number"
                  //value={cost.value}{
                  onChange={(e)=>{setSelectedCost(e.target.value)}}
                >
                  
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <MultiSelectDropdown  label="Weekly Occurrence " value={selectedDays} dropdownOptions={daysOfWeek} onChange={setSelectedDays} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
              //onClick={navigateToHome}
            >
              submit
            </Button>
          </Box>
        </Box>
    </LocalizationProvider>
  );
}

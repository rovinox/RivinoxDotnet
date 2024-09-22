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
import ReactToastify from "../component/ReactToastify";

import moment from "moment";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function AddBatch() {
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [endDate, setEndDate] = useState(moment(new Date()));
  const [selectedCost, setSelectedCost] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
  };
  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const batch = {
      startDate: moment(startDate).format(),
      endDate: moment(endDate).format(),
      cost: selectedCost,
      course: selectedCourse,
    };
    console.log(batch);
    try {
      const result = await axios.post("/addbatch", batch);
      console.log(result);
      if (result?.data?.message) {
        toast.success(`${result?.data?.message}`);
      }
    } catch (err) {
      toast.error(`${err?.message}`);
    }
  };
  const courseList = [
    {
      value: "Full-Stack",
      label: "Full-Stack",
    },
  ];
  const cost = [
    {
      value: "2000",
      label: "$2000",
    },
    {
      value: "3000",
      label: "$3000",
    },
    {
      value: "4000",
      label: "$4000",
    },
    {
      value: "5000",
      label: "$5000",
    },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>

        <ReactToastify />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            Validate
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "500px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MobileDatePicker
                  label="Start Date"
                  inputFormat="MM/DD/YYYY"
                  value={startDate}
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
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ mt: 3, mb: 3 }}
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
                <TextField
                  required
                  fullWidth
                  name="cost"
                  select
                  label="Cost"
                  value={cost.value}
                >
                  {cost.map((option) => (
                    <MenuItem
                      onClick={() => setSelectedCost(option.value)}
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
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

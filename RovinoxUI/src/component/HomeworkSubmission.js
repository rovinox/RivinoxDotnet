import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { useState } from "react";
import { toast } from "react-toastify";
import ReactToastify from "../component/ReactToastify.js";

import axios from "axios";
export default function HomeworkSubmission({ selectedDay }) {
  const [loading, setLoading] = useState(false);
  console.log("selectedDay", selectedDay);

  const user = {}
  const submitHomework = async (event) => {
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    const payload = {
      email: user.email,
      day: selectedDay[0].day,
      link: data.get("githubLink"),
      title: selectedDay[0].title,
    };

    setLoading(true);
    try {
      console.log(payload);
      const result = await axios.post("/submithomework", payload);
      if (result?.data?.message) {
        toast.success(`${result?.data?.message}`);
      }
      setLoading(false);
    } catch (err) {
      toast.error(`${err?.message}`);
    }
  };
  return (
    <Box
      component="form"
      Validate
      onSubmit={submitHomework}
      sx={{ mt: 3, width: 700 }}
    >
      <ReactToastify />
      <TextField required fullWidth label="GitHub Link" name="githubLink" />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        submit
      </Button>
      {loading && <LinearProgress color="success" />}
    </Box>
  );
}

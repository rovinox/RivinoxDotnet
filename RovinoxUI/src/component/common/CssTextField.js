import * as React from "react";
import { alpha, styled } from "@mui/material/styles";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

export default function CustomizedInputs() {
  return (
    <Paper>
      <CssTextField
        fullWidth
        label="Custom CSS"
        id="custom-css-outlined-input"
      />
    </Paper>
  );
}

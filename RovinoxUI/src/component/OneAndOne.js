import React from "react";
import DateAndTimePicker from "./DateAndTimePicker";
import Grid from "@mui/material/Grid";
export default function OneAndOne() {
  return (
    <div style={{ marginTop: 100 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          marginTop: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DateAndTimePicker />
      </Grid>
    </div>
  );
}

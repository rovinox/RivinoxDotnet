import React from "react";
import Header from "../Header";
import { AccountProfileDetails } from "./AccountDetails";
import { AccountInfo } from "./AccountInfo";
import { Grid, Typography } from "@mui/material";

export default function Profile() {
  return (
    <div>
      <Header />
      <Typography sx={{ mt: 20, mb: 5 }} variant="h2">
        Profile
      </Typography>
      <Grid Grid container spacing={2}>
        <Grid sx={{ mt: 2 }} xs={12} md={4}>
          <AccountInfo />
        </Grid>
        <Grid sx={{ p: 2 }} xs={12} md={8}>
          <AccountProfileDetails />
        </Grid>
      </Grid>
    </div>
  );
}

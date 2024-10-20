import React from "react";
import Header from "../header/Header";
import { AccountProfileDetails } from "./AccountDetails";
import { AccountInfo } from "./AccountInfo";
import { Grid } from "@mui/material";
import Banner from "../banner/Banner";

export default function Profile() {
  return (
    <div>
      <Header />
      <Banner
        page="Profile"
      />
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

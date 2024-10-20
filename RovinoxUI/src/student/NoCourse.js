import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Header from "../component/header/Header";

export default function NoCourse() {
  return (
    <>
      <Header />
      <Grid container spacing={2} minHeight={160}>
        <Grid
          xs
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Typography
            sx={{
              mt: 5,
              mb: 5,
            }}
            variant="h2"
          >
            Welcome to
            <Typography
              variant="h5"
              noWrap
              component="span"
              //href=""
              sx={{
                ml: 2,
                fontSize: 50,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
              }}
            >
              ROVINOX
            </Typography>
          </Typography>
          <Typography
            sx={{
              mt: 10,
            }}
            variant="h5"
          >
            You have not been assigned any course yet. It will enable few day
            before course start day.
          </Typography>
          <Typography
            sx={{
              mt: 10,
            }}
            variant="h5"
          >
            We're excited to have you, please be patient
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

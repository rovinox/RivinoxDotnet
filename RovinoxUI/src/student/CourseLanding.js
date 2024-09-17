import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

export default function CourseLanding() {
  return (
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
        <Typography variant="h4">
          The Full-Stack Software Development
        </Typography>
        <Typography
          sx={{
            mt: 10,
          }}
          variant="h5"
        >
          The MERN Stack
        </Typography>
        <Grid
          sx={{
            mt: 10,
            mb: 10,
            width: "80%",
          }}
          xs
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/MERN-logo.png/640px-MERN-logo.png"
            alt="MERN"
          />
        </Grid>
        <Typography variant="h6">
          <a
            href="https://www.mongodb.com/mern-stack"
            target="_blank"
            rel="noreferrer"
          >
            What is the MERN stack?
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
}

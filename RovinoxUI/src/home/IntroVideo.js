import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IntroPic from "../asset/IntroPic.svg";

export default function ProductHero() {
  return (
    <div
      style={{
        marginTop: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px",
      }}
    >
      <Grid Grid container spacing={2}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 10,
          }}
          xs={12}
          md={6}
        >
          <div>
            <Typography variant="h2">Land your Dream Jon in Tech</Typography>
            <Typography variant="p">
              Jumpstart your{" "}
              <Typography color="primary" variant="span">
                CAREER
              </Typography>{" "}
              in tech with Rovinox. It’s Time to
              <Typography>Invest In Your FUTURE</Typography>
            </Typography>
          </div>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 10,
          }}
          xs={12}
          md={6}
        >
          <img src={IntroPic} alt="pic" />
        </Grid>
      </Grid>
    </div>
  );
}

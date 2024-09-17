import { Typography } from "@mui/material";
import React from "react";
import "./style/banner.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
export default function Banner({ bannerTitle, page }) {
  return (
    <div>
      <Typography className="pageTitle" variant="h2">
        {page}
      </Typography>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://source.unsplash.com/random/?programming)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 500,
          opacity: 0.2,
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 200,
        }}
      >
        <Typography sx={{ p: 5 }} variant="h4">
          {bannerTitle}
        </Typography>
      </Box>
    </div>
  );
}

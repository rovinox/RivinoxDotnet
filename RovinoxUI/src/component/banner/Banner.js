import { Typography } from "@mui/material";
import React from "react";
import "./banner.scss";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
export default function Banner({ bannerTitle, page }) {
  const images = ["https://xclcamps.com/wp-content/uploads/coding-difference-1.jpg", "https://www.computersciencedegreehub.com/wp-content/uploads/2023/02/shutterstock_535124956-scaled.jpg", "https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=717/https://s3.cointelegraph.com/uploads/2023-01/158029af-a86a-402f-a5b5-e915cc69f138.JPG"  ];
  let number = 0


  switch(page) {
    case "ABOUT US":
      number = 1
      break;
    case "Career Support":
      number = 2
      break;
    default:
      number = 0
  }
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
            `url(${images[number]})`,
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

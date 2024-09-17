import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { courseList } from "../../component/course";
import gitPic from "../../asset/gitDownload.png";
import ReactPlayer from "react-player";

export default function Day3({ day }) {
  const selectedDay = courseList.filter((item) => item.day === day);

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {selectedDay.map((course, index) => (
          <Typography key={index} sx={{ mb: 5 }} component="h1" variant="h5">
            {course.title}
          </Typography>
        ))}
        <Typography sx={{ mt: 5 }} component="P">
          we're going to learn about Git & Github today, To get started we need
          create an account on{" "}
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub{" "}
          </a>
          and Only for Windrows you to download{" "}
          <a
            href="https://www.w3schools.com/css/css3_flexbox_items.asp"
            target="_blank"
            rel="noreferrer"
          >
            Git
          </a>{" "}
          if you have a mac click{" "}
          <a href="#mac" rel="noreferrer">
            Here
          </a>{" "}
          to see how you need to download Git
        </Typography>
        <Grid
          sx={{
            mt: 10,
            mb: 10,
          }}
          xs
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            style={{ width: "500px", height: "500px" }}
            src={gitPic}
            alt="git"
          />
        </Grid>
        <Typography sx={{ m: 5 }} component="P">
          After downloading it you need to install. During the install process
          just go with the default settings and keep clicking on next. when
          you're done follow alone with this video.
        </Typography>
        <ReactPlayer
          height={800}
          width={"100%"}
          muted={true}
          controls={true}
          playing={false}
          url={"https://www.youtube.com/watch?v=vExsOTgIOGw"}
        />
        <Typography id="mac" sx={{ m: 5 }} component="P" variant="h5">
          Here is the process of installing Git for Mac
        </Typography>
        <Typography id="mac" sx={{ m: 5 }} component="P">
          first you need to follow{" "}
          <a href="https://brew.sh/" target="_blank" rel="noreferrer">
            this
          </a>{" "}
          instruction. Then Follow alone with the video.
        </Typography>
        <ReactPlayer
          height={800}
          width={"100%"}
          muted={true}
          controls={true}
          playing={false}
          url={"https://www.youtube.com/watch?v=nZYJKXXMvkM"}
        />
      </Box>
    </Container>
  );
}

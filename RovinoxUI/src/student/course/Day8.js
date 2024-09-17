import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { courseList } from "../../component/course";
import HomeworkList from "../../component/HomeworkList";

export default function Day8({ day, batchId, isAdmin }) {
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
         <Typography sx={{ mb: 5 }} component="p">
          Functions are actions that a program needs to perform.
          So far we've learned about data, but data just by itself doesn't do anything.
          Functions take data and do something with it.
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>A function takes data called parameters, and what it returns are called arguments</li>
          <li>Functions are responsible for every action that needs to happen in a program</li>
          <li>Perameters and variables inside a function are called local variables</li>
          <li>Variables outside of a function are called global variables</li>
        </ul>
        <Typography sx={{ m: 5 }} component="p">
          <a
            href="https://github.com/rovinox/JavaScript-part-1"
            target="_blank"
            rel="noreferrer"
          >
            Here
          </a>{" "}
          is the link to homework{" "}
        </Typography>
        <HomeworkList
          isAdmin={isAdmin}
          batchId={batchId}
          selectedDay={selectedDay}
        />
        <ul style={{ width: "100%" }}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </Box>
      <HomeworkList
        isAdmin={isAdmin}
        batchId={batchId}
        selectedDay={selectedDay}
      />
    </Container>
  );
}

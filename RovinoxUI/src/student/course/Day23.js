import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { courseList } from "../../component/course";
export default function Day1({ day }) {
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
          Refs & Conditional rendering
        </Typography>
        <br></br>
        <br></br>
        <br></br>


        <Typography sx={{ mb: 5 }} component="p">
           Conditional rendering
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>Sometimes you need to when to hide or show something</li>
          <li>Conditional rendering: Show or hide a react node based on a condition</li>
          <li>You might want to only show something only after the user types the correct password for example</li>
        </ul>
        <Typography sx={{ mb: 5 }} component="p">
          React refs
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>Refs are a way to have direct access to an element in react</li>
          <li>You can attach refs to HTML element on the page</li>
          <li>Refs are quaranteed to be on the page before the page renders</li>
        </ul>
      </Box>
    </Container>
  );
}

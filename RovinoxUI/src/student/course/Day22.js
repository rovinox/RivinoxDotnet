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
          Moving Data around in react
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>As you've learned, data can move into a component via props</li>
          <li>Data can also be moved out of a component using a function</li>
          <li>A parent component can be notified of changes in one of its children components</li>
        </ul>
        <Typography sx={{ mb: 5 }} component="p">
          React Events
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>React events are based on JavaScript events and work the same on all browsers</li>
          <li>You add functionality to an element by attaching an event to it</li>
          <li>Some common events are onClick, onFocus, and onKeyDown</li>
          <li>Any click or touch on a keyboard, scroll on a page are all considered events</li>
        </ul>
      </Box>
    </Container>
  );
}

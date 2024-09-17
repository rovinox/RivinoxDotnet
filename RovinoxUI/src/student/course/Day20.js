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
          What is React?
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>React is the most popular JavaScript framework</li>
          <li>A framework is a technology that is based on a foundational programming language like JavaScript</li>
          <li>React is used to create powerful, fast applications on the web</li>
        </ul>
        <Typography sx={{ mb: 5 }} component="p">
          What Are Components
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>React works by creating components, which are indepened, re-usable pieces of functionality</li>
          <li>A component's internal data should be encapsulated from other components' data</li>
        </ul>
        <Typography sx={{ mb: 5 }} component="p">
          What Are State And Props
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>State is a component's internal data. State can be updated</li>
          <li>Props are external date received by a component; Props cannot be updated by the component</li>
        </ul>
      </Box>
    </Container>
  );
}

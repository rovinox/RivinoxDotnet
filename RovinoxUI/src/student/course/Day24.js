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
           Famous React Libraries You Should Know
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>Axios</li>
          <li>Material UI</li>
        </ul>
      </Box>
    </Container>
  );
}

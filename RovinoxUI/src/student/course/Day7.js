import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { courseList } from "../../component/course";
import HomeworkList from "../../component/HomeworkList";

export default function Day7({ day, batchId, isAdmin }) {
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
          JS Math and Arithmetic operations...sometimes you will need to do logical operations in JavaScript.
          This includes arithmetic(adding, substracting, dividing, multiplication), assignment, and comparison operators.
        </Typography>
        <h3>TYpes of JavaScript Operators</h3>
        <li>Arithmetic Operators</li>
          <li>Assignment Operators</li>
          <li>Comparison Operators</li>
          <li>Logical Operators</li>
          <li>Conditional Operators</li>
          <li>Type Operators</li>
      </Box>
      <HomeworkList
        isAdmin={isAdmin}
        batchId={batchId}
        selectedDay={selectedDay}
      />
    </Container>
  );
}

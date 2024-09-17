import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { courseList } from "../../component/course";
import HomeworkList from "../../component/HomeworkList";

export default function Day16({ day, batchId, isAdmin }) {
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
          JS loops are ways of performing a specific task repeatedly for Nth number of times
        </Typography>
        <ul style={{ width: "100%" }}>
        <li>The different types of loops are...
            <ul>
              <li>'for' loop</li>
              <li>'for in' loop</li>
              <li>'for of' loop</li>
              <li>'while loop' loop</li>
            </ul>
          </li>
          <li>the 'for loop' is the most widely used</li>
          <li>When working with loops, be sure to not create 'an infinite loop'</li>
          <li>An infinite loop will run forever, and ultimately crash your program</li>
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
      </Box>
    </Container>
  );
}

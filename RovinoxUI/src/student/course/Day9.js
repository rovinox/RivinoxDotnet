import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { courseList } from "../../component/course";
import HomeworkList from "../../component/HomeworkList";

export default function Day9({ day, batchId, isAdmin }) {
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
          Arrays are ways to store un-ordered list of things in one place.
          Arrays are used throughout all programming languages to store large
          sets of data.
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>Arrays are stored in brackets</li>
          <li>
            Arrays can...
            <ul>
              <li>Sort data</li>
              <li>Retrieve data</li>
              <li>Filter data</li>
              <li>Mutate data</li>
            </ul>
          </li>
          <li>
            You can know the number of things inside an array using the length
            property
          </li>
          <li>Properties of an array describe the array</li>
          <li>methods of an array change or access data in the array</li>
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
      <HomeworkList
        isAdmin={isAdmin}
        batchId={batchId}
        selectedDay={selectedDay}
      />
    </Container>
  );
}

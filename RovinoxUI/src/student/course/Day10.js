import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { courseList } from "../../component/course";
import HomeworkList from "../../component/HomeworkList";

export default function Day10({ day, batchId, isAdmin }) {
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
          Just like Arrays, Objects are another way of storing data with one big: it has key,value pairs.
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>Objects store data in key,value pairs</li>
          <li>The key is what describes the data, the value is what you set the key to equal</li>
          <li>'name' would be the key, and 'jane' would be the value </li>
          <li>Objects can...
            <ul>
                <li>Sort data</li>
                <li>Retrieve data</li>
                <li>Filter data</li>
                <li>Mutate data</li>
            </ul>
          </li>
          <li>Properties of an array describe the object</li>
          <li>methods of an array change or access data in the object</li>
          <li></li>
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

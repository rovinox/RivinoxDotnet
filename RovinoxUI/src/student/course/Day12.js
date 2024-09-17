import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { courseList } from "../../component/course";
import HomeworkList from "../../component/HomeworkList";

export default function Day12({ day, batchId, isAdmin }) {
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
            Array Methods Part 2: changing and deleting
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>You can delete any item in an array</li>
          <li>Deleting an item changes the index of all other items that come after it</li>
          <li>You can also re-assing an items value in an array</li>
          <li>Re-assignment does not change the index</li>
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

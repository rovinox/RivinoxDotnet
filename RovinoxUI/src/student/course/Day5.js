import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { courseList } from "../../component/course";
import HomeworkList from "../../component/HomeworkList";
export default function Day5({ day, batchId, isAdmin }) {
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
          What JavaScript can do...
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>Change HTML content
            <ul>
              <li>document.getElementById("demo").innerHTML = "Hello JavaScript";</li>
            </ul>
          </li>
          <li>Change HTML attribute values 
            <ul>
                <li>document.getElementById('myImage').src='pic_bulboff.gif'"</li>
            </ul>
          </li>
          <li>Change HTML styles(CSS)
            <ul>
                <li>document.getElementById("demo").style.fontSize = "35px"</li>
              </ul>
          </li>
          <li>Show/Hide HTML elements
            <ul>
                <li>document.getElementById("demo").style.display = "none"</li>
            </ul>
          </li>
        </ul>
        <HomeworkList
          isAdmin={isAdmin}
          batchId={batchId}
          selectedDay={selectedDay}
        />
      </Box>
    </Container>
  );
}

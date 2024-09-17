import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { courseList } from "../../component/course";
import HomeworkList from "../../component/HomeworkList";

export default function Day15({ day, batchId, isAdmin }) {
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
          Sometimes in a program, you want something to happen only if it meets a certain condtion.
          Show the report only if it's the correct user logged in, or charge the credit card only after the user clicks 'Confirm Purchase'
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>Conditional statements are logic pieces of code to control the flow a program</li>
          <li>Conditional statements are run in the order that they appear in a program</li>
          <li>Examples of conditional statements are...
            <ul>
                <li>'&&' conditional: two statements has to be true</li>
                <li>'or' conditional: at least of the statements has to be true</li>
            </ul>
          </li>
          <li>Types of condtional statements statements are...
            <ul>
                <li>Use 'if' to specify a block of code to be executed, if a specified condition is true</li>
                <li>Use else to specify a block of code to be executed, if the same condition is false</li>
                <li>Use else if to specify a new condition to test, if the first condition is false</li>
                <li>Use switch to specify many alternative blocks of code to be executed</li>
            </ul>
          </li>
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

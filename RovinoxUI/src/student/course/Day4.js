import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { courseList } from "../../component/course";
import HomeworkList from "../../component/HomeworkList";

export default function Day4({ day, batchId, isAdmin }) {
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
          <Typography key={index} sx={{ mb: 5 }} component="h1" variant="h3">
            {course.title}
          </Typography>
        ))}
        <Typography sx={{ mb: 5 }} component="p">
          Welcome to javascript, where the crying begins.
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>JavaScript is a programming language, "the language of the web"</li>
          <li>Learning JS will give allow you to be able to learn any other language</li>
          <li>You can create websites and make apps using JS</li>
          <li>Other frameworks and libraries like React and Angular are based on JavaScript</li>
        </ul>
        <Typography sx={{ mb: 5 }} component="p">
          Terminology
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>Variable: stores data in a value. All data in a progrma is stored in some sort of data </li>
          <li>Variables can be text, numbers, or anything JS considers data</li>
          <li><bold>let</bold>  and <bold>const</bold> are ways to define variables</li>
          <li>Other frameworks and libraries like React and Angular are based on JavaScript</li>
        </ul>
        <Typography sx={{ mb: 5 }} component="p">
          JS Data Types
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>Strings</li>
          <li>Numbers</li>
          <li>Objects</li>
          <li>Arrays</li>
          <li>Null</li>
          <li>Undefined</li>
          <li>All of these data types are stored in what is called a variable
          <ul>
              <li>A variable can initialized the 'var', 'let', or 'const' keywords</li>
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

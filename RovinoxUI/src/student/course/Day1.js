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
          What is HTML?
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>HTML stands for Hyper Text Markup Language</li>
          <li>HTML is the standard markup language for creating Web pages</li>
          <li>HTML describes the structure of a Web page</li>
          <li>HTML consists of a series of elements</li>
          <li>HTML elements tell the browser how to display the content</li>
          <li>
            HTML elements label pieces of content such as "this is a heading",
            "this is a paragraph", "this is a link", etc.
          </li>
        </ul>
        <Typography sx={{ m: 5 }} component="p">
          you can read more about HTML{" "}
          <a href="https://www.w3schools.com" target="_blank" rel="noreferrer">
            Here
          </a>
        </Typography>

        <Typography sx={{ mb: 5 }} component="p">
          What is CSS?
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>CSS stands for Cascading Style Sheets</li>
          <li>
            CSS determines the styling of the web
          </li>
          <li>Styling rules cascade down, that means the lowest style ruling will take precedence</li>
          <li>External stylesheets are stored in CSS files</li>
        </ul>
        <Typography sx={{ m: 5 }} component="p">
          you can read more about CSS{" "}
          <a
            href="https://www.w3schools.com/css/css_intro.asp"
            target="_blank"
            rel="noreferrer"
          >
            Here
          </a>
        </Typography>

        <Typography sx={{ m: 5 }} component="p">
          Here is the link to today's classwork{" "}
          <a
            href="https://github.com/rovinox/html-css-part-1/tree/main/HTML-CSS-Practice-Problems"
            target="_blank"
            rel="noreferrer"
          >
            Here
          </a>
        </Typography>
      </Box>
    </Container>
  );
}

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { courseList } from "../../component/course";
export default function Day2({ day }) {
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
        <Typography sx={{ mt: 5 }} component="P">
          we're going to continue to work on yesterday's project. Today we're
          going to focus on Level 2 and Level 3
        </Typography>
        <Typography sx={{ mt: 2 }} component="P">
          today we're also going to learn about{" "}
          <a
            href="https://www.w3schools.com/css/css3_flexbox_items.asp"
            target="_blank"
            rel="noreferrer"
          >
            Flex-Box
          </a>
        </Typography>
        <ul style={{ width: "100%" }}>
          <li>Flexbox makes it easy to align items on a page</li>
          <li>With flex, you can easily determine how an element should look on different devices</li>
          <li>Flexbox makes it easy to to give width and space to items without explicitly setting those values</li>
        </ul>
      </Box>
    </Container>
  );
}

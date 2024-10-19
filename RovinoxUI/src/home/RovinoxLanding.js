
import "./RovinoxLanding.css";
import pic1 from "../asset/bro.svg";
import pic2 from "../asset/Group2.svg";
import pic3 from "../asset/Group3.svg";
import pic4 from "../asset/Group4.svg";
import checkMark from "../asset/checkMark.svg";
import IntroVideo from "./IntroVideo";
import CourseTable from "../component/CourseTable";
import { CoursePromise } from "./RovinoxLanding.styled.tsx";
import FAQ from "../component/FAQ";
import Grid from "@mui/material/Grid";
import Header from "./HeaderLanding.js";
import "react-chat-widget/lib/styles.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Footer from "./Footer";

export default function RovinoxLanding() {
  const points = [
    "Live, real-time instruction",
    "Great Support from day-one to your first day in tech",
    "Learn in-demand job ready skills to be come a SoftWare Developer",
    "Dive into web development with fun and cool projects",
  ];
  const section3rd = [
    {
      title: "High Quality Lectures",
      description:
        "All lectures have been very well prepared for the best learning experience of future developers.",
      image: pic2,
    },
    {
      title: "In-demand, Job Ready Skills",
      description:
        "Learn all major Web Technologies: HTML5, CSS3, Javascript, Mobile Apps, API's: Google Maps, Facebook and MORE!",
      image: pic3,
    },
    {
      title: "Get Help Anytime!",
      description:
        "Getting Stuck? Ask questions any time directly any time and we are happy to help!",
      image: pic4,
    },
  ];
  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    <>
      <Header />
      <IntroVideo />
      <Grid Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <img src={pic1} alt="pic" />
        </Grid>
        <Grid
          xs={12}
          md={6}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {points.map((point) => (
            <CoursePromise>
              {" "}
              <img style={{ marginRight: 5 }} src={checkMark} alt="pic" />
              {point}
            </CoursePromise>
          ))}
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          "& > :not(style)": {
            m: 1,
            width: 400,
            height: 350,
          },
        }}
      >
        {section3rd.map((item) => (
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
            }}
            key={item.title}
          >
            <div style={{ height: 115 }}>
              <img src={item.image} alt=" pic" />
            </div>
            <div style={{ height: 115 }}>
              <Typography variant="h4">{item.title}</Typography>
            </div>
            <div style={{ height: 115 }}>
              <Typography sx={{ p: 2 }} variant="p">
                {item.description}
              </Typography>
            </div>
          </Paper>
        ))}
      </Box>
      <CourseTable  tableAction="apply"/>
      <FAQ />
      <Footer />

      {/* <Widget
        subtitle="Please Include phone number in the message"
        title="Welcome To Rovinox"
      /> */}
    </>
  );
}

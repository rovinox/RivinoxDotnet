import { Typography } from "@mui/material";
import React from "react";
import Banner from "../component/banner/Banner";
import Grid from "@mui/material/Unstable_Grid2";
import HeaderLanding from "../home/HeaderLanding";
import pic1 from "../asset/bro2.svg";
import pic2 from "../asset/pana.svg";
import pic3 from "../asset/pana1.svg";
import Footer from "../home/Footer";

export default function AboutUs() {
  return (
    <>
      <HeaderLanding />
      <Banner
        page="ABOUT US"
        bannerTitle="Immersive Experiences that Change Lives About the Rovinox Bootcamp
        Experience"
      />
      <Grid Grid container spacing={2}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 10,
          }}
          xs={12}
          md={6}
        >
          <div>
            <Typography
              sx={{
                mb: 5,
              }}
              variant="h4"
            >
              About Rovinox
            </Typography>
            <Typography variant="p">
              Rovinox is a coding Bootcamp. The Rovinox brand specializes in
              immersive, online courses. We help student lend their dream job in
              the tech industry without prior knowledge. We provide necessary
              skilled to land there for its job, And career support to help them
              in the process.
            </Typography>
          </div>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 10,
          }}
          xs={12}
          md={6}
        >
          <img src={pic1} alt="pic" />
        </Grid>
      </Grid>
      <Grid Grid container spacing={2}>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 10,
          }}
          xs={12}
          md={6}
          order={{ md: 1, xs: 2 }}
        >
          <img src={pic2} alt="pic" />
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 10,
          }}
          xs={12}
          md={6}
          order={{ md: 2, xs: 1 }}
        >
          <div>
            <Typography
              sx={{
                mb: 5,
              }}
              variant="h4"
            >
              A Community Is Waiting For You
            </Typography>
            <Typography variant="p">
              Our intense courses in Software Engineering, are hands-on,
              project-based, and are designed by educators with real-world
              industry knowledge. We offer challenging, focused training
              designed to equip students with the skills to start their journey
              toward a career in tech
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Grid Grid container spacing={2}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 10,
          }}
          xs={12}
          md={6}
        >
          <div>
            <Typography
              sx={{
                mb: 5,
              }}
              variant="h4"
            >
              We Live In a Digital World
            </Typography>
            <Typography variant="p">
              And that world is in need of developers and designers who know how
              to create the backbone of the global economy. Despite the
              widespread need for coders, they are still a rare breed. The time
              and financial investment of earning a traditional four-year
              computer science degree remains an obstacle. Rovinox’s dev
              Bootcamp was founded to fill that gap. Our programs are intense
              commitments designed to offer immersive, hands-on instruction to
              get the next generation of developers up to speed and into the
              workforce. Learning development. At Rovinox, we believe it is
              something anyone who is willing to work hard can do. “I consider
              my time at Rovinox to be one of my greatest decisions.” Hear From
              Graduates.
            </Typography>
          </div>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 10,
          }}
          xs={12}
          md={6}
        >
          <img src={pic3} alt="pic" />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

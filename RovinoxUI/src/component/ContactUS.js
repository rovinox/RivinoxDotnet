import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import contactUS from "../asset/contact-us-showcase.png";
import Banner from "./Banner";
import Footer from "../home/Footer";
import HeaderLanding from "../home/HeaderLanding.js";
import axios from "axios";
import { toast } from "react-toastify";
import ReactToastify from "../component/ReactToastify.js";

export default function ContactUs() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      phoneNumber: data.get("phoneNumber"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      message: data.get("message"),
    };
    try {
      const result = await axios.post("/email", user);
      if (result) {
        toast.success("Your Message was Successfully Sent");
      }
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 409) {
        toast.error("This email address already exists");
      } else {
        toast.error(`${err?.message}`);
      }
    }
  };
  return (
    <div>
      <ReactToastify />
      <HeaderLanding />
      <Banner
        page="Contact US"
        bannerTitle="Please Send us All of Your Questions"
      />
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
        >
          <img src={contactUS} alt="pic" />
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 2,
          }}
          xs={12}
          md={6}
        >
          <Box
            component="form"
            Validate
            onSubmit={handleSubmit}
            sx={{ mt: 3, p: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  name="message"
                  label="Message"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  id="standard-number"
                  label="Phone Number (optional)"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              //onClick={navigateToHome}
            >
              submit
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

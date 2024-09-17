import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ReactToastify from "../component/ReactToastify.js";
import { toast } from "react-toastify";
import moment from "moment";
import Header from "../home/Header";
import Banner from "./Banner.js";
import StepBar from "./StepBar.js";
import Group7 from "../asset/Group7.svg";
import Footer from "../home/Footer.js";

export default function Apply() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const batchId = state?.id;
  const [selectedBatch, setSelectedBatch] = useState(batchId);
  const [batch, setBatch] = useState([]);

  useEffect(() => {
    const getBatch = async () => {
      try {
        const result = await axios.get("/getbatch");
        console.log("result: ", result);

        setBatch(result.data.batch);
      } catch (e) {
        console.log(e);
      }
    };
    getBatch();

  }, []);
  const batchList =
    batch.length > 0 &&
    batch.map((option) => {
      return {
        value: option.batchId,
        label: `${moment(option.startDate).format("MMM Do YY")} -
                          ${moment(option.endDate).format("MMM Do YY")}`,
      };
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get("email"),
      phoneNumber: data.get("phoneNumber"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      password: data.get("password"),
      batchId: selectedBatch,
    };
    try {
      const result = await axios.post("/register", user);
      console.log("result: ", result);
      // await axios.post("/email", user);
      if (result.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data));
        navigate("/student");
        console.log("hi");
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
    <>
      <ReactToastify />
      <Header />
      <Banner bannerTitle="Here are the steps we follow for admission. We understand you may or may not have prior coding experience" />
      <StepBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            padding: "10px",
            maxWidth: "600px",
          }}
        >
          <h1>Have Questions About Applying?</h1>
          <Typography>
            Our admissions team is made of warm and cuddly non-threatening
            people who would love to hear from you. Right now the odds are very
            good that they are bored doing some mundane part of their job, and
            they’d rather help you with whatever questions you have.
          </Typography>
        </div>
      </div>
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
          <img src={Group7} alt="pic" />
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
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Typography>
              Your application is the first step to your new future. You'll need
              about{" "}
              <Typography component="span" variant="h5">
                30 seconds
              </Typography>{" "}
              to complete your portion. Relax,{" "}
              <Typography component="span" variant="h5">
                no payment
              </Typography>{" "}
              or{" "}
              <Typography component="span" variant="h5">
                commitment
              </Typography>{" "}
              will be required during the application process.
            </Typography>
          </Box>
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
                  name="password"
                  label="Create a Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="course"
                  select
                  label="Course"
                  value={selectedBatch}
                >
                  {batchList.length > 0 &&
                    batchList.map((option) => (
                      <MenuItem
                        onClick={() => setSelectedBatch(option.value)}
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {/* <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => navigate("/student")}
      >
        xdfgdhdh
      </Button> */}
      <Footer />
    </>
  );
}

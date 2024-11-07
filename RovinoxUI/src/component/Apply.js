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
import HeaderLanding from "../home/HeaderLanding.js";
import Banner from "./banner/Banner.js";
import StepBar from "./StepBar.js";
import Group7 from "../asset/Group7.svg";
import Footer from "../home/Footer.js";
import { apiService } from "../api/axios.js";
import ListOfBatch from "./common/ListOfBatch.js";
import { useDispatch } from "react-redux";
import { setUser } from "../duck/accountSlice.js";

export default function Apply() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const batchId = state?.id;
  const [selectedBatch, setSelectedBatch] = useState(batchId);
  console.log('selectedBatch: ', selectedBatch);
  const [batch, setBatch] = useState([]);

  useEffect(() => {
    const getBatch = async () => {
      try {
        const result = await apiService.get("http://localhost:5122/api/batch");
        console.log("result: ", result);

        setBatch(result.data);
      } catch (e) {
        console.log(e);
      }
    };
    getBatch();

  }, []);
  const batchList =
    batch?.length > 0 &&
    batch.map((option) => {
      console.log(option);
      return {
        value: option.id,
        label: ` ${option.course} / ${moment(option.startDate).format("MMM Do YY")} -
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
      batchId: selectedBatch ?? null,
    };

    const confirmPassword = data.get("confirmPassword");
    if(confirmPassword !== user.password){
      toast.error("The password didn't not match");
      return
    }

    try {
      const response = await apiService.post("http://localhost:5122/api/account/register", user);

      // await axios.post("/email", user);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        delete response.data.token;
        dispatch(setUser({user:response.data}))
        navigate("/student");
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
      <HeaderLanding />
      <Banner page="Apply" bannerTitle="Here are the steps we follow for admission. We understand you may or may not have prior coding experience" />
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
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"

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
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  
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
              <ListOfBatch
              value={selectedBatch}
               onClick={setSelectedBatch}
               defaultValue={selectedBatch}
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

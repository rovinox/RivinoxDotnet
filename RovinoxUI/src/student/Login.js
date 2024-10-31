import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { apiService } from "../api/axios";
import { toast } from "react-toastify";
import ReactToastify from "../component/ReactToastify";
import HeaderLanding from "../home/HeaderLanding";
import codingAnimation from "../asset/codingAnimation.svg";
import { setUser } from "../duck/accountSlice";
import { useDispatch } from "react-redux";
const LOGIN_URL = "http://localhost:5122/api/account/login";


export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiService.post(
        LOGIN_URL,
        { email, password: pwd }
   
      );
      console.log('response?.data', response?.data);

      if (response?.data){
        localStorage.setItem("token", JSON.stringify(response.data.token));
        delete response.data.token;
        dispatch(setUser({user:response.data}))
      }
        
      setEmail("");
      setPwd("");
      navigate("/student");
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Missing email name or Password");
      } else if (err.response?.status === 401) {
        toast.error("Incorrect email or password");
      } else {
        toast.error("Login Failed");
      }
    }
  };

  return (
    <>
      <HeaderLanding />
      <ReactToastify />
       <Grid Grid container spacing={2}>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          xs={12}
          md={6}
        >
          <img style={{marginTop:100}} src={codingAnimation} alt="pic" />
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
              my: 40,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              Validate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/apply" variant="body2">
                    {"Don't have an account? Apply Here"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

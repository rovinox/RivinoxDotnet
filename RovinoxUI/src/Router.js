import { Routes, Route, BrowserRouter } from "react-router-dom";
import RovinoxLanding from "./home/RovinoxLanding.js";
import StudentLanding from "./student/StudentLanding.js";
import Login from "./student/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber, grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Apply from "./component/Apply";
import AdminLanding from "./admin/AdminLanding";
import "./index.css";
import AboutUs from "./component/AboutUs.js";
import CareerSupport from "./component/CareerSupport.js";
import Pricing from "./component/Pricing.js";
import OneAndOne from "./component/OneAndOne.js";
import ContactUS from "./component/ContactUS.js";
import NotFound from "./component/NotFound.js";
import PaymentForm from "./component/payment/PaymentForm.js";
import Profile from "./component/profile/Profile.js";
import CurriculumContent from "./component/curriculum/CurriculumContent.js";
import MyAction from "./component/myAction/MyAction.js";
import CommentLanding from "./component/discussion/CommentLanding.js";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: { main: "#0DA8DB" },
          divider: "#fff",
          background: {
            default: "#191A3A",
            paper: "#212242",
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});
//pull reuqest test
export default function Router() {
  const selectedTheme = "dark";
  // const theme = createTheme({
  // palette: {
  //   mode: selectedTheme,
  //   primary: {
  //     main: teal[500],
  //   },
  //   secondary: {
  //     main: purple[500],
  //   },
  // },
  //});
  const theme = createTheme(getDesignTokens(selectedTheme));
  console.log("theme: ", theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RovinoxLanding />} />
          <Route path="/student" element={<StudentLanding />} />
          <Route path="/student/curriculumId/:curriculumId" element={<CurriculumContent />} />
          <Route path="/student/curriculumId/:curriculumId/discussions" element={<CommentLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/admin" element={<AdminLanding />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/support" element={<CareerSupport />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/meeting" element={<OneAndOne />} />
          <Route path="/contactus" element={<ContactUS />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/myAction" element={<MyAction/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

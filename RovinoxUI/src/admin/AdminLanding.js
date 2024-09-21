import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StudentList from "./StudentList";
import AddBatch from "./AddBatch";
import Header from "../component/Header";
import GradeHomework from "./GradeHomework";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RemoveBatch from "./RemoveBatch";
import { apiService } from "../api/axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdminLanding() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [batch, setBatch] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // if (user?.role === "student") {
    //   navigate("/student");
    // }
    const getBatch = async () => {
      try {
        const result = await apiService.get("http://localhost:5122/api/batch");
        console.log("result: ", result);
        if(result.data){
          setBatch(result.data);
        }
      } catch (e) {}
    };
    getBatch();
  }, [navigate, user?.role]);

  return (
    <>
      <Header />
      <Box component="div" sx={{ width: "100%", mt: 15 }}>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Student List" {...a11yProps(0)} />
            <Tab label="Remove Batch" {...a11yProps(1)} />
            <Tab label="Add Batch" {...a11yProps(2)} />
            <Tab label="Grade Homework" {...a11yProps(3)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <StudentList batch={batch} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RemoveBatch batch={batch} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AddBatch />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <GradeHomework setBatch={setBatch} batch={batch} />
        </TabPanel>
      </Box>
      {/* <Test /> */}
    </>
  );
}

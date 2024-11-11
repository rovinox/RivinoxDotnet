import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Header from "../component/header/Header";
import GradeHomework from "./GradeHomework";

import { useNavigate } from "react-router-dom";

import VerticalTabs from "../component/batch/VerticalTabs";
import { useDispatch } from "react-redux";
import { getBatch } from "../duck/batchSlice";

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
         {children}
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
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [batch, setBatch] = useState([]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getBatch());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Box component="div" sx={{ width: "100%", mt: 15 }}>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Student List" {...a11yProps(0)} />
            <Tab label="Batch" {...a11yProps(1)} />
            <Tab label="Grade Homework" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <h1>list</h1>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <VerticalTabs />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <GradeHomework />
        </TabPanel>
      </Box>
      {/* <Test /> */}
    </>
  );
}

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
// import { makeStyles } from '@mui/styles';
import Box from "@mui/material/Box";
import RemoveBatch from "./RemoveBatch";
import AddBatch from "./AddBatch";
import AddCurriculum from "../batchCurriculum/AddCurriculum";
import StartBatch from "./StartBatch";
import BatchStudent from "./BatchStudent";
import NewEnrollment from "../enrollment/NewEnrollment";

// const useStyles = makeStyles({
//     root: {
//         flexGrow: 1,
//     },
//     tabpanel: {

//         marginLeft: "auto",
//         marginRight: "auto"

//     }
// });

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && (
        <Box
          fullWidth
          sx={{
            minHeight: 700,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            p:5
          }}
        >
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ batch }) {
  const [value, setValue] = React.useState(0);
  //   const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        // sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Start Batch" {...a11yProps(0)} />
        <Tab label="Add Batch" {...a11yProps(1)} />
        <Tab label="Remove Batch" {...a11yProps(2)} />
        <Tab label="Batch Students" {...a11yProps(3)} />
        <Tab label="Add Curriculum" {...a11yProps(4)} />
        <Tab label="New Enrollment" {...a11yProps(5)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <StartBatch />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddBatch />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RemoveBatch />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BatchStudent />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AddCurriculum />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <NewEnrollment />
      </TabPanel>
    </Box>
  );
}

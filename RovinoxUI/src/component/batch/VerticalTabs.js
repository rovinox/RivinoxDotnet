import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
// import { makeStyles } from '@mui/styles';
import Box from "@mui/material/Box";
import RemoveBatch from "../../admin/RemoveBatch";
import AddBatch from "../../admin/AddBatch";
import AddCurriculum from "../batchCurriculum/AddCurriculum";

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
        <Tab label="Add Batch" {...a11yProps(0)} />
        <Tab label="Remove Batch" {...a11yProps(1)} />
        <Tab label="Add Curriculum" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AddBatch />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RemoveBatch />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddCurriculum />
      </TabPanel>
    </Box>
  );
}

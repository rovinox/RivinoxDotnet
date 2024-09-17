import React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const labels = {
  0: "Not Rated",
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
export default function HomeworkView({ homeworkList }) {
  const [expanded, setExpanded] = useState(null);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div style={{ marginTop: "50px" }}>
      {" "}
      {homeworkList?.length > 0 &&
        homeworkList.map((item, index) => {
          return (
            <Accordion
              sx={{ width: 800 }}
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    Title:
                    <Typography variant="span" sx={{ ml: 1 }}>
                      {" "}
                      {item?.title}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{ display: "flex", justifyContent: "center" }}
                    xs={4}
                  >
                    Graded:{" "}
                    {item.graded ? (
                      <CheckCircleIcon sx={{ ml: 1 }} color="primary" />
                    ) : (
                      <CancelIcon sx={{ color: "red", ml: 1 }} />
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    Comment:{" "}
                    {item?.comment ? (
                      <Typography sx={{ ml: 1 }} variant="span">
                        Yes
                      </Typography>
                    ) : (
                      <Typography sx={{ ml: 1 }} variant="span">
                        No
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Typography sx={{ textAlign: "center" }}>
                      <a href={item.link} target="_blank" rel="noreferrer">
                        Homework Link
                      </a>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Rating name="read-only" value={item?.rating} readOnly />
                      {item?.rating !== null && (
                        <Box sx={{ ml: 2 }}>{labels[item?.rating]}</Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid sx={{ width: "100%", textAlign: "center" }}>
                  <TextField
                    sx={{ mt: 6 }}
                    label="Comment"
                    multiline
                    fullWidth
                    rows={4}
                    disabled={true}
                    defaultValue={item?.comment}
                  />
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
}

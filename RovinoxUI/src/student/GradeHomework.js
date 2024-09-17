import { useEffect, useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactToastify from "../component/ReactToastify.js";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

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

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

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
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
export default function GradeHomework({ selectedDay, batchId }) {
  const [homework, setHomeWork] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(-1);
  const gradeHomeView = useSelector(
    (state) => state.changeGradeHomeView.gradeHomeView
  );

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const getUsers = useCallback(async () => {
    console.log("day", selectedDay[0].day);
    try {
      const result = await axios.post("/gethomework", {
        day: selectedDay[0].day,
        batchId,
      });

      if (result?.data.homeWork) {
        setHomeWork(result.data.homeWork);
      }

      console.log("result.data", result.data.homeWork);
    } catch (err) {
      console.log(err);
    }
  }, [batchId, selectedDay]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const handMarkAsGraded = async (homeWorkId, graded) => {
    console.log("from fun", homeWorkId);
    const cloneHomework = [...homework];
    const newHomework = cloneHomework.map((homework) => {
      if (homeWorkId === homework.homeworkId) {
        return { ...homework, loading: true };
      } else {
        return { ...homework, loading: false };
      }
    });
    console.log(newHomework);
    setHomeWork(newHomework);
    try {
      const result = await axios.put("/gradehomework", {
        homeWorkId,
        graded: !graded,
      });

      if (result?.data) {
        toast.success(`${result?.data?.message}`);
        getUsers();
      }

      console.log("result.data", result.data);
    } catch (err) {
      console.log(err);
      toast.error(`${err?.message}`);
    }
  };
  const handleComment = async (homeWorkId) => {
    setIsCommentEdit(!isCommentEdit);
    console.log("handle vvv", { homeWorkId, comment });
    if (isCommentEdit) {
      try {
        const result = await axios.put("/gradehomework", {
          homeWorkId,
          comment,
        });

        if (result?.data) {
          toast.success(`${result?.data?.message}`);
          getUsers();
          setComment("");
        }

        console.log("result.data", result.data);
      } catch (err) {
        console.log(err);
        toast.error(`${err?.message}`);
      }
    }
  };
  const handleRating = async (homeWorkId, value) => {
    console.log({ homeWorkId, value });

    try {
      const result = await axios.put("/gradehomework", {
        homeWorkId,
        rating: value,
      });

      if (result?.data) {
        toast.success(`${result?.data?.message}`);
        getUsers();
      }

      console.log("result.data", result.data);
    } catch (err) {
      console.log(err);
      toast.error(`${err?.message}`);
    }
  };
  console.log("homework", homework);
  return (
    <div style={{ marginBottom: 30 }}>
      <ReactToastify />
      {batchId ? (
        <>
          {homework.length > 0 &&
            homework.map((item, index) => {
              return (
                <Accordion
                  sx={{ width: 1000 }}
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
                        Name:
                        <Typography variant="span" sx={{ ml: 1 }}>
                          {" "}
                          {item.firstName} {item.lastName}
                        </Typography>
                      </Grid>
                      <Grid
                        sx={{ display: "flex", justifyContent: "center" }}
                        item
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
                      <Grid item xs={4}>
                        <Typography>
                          <a href={item.link} target="_blank" rel="noreferrer">
                            Homework Link
                          </a>
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Rating
                            name="hover-feedback"
                            value={item?.rating}
                            precision={0.5}
                            getLabelText={getLabelText}
                            onChange={(event, value) => {
                              handleRating(item.homeworkId, value);
                            }}
                            onChangeActive={(event, newHover) => {
                              setHover(newHover);
                            }}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />
                          {item?.rating !== null && (
                            <Box sx={{ ml: 2 }}>
                              {labels[hover !== -1 ? hover : item?.rating]}
                            </Box>
                          )}
                        </Box>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        xs={4}
                      >
                        {item.loading ? (
                          <CircularProgress sx={{ mt: 1 }} color="success" />
                        ) : (
                          <>
                            <Typography sx={{ mr: 2 }}>
                              {" "}
                              Mark as complected?
                            </Typography>
                            <Typography>No</Typography>
                            <FormControlLabel
                              onClick={() =>
                                handMarkAsGraded(item.homeworkId, item.graded)
                              }
                              control={
                                <IOSSwitch
                                  sx={{ ml: 3 }}
                                  defaultChecked={item.graded}
                                />
                              }
                            />
                            <Typography>Yes</Typography>
                          </>
                        )}
                      </Grid>
                    </Grid>
                    <Grid sx={{ width: "100%", textAlign: "center" }}>
                      {(isCommentEdit || item?.comment) && (
                        <TextField
                          sx={{ mt: 6 }}
                          id="outlined-multiline-static"
                          label="Comment"
                          multiline
                          fullWidth
                          rows={4}
                          onChange={(e) => setComment(e.target.value)}
                          disabled={!isCommentEdit}
                          defaultValue={item?.comment}
                        />
                      )}
                      {isCommentEdit && (
                        <Button
                          sx={{ mt: 2, mr: 5 }}
                          onClick={() => setIsCommentEdit(false)}
                          variant="contained"
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        onClick={() => {
                          handleComment(item.homeworkId);
                          console.log("from iten", item);
                        }}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2 }}
                      >
                        {isCommentEdit
                          ? "save"
                          : item?.comment
                          ? "edit"
                          : "comment"}
                      </Button>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </>
      ) : (
        <>
          {gradeHomeView && (
            <Typography variant="h5">
              Please select a batch from admin dashboard
            </Typography>
          )}
        </>
      )}
    </div>
  );
}

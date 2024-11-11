import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./courseTable.css";
import Typography from "@mui/material/Typography";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { ApplyButton2 } from "../home/RovinoxLanding.styled.tsx";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { apiService } from "../api/axios.js";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import ReactToastify from "./ReactToastify.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0DA8DB",
    fontSize: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
  [`&.${tableCellClasses.table}`]: {
    border: "2px solid red",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.background.default,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CourseTable({ tableAction, handleEnrollment }) {
  let navigate = useNavigate();
  const [batch, setBatch] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    let newBatch = [];
    const getBatch = async () => {
      try {
        const result = await apiService.get("http://localhost:5122/api/batch");
        console.log("result: ", result);
        if (result.data) {
          result.data.forEach((item) => {
            var startDate = moment([
              moment(moment(item.startDate) - 7 * 24 * 3600 * 1000).format(
                "MM-DD-YY"
              ),
            ]);
            let days = "";
            item.daysOfTheWeek.forEach((day, index) => {
              const isLastIndex = item.daysOfTheWeek.length - 1 === index;

              days += isLastIndex
                ? day.replace("day", "")
                : `${day.replace("day", "")},`;
            });
            item.days = days;
            var now = moment([moment().format("MM-DD-YY")]);
            let dateDiff = startDate.diff(now, "days");
            if (dateDiff === 0) {
              item.isExpired = true;
              newBatch.push(item);
            } else {
              item.isExpired = false;
              newBatch.push(item);
            }
          });
          setBatch(newBatch);
          console.log("data", newBatch);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getBatch();
  }, []);

  const disableBatch = async () => {
    handleClose();

    try {
      const result = await axios.put("/removebatch", {
        batchId,
      });
      if (result?.data?.message) {
        toast.success(`${result?.data?.message}`);
      }
    } catch (err) {
      toast.error(`${err?.message}`);
    }
  };

  const handleTableAction = (row) => {
    const { id } = row;
    if(tableAction === "enrollment" && typeof handleEnrollment === "function") {
      handleEnrollment(row);
      return
    }
    if (tableAction === "remove") {
      handleOpen();
      setBatchId(id);
      return
    }
    if (tableAction === "apply") {
      if (!row.isExpired) {
        navigate("/apply", {
          state: {
            id,
          },
        });
      }
      return
    }
  };

  return (
    <Paper sx={{ pb: 20 }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to Delete this Batch?
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={disableBatch} color="primary" variant="contained">
              Yes
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              color="error"
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
      <ReactToastify />
      <Grid sx={{ mt: 9, pr: 5, pl: 5 }} Grid container spacing={2}>
        <Grid sx={{ textAlign: "center" }} xs={12} md={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            {tableAction === "apply" && (
              <>
                {" "}
                <h1>See What Cohorts Are Starting Soon</h1>
                <Typography sx={{ mb: 10 }}>
                  Ready to plan out your Bootcamp experience? Start by viewing
                  the upcoming course start dates. You can easily start your
                  application once you’ve chosen a cohort.
                </Typography>{" "}
              </>
            )}
          </div>
        </Grid>
        <Grid xs={12} md={12}>
          <TableContainer
            sx={{
              border: "1px #0DA8DB solid",
              borderRadius: "10px",
            }}
          >
            <Table sx={{ overflow: "hidden" }} aria-label="simple table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Course</StyledTableCell>
                  <StyledTableCell align="right">
                    Start/End Date
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Schedule and time
                  </StyledTableCell>
                  <StyledTableCell align="right">Tuition</StyledTableCell>
                  <StyledTableCell align="right">
                    Deadline to Enroll
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Select a Batch to Apply
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {batch?.length > 0 &&
                  batch.map((row) => (
                    <StyledTableRow
                      key={row.batchId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.course}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {moment(row.startDate).format("MMM Do")} -
                        {moment(row.endDate).format("MMM Do")}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {/* {row.daysOfTheWeek.map((item, index) => (<> 
                        { item}
                        
                        </>))} */}
                        {/* console.log(moment(myDate).format("hh:mm a")) */}
                        {row.days} / {moment(row.startTime).format("hh:mm a")} -{" "}
                        {moment(row.endTime).format("hh:mm a")}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        ${row.cost}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.isExpired ? (
                          <Typography color="error">Expired</Typography>
                        ) : (
                          moment(
                            moment(row.startDate) - 7 * 24 * 3600 * 1000
                          ).format("MMM Do")
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {tableAction === "remove" && (
                          <Button
                            onClick={() => {
                              handleTableAction(row);
                            }}
                            variant="contained"
                            color="error"
                          >
                            disable
                          </Button>
                        )}
                        {tableAction === "apply" && (
                          <ApplyButton2
                            sx={{
                              background:
                                "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)",
                              color: "white",
                            }}
                            onClick={() => handleTableAction(row)}
                          >
                            Apply
                          </ApplyButton2>
                        )}
                        {tableAction === "enrollment" &&  (
                          <ApplyButton2
                            sx={{
                              background:
                                "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)",
                              color: "white",
                            }}
                            onClick={() => handleTableAction(row)}
                          >
                            enroll
                          </ApplyButton2>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}

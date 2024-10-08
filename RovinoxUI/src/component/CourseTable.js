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
import { apiService } from "../api/axios.js";

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

export default function CourseTable() {
  let navigate = useNavigate();
  const [batch, setBatch] = useState([]);

  useEffect(() => {
    let newBatch = [];
    const getBatch = async () => {
      try {
        const result = await apiService.get("http://localhost:5122/api/batch");
        console.log('result: ', result);
        if (result.data) {
          result.data.forEach((item) => {
            var startDate = moment([
              moment(moment(item.startDate) - 7 * 24 * 3600 * 1000).format(
                "MM-DD-YY"
              ),
            ]);
            let days = "";
            item.daysOfTheWeek.forEach((day, index) => {
              const isLastIndex = item.daysOfTheWeek.length -1 === index

              days += isLastIndex ? day.replace('day', '') : `${day.replace('day', '')},`

            })
            item.days = days
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

  const handleApply = (row) => {
    const {id} = row
    if(!row.isExpired){
      
      navigate("/apply", {
        state: {
          id,
        },
      });
    }
  };
 
  return (
    <Paper sx={{ pb: 20 }}>
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
            <h1>See What Cohorts Are Starting Soon</h1>
            <Typography sx={{ mb: 10 }}>
              Ready to plan out your Bootcamp experience? Start by viewing the
              upcoming course start dates. You can easily start your application
              once you’ve chosen a cohort.
            </Typography>
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
                        {row.days} / {moment(row.startTime).format("hh:mm a")} - { moment(row.endTime).format("hh:mm a")}
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
                        {" "}
                        <ApplyButton2
                          disabled={true}
                          sx={{
                            background:
                              "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)",
                            color: "white",
                          }}
                          onClick={() => handleApply(row)}
                        >
                          Apply
                        </ApplyButton2>{" "}
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

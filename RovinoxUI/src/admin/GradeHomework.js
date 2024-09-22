import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { changeGradeHomeView } from "../duck/GradeHomeViewSlice";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";


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
export default function GradeHomework() {
  const gradeHomeView = useSelector(
    (state) => state.changeGradeHomeView.gradeHomeView
  );
  const batches = useSelector(
    (state) => state.batches
  );
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // useEffect(() => {
  //   const newBatch = [];
  //   console.log(1, batchId);
  //   if (batchId) {
  //     batch.forEach((item) => {
  //       if (item._id === batchId) {
  //         item.selectedBatch = true;
  //         console.log(2);
  //         newBatch.push(item);
  //       }
  //       newBatch.push(item);
  //     });
  //     setBatch(newBatch);
  //     console.log(3);
  //   }
  //   console.log("batch", newBatch);
  // });

  const handleBatch = (id) => {
    navigate("/student", {
      state: {
        batchId: id,
      },
    });
  };
  return (
    <div>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        xs={6}
      >
        <Typography variant="h5" sx={{ mr: 3 }}>
          change to homework grading mode ?{" "}
        </Typography>
        <Typography>No</Typography>
        <FormControlLabel
          onClick={() => dispatch(changeGradeHomeView())}
          control={<IOSSwitch sx={{ ml: 3 }} defaultChecked={gradeHomeView} />}
        />
        <Typography>Yes</Typography>
      </Grid>
      {gradeHomeView && (
        <TableContainer>
          <Typography sx={{ ml: 25, mt: 10 }} variant="h5">
            select a batch to grade
          </Typography>
          <Table sx={{ maxWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
                <TableCell align="right">Grade this Batch</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {batches.length > 0 &&
                batches.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {moment(row.startDate).format("MMM Do YY")}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      {moment(row.endDate).format("MMM Do YY")}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => handleBatch(row.batchId)}
                        color="primary"
                        variant="contained"
                      >
                        Grade
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

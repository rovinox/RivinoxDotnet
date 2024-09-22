import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import ReactToastify from "../ReactToastify.js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";

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

export default function RemoveBatch() {
  const user = JSON.parse(localStorage.getItem("user"));
  const batches = useSelector(
    (state) => state.batch.batches
  );

  console.log('state batches: ', batches);
  const [open, setOpen] = useState(false);
  const [batchId, setBatchId] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleBatch = async () => {
    setOpen(false);
    console.log(batchId);
    try {
      if (user.role === "admin") {
        const result = await axios.put("/removebatch", {
          batchId,
        });
        if (result?.data?.message) {
          toast.success(`${result?.data?.message}`);
        }
      } else {
        toast.error(`you don't have access to modify Batch`);
      }
    } catch (err) {
      toast.error(`${err?.message}`);
    }
  };
  return (
    <div>
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
            <Button onClick={handleBatch} color="primary" variant="contained">
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
      <TableContainer
        // sx={{
        //   marginTop: 8,
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "center",
        //   width: "100%",
        // }}
      >
        <Typography sx={{ textAlign: "center", m: 5 }} variant="h5">
          Select a batch to disable
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
            {batches?.length > 0 &&
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
                      onClick={() => {
                        handleOpen();
                        setBatchId(row._id);
                      }}
                      variant="contained"
                      color="error"
                    >
                      disable
                    </Button>{" "}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

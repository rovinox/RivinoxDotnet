import React from "react";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";




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

export default function ConfirmationModal({onConfirm, message, openModal, setOpenModal}) {
  const handleClose = () => setOpenModal(false);
  return (
    <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           {message}
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop:20 }}>
            <Button onClick={onConfirm} color="primary" variant="contained">
            YES, DELETE
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              color="error"
            >
                NO, CANCEL
            </Button>
          </div>
        </Box>
      </Modal>
  )
}

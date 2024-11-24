import React, { useState } from "react";
import AutocompleteInput from "../autocompleteInput/Index";
import { Box } from "@mui/material";
import { apiService } from "../../api/axios";
import CourseTable from "../CourseTable";
import ConfirmationModal from "../common/ConfirmationModal";
import ReactToastify from "../ReactToastify";
import { toast } from "react-toastify";

export default function NewEnrollment() {
  const [selectBatch, setSelectedBatch] = useState(null);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const saveEnrollment = async (batchId) => {
    setOpenModal(false);
    const payload = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      course: selectBatch?.course,
      userId: user?.value,
      batchId: selectBatch?.id,
    };

    try {
      const result = await apiService.post(
        `http://localhost:5122/api/enrollment/create`,
        payload
      );
     
      if(result?.data){
        if(result.data.massage){
            toast.error(result.data.massage);
        }else{

            toast.success("successfully created");
            setSelectedBatch(null);
        }
      }
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else {
        toast.error(`${err?.message}`);
      }
    }
  };
  const handleUserSearch = (obj) => {
    setUser(obj);
  };
  const handleEnrollment = (batch) => {
    if (!user) {
      toast.warn("please select a person");
      return;
    }
    setSelectedBatch(batch);
    setOpenModal(true);
  };

  return (
    <div style={{ height: 540, width: "100%" }}>
      <ReactToastify />

      <ConfirmationModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        onConfirm={saveEnrollment}
        message={`are you sure you want to enroll ${user?.firstName} ${user?.lastName} into ${selectBatch?.course} that cost $${selectBatch?.cost}`}
      />
      <AutocompleteInput
        returnTypeObject={true}
        label="Search for a person"
        onChange={handleUserSearch}
      />
      <CourseTable
        handleEnrollment={handleEnrollment}
        tableAction="enrollment"
      />
      <Box sx={{ pt: 2 }}></Box>
    </div>
  );
}

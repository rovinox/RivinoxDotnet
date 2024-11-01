import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  TextField,
} from "@mui/material";
import ReactToastify from "../ReactToastify.js";
import { toast } from "react-toastify";
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";
import { apiService } from "../../api/axios";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import AvatarAction from "../header/AvatarAction.js";
import AvatarPicture from "../common/AvatarPicture.js";

// const user = {
//   avatar: "/static/images/avatars/avatar_6.png",
//   city: "Los Angeles",
//   country: "USA",
//   jobTitle: "Senior Developer",
//   name: "Katarina Smith",
//   timezone: "GTM-7",
// };

export const AccountInfo = (props) => {
  const user = useSelector((state) => state.account.user);
  const { imageUrl } = props;
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const handleUploadClick = async (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setSelectedImageUrl([reader.result]);
    };

    const formData = new FormData();
    formData.append("imageFile", file);
    try {
      const response = await apiService.post(
        "http://localhost:5122/api/account/upload/picture",
        formData
      );
      console.log("response: ", response);
      if (response.data) {
        toast.success("picture uploaded successfully");
      }
    } catch (e) {
      toast.error(`${e?.message}`);
    }
  };
  return (
    <>
      <ReactToastify />
      <Card {...props}>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AvatarPicture sx={{
                height: 300,
                mb: 2,
                width: 300,
              }} firstName={user?.firstName} lastName={user?.lastName} image={user?.image} />
            {/* <Avatar
              src={selectedImageUrl}
              sx={{
                height: 300,
                mb: 2,
                width: 300,
              }}
            /> */}
            <Typography color="textPrimary" gutterBottom variant="h5">
              {user?.firstName} {user?.lastName} 
            </Typography>
            {/* <Typography color="textSecondary" variant="body2">
              {`${user.city} ${user.country}`}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {user.timezone}
            </Typography> */}
          </Box>
        </CardContent>
        <CardActions
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={handleUploadClick}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              {user?.image ? "Change" : "Upload"}
              <FileUploadOutlined />
            </Button>
          </label>
        </CardActions>
      </Card>
    </>
  );
};

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  TextField
} from "@mui/material";
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";
import { apiService } from "../../api/axios";
import React, { useState } from "react";
const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};


export const AccountInfo = (props) => {
  const {imageUrl} =props
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const handleUploadClick = async event => {
    var file = event.target.files[0];
    const reader = new FileReader();


    reader.onloadend = function(e) {
    setSelectedImageUrl(
       reader.result
      );
    }

    const formData = new FormData();
    formData.append("imageFile", file);
    try{
     const response = await apiService.post("http://localhost:5122/api/account/upload/picture", formData)
     console.log('response: ', response);
     
      
    }catch(e){
      console.log(e);
    }
  
  };
  return(
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
             src={selectedImageUrl}
          sx={{
            height: 300,
            mb: 2,
            width: 300,
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {`${user.city} ${user.country}`}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
    <CardActions sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }} >
      
  

    <input
    style={{ display: "none" }}
    id="contained-button-file"
    type="file"
    onChange={handleUploadClick} 
  />
  <label htmlFor="contained-button-file">
    <Button variant="contained" color="primary" component="span">
      {imageUrl ? "Change" :"Upload"} 
      <FileUploadOutlined/>
    </Button>
  </label>
    </CardActions>
  </Card>
)}

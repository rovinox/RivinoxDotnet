import React from 'react'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from "react-redux";
import { openNotificationDrawer } from '../../duck/drawerSlice'; 

export default function Index() {
  const dispatch = useDispatch();
  return (
    <div style={{marginLeft:5}} >
      <IconButton onClick={()=>{dispatch(openNotificationDrawer())}}  >
      <Badge invisible={false}  badgeContent={4} color="primary">
    <NotificationsIcon  />
  </Badge>
      </IconButton>
  </div>
  )
}

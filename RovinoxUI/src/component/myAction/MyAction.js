import { useEffect, useState } from "react";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from "react-redux";
import { openNotificationDrawer , getNotification} from '../../duck/drawerSlice'; 



export default function Index() {
  const dispatch = useDispatch();
  const notSeenCount = useSelector((state) => state.drawer.notSeenCount);
  console.log('notSeenCount: ', notSeenCount);


  


  useEffect(() => {
 
    dispatch(getNotification());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{marginLeft:5}} >
      <IconButton onClick={()=>{dispatch(openNotificationDrawer())}}  >
      <Badge invisible={false}  badgeContent={notSeenCount} color="primary">
    <NotificationsIcon  />
  </Badge>
      </IconButton>
  </div>
  )
}

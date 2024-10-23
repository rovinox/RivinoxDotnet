import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import { useSelector, useDispatch } from "react-redux";
import { closeNotificationDrawer } from "../../duck/drawerSlice";
import { apiService } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import NotificationsList from "./NotificationsList";

export default function NotificationsDrawer() {
  const navigate = useNavigate();
  const isNotificationDrawer = useSelector((state) => state.drawer.isNotificationDrawer);
  const notifications = useSelector((state) => state.drawer.notifications);
  const batchId = 5
  const [courseList, setCourseList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
 
    const getEnrollments = async() =>{

      try {
        
        const response = await apiService.get(`http://localhost:5122/api/curriculum/batch/${batchId}`)
        if(response?.data){
          setCourseList(response.data)

        }
      } catch (error) {
        console.log(error);
      }
    }
    getEnrollments()
  }, [batchId]);

  const navigateToNotification = (notificationId) => {
    console.log('notificationId: ', notificationId);
     navigate(`/myAction?notificationId=${notificationId}`)
  }

  const list = () => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onClick={() => dispatch(closeNotificationDrawer())}
      onKeyDown={() => dispatch(closeNotificationDrawer())}
    >
      <NotificationsList navigateToNotification={navigateToNotification} notifications={notifications}/>
    </Box>
  );

  return (
   
    <Drawer
      anchor={"right"}
      open={isNotificationDrawer}
      onClose={() => dispatch(closeNotificationDrawer())}
    >
     

      {notifications?.length === 0 ? <Typography  sx={{ mt:10 }} textAlign="center">No Notifications</Typography> : list()}
     

    </Drawer>
  );
}

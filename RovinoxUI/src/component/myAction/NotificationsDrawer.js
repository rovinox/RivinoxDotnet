import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
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

  const navigateToEnrollments = (curriculumId) => {
     navigate(`/student/curriculumId/${curriculumId}/batchId/${batchId}`)
  }

  const list = () => (
    <Box
      sx={{ width: 300}}
      role="presentation"
      onClick={() => dispatch(closeNotificationDrawer())}
      onKeyDown={() => dispatch(closeNotificationDrawer())}
    >
      <NotificationsList notifications={notifications}/>
    </Box>
  );

  return (
   
    <Drawer
      anchor={"right"}
      open={isNotificationDrawer}
      onClose={() => dispatch(closeNotificationDrawer())}
    >
      {notifications?.length === 0 ? <Typography  sx={{ width: 300, mt:10 }} textAlign="center">No Notifications</Typography> : list()}

    </Drawer>
  );
}

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import { courseList } from "../component/course";
import { useSelector, useDispatch } from "react-redux";
import { closeDrawer } from "../duck/drawerSlice";
import { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CourseListDrawer() {
  const navigate = useNavigate();
  const isDrawer = useSelector((state) => state.drawer.open);
  const batchId = useSelector((state) => state.drawer.batchId);
  console.log('batchId: ', batchId);
  const [courseList, setCourseList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
 
    const getEnrollments = async() =>{

      try {
        
        const response = await axiosPrivate.get(`http://localhost:5122/api/curriculum/batch/${1}`)
        console.log('response: ', response);
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
      sx={{ width: 300 }}
      role="presentation"
      onClick={() => dispatch(closeDrawer())}
      onKeyDown={() => dispatch(closeDrawer())}
    >
      <List>
        {courseList.map((course, index) => (
          <ListItemButton key={index} sx={{ height: 35 }}>
            <ListItem
              onClick={() => navigateToEnrollments(course.id)}
              sx={{
                height: 35,
              }}
            >
              <Typography>Day {course.order}&nbsp;-&nbsp; </Typography>
              <ListItemText primary={course.title} />
            </ListItem>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor={"left"}
      open={isDrawer}
      onClose={() => dispatch(closeDrawer())}
    >
      {list()}
    </Drawer>
  );
}

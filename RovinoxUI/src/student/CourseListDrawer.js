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

export default function CourseListDrawer({ setCurrentCourse }) {
  const isDrawer = useSelector((state) => state.drawer.open);
  const dispatch = useDispatch();
  // how to center a div?

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
              onClick={() => setCurrentCourse(course.day)}
              sx={{
                height: 35,
              }}
            >
              <Typography>Day {course.day}&nbsp;-&nbsp; </Typography>
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

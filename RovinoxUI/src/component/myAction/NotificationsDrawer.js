import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import Typography from "@mui/material/Typography";

import { useSelector, useDispatch } from "react-redux";
import { closeNotificationDrawer } from "../../duck/drawerSlice";

import { useNavigate } from "react-router-dom";
import NotificationsList from "./NotificationsList";

export default function NotificationsDrawer() {
  const navigate = useNavigate();
  const isNotificationDrawer = useSelector(
    (state) => state.drawer.isNotificationDrawer
  );
  const notifications = useSelector((state) => state.drawer.notifications);

  const dispatch = useDispatch();

  const navigateToNotification = (notificationId) => {
    console.log("notificationId: ", notificationId);
    navigate(`/myAction?notificationId=${notificationId}`);
  };

  const list = () => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onClick={() => dispatch(closeNotificationDrawer())}
      onKeyDown={() => dispatch(closeNotificationDrawer())}
    >
      <NotificationsList
        navigateToNotification={navigateToNotification}
        notifications={notifications}
      />
    </Box>
  );

  return (
    <Drawer
      anchor={"right"}
      open={isNotificationDrawer}
      onClose={() => dispatch(closeNotificationDrawer())}
    >
      {notifications?.length === 0 ? (
        <Typography sx={{ mt: 10, p:10 }} textAlign="center">
          No Notifications
        </Typography>
      ) : (
        <Box sx={{ height: "100%", width: "100%", bgcolor: "#212242" }}>
          {list()}
        </Box>
      )}
    </Drawer>
  );
}

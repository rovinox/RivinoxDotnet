import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import AvatarPicture from "../common/AvatarPicture";

export default function NotificationsList({ notifications, navigateToNotification }) {
  const navigate = useNavigate();
  const handleViewAll = () => {
   // navigate('/myAction')
  }
  return (
    <List sx={{ width: "100%" }}>
      {notifications.map((item) => (
        <ListItemButton onClick={()=>navigateToNotification(item.id)} key={item.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarPicture firstName="ali" lastName="Mahmud" />
            </ListItemAvatar>
            <ListItemText
              primary={`${item.name}`}
              secondary={
                <React.Fragment>
                  {item.description}
                </React.Fragment>
              }
            />
          </ListItem>
        </ListItemButton>
      ))}
      <ListItemButton onClick={handleViewAll} >
          <ListItem alignItems="flex-start">
            
           View All
          </ListItem>
        </ListItemButton>
    </List>
  );
}

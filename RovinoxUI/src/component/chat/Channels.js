import React from 'react'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import AvatarPicture from "../common/AvatarPicture";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider, { dividerClasses } from '@mui/material/Divider';

export default function Channels() {
  return (
    <Paper>
    <List sx={{ width: "100%" }}>


      <ListItemButton  >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <AvatarPicture profilePicture="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a21cfdc2-1c17-4887-8bc0-88de589c1859/dhh3yxr-a885a068-fabd-4f6c-aa13-46a07fc071dd.jpg/v1/fill/w_894,h_894,q_70,strp/best_anime_girl_avatar_for_your_profile_by_thehackerart_dhh3yxr-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcL2EyMWNmZGMyLTFjMTctNDg4Ny04YmMwLTg4ZGU1ODljMTg1OVwvZGhoM3l4ci1hODg1YTA2OC1mYWJkLTRmNmMtYWExMy00NmEwN2ZjMDcxZGQuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.RG3EKaEVN24kQaRPOfw4cPwAGBD_qMVbxBlMJ5hFqEI" firstName={"first"} lastName={"last"}  />
          </ListItemAvatar>
          <ListItemText
            primary={<>

            item.name
            </>
            }
            secondary={
              <React.Fragment>
                !item.seen ? <Typography
              component="span"
              variant="body2"
              sx={{ color: 'text.primary', display: 'inline' }}
            >
              item.description 
            </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </ListItemButton>
  </List>
    </Paper>
  )
}

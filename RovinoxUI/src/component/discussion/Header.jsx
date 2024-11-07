import { AppBar,Box,Toolbar,IconButton,Badge,Menu, MenuItem,Avatar, Typography } from '@mui/material'
import React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useSharedState} from 'utils/store'
import selectAvatar from 'utils/resolveAvatarPath';

function Header(props) {
  const {headerHeight} = props;
  const [state, setState] = useSharedState();
  const {currentUser,users} = state;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectUser = (username) => {
    setAnchorEl(null);
    setState((prev) => ({ ...prev, currentUser: username }))
  }
  

  return (
    <>
      <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMenuOpen}
      onClose={()=>setAnchorEl(null)}
      sx={{ 
        '& .MuiPaper-root': {top: headerHeight + "px !important"},
        '& .MuiList-root': {p: 0} 
      }}
    >
      {users.map((user) => {
        return (
          <MenuItem onClick={()=>handleSelectUser(user.username)} key={user.username} selected={currentUser === user.username}>
            <Avatar alt={user.username} src={selectAvatar(user.username)} sx={{width: 36, height: 36}}/>
            <Typography variant="body" sx={{ml: 2}}>{user.username}</Typography>
          </MenuItem>
        )
      })}      
    </Menu>

    <AppBar position="static">
      <Toolbar sx={{minHeight: headerHeight, height: headerHeight}} disableGutters>
        <Box sx={{ flexGrow: 1, pl: 3 }}>
          <Typography sx={{userSelect:'none'}}>{"Interactive Comments Section".toUpperCase()}</Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          {/* <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
            onClick={handleProfileMenuOpen}
            sx={{p:0, ml: 2, mr:3}}
          >
            {
              (currentUser !== "") ? 
                <Avatar 
                  alt={currentUser} 
                  src={selectAvatar(currentUser)}   
                /> :
                <AccountCircle />
            }
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    </>
    
  )
}

export default Header
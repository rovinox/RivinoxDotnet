import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";


export default function AvatarAction() {

  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
 
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

 

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePaymentPage = () => {
    navigate("/payment");
  };
  const handleProfilePage = () => {
    navigate("/profile");
  };
  const handleLogout = async () => {
    try {
      // const result = await axios.get("/logout");
      // console.log("vv2", result);

      localStorage.setItem("user", JSON.stringify({}));
      navigate("/login");
    } catch (error) {
      console.error(error?.message);
    }
  };
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <div>  <Box sx={{ flexGrow: 0 }}>
    <Tooltip title="Open settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar
          {...stringAvatar(
            `${user?.firstName.charAt(0).toUpperCase()} ${user?.lastName
              .charAt(0)
              .toUpperCase()}`
          )}
        />
      </IconButton>
    </Tooltip>
    <Menu
      sx={{ mt: "45px" }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography textAlign="center">vv</Typography>
      </MenuItem>
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography onClick={handleProfilePage} textAlign="center">
          Profile
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography onClick={handlePaymentPage} textAlign="center">
          payment
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleCloseUserMenu}>
        <Typography onClick={handleLogout} textAlign="center">
          logout
        </Typography>
      </MenuItem>
    </Menu>
  </Box></div>
  )
}

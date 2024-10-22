import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import AvatarPicture from "../common/AvatarPicture";


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

  return (
    <div>  <Box sx={{ flexGrow: 0 }}>
    <Tooltip title="Open settings">
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <AvatarPicture firstName={user.firstName} lastName={user.lastName}/>
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

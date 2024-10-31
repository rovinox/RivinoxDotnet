import { useState, useEffect, useCallback, memo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { apiService } from "../../api/axios.js";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";

import { useNavigate, useLocation } from "react-router-dom";


import logoRvinox from "../../asset/logoRvinox.svg";

import EnrollmentDropdown from "../enrollment/EnrollmentDropdown";
import CourseListDrawer from "../../student/CourseListDrawer";
import AvatarAction from "./AvatarAction";
import MyActionBadge from "../myAction/MyActionBadge"
import NotificationsDrawer from "../myAction/NotificationsDrawer";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();


  const handleAdmin = () => {
    navigate("/admin");
  };


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  useEffect(() => {
    const abortController = new AbortController();
    const getUser =async () => {
      try {
        const result = await apiService.get(
          "http://localhost:5122/api/account/signed/user"
        );
        if (!result?.data) {
          navigate("/login");
        }
      } catch (e) {
        console.log(e);
      }
    }
    getUser();
    return () => abortController.abort();
  }, [navigate]);

  return (
    <div>

    <AppBar
      sx={{ boxShadow: "none", background: !scrolled ? "none" : "#252251" }}
      position="fixed"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="/student">
            <img style={{ marginRight: 10 }} src={logoRvinox} alt="pic" />
          </a>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {user?.enabled && location.pathname === "/student" && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <EnrollmentDropdown  />
                  </Typography>
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  {" "}
                  {location.pathname !== "/admin" &&
                    user?.roles !== "User" && (
                      <Button onClick={handleAdmin}> Admin</Button>
                    )}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            //href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ROVINOX
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            

         
                <EnrollmentDropdown  />

            { user.roles !== "User" && location.pathname !== "/admin" && (
              <Button
                onClick={handleAdmin}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Admin
              </Button>
            )}
          </Box>
          <AvatarAction/>
          <MyActionBadge/>
        </Toolbar>
      </Container>
    </AppBar>
    <CourseListDrawer />
    <NotificationsDrawer/>
    </div>
  );
};
export default memo(Header);

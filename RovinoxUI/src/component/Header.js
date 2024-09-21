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
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openDrawer } from "../duck/drawerSlice";
import logoRvinox from "../asset/logoRvinox.svg";
import { apiService } from "../api/axios";
import CourseDropdown from "./courseDropdown/CourseDropdown";
import CourseListDrawer from "../student/CourseListDrawer";

const Header = ({enrollments}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();


  const handleAdmin = () => {
    navigate("/admin");
  };
  const handleStudent = () => {
    navigate("/student");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
  const handlePaymentPage = () => {
    navigate("/payment");
  };
  const handleProfilePage = () => {
    navigate("/profile");
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
                    {/* <Button onClick={() => dispatch(openDrawer())}>
                      course
                    </Button> */}
                    <CourseDropdown enrollments={enrollments} />
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
            {location.pathname !== "/student" && (
              <Button
                onClick={handleStudent}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Student
              </Button>
            )}

            <>
              {user?.enabled && location.pathname === "/student" && (
                // <Button
                //   onClick={() => {
                //     dispatch(openDrawer());
                //   }}
                //   sx={{ my: 2, color: "white", display: "block" }}
                // >
                //   course
                // </Button>
                <CourseDropdown enrollments={enrollments} />
              )}
            </>

            {location.pathname !== "/admin" && user.roles !== "User" && (
              <Button
                onClick={handleAdmin}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Admin
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <CourseListDrawer />
    </div>
  );
};
export default Header;

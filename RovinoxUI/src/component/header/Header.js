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
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import { setUser } from "../../duck/accountSlice.js";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import logoRvinox from "../../asset/logoRvinox.svg";

import EnrollmentDropdown from "../enrollment/EnrollmentDropdown";
import CourseListDrawer from "../../student/CourseListDrawer";
import AvatarAction from "./AvatarAction";
import MyActionBadge from "../myAction/MyActionBadge";
import NotificationsDrawer from "../myAction/NotificationsDrawer";

const Header = () => {
  const user = useSelector((state) => state.account.user);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let { curriculumId, batchId } = useParams();

  const navigateToDiscuss = () => {
    navigate(
      `/student/curriculumId/${curriculumId}/discussions`
    );
  };

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
    const getUser = async () => {
      if (user) {
        return;
      }
      try {
        const result = await apiService.get(
          "http://localhost:5122/api/account/signed/user"
        );
        if (!result?.data) {
          navigate("/login");
        }
        if (!user) {
          dispatch(setUser({ user: result.data }));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
    return () => abortController.abort();
  }, [dispatch, navigate, user]);

  return (
    <div>
      <AppBar
        sx={{ boxShadow: "none", background: !scrolled ? "none" : "#191A3A"}}
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
                      <EnrollmentDropdown />
                    </Typography>
                  </MenuItem>
                )}
                {/* {true && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                  discussions
                  </Typography>
                </MenuItem>
              )} */}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {" "}
                    {location.pathname !== "/admin" &&
                      user?.role !== "User" && (
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
              <EnrollmentDropdown />

              {curriculumId &&  (
                <Button
                  onClick={navigateToDiscuss}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  discussions
                </Button>
              )}
              {user?.role !== "User" && location.pathname !== "/admin" && (
                <Button
                  onClick={handleAdmin}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Admin
                </Button>
              )}
            </Box>
            <AvatarAction />
            <MyActionBadge />
          </Toolbar>
        </Container>
      </AppBar>
      <CourseListDrawer />
      <NotificationsDrawer />
    </div>
  );
};
export default memo(Header);

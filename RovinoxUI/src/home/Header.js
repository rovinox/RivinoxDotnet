import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { ApplyButton } from "./RovinoxLanding.styled.tsx";
import { axiosPrivate } from "../api/axios.js";
import axios from "axios";
import logoRvinox from "../asset/logoRvinox.svg";
const pages = ["Career Support", "About Us", "Contact US"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
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



  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (item) => {
    setAnchorElNav(null);
  };
  const handleNavLInk = (item) => {
    console.log(item);
    if (item === "Login") {
      navigate("/login");
    } else if (item === "About Us") {
      navigate("/about");
    } else if (item === "Career Support") {
      navigate("/support");
    } else if (item === "Pricing") {
      navigate("/pricing");
    } else if (item === "Contact US") {
      navigate("/contactus");
    }
  };

  return (
    <AppBar
      sx={{ boxShadow: "none", background: !scrolled ? "none" : "#252251" }}
      position="fixed"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="/">
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavLInk(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <img style={{ height: 20, width: 20 }} src={rovinoxLogo} alt="pic" /> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavLInk(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <MenuItem
            onClick={() => {
              navigate("/login");
            }}
            sx={{ mr: 5 }}
          >
            <Typography textAlign="center">LOGIN</Typography>
          </MenuItem>
          <Box sx={{ flexGrow: 0 }}>
            <ApplyButton
              onClick={() => {
                navigate("/apply");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Apply
            </ApplyButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;

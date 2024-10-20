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
import { openDrawer } from "../../duck/drawerSlice";
import { updateBatchId } from "../../duck/batchSlice";
import { apiService } from "../../api/axios";

export default function EnrollmentDropdown() {
  const [enrollments, setEnrollments] = useState([]);
  console.log("enrollments: ", enrollments);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getEnrollments = async () => {
      try {
        const response = await apiService.get(
          "http://localhost:5122/api/enrollment"
        );
        console.log("response: ", response);
        if (response.data) {
          setEnrollments(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEnrollments();
  }, []);

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
  return (
    <div>
      {" "}
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open menu">
          <Button
            onClick={handleOpenUserMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            course
          </Button>
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
          {enrollments?.length === 0 && (
            <MenuItem>
              <Typography textAlign="center">No enrollment</Typography>
            </MenuItem>
          )}
          {enrollments?.length > 0 &&
            enrollments.map((item) => (
              <MenuItem
                onClick={() => {
                  const payload = { batchId: item.batchId };
                  dispatch(updateBatchId(payload));
                  dispatch(openDrawer());
                  handleCloseUserMenu();
                }}
                key={item.id}
              >
                <Typography textAlign="center">{item.course}</Typography>
              </MenuItem>
            ))}
        </Menu>
      </Box>
    </div>
  );
}

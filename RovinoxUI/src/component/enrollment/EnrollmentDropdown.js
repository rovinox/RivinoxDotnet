import { useState, useEffect, memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../duck/drawerSlice";
import { updateBatchId } from "../../duck/batchSlice";
import { apiService } from "../../api/axios";

 function EnrollmentDropdown() {
  const [enrollments, setEnrollments] = useState([]);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const getEnrollments = async () => {
      try {
        const response = await apiService.get(
          "http://localhost:5122/api/enrollment",{signal: abortController.signal}
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
    return () => abortController.abort();
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
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
export default memo(EnrollmentDropdown);
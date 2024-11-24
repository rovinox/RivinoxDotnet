import { useState, useEffect, memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../../duck/drawerSlice";
import { updateBatchId, getEnrollment } from "../../duck/batchSlice";


 function EnrollmentDropdown() {
  const enrollments = useSelector(state => state.batch.enrollments)
  console.log('enrollments: ', enrollments);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    dispatch(getEnrollment());
  }, [dispatch]);

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
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import ReactToastify from "../ReactToastify.js";
import { PieChart, Pie, Cell, Legend } from "recharts";
import HomeworkView from "../../admin/HomeworkView.js";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";
import { apiService } from "../../api/axios.js";
import ListOfBatch from "../common/ListOfBatch.js";
import ConfirmationModal from "../common/ConfirmationModal.js";
const labels = {
  0: "Not Rated",
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
const columns = [
  //   {
  //     field: "course",
  //     headerName: "Batch Name",
  //     width: 250,
  //     renderCell: (props) => {
  //       console.log("line", props);
  //     },
  //   },
  //   {
  //     field: "batch",
  //     headerName: "Batch Dates",
  //     width: 250,
  //     // renderCell: (props) => {
  //     //   console.log("line", props);
  //     // },
  //   },
  { field: "firstName", headerName: "First name", width: 180 },
  { field: "lastName", headerName: "last name", width: 180 },
  { field: "email", headerName: "Email", width: 320 },
  { field: "phoneNumber", headerName: "Phone Number", width: 130 },
  {
    field: "enabled",
    renderCell: (props) => {
      return props.value ? "Yes" : "No";
    },
    headerName: "Enabled",
    width: 100,
  },
  { field: "role", headerName: "Role", width: 100 },
  { field: "balance", headerName: "Balance", width: 100 },
];

export default function BatchStudent() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState(null);
  const [tableBatchId, setTableBatchId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log("selectedUser: ", selectedUser);
  const [homeworkCount, setHomeWorkCount] = useState(null);
  const [homeworkList, setHomeWorkList] = useState(null);
  const [batchId, setBatchId] = useState(selectedUser?.batchId);
  const [overallRating, setOverAllRating] = useState(0);
  const [enabled, setEnabled] = useState(selectedUser?.enabled);
  //const [balance, setBalance] = useState(selectedUser?.balance);

  const getTableData = async (batchId) => {
    console.log("from ay", batchId);
    setLoading(true);
    setTableBatchId(batchId);

    try {
      const usersByBatchResponse = await apiService.get(
        `http://localhost:5122/api/account/users/batchId/${batchId}`
      );
      console.log("usersByBatchResponse: ", usersByBatchResponse);
      if (usersByBatchResponse?.data) {
        setUsers(usersByBatchResponse?.data);
      }

      setLoading(false);
    } catch (err) {
      toast.error(`${err?.message}`);
      setLoading(false);
    }
  };

  const getRoles = async () => {
    try {
      const rolesResponse = await apiService.get(
        "http://localhost:5122/api/account/roles"
      );
      if (rolesResponse?.data) {
        setRoles(rolesResponse.data);
      }
    } catch (err) {
      toast.error(`${err?.message}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    getRoles();
  }, []);
  const COLORS = ["#00C49F", "#FF8042", "#FFBB28", "#FF8042"];
  const data = [
    { name: "Completed", value: homeworkCount },
    { name: "Total Number of Homework", value: 30 },
  ];
  const roleList = roles.map((role) => ({ value: role.id, label: role.name }));

  const enableList = [
    { value: false, label: "No" },
    { value: true, label: "Yes" },
  ];

  const handleSubmit = async (e) => {
    const userId = selectedUser.id;
    e.preventDefault();
    setOpenModal(false);
    setLoading(true);
    const foundRole = roles.find((r) => r.name === role);
    console.log("foundRole: ", foundRole);
    const bodyPayload = {
      batchId,
      role,
      enabled,
      userId,
      roleId: foundRole.id,
    };

    try {
      const result = await apiService.post(
        "http://localhost:5122/api/account/update/user",
        bodyPayload
      );
      console.log("result: update ", result);

      if (result?.data) {
        toast.success(`${result?.data?.message}`);
      }
      getTableData(tableBatchId);
    } catch (err) {
      toast.error(`${err?.message}`);
      setLoading(false);
    }
  };
  const formatRating = (number) => {
    if (number === 0) return number;
    const num = Number.parseFloat(number).toFixed(2);
    let integral = num.slice(0, 1);
    let fractional = num.slice(2);
    if (fractional > 50) {
      return `${+integral + 1}`;
    } else {
      return `${integral}.5`;
    }
  };

  const handleProgress = async (studentId, batchId) => {
    return;
    console.log("studentId", studentId);
    try {
      const result = await axios.post("/getprogress", {
        studentId,
        batchId,
      });
      console.log("result: ", result);
      if (result.data?.homeWork?.length > 0) {
        const uniqueIds = [];
        const averageArr = [];
        const unique = result.data?.homeWork.filter((element) => {
          const isDuplicate = uniqueIds.includes(element.day);
          averageArr.push(element?.rating);
          if (!isDuplicate) {
            uniqueIds.push(element.day);
            return true;
          }
          return false;
        });
        let sum = 0;
        averageArr.forEach(function (num) {
          sum += num;
        });
        const average = sum / averageArr.length;
        setOverAllRating(formatRating(average));
        setHomeWorkCount(unique?.length);
        setHomeWorkList(
          result.data?.homeWork.sort((a, b) => {
            return a.day - b.day;
          })
        );
      } else {
        setHomeWorkCount(null);
        setHomeWorkList([]);
      }

      console.log("setHomeWorkCount ", result);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("labels[overallRating", labels[overallRating], overallRating);
  return (
    <div style={{ height: 540, width: "100%" }}>
      <ListOfBatch
        value={tableBatchId}
        onClick={getTableData}
        defaultValue={tableBatchId}
      />
      <ReactToastify />
      {openModal && (
        <ConfirmationModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          onConfirm={handleSubmit}
          message={`Are you sure you want to update ${selectedUser.firstName} ${selectedUser.lastName}`}
        />
      )}
      {tableBatchId && (
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection={false}
          disableSelectionOnClick={true}
          experimentalFeatures={{ newEditingApi: true }}
          editMode={"row"}
          onCellClick={(props) => {
            handleProgress(props.row.studentId, props.row.batchId);
            setRole(props.row.role);
            setSelectedUser(props.row);
            setEnabled(props.row.enabled);
            setBatchId(props.row.batchId);
            // setBalance(props.row.balance);
            console.log(props.row);
          }}
          components={{
            LoadingOverlay: LinearProgress,
          }}
          loading={loading}
        />
      )}
      {selectedUser && (
        <div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 5,
            }}
          >
            {homeworkCount && (
              <div>
                <PieChart width={500} height={280}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    label
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: 500,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ mr: 2 }}>Overall Rating :</Typography>{" "}
                    <Rating name="read-only" value={overallRating} readOnly />
                    {overallRating !== null && (
                      <Box sx={{ ml: 2 }}>{labels[overallRating]}</Box>
                    )}
                  </Box>
                </Grid>
              </div>
            )}
            <HomeworkView homeworkList={homeworkList} />
            <Box
              //  onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    fullWidth
                    id="firstName"
                    disabled
                    value={selectedUser.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    disabled
                    value={selectedUser.lastName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <ListOfBatch
                    value={batchId}
                    onClick={setBatchId}
                    defaultValue={batchId}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="role"
                    select
                    label="Role"
                    defaultValue={selectedUser.roleId}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    {roleList.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="enabled"
                    select
                    label="Enabled"
                    value={enabled}
                    onChange={(e) => setEnabled(e.target.value)}
                  >
                    {enableList.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="balance"
                    fullWidth
                    id="balance"
                    label="Balance"
                    value={selectedUser.balance}
                    disabled
                    // onChange={(e) => setBalance(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => setOpenModal(true)}
                disabled={loading}
              >
                submit
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setSelectedUser("")}
              >
                cancel
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
}

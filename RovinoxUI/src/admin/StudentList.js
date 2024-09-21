import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import moment from "moment";
import { toast } from "react-toastify";
import ReactToastify from "../component/ReactToastify.js";
import { PieChart, Pie, Cell, Legend } from "recharts";
import HomeworkView from "./HomeworkView.js";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";
import { apiService } from "../api/axios.js";
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
  {
    field: "course",
    headerName: "Batch Name",
    width: 250,
    // renderCell: (props) => {
    //   console.log("line", props);
    // },
  },
  {
    field: "batch",
    headerName: "Batch Dates",
    width: 250,
    // renderCell: (props) => {
    //   console.log("line", props);
    // },
  },
  { field: "firstName", headerName: "First name", width: 180 },
  { field: "lastName", headerName: "last name", width: 180 },
  { field: "email", headerName: "Email", width: 320 },
  { field: "phoneNumber", headerName: "Phone Number", width: 130 },
  { field: "active", headerName: "Enabled", width: 100 },
  // { field: "role", headerName: "Role", width: 100 },
  { field: "balance", headerName: "Balance", width: 100 },
];

export default function StudentList({ batch }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [homeworkCount, setHomeWorkCount] = useState(null);
  const [homeworkList, setHomeWorkList] = useState(null);
  const [batchId, setBatchId] = useState(selectedStudent?.batchId);
  const [role, setRole] = useState(selectedStudent?.role);
  const [overallRating, setOverAllRating] = useState(0);
  const [enabled, setEnabled] = useState(selectedStudent?.enabled);
  const [balance, setBalance] = useState(selectedStudent?.balance);
  const getUsers = async () => {
    try {
      const result = await apiService.get("http://localhost:5122/api/account/users");
      console.log('result: ', result);
      if (result?.data) {
        result.data.forEach((item, index) => {
        
          item.batch = `${moment(item?.startDate).format(
            "MMM Do YY"
          )} - ${moment(item?.endDate).format("MMM Do YY")}`;
          item.active = item.enabled ? "Yes" : "No";
        });
        setLoading(false);
      }

      setUsers(result.data);
      console.log("result.data.users: ", result.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const COLORS = ["#00C49F", "#FF8042", "#FFBB28", "#FF8042"];
  const data = [
    { name: "Completed", value: homeworkCount },
    { name: "Total Number of Homework", value: 30 },
  ];
  const roleList = [
    { value: "admin", label: "Admin" },
    { value: "student", label: "Student" },
  ];
  const enableList = [
    { value: false, label: "No" },
    { value: true, label: "Yes" },
  ];
  const batchList = batch.map((option) => {
    return {
      value: option.batchId,
      label: `${moment(option.startDate).format("MMM Do YY")} - ${moment(
        option.endDate
      ).format("MMM Do YY")}`,
    };
  });
  console.log("sdgsgzsdg", batchList);
  const handleSubmit = async (e) => {
    const id = selectedStudent.studentId;
    console.log("id: ", id);
    e.preventDefault();
    console.log({
      batchId,
      role,
      enabled,
      id,
    });

    try {
      if (user.role === "admin") {
        const result = await axios.put("/updatestudent", {
          batchId,
          role,
          enabled,
          id,
          balance,
        });
        if (result?.data?.message) {
          toast.success(`${result?.data?.message}`);
          getUsers();
        }
      } else {
        toast.error(`you don't have access to modify student`);
      }
    } catch (err) {
      toast.error(`${err?.message}`);
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
      <ReactToastify />
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
          setSelectedStudent(props.row);
          setEnabled(props.row.enabled);
          setBatchId(props.row.batchId);
          setBalance(props.row.balance);
          console.log(props.row);
        }}
        components={{
          LoadingOverlay: LinearProgress,
        }}
        loading={loading}
      />
      {selectedStudent && (
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
              component="form"
              Validate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    fullWidth
                    id="firstName"
                    disabled
                    value={selectedStudent.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    disabled
                    value={selectedStudent.lastName}
                  />
                </Grid>
                {batchList.length > 0 && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="batch"
                      select
                      label="Batch"
                      value={batchId}
                      onChange={(e) => {
                        setBatchId(e.target.value);
                      }}
                    >
                      {batchList.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )}

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="role"
                    select
                    label="Role"
                    value={role}
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
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                // onClick={handleSubmit}
              >
                submit
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setSelectedStudent("")}
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

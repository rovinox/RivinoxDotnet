import axios from "axios";
import { useNavigate } from "react-router-dom";



axios.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {
  const navigate = useNavigate();
  navigate("/login");
 }
 return error;
});

const user = JSON.parse(localStorage.getItem("user"));
export const apiService = axios.create({
  headers: { "Content-Type": "application/json" ,
    Authorization: `Bearer ${user?.token}`
  },
});

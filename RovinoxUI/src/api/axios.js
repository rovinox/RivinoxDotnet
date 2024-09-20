import axios from "axios";



const user = JSON.parse(localStorage.getItem("user"));
export const axiosPrivate = axios.create({
  headers: { "Content-Type": "application/json" ,
    Authorization: `Bearer ${user?.token}`
  },
});

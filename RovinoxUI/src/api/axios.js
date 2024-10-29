import axios from "axios";





const userJsonStr = localStorage.getItem("user");
const user = JSON.parse(userJsonStr ? JSON.stringify(userJsonStr) : "{}");
export const apiService = axios.create({
  headers: { "Content-Type": "application/json" ,
    Authorization: `Bearer ${user?.token}`
  },
});

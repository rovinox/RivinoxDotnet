import axios from "axios";





// const userJsonStr = localStorage.getItem("user");
// const user = JSON.parse(userJsonStr ? JSON.stringify(userJsonStr) : "{}");
// console.log('user: ', user);
 let apiService = axios.create();


 apiService.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    console.log("request config", config);
    return config;
  },
  (error) => {
    // console.log("request error", error);
    return Promise.reject(error);
  }
);

export {apiService};
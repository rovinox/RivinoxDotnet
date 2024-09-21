import axios from "axios";
import { useEffect, useState } from "react";
import CourseContent from "./CourseContent";
import CourseListDrawer from "./CourseListDrawer";
import NoCourse from "./NoCourse";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../component/Header";
import { useSelector, useDispatch } from "react-redux";
import { changeGradeHomeView } from "../duck/GradeHomeViewSlice";
import { apiService } from "../api/axios";

export default function StudentLanding(...prop) {
  const [currentCourse, setCurrentCourse] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeStudent, setActiveStudent] = useState(false);
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();
  const params = useLocation();
  const batchId = params?.state?.batchId;
  const dispatch = useDispatch();
  const gradeHomeView = useSelector(
    (state) => state.changeGradeHomeView.gradeHomeView
  );
  useEffect(() => {
    if (!batchId && gradeHomeView) {
      dispatch(changeGradeHomeView());
    }
    
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("vv user", user);
    setActiveStudent(user?.enabled);
    setIsAdmin(user?.enabled);
    // const getUser = async () => {
    //   try {
    //     const result = await axios.get("/usersession", {
    //       headers: {
    //         authorization: `Bearer ${user?.accessToken}`,
    //         "Content-Type": "application/json",
    //       },
    //       //withCredentials: true,
    //     });
    //     console.log("vv1", result);
    //     if (!result?.data?.login) {
    //       navigate("/login");
    //     }
    //   } catch (error) {
    //     console.error(error?.message);
    //   }
    // };
    // getUser();
  }, [batchId, dispatch, gradeHomeView, navigate]);

  useEffect(() => {
 
    const getEnrollments = async() =>{

      try {
        
        const response = await apiService.get("http://localhost:5122/api/enrollment")
        console.log('response: ', response);
        if(response.data){
          setEnrollments(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getEnrollments()
  }, []);


  return (
    <div style={{ marginTop: 30 }}>
      {activeStudent ? (
        <>
          <Header enrollments={enrollments} />
          {/* <CourseContent
            isAdmin={isAdmin}
            batchId={batchId}
            day={currentCourse}
          /> */}
          < div  style={{textAlign: "center", padding: 500}} > Main student page</ div>
          {/* <CourseListDrawer setCurrentCourse={setCurrentCourse} /> */}
        </>
      ) : (
        <NoCourse />
      )}
    </div>
  );
}

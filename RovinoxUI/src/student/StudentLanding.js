
import { useEffect, useState } from "react";

import NoCourse from "./NoCourse";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../component/header/Header";
import { useSelector, useDispatch } from "react-redux";
import { changeGradeHomeView } from "../duck/GradeHomeViewSlice";


export default function StudentLanding(...prop) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeStudent, setActiveStudent] = useState(false);

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




  return (
    <div style={{ marginTop: 30 }}>
      {activeStudent ? (
        <>
          <Header  />
          < div  style={{textAlign: "center", padding: 500}} > Main student page</ div>
        </>
      ) : (
        <NoCourse />
      )}
    </div>
  );
}

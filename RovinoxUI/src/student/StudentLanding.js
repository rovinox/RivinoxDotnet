import { useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import Header from "../component/header/Header";
import { useSelector, useDispatch } from "react-redux";
import { changeGradeHomeView } from "../duck/GradeHomeViewSlice";

export default function StudentLanding(...prop) {
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
      <Header />
      <div style={{ textAlign: "center", padding: 500 }}>
        {" "}
        Main student page
      </div>
    </div>
  );
}

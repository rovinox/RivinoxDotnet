import React from "react";
import HomeworkSubmission from "../component/HomeworkSubmission";
import GradeHomework from "../student/GradeHomework";
import { useSelector } from "react-redux";
export default function HomeworkList({ batchId, selectedDay, isAdmin }) {
  const gradeHomeView = useSelector(
    (state) => state.changeGradeHomeView.gradeHomeView
  );
  return (
    <div>
      {isAdmin && gradeHomeView ? (
        <GradeHomework batchId={batchId} selectedDay={selectedDay} />
      ) : (
        <HomeworkSubmission selectedDay={selectedDay} />
      )}
    </div>
  );
}

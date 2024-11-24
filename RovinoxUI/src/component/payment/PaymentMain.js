import React from 'react'
import CourseTable from "../../component/CourseTable";
import PaymentHistory from './PaymentHistory';
import PaymentForm from './PaymentForm';
import { useSelector, useDispatch } from "react-redux";

export default function PaymentMain() {

    const enrollments = useSelector((state) => state.batch.enrollments);
  return (
    <div>
      <CourseTable enrollments={enrollments} readOnly={true}/>
      <PaymentHistory/>
      <PaymentForm/>
    </div>
  )
}

import React from "react";
import Banner from "./Banner";
import "./style/careerSupport.css";
import CareerSupportText from "./CareerSupportText";
import Header from "../home/Header";
import Footer from "../home/Footer";

export default function CareerSupport() {
  return (
    <>
      <Header />
      <Banner
        bannerTitle=" Beyond the Bootcamp Rovinox Career Support"
        page="Career Support"
      />
      <CareerSupportText />
      <Footer />
    </>
  );
}

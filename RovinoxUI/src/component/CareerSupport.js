import React from "react";
import Banner from "../component/banner/Banner";
import CareerSupportText from "./CareerSupportText";
import HeaderLanding from "../home/HeaderLanding";
import Footer from "../home/Footer";

export default function CareerSupport() {
  return (
    <>
      <HeaderLanding />
      <Banner
        bannerTitle=" Beyond the Bootcamp Rovinox Career Support"
        page="Career Support"
      />
      <CareerSupportText />
      <Footer />
    </>
  );
}

import React from "react";
import FreelancerSection from "./FreelancerSection";
import ServicesSection from "./ServiceSection";

import Footer from "../components/Footer";
import AdvertiseJob from "./AdvertiseJob";
import TalentSection from "./TalentSection";
import MessageComponent from "../components/MessageComponent";
import HeaderOne from "./ HeaderOne";


function Home() {

  return (
    <div className="bg-blue-50 min-h-screen">
      <HeaderOne />
      {/* <JobFinder /> */}
      <ServicesSection />
      <TalentSection />
      <FreelancerSection />
      <AdvertiseJob />
      <MessageComponent />
      <Footer />
    </div>
  );
}

export default Home;

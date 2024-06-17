"use client"
import React from "react";
import WelcomeBanner from "./_components/WelcomePage";
import CourseList from "./_components/CourseList";
import SideBarNav from "./_components/SideBarNav";

function Courses() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
      <div className="col-span-2">
        {/*Banner*/} 
        <WelcomeBanner />
        {/* Get the Course List*/}
        <CourseList/>
      </div>
      <div className="p-5 bg-white rounded-xl"> 
        <SideBarNav/>
      </div>
    </div>
  );
}

export default Courses;

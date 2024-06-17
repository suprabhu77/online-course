"use client";
import React, { useEffect, useState } from "react";
import WelcomeBanner from "./_components/WelcomeBanner";
import SideBarNav from "../courses/_components/SideBarNav";
import InProgressCourse from "./_components/InProgressCourse";
import globalAPI from "@/app/_utils/globalAPI";
import { useUser } from "@clerk/nextjs";
function DashBoard() {
  const { user } = useUser();
  const [userEnrolledCourse, setUserEnrolledCourse] = useState("");
  useEffect(() => {
    user & getUserEnrolledCourse();
  }, [user]);
  const getUserEnrolledCourse = () => {
    globalAPI
      .getUserEnrolledCoursesbyEmail(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        if (resp) {
          setUserEnrolledCourse(resp?.userEnrolCourses);
        }
      });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
      <div className="col-span-2">
        {/*Banner*/}
        <WelcomeBanner />
        {/* Get the Course List*/}
        <InProgressCourse userEnrolledCourse={userEnrolledCourse} />
      </div>
      <div className="p-5 bg-white rounded-xl">
        <SideBarNav />
      </div>
    </div>
  );
}

export default DashBoard;

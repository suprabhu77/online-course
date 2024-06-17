import React from "react";
import ProgressCount from "./ProgressCount";

function InProgressCourse({ userEnrolledCourse }) {
  console.log("User Enrolled Course", userEnrolledCourse);
  return (
    userEnrolledCourse && (
      <div className="p-5 mt-3 bg-white rounded-sm">
        <h2 className="text-primary text-[18px] font-semibold">
          InProgress Course List
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-3">
          {userEnrolledCourse.map((item, index) => (
            <ProgressCount key={index} course={item} />
          ))}
        </div>
      </div>
    )
  );
}

export default InProgressCourse;

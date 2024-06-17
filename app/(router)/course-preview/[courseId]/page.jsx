"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseDescription from "../_components/CourseDescription";
import globalAPI from "../../../_utils/globalAPI";
import CourseEnrollSection from "../_components/CourseEnrollSection";
import CourseContentDisplay from "../_components/CourseContentDisplay";
import { useUser } from "@clerk/nextjs";

function CoursePreview({ params }) {
  const { user } = useUser();
  const [courseInfo, setCourseInfo] = useState();
  const [isEnrolled, setIsEnrolled] = useState();

  useEffect(() => {
    params && getCourseLIstbyID();
  }, [params]);

  useEffect(() => {
    courseInfo && user && getEnrolledCourse();
  }, [courseInfo, user]);
  const getCourseLIstbyID = () => {
    globalAPI.getCourseListbyID(params?.courseId).then((res) => {
      setCourseInfo(res.courseList);
    });
  };

  const getEnrolledCourse = () => {
    globalAPI
      .getEnrolledCourse(
        courseInfo?.slug,
        user?.primaryEmailAddress?.emailAddress
      )
      .then((resp) => {
        if (resp) {
          console.log("Enrolled Course Response", resp);
          if (resp?.userEnrolCourses[0]?.id) {
            setIsEnrolled(resp?.userEnrolCourses[0]?.id);
          }
        }
      });
  };

  
  return (
    courseInfo && (
      <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
        {/* Title, Vdeio */}
        <div className="col-span-2 bg-white p-3">
          <CourseDescription
            courseinfo={courseInfo}
          />
        </div>
        {/* Dscription */}
        <div>
          <CourseEnrollSection
            courseinfo={courseInfo}
            isEnrolled={isEnrolled}
          />
          <CourseContentDisplay
            courseinfo={courseInfo}
            isEnrolled={isEnrolled}
          />
        </div>
      </div>
    )
  );
}

export default CoursePreview;

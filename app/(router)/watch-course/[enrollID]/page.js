"use client";
import globalAPI from "@/app/_utils/globalAPI";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CourseDescription from "../../course-preview/_components/CourseDescription";
import CourseContentDisplay from "../../course-preview/_components/CourseContentDisplay";
import { toast } from "sonner";

function WatchCourse({ params }) {
  const [courseInfo, setCourseInfo] = useState();
  const { user } = useUser();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [completedChapter, setCompletedChapter] = useState(0);
  console.log(params)
  useEffect(() => {
    user && params && getCourseData();
  }, [params]);

  const getCourseData = () => {
    globalAPI
      .getUserEnrolledCourses(
        user?.primaryEmailAddress?.emailAddress,
        params.enrollID
      )
      .then((resp) => {
        console.log("THE CHAPTER COMEPLTE", resp?.userEnrolCourses[0])
        setCompletedChapter(resp?.userEnrolCourses[0].completedChapter);
        setCourseInfo(resp?.userEnrolCourses[0].courseList);
      });
  };

  console.log("CTHE COMAHF", completedChapter)

  const onChapterCompleted = (chapterId) => {
    globalAPI.CompletedChapter(params.enrollID, chapterId).then((resp) => {
      if (resp) {
        toast("Chapter Marked As Completed");
        getCourseData();
      }
    });
  };

  return (
    courseInfo?.author && (
      <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
        <div className="col-span-2 bg-white p-3">
          <CourseDescription
            courseinfo={courseInfo}
            activeChapterIndex={activeChapterIndex}
            watchmode={true}
            setCompletedChapter={(chapterId) => {
              onChapterCompleted(chapterId);
            }}
          />
        </div>
        <div>
          <CourseContentDisplay
            courseinfo={courseInfo}
            isEnrolled={true}
            watchmode={true}
            completedChapter={completedChapter}
            setActiveChapterIndex={(index) => setActiveChapterIndex(index)}
          />
        </div>
      </div>
    )
  );
}

export default WatchCourse;

import React from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

function ProgressCount({ course }) {
  console.log(course);

  const getCompletedChapter = (item) => {
    const percentage =
      (item.completedChapter?.length / item.courseList?.totalChapters) * 100;
    return percentage;
  };
  return (
    <Link href={"/course-preview/" + course?.courseList?.slug}>
      <div
        className="borded rounded-md
    hover:shadow-md
    hover:shadow-purple-300
    cursor-pointer"
      >
        <Image
          src={course.courseList?.banner.url}
          alt="image"
          height={2000}
          width={350}
          className="rounded-t-md h-[130px] object-cover"
        />
        <div className="flex flex-col gap-1 p-2">
          <h2 className="font-semibold">{course.courseList?.name}</h2>
          <h2 className="text-[12px] text-gray-500">
            {course.courseList?.author}
          </h2>
          <h2 className="text-[12px] text-gray-400">
            {getCompletedChapter(course)+'%'}
            <span className="float-right">
              {course.completedChapter?.length}/
              {course.courseList?.totalChapters}
              Chapter
            </span>
          </h2>
          <Progress value={getCompletedChapter(course)} className="h-[7px]" />
        </div>
      </div>
    </Link>
  );
}

export default ProgressCount;

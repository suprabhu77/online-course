import Image from "next/image";
import React from "react";

function CourseItem({ course }) {
  return (
    <div
      className="borded rounded-md
    hover:shadow-md
    hover:shadow-purple-300
    cursor-pointer"
    >
      <Image
        src={course.banner.url}
        alt="image"
        height={2000}
        width={350}
        className="rounded-t-md h-[130px] object-cover"
      />
      <div className="flex flex-col gap-1 p-2">
        <h2 className="font-semibold">{course.name}</h2>
        <h2 className="text-[12px] text-gray-500">{course.author}</h2>
        {course?.chapters?.length == 0 ? (
          <div className="flex gap-2">
            {<Image src="/youtube.png" alt="youtube" height={20} width={20} />}
            <h2 className="text-[14px] text-gray-400">Watch on YouTube</h2>
          </div>
        ) : (
          <div className="flex gap-2">
            {<Image src="/chapter.png" alt="youtube" height={20} width={20} />}
            <h2 className="text-[14px] text-gray-400">Chapters</h2>
          </div>
        )}
        <h2>{course?.free ? "Free" : "Paid"}</h2>
      </div>
    </div>
  );
}

export default CourseItem;

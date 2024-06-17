import { Lock, Play, Pause } from "lucide-react";
import React from "react";
import { useState } from "react";

function CourseContentDisplay({
  courseinfo,
  isEnrolled,
  watchmode = "false",
  completedChapter = [],
  setActiveChapterIndex,
}) {
  // console.log("CourseInfo", courseinfo);
  const [activeIndex, setActiveIndex] = useState(0);

  const isCompletedChapter = (chapterId) => {
    console.log("chaptrt id", completedChapter, chapterId);
    console.log(
      "THe Result ",
      completedChapter.find((item) => item.chapterId == chapterId)
    );
    return completedChapter.find((item) => chapterId == item.chapterid);
  };
  return (
    <div className="p-3 bg-white rouned-sm">
      <h2>Content</h2>
      {courseinfo?.chapter?.map((item, index) => (
        <div
          className={`p-2 m-2 flex text-[14px] justify-between items-center
        border rounded-sm px-2 cursor-pointer
        ${(activeIndex == index) && "bg-primary text-black"}
        ${isEnrolled && "hover:bg-primary hover:text-white"}
        ${
          watchmode &&
          isCompletedChapter(item?.id) &&
          "border-green-800 bg-green-400"
        }
        `}
          onClick={() => {
            watchmode && setActiveChapterIndex(index);
            watchmode && setActiveIndex(index);
          }}
        >
          {index + 1}. {item.name}
          {activeIndex == index || isEnrolled ? (
            (activeIndex != index) ? (
              <Play className="h-w w-4" onClick={() => setActiveIndex(index)} />
            ) : (
              <Pause
                className="h-w w-4"
                onClick={() => setActiveIndex(index)}
              />
            )
          ) : (
            <Lock className="h-4 w-4" />
          )}
        </div>
      ))}
    </div>
  );
}

export default CourseContentDisplay;

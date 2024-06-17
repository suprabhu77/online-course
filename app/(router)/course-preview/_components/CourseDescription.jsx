import React from "react";
import VideoPlayer from "./VideoPlayer";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";

function CourseDescription({
  courseinfo,
  activeChapterIndex,
  watchmode = false,
  setCompletedChapter,
}) {
  console.log("I am here", courseinfo);
  return (
    courseinfo && (
      <div>
        <h2 className="text-[20px] font-semibold">{courseinfo?.name}</h2>
        <h2 className="text-gray-500 ">{courseinfo?.author}</h2>
        <VideoPlayer
          videoUrl={courseinfo?.chapter[activeChapterIndex]?.video?.url}
          poster={!watchmode ? courseinfo?.banner?.url : null}
        />
        <h2 className="mt-5 text-[17px] font-semibold">
          {watchmode ? (
            <span className="flex justify-between items-center">
              {" "}
              {courseinfo?.chapter[activeChapterIndex]?.name}
              <Button onClick ={()=>{setCompletedChapter(courseinfo?.chapter[activeChapterIndex]?.id)}}> Mark as Completed</Button>
            </span>
          ) : (
            <span>About this Project</span>
          )}
        </h2>
        <div>
          {watchmode ? (
            <Markdown className="text-[13px] font-light leading-6 mt-6">
              {courseinfo?.chapter[activeChapterIndex]?.shortDescription}
            </Markdown>
          ) : (
            <Markdown className="text-[13px] font-light leading-6 mt-6">
              {courseinfo?.description}
            </Markdown>
          )}
        </div>
      </div>
    )
  );
}

export default CourseDescription;

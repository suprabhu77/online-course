import React from "react";

function VideoPlayer({ videoUrl, poster }) {
  return (
    <video
      width={1000}
      height={250}
      controls
      className="rounded-sm"
      key={videoUrl}
      poster={poster}
    >
      <source src={videoUrl} type="video/mp4"></source>
    </video>
  );
}

export default VideoPlayer;

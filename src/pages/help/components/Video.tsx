import React, { useRef, useState } from "react";

const Video = () => {
  const [playvid, setPlayVid] = useState(true);
  const vidRef = useRef<HTMLVideoElement | null>(null);

  const handleClick = () => {
    setPlayVid(!playvid);
    if (vidRef.current) {
      if (playvid) {
        vidRef.current.pause();
      } else {
        vidRef.current.play();
      }
    }
    console.log(playvid);
  };

  return (
    <>
      <div className="video-container my-5 w-full mx-auto h-full relative ">
        <video
          src="/assets/images/video.mp4"
          ref={vidRef}
          //   controls={false}
          controls
          loop
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
        {/* <div className="vid-overlay absolute inset-0 bg-black bg-opacity-65"></div> */}
        {/* <div className="vid-overlay" onClick={handleClick}>
          {playvid ? (
            <div className="vid-icon">
              {" "}
              <Pause />{" "}
            </div>
          ) : (
            <div className="vid-icon">
              {" "}
              <Play />{" "}
            </div>
          )}
        </div> */}
      </div>
    </>
  );
};

export default Video;

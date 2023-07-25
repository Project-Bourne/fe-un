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
      <div className="video-container shadow-md my-5 w-full mx-auto h-[60px] relative">
        <video
          src="https://player.vimeo.com/external/477258245.hd.mp4?s=c798ca10efc0251c894a5b74154f14bdead7edbe&profile_id=174&oauth2_token_id=57447761"
          ref={vidRef}
          controls={false}
          loop
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
        <div className="vid-overlay absolute inset-0 bg-black bg-opacity-65"></div>
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

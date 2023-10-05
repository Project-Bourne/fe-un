// CallPage.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import VideoCall from "./components/video"; // Import your custom VideoCall component here

const CallPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [id]);

  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 bg-white flex flex-col justify-center items-center">
      {isLoading ? (
        <div className="bg-black w-full h-full absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center z-[30000]">
          <CircularProgress />
        </div>
      ) : (
        id && (
          <div className="bg-black w-full h-full absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center z-[30000]">
            {/* Render your custom VideoCall component */}
            <VideoCall roomName={id} />
          </div>
        )
      )}
    </div>
  );
};

export default CallPage;

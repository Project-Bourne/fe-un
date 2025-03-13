// CallPage.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import VideoCall from "./components/video";
import Head from "next/head";

/**
 * Call page component
 * Displays a Jitsi video conference based on the room ID from the URL
 * @returns {JSX.Element} The call page component
 */
const CallPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Short delay to ensure UI renders properly
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Video Conference | {id || "Loading..."}</title>
        <meta name="description" content="Jitsi Video Conference" />
      </Head>

      <div className="absolute top-0 right-0 left-0 bottom-0 bg-black flex flex-col justify-center items-center">
        {isLoading ? (
          <div className="bg-black w-full h-full absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center z-[30000]">
            <CircularProgress />
          </div>
        ) : (
          id && (
            <div className="bg-black w-full h-full absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center z-[30000]">
              <VideoCall roomName={id as string} />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default CallPage;

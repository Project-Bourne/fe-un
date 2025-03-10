import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { loadJitsiScript } from "@/utils/jitsi";
import { toast } from "react-toastify";

const jitsiConfig = {
  disableVideoQualityLabel: true,
  disableTileView: true,
  disableMeetFooter: true,
  disableInviteFunctions: true,
  enableClosePage: false,
  defaultLanguage: "en",
  interfaceConfigOverwrite: {
    APP_NAME: "DeepSoul",
    NATIVE_APP_NAME: "DeepSoul",
    PROVIDER_NAME: "DeepSoul",
    TOOLBAR_BUTTONS: [],
    TOOLBAR_ALWAYS_VISIBLE: false,
    MOBILE_APP_PROMO: false,
    BRAND_WATERMARK_LINK: "",
  },
};

function VideoCall({ roomName }) {
  const containerRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userInfo } = useSelector((state: any) => state?.auth);

  useEffect(() => {
    let api: any = null;

    console.log("DETS: ", roomName, userInfo);

    const initializeJitsi = async () => {
      try {
        // await loadJitsiScript();

        console.log("initializing Jitsii");
        if (!containerRef.current) return;

        const domain = `${process.env.NEXT_PUBLIC_JITSI_URL}:8443`;
        const options = {
          roomName: roomName,
          width: "100%",
          height: "100%",
          parentNode: containerRef.current,
          configOverwrite: jitsiConfig,
          userInfo: {
            displayName: userInfo?.email,
          },
        };

        api = new window.JitsiMeetExternalAPI(domain, options);
        setIsLoading(false);

        console.log("API: ", api);

        // Handle connection events
        api.addEventListener("videoConferenceJoined", () => {
          console.log("Joined video conference");
          toast.success("Joined video conference");
        });

        api.addEventListener("videoConferenceLeft", () => {
          console.log("Left video conference");
          toast.info("Left video conference");
        });

        api.addEventListener("connectionFailed", () => {
          console.error("Connection failed");
          setError("Failed to connect to video conference");
          toast.error("Failed to connect to video conference");
        });
      } catch (error) {
        console.error("Error initializing Jitsi:", error);
        setError("Failed to initialize video conference");
        toast.error("Failed to initialize video conference");
        setIsLoading(false);
      }
    };

    initializeJitsi();

    // return () => {
    //   if (api) {
    //     api.dispose();
    //   }
    // };
  }, [roomName, userInfo?.email]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-xl mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-full flex items-center justify-center bg-black">
  //       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div
        ref={containerRef}
        className="w-[100vw] h-[100vh] absolute top-0 right-0 left-0 bottom-0 bg-black z-[3000]"
      />

      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    </>
  );
}

export default VideoCall;

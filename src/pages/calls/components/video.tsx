import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { loadJitsiScript } from "@/utils/jitsi";
import { toast } from "react-toastify";

/**
 * Configuration for Jitsi Meet
 */
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

/**
 * Video call component using Jitsi Meet
 * @param {Object} props - Component properties
 * @param {string} props.roomName - The name of the room to join
 * @returns {JSX.Element} VideoCall component
 */
function VideoCall({ roomName }) {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [api, setApi] = useState<any>(null);
  const { userInfo } = useSelector((state: any) => state?.auth);

  useEffect(() => {
    const initializeJitsi = async () => {
      try {
        // Load the Jitsi script first
        await loadJitsiScript();

        console.log("Initializing Jitsi");
        if (!containerRef.current) return;

        // Make sure the script is loaded and JitsiMeetExternalAPI is available
        if (!window.JitsiMeetExternalAPI) {
          throw new Error("JitsiMeetExternalAPI not loaded");
        }

        const jitsiUrl = process.env.NEXT_PUBLIC_JITSI_URL || "localhost";
        const jitsiPort = process.env.NEXT_PUBLIC_JITSI_PORT || "8443";
        const domain = `${jitsiUrl}:${jitsiPort}`;

        console.log(`Using Jitsi domain: ${domain}`);

        const options = {
          roomName: roomName,
          width: "100%",
          height: "100%",
          parentNode: containerRef.current,
          configOverwrite: jitsiConfig,
          userInfo: {
            displayName: userInfo?.email || "Anonymous User",
          },
        };

        console.log("Creating Jitsi instance with options:", options);
        const jitsiInstance = new window.JitsiMeetExternalAPI(domain, options);
        setApi(jitsiInstance);
        setIsLoading(false);

        // Handle connection events
        jitsiInstance.addEventListener("videoConferenceJoined", () => {
          console.log("Joined video conference");
          toast.success("Joined video conference");
        });

        jitsiInstance.addEventListener("videoConferenceLeft", () => {
          console.log("Left video conference");
          toast.info("Left video conference");
        });

        jitsiInstance.addEventListener("connectionFailed", () => {
          console.error("Connection failed");
          setError("Failed to connect to video conference");
          toast.error("Failed to connect to video conference");
        });
      } catch (error) {
        console.error("Error initializing Jitsi:", error);
        setError(`Failed to initialize video conference: ${error.message}`);
        toast.error("Failed to initialize video conference");
        setIsLoading(false);
      }
    };

    initializeJitsi();

    // Cleanup function
    return () => {
      if (api) {
        api.dispose();
      }
    };
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

  return (
    <>
      <div
        ref={containerRef}
        className="w-[100vw] h-[100vh] absolute top-0 right-0 left-0 bottom-0 bg-black z-[3000]"
      />

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center bg-black absolute top-0 right-0 left-0 bottom-0 z-[3100]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </>
  );
}

export default VideoCall;

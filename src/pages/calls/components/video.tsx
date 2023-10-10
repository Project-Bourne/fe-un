import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const jitsiConfig = {
  disableVideoQualityLabel: true,
  disableTileView: true,
  disableMeetFooter: true,
  disableInviteFunctions: true,
  enableClosePage: false,
  defaultLanguage: "en",
  interfaceConfigOverwrite: {
    APP_NAME: "Deep Soul",
    NATIVE_APP_NAME: "Deep Soul",
    PROVIDER_NAME: "Deep Soul",
    TOOLBAR_BUTTONS: [],
    TOOLBAR_ALWAYS_VISIBLE: false,
    MOBILE_APP_PROMO: false,
    BRAND_WATERMARK_LINK: "",
  },
};

function VideoCall({ roomName }) {
  const containerRef = useRef();
  const { userInfo } = useSelector((state: any) => state?.auth);
  useEffect(() => {
    // Check if we're running on the client-side
    if (typeof window !== "undefined") {
      const domain = "jitsi.deepsoul.pro";
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

      const api = new window.JitsiMeetExternalAPI(domain, options);

      return () => {
        api.dispose();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomName]);

  return (
    <div
      ref={containerRef}
      className="w-[100vw] h-[100vh] absolute top-0 right-0 left-0 bottom-0 bg-black z-[3000]"
    />
  );
}

export default VideoCall;

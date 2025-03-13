import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createMiroTalkMeeting,
  getMiroTalkMeetingUrl,
  formatRoomId,
} from "@/utils/mirotalk";

/**
 * MiroTalk video call component
 * @param {Object} props - Component props
 * @param {string} props.roomName - The name of the room to join or create
 * @returns {JSX.Element} The MiroTalk video call component
 */
function MiroTalkVideo({ roomName }: { roomName: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meetingUrl, setMeetingUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { userInfo } = useSelector((state: any) => state?.auth);

  useEffect(() => {
    const initializeMiroTalk = async () => {
      try {
        setIsLoading(true);

        // Format room ID to ensure compatibility
        const formattedRoomId = formatRoomId(roomName);
        console.log("Using room ID:", formattedRoomId);

        // Get the meeting URL
        const url = getMiroTalkMeetingUrl(
          formattedRoomId,
          userInfo?.email || "Anonymous User",
        );

        console.log("MiroTalk meeting URL:", url);

        // Validate the URL to ensure it's properly formatted
        try {
          const urlObj = new URL(url);
          console.log("Parsed URL:", urlObj);

          // Ensure no double slashes in pathname
          if (urlObj.pathname.includes("//")) {
            const fixedPathname = urlObj.pathname.replace(/\/+/g, "/");
            const fixedUrl = `${urlObj.origin}${fixedPathname}${urlObj.search}`;
            console.log("Fixed URL:", fixedUrl);
            setMeetingUrl(fixedUrl);
          } else {
            setMeetingUrl(url);
          }
        } catch (urlError) {
          console.error("Invalid URL format:", urlError);
          setMeetingUrl(url); // Fallback to the original URL
        }

        setIsLoading(false);

        toast.success("Joined video conference", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } catch (error) {
        console.error("Error initializing MiroTalk:", error);
        setError(`Failed to initialize video conference: ${error.message}`);
        toast.error("Failed to initialize video conference");
        setIsLoading(false);
      }
    };

    initializeMiroTalk();

    // Cleanup function
    return () => {
      // No specific cleanup needed for MiroTalk iframe
      console.log("Cleaning up MiroTalk session");
    };
  }, [roomName, userInfo?.email]);

  // Handle messages from the iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        // Only handle messages from our MiroTalk instance
        if (!meetingUrl) return;

        const meetingUrlObj = new URL(meetingUrl);
        const eventOrigin = event.origin;

        // Check if the message is from MiroTalk
        if (eventOrigin.includes(meetingUrlObj.host)) {
          console.log("Message from MiroTalk:", event.data);

          // Handle specific events from MiroTalk if needed
          if (event.data && typeof event.data === "object") {
            if (event.data.type === "conferenceJoined") {
              toast.success("Successfully joined the meeting");
            } else if (event.data.type === "conferenceLeft") {
              toast.info("Left the meeting");
            }
          }
        }
      } catch (error) {
        console.error("Error handling iframe message:", error);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [meetingUrl]);

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
      {meetingUrl ? (
        <iframe
          ref={iframeRef}
          src={meetingUrl}
          allow="camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; autoplay"
          className="w-[100vw] h-[100vh] absolute top-0 right-0 left-0 bottom-0 border-0 z-[3000]"
        />
      ) : (
        <div className="w-full h-full bg-black" />
      )}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center bg-black absolute top-0 right-0 left-0 bottom-0 z-[3100]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </>
  );
}

export default MiroTalkVideo;

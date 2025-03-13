import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import VideoCall from "../../pages/calls/components/video";
import Image from "next/image";

/**
 * CallModal component for creating and joining Jitsi video conferences
 * @param {Object} props - Component props
 * @param {Function} props.setShowCall - Function to control the visibility of the call modal
 * @returns {JSX.Element} The CallModal component
 */
const CallModal = ({ setShowCall }) => {
  const [callId, setCallId] = useState(null);
  const [activeScreen, setActiveScreen] = useState("caller");
  const [roomId, setRoomId] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const router = useRouter();

  /**
   * Generate a unique meeting ID using UUID
   * @returns {string} A unique meeting ID
   */
  const generateUniqueMeetingId = () => {
    return uuidv4();
  };

  useEffect(() => {
    const setupMeeting = async () => {
      try {
        const id = generateUniqueMeetingId();
        setRoomId(id);
        const callLink = `${window.location.origin}/calls/${id}`;
        setMeetingName(callLink);
      } catch (error) {
        console.error("Error setting up meeting:", error);
        toast.error("Failed to set up meeting");
      }
    };

    setupMeeting();
  }, []);

  /**
   * Handle creating and joining a new Jitsi meeting
   */
  const handleStartMeeting = async () => {
    try {
      setIsCreatingMeeting(true);
      setActiveScreen("callScreen");
    } catch (error) {
      console.error("Error starting meeting:", error);
      toast.error("Failed to start meeting");
      setIsCreatingMeeting(false);
    }
  };

  /**
   * Handle copying the meeting link to clipboard
   */
  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingName).then(() => {
      toast("Call link copied to clipboard", {
        position: "bottom-right",
        autoClose: 3000,
      });
    });
  };

  /**
   * Render the appropriate screen based on the active screen state
   * @returns {JSX.Element} The screen component
   */
  const renderScreen = () => {
    switch (activeScreen) {
      case "caller":
        return (
          <div>
            <div
              className="bg-cover bg-center relative rounded-[1rem] w-[800px] h-[500px] border-[8px] border-gray-300"
              style={{
                backgroundImage: "url('/avatar.jpg')",
                objectFit: "cover",
              }}
            >
              <div
                className="absolute top-0 right-5 text-[30px]"
                onClick={() => setShowCall(false)}
              >
                <button> &times; </button>
              </div>
              <div className="bg-black absolute bottom-0 right-0 left-0 h-[150px] flex items-center justify-center rounded-t-[1rem] rounde-b">
                <input
                  type="text"
                  className="p-5 w-[50%]"
                  placeholder="Enter meeting name"
                  value={meetingName}
                  readOnly
                />
                <button
                  onClick={handleCopyLink}
                  className="bg-sirp-primary p-5 text-white ml-5 w-[20%]"
                >
                  Copy Link
                </button>
                <button
                  onClick={handleStartMeeting}
                  className="bg-green-600 p-5 text-white ml-5 w-[20%] hover:bg-green-700 transition-colors"
                  disabled={isCreatingMeeting}
                >
                  {isCreatingMeeting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                      <span className="ml-2">Starting...</span>
                    </div>
                  ) : (
                    "Start Meeting"
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      case "callScreen":
        return (
          <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0">
            <VideoCall roomName={roomId} />
            <button
              className="absolute top-4 right-4 z-[9999] px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => {
                setActiveScreen("caller");
                setShowCall(false);
              }}
            >
              End Call
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed z-[1020] flex items-center justify-center backdrop-blur-sm w-full h-[100vh] top-0 left-0 bottom-0 bg-[#747474]/[0.1] backdrop-brightness-50">
      <div className="grid">{renderScreen()}</div>
    </div>
  );
};

export default CallModal;

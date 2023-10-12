import React, { useState } from "react";
import Image from "next/image";
import ChatCard from "./ChatCard";
import { useSelector } from "react-redux";
import { CustomModal } from "@/components/ui";
import MessagesDisplay from "./MessagesDisplay";
import ChatInput from "./ChatInputchat";

function Chats({ setShowChat }) {
  const closeChats = () => {
    setShowChat(false);
  };
  const { allRecentChats } = useSelector((state: any) => state?.chats);
  const showVideoCallModal = () => {};
  const showAudioCallModal = () => {};
  const [showAttachment, setShowAttachment] = useState(false);
  const headerProps = { showVideoCallModal, showAudioCallModal };

  const showAudioFile = (data: Blob) => {
    let newMessage = {
      id: 0,
      time_sent: "12:09",
      date_sent: "15/07/2023",
      status: "read",
      content: data,
      content_type: "audio",
      action: "sent",
    };
  };
  const showUploadPopup = () => {
    setShowAttachment((prevState) => !prevState);
  };
  const chatInputProps = { showUploadPopup, showAttachment };
  return (
    <div>
      <div className="w-full h-[90vh]">
        <div className="w-full h-full">
          <div className="flex justify-between border-b p-3">
            <span className="font-bold">Chats</span>
            <div className="cursor-pointer" onClick={closeChats}>
              <Image
                src={require("../../../../public/icons/x.svg")}
                alt="userImage"
                width={20}
                height={20}
                className="rounded-full object-fill"
                priority
              />
            </div>
          </div>
          <MessagesDisplay />
          <ChatInput
            {...chatInputProps}
            showAudioFile={showAudioFile}
            setShowAttachment={() => setShowAttachment(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Chats;

import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
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

  const showUploadPopup = () => {
    setShowAttachment((prevState) => !prevState);
  };
  const chatInputProps = { showUploadPopup, showAttachment };
  return (
    <div className="w-full h-full relative overflow-y-auto">
      <div className="flex border-b border-l p-5 justify-between  bg-white absolute top-0 right-0 left-0 z-[100]">
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
        setShowAttachment={() => setShowAttachment(false)}
      />
    </div>
  );
}

export default Chats;

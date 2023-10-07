import React, { useEffect, useState, useRef } from "react";
import { CustomModal } from "@/components/ui";
import MessagesDisplay from "./MessagesDisplay";
import ChatInput from "./ChatInputchat";
import { useDispatch, useSelector } from "react-redux";
import { useTruncate } from "../../../components/custom-hooks";

function ChatModal({ setShowChat, showChat }) {
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
  const { activeChat } = useSelector((state: any) => state.chats);
  const chatInputProps = { showUploadPopup, showAttachment };
  return (
    <CustomModal
      style="bg-white w-[50%]"
      closeModal={() => {
        setShowChat(false);
      }}
    >
      <div className="font-bold text-lg flex items-center justify-start pl-10">
        {useTruncate(activeChat.firstName, 22)}{" "}
        {useTruncate(activeChat.lastName, 22)}
      </div>
      <MessagesDisplay />
      <ChatInput
        {...chatInputProps}
        showAudioFile={showAudioFile}
        setShowAttachment={() => setShowAttachment(false)}
      />
    </CustomModal>
  );
}

export default ChatModal;

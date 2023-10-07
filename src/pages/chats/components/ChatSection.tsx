import React, { useEffect, useState, useRef } from "react";
import MessagesDisplay from "./MessagesDisplay";
import Header from "./ChatHeader";
import ChatInput from "./ChatInput";
import Image from "next/image";
import { useSelector } from "react-redux";
import chatEmpty from "../../../../public/icons/chat.empty.svg";

function ChatSection(props) {
  const { messages } = props;
  const [showAttachment, setShowAttachment] = useState(false);
  const [audioFile, setAudioFile] = useState("");
  const { allRecentChats, activeChat, selectedChat } = useSelector(
    (state: any) => state?.chats,
  );

  const messagesEndRef = useRef(null); // Create a ref for the bottom of the chat

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (audioFile) {
      // setAllMessages(audioFile);
      //dispatch audio message and add to allMessages
    }
  }, [audioFile]);

  // header component methods
  const showVideoCallModal = () => {};
  const showAudioCallModal = () => {};

  // chat input component methods
  const showChatEmoji = () => {};
  const showUploadPopup = () => {
    setShowAttachment((prevState) => !prevState);
  };

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

  // props
  const headerProps = { showVideoCallModal, showAudioCallModal };
  const chatInputProps = { showUploadPopup, showAttachment };

  return (
    <>
      {/* {selectedChat.length > 0  && ( */}
      <>
        <Header {...headerProps} />
        <MessagesDisplay />
        <ChatInput
          {...chatInputProps}
          showAudioFile={showAudioFile}
          setShowAttachment={() => setShowAttachment(false)}
        />
        {/* Scroll to the bottom of the chat */}
        <div ref={messagesEndRef} />
      </>
      {/* // )} */}
    </>
  );
}

export default ChatSection;

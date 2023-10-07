import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import socketio from "@/utils/socket";
import { useDispatch, useSelector } from "react-redux";
import SocketService from "../../../socket/chat.socket";
// import { setAllMessages } from "@/redux/reducers/chat/chatReducer";
import { MessageModel } from "../../../models/chat.model";
import { useCalculateTime } from "@/components/custom-hooks";
import chatReceived from "../../../../public/icons/chat.received.svg";
import chatRead from "../../../../public/icons/chat.read.svg";

function MessagesDisplay() {
  const { selectedChat, activeChat } = useSelector(
    (state: any) => state?.chats,
  );

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // Scroll to the bottom of the container
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);
  // Scroll to the bottom when the component mounts or when new messages arrive

  return (
    <div
      className=" relative h-[65vh] md:h-[56.8vh] overflow-y-auto"
      ref={messagesEndRef}
    >
      {selectedChat?.map((message) => {
        return message?.message?.text ? (
          <div
            className="bg-white my-3 shadow rounded-[10px] border-l-[5px] border-l-[#EEF4FB] m-5"
            key={message._id}
          >
            {/* header */}
            <div className="flex border-b items-center p-2 justify-between">
              <div className="text-sm flex flex-wrap">
                <span className="mr-1">
                  <Image
                    src={require("../../../../public/images/user1.jpg")}
                    alt="userImage"
                    width={20}
                    height={20}
                    className="rounded-full object-fill"
                    priority
                  />
                </span>

                <span className="mr-1">Musba’u Wasiu</span>
                <div className={"absolute right-2 flex gap-x-2 p-2"}>
                  <div className="text-[11px] font-light">
                    {useCalculateTime(message?.updatedAt)}{" "}
                  </div>
                  <Image
                    src={message?.message?.read === 0 ? chatReceived : chatRead}
                    alt="status"
                    height={17}
                    width={17}
                  />
                </div>
              </div>
              <div></div>
            </div>
            {/* content */}
            <div className="flex items-center p-2 justify-start text-gray-400 text-sm">
              {message?.message?.text}
            </div>
          </div>
        ) : message.content_type === "audio" ? (
          <div
            key={message.id}
            className={`${
              message.action === "sent"
                ? "float-right mr-3 clear-both"
                : "float-left ml-3 clear-both"
            } text-sirp-grey font-light text-[14px] max-w-[400px] w-auto  mt-[1rem]`}
          >
            <audio src={message.content} controls></audio>
          </div>
        ) : (
          <div className="mt-[3rem]">New Message type?</div>
        );
      })}
    </div>
  );
}

export default MessagesDisplay;

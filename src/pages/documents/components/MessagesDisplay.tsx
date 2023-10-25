import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import socketio from "@/utils/socket";
import { useDispatch, useSelector } from "react-redux";
import SocketService from "../../../socket/chat.socket";
// import { setAllMessages } from "@/redux/reducers/chat/chatReducer";
import { MessageModel } from "../../../models/chat.model";
import { useCalculateTime, useTruncate } from "@/components/custom-hooks";
import chatReceived from "../../../../public/icons/chat.received.svg";
import chatRead from "../../../../public/icons/chat.read.svg";

function MessagesDisplay() {
  const { comments } = useSelector((state: any) => state?.chats);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // Scroll to the bottom of the container
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);
  // Scroll to the bottom when the component mounts or when new messages arrive

  return (
    <div
      className="h-[75vh] flex items-center flex-col px-3 overflow-y-auto py-20 overflow-x-hidden bg-[#efefef] border-l"
      ref={messagesEndRef}
    >
      {comments?.map((message) => {
        return message?.comment?.text ? (
          <div
            className="bg-white my-2 shadow rounded-[10px] w-full border-l-[5px] border-l-sirp-primary m-5"
            key={message._id}
          >
            {/* header */}
            <div className="flex border-b relative">
              <div className="text-sm flex items-center p-2 justify-between">
                <span className="mr-1 capitalize">
                  {useTruncate(message?.sender?.name, 12)}...
                </span>
                <div className="p-2 absolute right-1">
                  <div className="text-[11px] font-light">
                    {useCalculateTime(message?.updatedAt)}{" "}
                  </div>
                </div>
              </div>
            </div>
            {/* content */}
            <div className="flex items-center p-2 justify-start text-gray-400 text-sm">
              {message?.comment?.text}
            </div>
          </div>
        ) : message.content_type === "audio" ? (
          <div
            key={message?._id}
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

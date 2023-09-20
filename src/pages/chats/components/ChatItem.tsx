import React, { useEffect, useState } from "react";
import { useTruncate } from "../../../components/custom-hooks";
import { ChatItemModel } from "../../../models/chat.model";
import SocketService from "../../../socket/chat.socket";
import {
  setActivechat,
  setSelectedChat,
} from "@/redux/reducers/chat/chatReducer";
import { useDispatch, useSelector } from "react-redux";

function ChatItem({ chat, setIsClicked, isClicked }) {
  const { uuid, firstName, lastName, messages, image } = chat;
  const dispatch = useDispatch();
  const { activeChat } = useSelector((state: any) => state.chats);

  const handleClick = (data: any) => {
    dispatch(setSelectedChat([]));
    dispatch(
      setActivechat({
        uuid,
        firstName,
        lastName,
      }),
    );
    console.log("active chat", {
      userId: "50bd293d-bd93-4557-bf86-c3bfefbc8917",
      uuid: data,
    });
    const useSocket = SocketService;
    useSocket.getSelectedMsg({
      userId: "50bd293d-bd93-4557-bf86-c3bfefbc8917",
      uuid: data,
    });
    if (activeChat.uuid === data) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  };

  return (
    <div
      onClick={() => handleClick(uuid)}
      className={
        isClicked
          ? "flex justify-between px-3 py-4 bg-sirp-primaryLess2 border-b-[.15px] border-b-sirp-offline shadow shadow-sirp-offline hover:cursor-pointer hover:bg-sirp-lightGrey"
          : "flex justify-between px-3 py-4 bg-white border-b-[.15px] border-b-sirp-offline shadow shadow-sirp-offline hover:cursor-pointer hover:bg-sirp-lightGrey"
      }
    >
      <div className="flex gap-x-3">
        <div className="relative">
          {/* user status dot (on image)  */}
          <div
            className={`absolute md:ml-9 ml-[1.75rem] mt-[0.07rem] z-10 h-[12px] w-[12px] rounded-full  ${
              status && status === "online"
                ? "bg-sirp-online"
                : "bg-sirp-offline"
            }`}
          ></div>
          {/* user status background  */}
          <div
            className={`rounded-full p-[2.5px] ${
              status && status === "online"
                ? "bg-gradient-to-r from-red-500 to-yellow-400 "
                : "bg-sirp-offline"
            }`}
          >
            <img
              src={chat?.image}
              alt={"user"}
              className="rounded-full border-[2px] border-white md:h-[43px] h-[30px] md:w-[43px] w-[30px]"
            />
          </div>
        </div>
        {/* user name block  */}
        <div className="grid">
          <h4 className="mb-0 md:text-[16px] text-[14px]">
            {useTruncate(firstName, 22)} {useTruncate(lastName, 22)}
          </h4>
          <p className="text-[14px] font-light">
            {messages && useTruncate(messages?.message?.text, 30)}
          </p>
        </div>
      </div>
      <div className="rounded-full bg-sirp-primary py-[3px] w-[25px] my-auto text-white text-center items-center text-[12px] font-semibold">
        0
      </div>
    </div>
  );
}

export default ChatItem;

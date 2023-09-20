import React, { useState } from "react";
import Image from "next/image";
import ChatModal from "./ChatModal";
import { useTruncate } from "../../../components/custom-hooks";
import SocketService from "../../../socket/chat.socket";
import { setActivechat } from "@/redux/reducers/chat/chatReducer";
import { useDispatch, useSelector } from "react-redux";

function ChatCard({ chat, setIsClicked, isClicked }) {
  const [showChat, setShowChat] = useState(false);
  const { uuid, firstName, lastName, messages, image } = chat;
  const dispatch = useDispatch();
  const { activeChat } = useSelector((state: any) => state.chats);
  const handleClick = (data: any) => {
    console.log(data, "data");
    dispatch(
      setActivechat({
        uuid,
        firstName,
        lastName,
      }),
    );
    console.log("active chat", data);
    const useSocket = SocketService;
    useSocket.getSelectedMsg({
      userId: "50bd293d-bd93-4557-bf86-c3bfefbc8917",
      uuid: chat?.uuid,
    });
    if (activeChat.uuid === data) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  };
  return (
    <div>
      <div
        className="flex border-b  hover:bg-sirp-primaryLess2 items-center cursor-pointer p-4 justify-between"
        onClick={() => handleClick(uuid)}
      >
        <div className="text-sm flex items-center justify-start">
          <span className="mr-1">
            <img
              src={chat?.image}
              alt={"user"}
              className="rounded-full border-[2px] border-white md:h-[43px] h-[30px] md:w-[43px] w-[30px]"
            />
          </span>
          {/* <div className="flex ml-4 flex-col items-start justify-center">
            <span className="mr-1 font-bold">{useTruncate(firstName, 22)} {useTruncate(lastName, 22)}</span>
            <span className="text-gray-400">Jan 13</span>
          </div> */}
        </div>
        <div className="h-[30px] w-[30px] flex items-center justify-center bg-green-500 rounded-full text-white font-bold">
          3
        </div>
      </div>
      {isClicked && (
        <ChatModal showChat={isClicked} setShowChat={setIsClicked} />
      )}
    </div>
  );
}

export default ChatCard;

import React, { useState } from "react";
import Image from "next/image";
import ChatModal from "./ChatModal";

function ChatCard() {
  const [showChat, setShowChat] = useState(false);
  return (
    <div>
      <div
        className="flex border-b  hover:bg-sirp-primaryLess2 items-center cursor-pointer p-4 justify-between"
        onClick={() => setShowChat(true)}
      >
        <div className="text-sm flex items-center justify-start">
          <span className="mr-1">
            <Image
              src={require("../../../assets/images/user1.jpg")}
              alt="userImage"
              width={20}
              height={20}
              className="rounded-full object-fill"
              priority
            />
          </span>
          <div className="flex ml-4 flex-col items-start justify-center">
            <span className="mr-1 font-bold">Musba’u Wasiu</span>
            <span className="text-gray-400">Jan 13</span>
          </div>
        </div>
        <div className="h-[30px] w-[30px] flex items-center justify-center bg-green-500 rounded-full text-white font-bold">
          3
        </div>
      </div>
      {showChat && <ChatModal showChat={showChat} setShowChat={setShowChat} />}
    </div>
  );
}

export default ChatCard;

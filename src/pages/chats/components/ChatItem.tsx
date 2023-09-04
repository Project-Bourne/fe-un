import React from "react";
import { useTruncate } from "../../../components/custom-hooks";
import { ChatItemModel } from "../../../models/chat.model";

function ChatItem({ chat, onClick }: ChatItemModel) {
  const { userId, firstName, lastName, messages, img, newMessagesCount } = chat;
  console.log("messages", messages);

  const handleClick = (data: any) => {
    console.log("active chat", data);
    onClick(data);
  };

  return (
    <div
      onClick={() => handleClick(userId)}
      className="flex justify-between px-3 py-4 bg-white border-b-[.15px] border-b-sirp-offline shadow shadow-sirp-offline hover:cursor-pointer hover:bg-sirp-lightGrey"
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
              src={img}
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
      {newMessagesCount !== 0 && (
        <div className="rounded-full bg-sirp-primary py-[3px] w-[25px] my-auto text-white text-center items-center text-[12px] font-semibold">
          {newMessagesCount}
        </div>
      )}
    </div>
  );
}

export default ChatItem;

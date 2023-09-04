import React from "react";
import ChatItem from "./ChatItem";
import NewChatMobile from "./NewChatMobile";

function ChatList({ chatsData, handleClick, listMobileDisplay }) {
  return (
    <div
      className={`${listMobileDisplay} md:block relative  h-[100%] overflow-y-auto border-r-[1px] border-r-gray-100 transition duration-500 ease-in-out`}
    >
      {chatsData.length > 0 &&
        chatsData?.map((chat) => (
          <ChatItem chat={chat} key={chat.userId} onClick={handleClick} />
        ))}
      <NewChatMobile />
    </div>
  );
}

export default ChatList;

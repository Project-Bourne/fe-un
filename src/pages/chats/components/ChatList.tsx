import React, { useState } from "react";
import ChatItem from "./ChatItem";
import NewChatMobile from "./NewChatMobile";
import { useSelector } from "react-redux";

function ChatList({ chatsData, listMobileDisplay }) {
  const [isClicked, setIsClicked] = useState(false);
  const { allRecentChats } = useSelector((state: any) => state?.chats);
  return (
    <div
      className={`${listMobileDisplay} md:block relative  h-[100%] overflow-y-auto border-r-[1px] border-r-gray-100 transition duration-500 ease-in-out`}
    >
      {allRecentChats.length > 0 &&
        allRecentChats?.map((chat) => (
          <ChatItem
            chat={chat}
            key={chat.uuid}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
        ))}
      {/* <NewChatMobile /> */}
    </div>
  );
}

export default ChatList;

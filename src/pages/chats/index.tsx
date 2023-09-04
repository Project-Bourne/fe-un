import { ChatsLayout } from "../../layout/index";
import React, { useEffect, useState } from "react";
import EmptyChat from "./components/EmptyChat";
import ChatSection from "./components/ChatSection";
import socketio from "../../utils/socket";
import SocketService from "../../socket/chat.socket";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./components/ChatList";
import {
  setActiveChat,
  setAllMessages,
} from "@/redux/reducers/chat/chatReducer";
import { MessageModel } from "../../models/chat.model";

function Index() {
  const [listMobileDisplay, setListMobileDisplay] = useState("block");
  const [chatsMobileDisplay, setChatsMobileDisplay] = useState("hidden");
  const [messages, setMessages] = useState<MessageModel[] | []>([]);
  const { allRecentChats, activeChat, allMessages } = useSelector(
    (state: any) => state?.chats,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeChat) {
      socketio.emit("get-all-msg", { activeChat });

      socketio.on("all-msgs", async (res) => {
        // console.log("get all 1-1 chats ", JSON.parse(res));
        dispatch(setAllMessages(JSON.parse(res)));
      });
    }
  }, [activeChat]);

  useEffect(() => {
    console.log("chhats data", allRecentChats);
  }, [allRecentChats]);

  useEffect(() => {
    console.log("all messages from user", allMessages);
    const msgs = allMessages?.filter(
      (message) => message.sender === activeChat,
    );
    console.log("....msgs", msgs);
    setMessages(msgs);
  }, [allMessages]);

  const handleClick = (data) => {
    dispatch(setActiveChat(data));
    setListMobileDisplay("hidden");
    setChatsMobileDisplay("block");
  };

  return (
    <ChatsLayout>
      {/* <h1>Chats</h1> */}
      <div className="w-full h-full">
        {allRecentChats || activeChat ? (
          <div className="grid h-[76.5vh] md:grid-cols-3">
            {/* list of active chats  */}
            <ChatList
              chatsData={allRecentChats}
              handleClick={handleClick}
              listMobileDisplay={listMobileDisplay}
            />
            {/* messaging display */}
            <div
              className={`${chatsMobileDisplay} md:block relative col-span-2 transition duration-500 ease-in-out`}
            >
              <ChatSection messages={messages} />
            </div>
          </div>
        ) : (
          <EmptyChat showButton={true} showSubText={true} />
        )}
      </div>
    </ChatsLayout>
  );
}

export default Index;

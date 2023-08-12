import { ChatsLayout } from "../../layout/index";
import React, { useEffect, useState } from "react";
import EmptyChat from "./components/EmptyChat";
import ChatSection from "./components/ChatSection";
import socketio from "../../utils/socket";
import { useSelector } from "react-redux";
import ChatList from "./components/ChatList";

const messages = [
  {
    id: 0,
    time_sent: "12:09",
    date_sent: "15/07/2023",
    status: "read",
    content: "Lorem , consectetur  ",
    content_type: "string",
    action: "sent",
  },
  {
    id: 1,
    time_sent: "12:59",
    date_sent: "15/07/2023",
    status: "delivered",
    content:
      "Lorem ipsum dolor sit amet,  sint ut odit beatae repudiandae, rem esse accusamus voluptates cupiditate temporibus doloribus consectetur perferendis unde nemo? ",
    content_type: "string",
    action: "recieved",
  },
  {
    id: 2,
    time_sent: "12:49",
    date_sent: "15/07/2023",
    status: "read",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae commodi corrupti, eum voluptate suscipit sint ut odit beatae repudiandae, rem esse accusamus voluptates cupiditate temporibus doloribus consectetur perferendis unde nemo? ",
    content_type: "string",
    action: "sent",
  },
  {
    id: 3,
    time_sent: "12:39",
    date_sent: "15/07/2023",
    status: "delivered",
    content:
      "Lorem ipsum dolor sit amet,  sint ut odit beatae repudiandae, rem esse accusamus voluptates cupiditate temporibus doloribus consectetur perferendis unde nemo? ",
    content_type: "string",
    action: "recieved",
  },
  {
    id: 4,
    time_sent: "12:29",
    date_sent: "15/07/2023",
    status: "read",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae commodi corrupti, eum voluptate suscipit sint ut odit beatae repudiandae, rem esse accusamus voluptates cupiditate temporibus doloribus consectetur perferendis unde nemo? ",
    content_type: "string",
    action: "sent",
  },
  {
    id: 5,
    time_sent: "12:19",
    date_sent: "15/07/2023",
    status: "sent",
    content:
      "Lorem ipsum dolor sit amet,  sint ut odit beatae repudiandae, rem esse accusamus voluptates cupiditate temporibus doloribus consectetur perferendis unde nemo? ",
    content_type: "string",
    action: "recieved",
  },
];

function Index() {
  const [listMobileDisplay, setListMobileDisplay] = useState("block");
  const [chatsMobileDisplay, setChatsMobileDisplay] = useState("hidden");
  const chatsData = useSelector((state: any) => state.chats.allRecentChats);

  useEffect(() => {
    if (socketio) {
      console.log("socket status", socketio);
    }
  }, [socketio]);

  const handleClick = () => {
    setListMobileDisplay("hidden");
    setChatsMobileDisplay("block");
  };

  return (
    <ChatsLayout>
      {/* <h1>Chats</h1> */}
      <div className="w-full h-full">
        {chatsData.length > 0 ? (
          <div className="grid h-[76.5vh] md:grid-cols-3">
            {/* list of active chats  */}
            <ChatList
              chatsData={chatsData}
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
          <EmptyChat />
        )}
      </div>
    </ChatsLayout>
  );
}

export default Index;

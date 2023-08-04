import { ChatsLayout } from "../../layout/index";
import React, { useEffect, useState } from "react";
import EmptyChat from "./components/EmptyChat";
import ChatItem from "./components/ChatItem";
import ChatSection from "./components/ChatSection";
import socketio from "../../utils/socket";

const chatsData = [
  {
    id: 0,
    name: "Rebecca Onyebabnji",
    message: {
      type: "string",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit incidunt dolore minima ipsa vel quos magni velit aperiam. Odit, sapiente eum. Impedit sit vitae asperiores quae iste cumque ratione ab.",
      count: 3,
    },
    status: "online",
  },
  {
    id: 1,
    name: "Rebecca Onyebabnji",
    message: {
      type: "string",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit incidunt dolore minima ipsa vel quos magni velit aperiam. Odit, sapiente eum. Impedit sit vitae asperiores quae iste cumque ratione ab.",
      count: 1,
    },
    status: "offline",
  },
  {
    id: 2,
    name: "Rebecca Onyebabnji",
    message: {
      type: "string",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit incidunt dolore minima ipsa vel quos magni velit aperiam. Odit, sapiente eum. Impedit sit vitae asperiores quae iste cumque ratione ab.",
      count: 3,
    },
    status: "offline",
  },
  {
    id: 3,
    name: "Rebecca Onyebabnji",
    message: {
      type: "string",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit incidunt dolore minima ipsa vel quos magni velit aperiam. Odit, sapiente eum. Impedit sit vitae asperiores quae iste cumque ratione ab.",
      count: 3,
    },
    status: "online",
  },
  {
    id: 4,
    name: "Rebecca Onyebabnji",
    message: {
      type: "string",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit incidunt dolore minima ipsa vel quos magni velit aperiam. Odit, sapiente eum. Impedit sit vitae asperiores quae iste cumque ratione ab.",
      count: 1,
    },
    status: "offline",
  },
  {
    id: 5,
    name: "Rebecca Onyebabnji",
    message: {
      type: "string",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit incidunt dolore minima ipsa vel quos magni velit aperiam. Odit, sapiente eum. Impedit sit vitae asperiores quae iste cumque ratione ab.",
      count: 3,
    },
    status: "offline",
  },
  {
    id: 6,
    name: "Rebecca Onyebabnji",
    message: {
      type: "string",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit incidunt dolore minima ipsa vel quos magni velit aperiam. Odit, sapiente eum. Impedit sit vitae asperiores quae iste cumque ratione ab.",
      count: 3,
    },
    status: "online",
  },
  {
    id: 7,
    name: "Rebecca Onyebabnji",
    message: {
      type: "string",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit incidunt dolore minima ipsa vel quos magni velit aperiam. Odit, sapiente eum. Impedit sit vitae asperiores quae iste cumque ratione ab.",
      count: 1,
    },
    status: "offline",
  },
  {
    id: 8,
    name: "Rebecca Onyebabnji",
    message: {
      type: "string",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit incidunt dolore minima ipsa vel quos magni velit aperiam. Odit, sapiente eum. Impedit sit vitae asperiores quae iste cumque ratione ab.",
      count: 3,
    },
    status: "offline",
  },
];

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
            <div
              className={`${listMobileDisplay} md:block  h-[100%] overflow-y-auto border-r-[1px] border-r-gray-100 transition duration-500 ease-in-out`}
            >
              {chatsData?.map((chat) => (
                <ChatItem {...chat} key={chat.id} onClick={handleClick} />
              ))}
            </div>
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

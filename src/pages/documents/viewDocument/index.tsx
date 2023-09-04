import React, { useState } from "react";
import Image from "next/image";
import Docs from "../components/Docs";
import CallModal from "../components/CallModal";

function viewDocument() {
  const [selectedTab, setSelectedTab] = useState(null); // Initially select the first tab
  const [showComments, setShowComments] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const DocumentsBar = [
    {
      name: "Share",
      icon: "share.svg",
      id: 1,
    },
    {
      name: "Comment",
      icon: "comments.svg",
      id: 2,
    },
    {
      name: "Call",
      icon: "call.svg",
      id: 3,
    },
    {
      name: "Chat",
      icon: "chat.svg",
      id: 4,
    },
  ];

  const handleClick = (id) => {
    setSelectedTab(id);
    if (id === 1) {
      setShowComments(false);
      setShowChat(false);
      setShowCall(false);
      setShowShare(true);
    }
    if (id === 2) {
      setShowComments(true);
      setShowChat(false);
      setShowCall(false);
      setShowShare(false);
    }
    if (id == 3) {
      setShowComments(false);
      setShowCall(true);
      setShowChat(false);
      setShowShare(false);
    }
    if (id == 4) {
      setShowComments(false);
      setShowChat(true);
      setShowCall(false);
      setShowShare(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className=" flex items-center  justify-between  border-b-[1px] border-b-gray-100 w-full px-5 py-3">
        <div>
          <Image
            className="flex align-middle justify-center"
            src={require(`../../../../public/icons/groupAvatar.svg`)}
            alt="upload image"
            width={200}
            height={100}
            priority
          />
        </div>
        <div className=" flex items-center">
          {DocumentsBar?.map((item, index) => (
            <div
              key={item.id}
              className={` ${
                selectedTab === item.id
                  ? "flex items-center mr-5 bg-sirp-primaryLess2 p-1 rounded-lg cursor-pointer"
                  : "flex items-center mr-5 p-1 cursor-pointer rounded-lg"
              }`}
              onClick={() => handleClick(item.id)}
            >
              <span className="mr-2">
                <Image
                  src={require(`../../../../public/icons/${item.icon}`)}
                  alt=""
                />
              </span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <Docs
        showComments={showComments}
        setShowComments={setShowComments}
        setShowChat={setShowChat}
        showChat={showChat}
        setShowShare={setShowShare}
        showShare={showShare}
      />
      {showCall && <CallModal setShowCall={setShowCall} />}
    </div>
  );
}

export default viewDocument;

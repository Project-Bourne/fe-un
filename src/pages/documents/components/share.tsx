import React, { useState } from "react";
import Image from "next/image";

function Share({ setShowChat }) {
  const socials = [
    {
      id: 1,
      text: "Twitter",
      icon: "Twitter.svg",
    },
    {
      id: 2,
      text: "Discord",
      icon: "Discord.svg",
    },
    {
      id: 3,
      text: "Telegram",
      icon: "Telegram.svg",
    },
    {
      id: 4,
      text: "Instagram",
      icon: "Instagram.svg",
    },
    {
      id: 5,
      text: "Facebook",
      icon: "Facebook.svg",
    },
  ];

  const closeChats = () => {
    setShowChat(false);
  };
  return (
    <div>
      <div className="w-full h-full">
        <div className="w-full flex flex-col gap-20">
          <div className="flex justify-between border-b p-3">
            <span className="font-bold">Share</span>
            <div className="cursor-pointer" onClick={closeChats}>
              <Image
                src={require("../../../assets/icons/x.svg")}
                alt="userImage"
                width={20}
                height={20}
                className="rounded-full object-fill"
                priority
              />
            </div>
          </div>

          <div className="m-3">
            <div className="flex flex-col gap-3 text-sm">
              <span className="font-bold">Document Info</span>
              <span className="text-gray-400">
                https/htvsvb-uy5-nnnnnndrd-hhhh
              </span>
              <div className="flex items-center justify-center p-2 w-[50%]  rounded-[1rem] border-2 border-gray-200">
                <span className="mr-2">
                  <Image
                    src={require("../../../assets/icons/copy.svg")}
                    alt="userImage"
                    width={20}
                    height={20}
                    className="rounded-full object-fill"
                    priority
                  />
                </span>
                <span className="text-sirp-primary font-bold">copy info</span>
              </div>
            </div>
          </div>

          <div className="m-3">
            <span className="font-bold">Share via</span>

            <div className="flex items-centers justify-center gap-3 mt-3">
              {socials.map((item) => (
                <div className=" flex flex-col items-center cursor-pointer justify-center">
                  <span className="h-[40px] w-[40px] rounded-full border-[8px] mb-3 border-gray-300">
                    <Image
                      src={require(`../../../assets/icons/${item.icon}`)}
                      alt="userImage"
                      width={30}
                      height={30}
                      className="rounded-full object-fill"
                      priority
                    />
                  </span>
                  <span className="text-[12px] text-gray-400 font-semibold">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;

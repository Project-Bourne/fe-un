import { CustomEmoji } from "@/components/ui";
import { SearchInput } from "@/components/ui/Input";
import Image from "next/image";
import { useState } from "react";
import ChatMenu from "./ChatMenu";

export const Header = (props) => {
  const { showVideoCallModal, showAudioCallModal, status } = props;
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="flex z-10 gap-x-1 md:gap-x-0 md:justify-between items-center md:px-7 px-3 py-[.5rem] md:py-[1.20rem] border-b-[1px] border-b-gray-100 shadow">
      {/* header bar  */}
      <div className="relative">
        <div
          className={`absolute ml-9 mt-[0.07rem] z-10 h-[12px] w-[12px] rounded-full  ${
            status === "online" ? "bg-sirp-online" : "bg-sirp-offline"
          }`}
        ></div>
        <div
          className={`rounded-full p-[2.5px] ${
            status === "online"
              ? "bg-gradient-to-r from-red-500 to-yellow-400 "
              : "bg-sirp-offline"
          }`}
        >
          <Image
            src={require("../../../assets/images/user1.jpg")}
            alt={"user"}
            className="rounded-full border-[4px] border-white h-[43px] w-[43px]"
          />
        </div>
      </div>
      <div className="flex gap-x-3 md:gap-x-[5rem]">
        <div className="flex md:gap-x-2">
          {/* search input */}
          <SearchInput placeholder={"Search chats"} />
          {/* options dropdown  */}
          <div
            onClick={() => setToggleMenu((prevState) => !prevState)}
            className="h-[40px] w-[45px] md:w-[60px] rounded-full bg-sirp-lightGrey flex justify-center items-center hover:cursor-pointer"
          >
            <Image
              src={require("../../../assets/icons/chat.collapse.svg")}
              alt="collapse-btn"
            />
          </div>
        </div>
        <div className="hidden md:flex gap-x-3">
          <Image
            src={require("../../../assets/icons/chat.camera.svg")}
            className="hover:cursor-pointer"
            alt="video-call"
            width={37}
            height={37}
            onClick={showVideoCallModal}
          />
          <Image
            src={require("../../../assets/icons/chat.phone.svg")}
            className="hover:cursor-pointer"
            alt="voice-call"
            width={37}
            height={37}
            onClick={showAudioCallModal}
          />
        </div>
        <ChatMenu
          toggleMenu={toggleMenu}
          closeMenu={() => setToggleMenu(false)}
        />
      </div>
    </div>
  );
};

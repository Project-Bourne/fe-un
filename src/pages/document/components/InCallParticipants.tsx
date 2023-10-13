import React from "react";
import Image from "next/image";
// import ChatInput from "./ChatInput";

function InCallParticipants({ setActiveScreen }) {
  return (
    <div className="h-full">
      {/* header */}
      <div className="flex items-center justify-between h-[20px] border-b p-7">
        <span className="font-bold">In-call Participants</span>
        <span
          onClick={() => setActiveScreen(undefined)}
          className="cursor-pointer"
        >
          <Image
            src={require(`../../../../public/icons/x.svg`)}
            alt="upload image"
            width={18}
            height={18}
          />
        </span>
      </div>
      {/* body */}

      {/* bottom */}
      <div className="border-t h-[20%]">{/* <ChatInput /> */}</div>
    </div>
  );
}

export default InCallParticipants;

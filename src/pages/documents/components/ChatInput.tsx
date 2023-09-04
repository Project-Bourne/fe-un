import React, { useState } from "react";
import Image from "next/image";

function ChatInput() {
  const [isTyping, setIsTyping] = useState(false);
  const [textValue, setTextValue] = useState("");

  const handleSendMessage = () => {};

  return (
    <>
      <div className="absolute bg-white z-10 bottom-0 w-full py-3 border-t-[1px] border-t-[#F9F9F9]">
        <span className="font-bold">Invite Others</span>
        <form className="flex relative justify-center  flex-col mx-auto">
          <div className="md:w-[10%] rounded-l-full border-r-0  bg-[#F9FBFE] focus:border-[#F9FBFE] outline-none flex justify-center">
            <Image
              src={require("../../../../public/icons/plus.svg")}
              alt="attachment"
              width={35}
              height={35}
              className="py-2 px-2 hover:cursor-pointer"
              priority
            />
          </div>
          <div className="w-[78%] flex items-center h-15 border-0 ">
            <textarea
              className={`w-full h-full py-3.5 px-1 md:pr-3 font-light border-l-0 text-[13px] bg-[#F9FBFE] focus:border-[#F9FBFE] outline-none resize-none `}
              placeholder="Type message here"
              rows={1}
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value);
                setIsTyping(true);
              }}
            />
          </div>
          <div className="flex justify-between gap-x-1 md:gap-x-2  md:w-[12%] bg-[#F9FBFE] rounded-r-full">
            <Image
              src={require("../../../../public/icons/chat.send.svg")}
              alt="send"
              className={`${
                !isTyping ? "bg-[#B9C1C7]" : "bg-sirp-primary"
              } p-2 md:p-3 my-auto rounded-full h[40px] w-[40px] md:h-[50px] md:w-[50px] hover:cursor-pointer`}
              onClick={handleSendMessage}
              priority
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default ChatInput;

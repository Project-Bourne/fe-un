import { useTruncate } from "@/components/custom-hooks";
import ChatItemModel from "../model/chat.model";

function ChatItem({chat, onClick}: ChatItemModel) {
  const { firstName, lastName, message, status, img } = chat;

  return (
    <div
      onClick={onClick}
      className="flex justify-between px-3 py-4 bg-white border-b-[.15px] border-b-sirp-offline shadow shadow-sirp-offline hover:cursor-pointer hover:bg-sirp-lightGrey"
    >
      <div className="flex gap-x-3">
        <div className="relative">
          {/* user status dot (on image)  */}
          <div
            className={`absolute md:ml-9 ml-[1.75rem] mt-[0.07rem] z-10 h-[12px] w-[12px] rounded-full  ${
              status && status === "online" ? "bg-sirp-online" : "bg-sirp-offline"
            }`}
          ></div>
          {/* user status background  */}
          <div
            className={`rounded-full p-[2.5px] ${
              status && status === "online"
                ? "bg-gradient-to-r from-red-500 to-yellow-400 "
                : "bg-sirp-offline"
            }`}
          >
            <img
              src={img}
              alt={"user"}
              className="rounded-full border-[2px] border-white md:h-[43px] h-[30px] md:w-[43px] w-[30px]"
            />
          </div>
        </div>
        {/* user name block  */}
        <div className="grid">
          <h4 className="mb-0 md:text-[16px] text-[14px]">{useTruncate(firstName, 22)} {useTruncate(lastName, 22)}</h4>
          <p className="text-[14px] font-light">
            { message?.type === "string"
              ? useTruncate(message?.content, 30)
              : message?.content}
          </p>
        </div>
      </div>
      <div className="rounded-full bg-sirp-primary py-[3px] w-[25px] my-auto text-white text-center items-center text-[12px] font-semibold">
        { message?.count}
      </div>
    </div>
  );
}

export default ChatItem;

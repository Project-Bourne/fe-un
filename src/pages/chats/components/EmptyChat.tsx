// import { Button } from "@/components/ui";
import Image from "next/image";

function EmptyChat() {
  return (
    <div className="grid gap-y-10 mt-[2rem] md:mt-[5rem]">
      <div className="mx-auto">
        <Image
          src={require("../../../assets/icons/chat.empty.svg")}
          alt="empty-chats"
        />
      </div>
      <div className="grid gap-y-5 text-center">
        <div className="w-[20%] mx-auto grid gap-y-2">
          <h3 className="text-[17px] font-semibold">No Chats yet</h3>
          <p className="text-[15px] text-[#A1ADB5]">
            Your chats will appear here, click the button to begin
          </p>
        </div>
        <button className="text-white text-[14px] mx-auto bg-sirp-primary md:w-[12%] rounded-2xl px-5 py-3">
          Start chat
        </button>
      </div>
    </div>
  );
}

export default EmptyChat;

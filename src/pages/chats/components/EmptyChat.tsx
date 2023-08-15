// import { Button } from "@/components/ui";
import { CustomModal } from "@/components/ui";
import Image from "next/image";
import { useState, useEffect } from "react";
import NewChat from "./NewChat";
import { useSelector } from "react-redux";

function EmptyChat() {
  const [newChat, setNewChat] = useState(false);

  const handleNewChat = () => {
    setNewChat(true)
  }

  const closeNewChatModal = () => setNewChat(false)

  return (
    <>
      <div className="grid gap-y-10 mt-[2rem] md:mt-[5rem]">
        <div className="mx-auto">
          <Image
            src={require("../../../assets/icons/chat.empty.svg")}
            alt="empty-chats"
          />
        </div>
        <div className="grid gap-y-5 text-center">
          <div className="md:w-[20%] w-[80%] mx-auto grid gap-y-2">
            <h3 className="text-[17px] font-semibold">No Chats yet</h3>
            <p className="text-[15px] text-[#A1ADB5]">
              Your chats will appear here, click the button to begin
            </p>
          </div>
          <button onClick={handleNewChat} className="text-white text-[14px] mx-auto bg-sirp-primary hover:bg-sirp-primary/[0.9] md:w-[12%] rounded-2xl px-5 py-3">
            Start chat
          </button>
        </div>
      </div>

       {newChat && 
        <CustomModal
          style="bg-white md:w-[30%] w-[80%] relative rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={closeNewChatModal}
        >
          <NewChat closeModal={closeNewChatModal} />
        </CustomModal>}
    </>
  );
}

export default EmptyChat;

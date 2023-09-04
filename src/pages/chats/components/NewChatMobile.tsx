import React, { useState } from "react";
import { CustomModal } from "../../../components/ui";
import Image from "next/image";
import NewChat from "./NewChat";
import NotificationService from "../../../services/notification.service";
import plus1 from "../../../../public/icons/plus1.svg";

function NewChatMobile() {
  const [newChat, setNewChat] = useState(false);

  const handleNewChat = () => {
    setNewChat(true);
  };

  const closeNewChatModal = () => setNewChat(false);

  return (
    <>
      <button
        onClick={handleNewChat}
        aria-label="new chat"
        title="new chat"
        className="fixed z-20 bottom-5 md:left-[42.5rem] md:w-[55px] w-[40px] md:h-[55px] h-[45px] shadow-md shadow-[#909090e6] flex justify-center items-center text-white text-[14px] mx-auto bg-sirp-primary hover:bg-sirp-primary/[0.97]  rounded-2xl"
      >
        <Image src={plus1} alt="new chat" />
      </button>

      {newChat && (
        <CustomModal
          style="bg-white md:w-[30%] w-[80%] relative rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={closeNewChatModal}
        >
          <NewChat closeModal={closeNewChatModal} />
        </CustomModal>
      )}
    </>
  );
}

export default NewChatMobile;

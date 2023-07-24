import React from "react";
import { CustomModal } from "@/components/ui";

function ChatModal({ setShowChat, showChat }) {
  return (
    <CustomModal
      style="bg-white w-[50%]"
      closeModal={() => {
        setShowChat(false);
      }}
    >
      ChatModal
    </CustomModal>
  );
}

export default ChatModal;

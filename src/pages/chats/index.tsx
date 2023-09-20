import { ChatsLayout } from "../../layout/index";
import React, { useEffect, useState } from "react";
import EmptyChat from "./components/EmptyChat";
import ChatSection from "./components/ChatSection";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Button, CustomModal } from "../../components/ui";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./components/ChatList";
import { MessageModel } from "../../models/chat.model";
import TabLayout from "./components/TabLayout";
import AddWorkspace from "./modalPopUp/AddWorkspacePopUp";
import GroupsIcon from "@mui/icons-material/Groups";
import { setSelectedChat } from "@/redux/reducers/chat/chatReducer";
import NewChat from "./components/NewChat";

function Index() {
  const [listMobileDisplay, setListMobileDisplay] = useState("block");
  const [chatsMobileDisplay, setChatsMobileDisplay] = useState("hidden");
  const [newChat, setNewChat] = useState(false);
  const { allRecentChats, activeChat, selectedChat } = useSelector(
    (state: any) => state?.chats,
  );
  const dispatch = useDispatch();
  const handleNewChat = () => {
    setNewChat(true);
  };
  useEffect(() => {
    dispatch(setSelectedChat([]));
  }, []);

  const [modalType, setModalType] = useState("");

  const handleModal = (type) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType("");
  };
  const closeNewChatModal = () => setNewChat(false);

  return (
    <div>
      <div className="flex md:justify-between md:px-7 px-3 pb-4 border-b-[1px] border-b-gray-100">
        <h1 className="text-[20px] md:text-[27px] font-semibold pt-3">Chats</h1>
        <div className="flex gap-2">
          <span
            className="bg-sirp-primary flex items-center cursor-pointer justify-center rounded-lg w-[50px] h-[50px]"
            onClick={handleNewChat}
          >
            <AddCommentIcon style={{ color: "white" }} />
          </span>
          <span
            className="bg-sirp-primary flex items-center cursor-pointer justify-center rounded-lg w-[50px] h-[50px]"
            onClick={() => handleModal("AddWorkspace")}
          >
            <GroupsIcon style={{ color: "white", fontSize: "40px" }} />
          </span>
        </div>
      </div>

      {/* tab section  */}
      {/* <TabLayout layout={1} /> */}

      {/* Render the add workspace  modal */}
      {modalType === "AddWorkspace" && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={handleCloseModal}
        >
          <AddWorkspace onHandlAddeModal={handleCloseModal} />
        </CustomModal>
      )}

      {allRecentChats.length > 0 ? (
        <div className="grid h-[76.5vh] md:grid-cols-3">
          {/* list of active chats  */}
          <ChatList
            chatsData={allRecentChats}
            listMobileDisplay={listMobileDisplay}
          />
          {/* messaging display */}
          <div
            className={`${chatsMobileDisplay} md:block relative col-span-2 transition duration-500 ease-in-out`}
          >
            <ChatSection />
          </div>
        </div>
      ) : (
        <EmptyChat showButton={true} showSubText={true} />
      )}
      {newChat && (
        <CustomModal
          style="bg-white md:w-[30%] w-[80%] relative rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={closeNewChatModal}
        >
          <NewChat closeModal={closeNewChatModal} />
        </CustomModal>
      )}
    </div>
  );
}

export default Index;

import { ChatsLayout } from "../../layout/index";
import React, { useEffect, useState } from "react";
import EmptyChat from "./components/EmptyChat";
import ChatSection from "./components/ChatSection";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Button, CustomModal } from "../../components/ui";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./components/ChatList";
import chatEmpty from "../../../public/icons/chat.empty.svg";
import { MessageModel } from "../../models/chat.model";
import TabLayout from "./components/TabLayout";
import AddWorkspace from "./modalPopUp/AddWorkspacePopUp";
import GroupsIcon from "@mui/icons-material/Groups";
import { setSelectedChat } from "@/redux/reducers/chat/chatReducer";
import NewChat from "./components/NewChat";
import { SearchInput } from "../../components/ui/Input";
import AuthService from "@/services/auth.service";
import { setUserInfo } from "@/redux/reducers/authReducer";
import NotificationService from "@/services/notification.service";
import { Tooltip } from "@mui/material";
import { toast } from "react-toastify";

function Index() {
  const [listMobileDisplay, setListMobileDisplay] = useState("block");
  const [chatsMobileDisplay, setChatsMobileDisplay] = useState("hidden");
  const [newChat, setNewChat] = useState(false);
  const [isActive, setIsActive] = useState(false);
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

  const [toggleMenu, setToggleMenu] = useState(false);
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
        <div className="flex md:gap-x-2">
          {/* search input */}
          {/* <SearchInput placeholder={"Search chats"} /> */}
          {/* options dropdown  */}
          {/* <div
            onClick={() => setToggleMenu((prevState) => !prevState)}
            className="h-[40px] w-[45px] md:w-[60px] rounded-full bg-sirp-lightGrey flex justify-center items-center hover:cursor-pointer"
          >
            <Image
              src={require("../../../public/icons/chat.collapse.svg")}
              alt="collapse-btn"
            />
          </div> */}
        </div>
        <div className="flex gap-2">
          <Tooltip
            title="Start New Chat"
            className="bg-sirp-primary flex items-center cursor-pointer justify-center rounded-lg w-[50px] h-[50px]"
            onClick={handleNewChat}
          >
            <span>
              <AddCommentIcon style={{ color: "white" }} />
            </span>
          </Tooltip>
          <Tooltip
            title="New Workspace"
            className="bg-sirp-primary flex items-center cursor-pointer justify-center rounded-lg w-[50px] h-[50px]"
            onClick={() => handleModal("AddWorkspace")}
          >
            <span>
              <GroupsIcon style={{ color: "white", fontSize: "40px" }} />
            </span>
          </Tooltip>
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
          <AddWorkspace
            onHandlAddeModal={handleCloseModal}
            setModalType={setModalType}
          />
        </CustomModal>
      )}

      {allRecentChats.length > 0 ? (
        <div className="grid h-[76.5vh] md:grid-cols-3">
          {/* list of active chats  */}
          <ChatList
            chatsData={allRecentChats}
            listMobileDisplay={listMobileDisplay}
            setIsActive={setIsActive}
          />
          {/* messaging display */}
          <div
            className={`${chatsMobileDisplay} md:block relative col-span-2 transition duration-500 ease-in-out`}
          >
            {isActive ? (
              <ChatSection />
            ) : (
              <>
                <div className="grid gap-y-10 mt-[2rem] md:mt-[5rem]">
                  <div className="mx-auto">
                    <Image src={chatEmpty} alt="empty-chats" />
                  </div>
                  <div className="grid gap-y-5 text-center">
                    <div className="md:w-[20%] w-[100%] mx-auto grid gap-y-2">
                      <h3 className="text-[17px] font-semibold">
                        Click and Start chatting
                      </h3>

                      {/* <p className="text-[15px] text-[#A1ADB5]">
                        Send Messages Seemlessly
                      </p> */}
                    </div>
                  </div>
                </div>
                {/* 
                {newChat && (
                  <CustomModal
                    style="bg-white md:w-[30%] w-[80%] relative rounded-xl mx-auto pt-3 px-3 pb-5"
                    closeModal={closeNewChatModal}
                  >
                    <NewChat closeModal={closeNewChatModal} />
                  </CustomModal>
                )} */}
              </>
            )}
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

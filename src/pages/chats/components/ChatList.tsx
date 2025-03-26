import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTruncate } from "../../../components/custom-hooks";
import {
  setActivechat,
  setSelectedChat,
} from "@/redux/reducers/chat/chatReducer";
import socketInstance from "@/utils/socketInstance";
import { setNewWorkSpace } from "@/redux/reducers/workspaceReducer";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

function ChatList({ chatsData, listMobileDisplay, setIsActive }) {
  const [isClicked, setIsClicked] = useState(false);
  // const { allRecentChats } = useSelector((state: any) => state?.chats);
  const dispatch = useDispatch();
  const [uuid, setUuid] = useState("");
  const { activeChat, page } = useSelector((state: any) => state.chats);
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );

  const handleClick = async (data: any) => {
    try {
      setIsActive(true);
      setUuid(data.uuid);
      setIsClicked(true);

      // Clear current chat messages before loading new ones
      dispatch(setSelectedChat([]));
      // Set the active chat
      dispatch(setActivechat(data));

      if (data?.spaceName) {
        // Handle workspace chat selection
        await socketInstance.getSelectedspace({
          spaceId: data.uuid,
          uuid: userInfo?.uuid,
          page: 0,
        });
        dispatch(setNewWorkSpace(data));
      } else {
        // Handle direct message chat selection
        await socketInstance.getSelectedMsg({
          userId: userInfo?.uuid,
          uuid: data.uuid,
          page: 0,
        });
      }
    } catch (error) {
      console.error("Error switching chats:", error);
      toast.error("Failed to load chat messages");
    }
  };

  return (
    <div
      className={`${listMobileDisplay} md:block relative  h-[100%] overflow-y-auto border-r-[1px] border-r-gray-100 transition duration-500 ease-in-out`}
    >
      {chatsData?.length > 0 &&
        chatsData?.map((chat) => (
          <div
            onClick={() => handleClick(chat)}
            key={chat.uuid}
            className={
              chat.uuid === uuid
                ? "flex justify-between px-2 py-2  border-b-[.15px] bg-sirp-primaryLess2 border-b-sirp-offline shadow shadow-sirp-offline hover:cursor-pointer hover:bg-sirp-lightGrey"
                : "flex justify-between px-2 py-2  border-b-[.15px] border-b-sirp-offline shadow shadow-sirp-offline hover:cursor-pointer hover:bg-sirp-lightGrey"
            }
          >
            <div className="flex gap-x-3">
              <div className="relative">
                {/* user status dot (on image)  */}
                <div
                  className={`absolute md:ml-9 ml-[1.75rem] mt-[0.07rem] z-10 h-[12px] w-[12px] rounded-full  ${
                    chat?.status === "inactive"
                      ? "bg-red-300"
                      : "bg-sirp-online"
                  }`}
                ></div>
                {/* user status background  */}
                <div
                  className={`rounded-full p-[2.5px] ${
                    chat.status === "inactive"
                      ? "bg-gradient-to-r from-red-300 to-yellow-200 "
                      : "bg-sirp-offline"
                  }`}
                >
                  <img
                    src={chat?.image || "DS"}
                    alt={"user"}
                    className="rounded-full border-[2px] border-white md:h-[43px] h-[30px] md:w-[43px] w-[30px]"
                  />
                </div>
              </div>
              {/* user name block  */}
              <div className="grid pt-2 ml-2">
                {!chat.spaceName ? (
                  <h4 className="mb-0 md:text-[16px] text-[14px] capitalize">
                    {useTruncate(chat?.firstName, 22)}{" "}
                    {useTruncate(chat?.lastName, 22)}
                  </h4>
                ) : (
                  <h4 className="mb-0 md:text-[16px] text-[14px] capitalize">
                    {chat.spaceName}
                  </h4>
                )}
                <p className="text-[14px] font-light">
                  {chat?.messages &&
                    useTruncate(chat?.messages?.message?.text, 30)}
                </p>
              </div>
            </div>
            {chat.unreadLength > 0 && (
              <div className="rounded-full bg-sirp-primary py-[3px] w-[25px] my-auto text-white text-center items-center text-[12px] font-semibold">
                {chat.unreadLength}
              </div>
            )}
          </div>
        ))}
      {/* <NewChatMobile /> */}
    </div>
  );
}

export default ChatList;

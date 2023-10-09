import React, { useEffect, useState } from "react";
import {
  AddNewChat,
  setRecentChats,
} from "../../../redux/reducers/chat/chatReducer";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import chatEmpty from "../../../../public/icons/chat.empty.svg";

function NewChat({ closeModal }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let users = useSelector((state: any) => state?.users?.allUsers);
  let recentChats = useSelector((state: any) => state?.chats?.allRecentChats);

  const handleClick = (uuid, firstName, lastName, image, role, status) => {
    console.log("hi");
    dispatch(
      AddNewChat({
        uuid,
        firstName,
        lastName,
        image,
        role,
        status,
      }),
    );
    closeModal();
  };

  return (
    <>
      {users?.length > 0 ? (
        <ul className="h-[50vh] overflow-y-auto">
          {users?.map((user) => (
            <li
              className="flex items-center gap-x-4 hover:cursor-pointer bg-sirp-primaryLess2 mb-1 hover:bg-slate-100 rounded-md px-3 py-2.5"
              key={user.uuid}
              onClick={() =>
                handleClick(
                  user.uuid,
                  user.firstName,
                  user.lastName,
                  user.image,
                  user.role,
                  user.status,
                )
              }
            >
              <div className="relative">
                {/* user status dot (on image)  */}
                <div
                  className={`absolute md:ml-9 ml-[1.75rem] mt-[0.07rem] z-10 h-[12px] w-[12px] rounded-full  ${
                    user?.onlineStatus == "1" ? "bg-red-300" : "bg-sirp-online"
                  }`}
                ></div>
                {/* user status background  */}
                <div
                  className={`rounded-full p-[2.5px] ${
                    user?.onlineStatus == "1"
                      ? "bg-sirp-offline"
                      : "bg-gradient-to-r from-red-300 to-yellow-200 "
                  }`}
                >
                  <img
                    src={user?.image}
                    alt={"user"}
                    className="rounded-full border-[2px] border-white md:h-[43px] h-[30px] md:w-[43px] w-[30px]"
                  />
                </div>
              </div>
              {/* </div> */}
              <p className="md:text-[16px] text-[14px] capitalize">
                {user?.firstName} {user?.lastName}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid gap-y-10 mt-[2rem] md:mt-[5rem]">
          <div className="mx-auto">
            <Image src={chatEmpty} alt="empty-chats" />
          </div>
          <div className="grid gap-y-5 text-center">
            <div className="md:w-[20%] w-[80%] mx-auto grid gap-y-2">
              <h3 className="text-[17px] font-semibold">No Users to Show</h3>

              <p className="text-[15px] text-[#A1ADB5]">
                Users will show Here.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewChat;

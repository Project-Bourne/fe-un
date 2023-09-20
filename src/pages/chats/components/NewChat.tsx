import React, { useEffect, useState } from "react";
import {
  AddNewChat,
  setRecentChats,
} from "../../../redux/reducers/chat/chatReducer";
import { useDispatch, useSelector } from "react-redux";

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
    <ul className="h-[50vh] overflow-y-auto">
      {users?.map((user) => (
        <li
          className="flex items-center gap-x-4 hover:cursor-pointer hover:bg-slate-100 rounded-md px-3 py-2.5"
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
          {/* <div className=""> */}
          <img
            src={user.image}
            alt={user.firstName}
            className="h-[35px] w-[35px] rounded-full bg-red-400"
          />
          {/* </div> */}
          <p className="md:text-[16px] text-[14px]">
            {user.firstName} {user.lastName}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default NewChat;

import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import {
  AddNewChat,
  setRecentChats,
} from "../../../redux/reducers/chat/chatReducer";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import chatEmpty from "../../../../public/icons/chat.empty.svg";
import AuthService from "@/services/auth.service";
import { setUsers } from "@/redux/reducers/users/userReducers";

function NewChat({ closeModal }) {
  const dispatch = useDispatch();
  let users = useSelector((state: any) => state?.users?.allUsers);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(setUsers(null));
  }, []);

  const debouncedSearch = debounce(async (query) => {
    try {
      const response = await AuthService.queryUser(query);
      console.log(response, "query");
      dispatch(setUsers(response.data));
    } catch (error) {
      console.log(error);
    }
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClick = (uuid, firstName, lastName, image, role, status) => {
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

  const queryUsers = async () => {
    debouncedSearch(query);
  };

  return (
    <div>
      <div className="flex items-center space-x-2 my-3">
        <input
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-500 flex-grow"
          type="text"
          placeholder="Find User by Email or Name"
          onChange={handleInputChange}
        />
        <button
          className="bg-sirp-primary text-white rounded-lg p-2 hover:bg-blue-600 focus:outline-none focus:ring"
          onClick={queryUsers}
        >
          <SearchIcon /> Search
        </button>
      </div>
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
              <div className="flex gap-x-5 items-center relative">
                <div
                  className={`absolute md:ml-9 ml-[1.75rem] mt-[0.07rem] z-10 h-[12px] w-[12px] rounded-full  ${
                    user?.onlineStatus == 1 ? "bg-sirp-online" : "bg-red-300"
                  }`}
                ></div>
                <div
                  className={`rounded-full p-[2.5px] ${
                    user?.onlineStatus == 1
                      ? "bg-sirp-offline"
                      : "bg-gradient-to-r from-red-300 to-yellow-200 "
                  }`}
                >
                  <img
                    src={user?.image || user?.image}
                    alt={"user"}
                    className="rounded-full border-[2px] border-white md:h-[43px] h-[30px] md:w-[43px] w-[30px]"
                  />{" "}
                  {/* eslint-disable-next-line */}
                </div>
                <div className="tex-gray-400">
                  {/* </div> */}
                  <p className="text-[14px] font-bolder text-gray-500 capitalize">
                    {user?.firstName || user.firstName}{" "}
                    {user?.lastName || user.lastName} {user?.username}
                  </p>
                  <span className="capitalize">
                    {user?.email || user.email}
                  </span>
                </div>
              </div>
              {/* </div> */}
              {/* <p className="md:text-[16px] text-[14px] capitalize">
                {user?.firstName} {user?.lastName}
              </p> */}
            </li>
          ))}
        </ul>
      ) : (
        <div className=" w-full h-full flex flex-col items-center justify-center my-5">
          <div className="mx-auto">
            <Image src={chatEmpty} alt="empty-chats" />
          </div>
          <div className="text-center">
            <div className="w-[80%] mx-auto">
              <h3 className="text-[17px] font-semibold">
                No Users to Show yet
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewChat;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Breadcrumbs from "../../../components/ui/Breadcrumbs";
import Comments from "./comments";
import Chats from "./Chats";
import TextEditor from "./TextEditor";
import Share from "./share";
import { useDispatch, useSelector } from "react-redux";
import socketio from "@/utils/socket";
import SocketService from "../../../socket/chat.socket";
import { setComments } from "@/redux/reducers/chat/chatReducer";

export default function Docs({
  showComments,
  setShowComments,
  setShowChat,
  showChat,
  showShare,
  setShowShare,
}) {
  const router = useRouter();
  console.log(showChat);
  const goback = () => {
    router.back();
  };
  const { singleDoc } = useSelector((state: any) => state?.docs);
  const { comments } = useSelector((state: any) => state?.chats);
  const dispatch = useDispatch();

  return (
    <div className="w-full h-[100vh] overflow-y-auto">
      <div
        className={`${!showComments ? "w-full h-full" : "flex h-full"} ${
          !showChat ? "w-full h-full" : "flex h-full"
        }  ${!showShare ? "w-full h-full" : "flex h-full"}`}
      >
        {/* <div
          className={`${
            !showComments
              ? "m-10 mt-10 h-full overflow-y-scroll pb-[300px] rounded-[1rem] bg-[#F9F9F9]"
              : "w-3/4 h-full overflow-x-scroll rounded-[1rem] m-10 mt-10 bg-[#F9F9F9]"
          }
          ${
            !showChat
              ? "m-10 mt-10 h-full overflow-y-scroll pb-[300px] rounded-[1rem] bg-[#F9F9F9]"
              : "w-3/4 h-full overflow-x-scroll rounded-[1rem] m-10 mt-10 bg-[#F9F9F9]"
          } 
          ${
            !showShare
              ? "m-10 mt-10 h-full overflow-y-scroll pb-[300px] rounded-[1rem] bg-[#F9F9F9]"
              : "w-3/4 h-full overflow-x-scroll rounded-[1rem] m-10 mt-10 bg-[#F9F9F9]"
          }`
        }
        > */}
        <div
          className={`
        
          ${
            !showChat
              ? "m-10 mt-10 w-[90%]  h-[80vh] overflow-y-scroll pb-[300px] rounded-[1rem] bg-[#F9F9F9]"
              : "w-3/4 h-full overflow-x-scroll rounded-[1rem] m-10 mt-10 bg-[#F9F9F9]"
          } 
`}
        >
          {/* <div className="w-full border-b cursor-pointer" onClick={goback}>
            <div className="flex items-center mb-3 align-middle justify-between">
              <div>
                <div className="flex flex-row w-full px-7 items-center">
                  <Image
                    className="flex align-middle justify-center"
                    src={require(`../../../../public/icons/back-arrow.svg`)}
                    alt="upload image"
                    width={18}
                    height={18}
                    priority
                  />
                </div>

                {/* <div className="flex flex-row w-full px-7 items-center">
                  <h1 className="text-[18px] font-semibold">Doc ID-01</h1>
                </div> */}
          {/* </div>
              <div></div>
            </div>
          </div> */}
          {/* <div>
            <Breadcrumbs />
          </div>
          <div className="bg-white rounded-2xl p-5 m-5 flex flex-col">
            <span className="font-normal text-gray-400 mb-2">Title</span>
            <span className="font-[800] text-[28px]">
              22 Insightful quotes from our speakers (link to recording at the
              end)
            </span>
          </div>
          <div className=" p-5 m-5 flex flex-col">
            <span className="font-normal text-gray-400 mb-2">Content</span>
            <span>
              22 Insightful quotes from our speakers (link to recording at the
              end)
            </span>
          </div> */}

          <TextEditor />
        </div>
        {/* {showComments && (
          <div className="w-1/4 border-l h-full">
            <div className="h-[70%] overflow-y-scroll">
              <Comments setShowComments={setShowComments} />
            </div>
            <div className="m-3">
              <span className="w-full h-[30px]  rounded p-5 bg-gray-100 text-sm flex items-center">
                <span className="mr-1 \">
                  <Image
                    src={require("../../../../public/images/user1.jpg")}
                    alt="userImage"
                    width={20}
                    height={20}
                    className="rounded-full object-fill"
                    priority
                  />
                </span>
                <input
                  type="text"
                  placeholder="Comment"
                  className="w-full bg-gray-100 focus:outline-none h-full p-3"
                />
              </span>
            </div>
          </div>
        )} */}
        {showChat && singleDoc?.spaceId && (
          <div className="w-1/4 border-l">
            <div className="overflow-y-scroll">
              <Chats setShowChat={setShowChat} />
            </div>
          </div>
        )}
        {showShare && (
          <div className="w-1/4 border-l h-full">
            <div className="h-[100%] overflow-y-scroll">
              <Share setShowChat={setShowChat} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

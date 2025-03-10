import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextEditor from "./TextEditor";
// import TextEditor from "../components/TextEditor";
import Chats from "./Chats";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "@/redux/reducers/chat/chatReducer";

export default function Docs({ showComments, setShowComments }) {
  const router = useRouter();
  return (
    <>
      <div className="w-full h-[100vh] overflow-y-auto flex items-start justify-start">
        <div
          className={
            showComments
              ? "w-[100%]"
              : "w-[100%]" + " h-full shadow overflow-y-scroll mb-10 pb-[50px]"
          }
        >
          <TextEditor />
        </div>
        {showComments && (
          <div className="absolute right-0 z-[1000099] bg-white pb-4 w-[33%] h-full ">
            <Chats setShowChat={setShowComments} />
          </div>
        )}
      </div>
    </>
  );
}

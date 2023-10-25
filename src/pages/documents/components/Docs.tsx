import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextEditor from "./TextEditor";
import Chats from "./Chats";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "@/redux/reducers/chat/chatReducer";

export default function Docs({ showComments, setShowComments }) {
  const router = useRouter();
  return (
    <div className="w-full h-[100vh] overflow-y-hidden flex items-center justify-center">
      <div className="w-[80%] h-full shadow overflow-y-auto my-10 pb-[300px]">
        <TextEditor />
      </div>
      {showComments && (
        <div className="w-[20%] h-full ">
          <Chats setShowChat={setShowComments} />
        </div>
      )}
    </div>
  );
}

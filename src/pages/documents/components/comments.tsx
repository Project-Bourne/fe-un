import React from "react";
import CommentCard from "./CommentCard";
import Image from "next/image";

function Comments({ setShowComments }) {
  const closeComments = () => {
    setShowComments(false);
  };
  return (
    <div className="w-full">
      <div className="w-full h-[60%]">
        <div className="flex justify-between border-b p-3">
          <span className="font-bold">Comments</span>
          <div className="cursor-pointer" onClick={closeComments}>
            <Image
              src={require("../../../assets/icons/x.svg")}
              alt="userImage"
              width={20}
              height={20}
              className="rounded-full object-fill"
              priority
            />
          </div>
        </div>
        <div className="m-3">
          <span className="text-normal text-gray-400">12/12/2023</span>
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
      </div>
    </div>
  );
}

export default Comments;

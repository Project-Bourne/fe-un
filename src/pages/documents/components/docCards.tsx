import { ImageList } from "@/components/ui";
import Image from "next/image";
import React, { useState } from "react";

function DocCard({ docCardClick, data, isActive }: any) {
  const handleDocCardClick = (data) => {
    docCardClick(data);
  };

  return (
    <div
      onClick={() => handleDocCardClick(data._id)}
      className={
        isActive === data._id
          ? "bg-[#D1F1FA] border-[#4AC7ED] my-2 p-5 border-2 w-full cursor-pointer rounded-xl"
          : "w-full cursor-pointer rounded-xl bg-[#F9F9F9] hover:bg-[#D1F1FA] hover:border-[#4AC7ED] my-2 p-5 border-2 border-grey-300"
      }
    >
      <div className="flex items-center align-middle justify-between">
        <span className="bg-white rounded-2xl border py-1 px-2 border-[#E8EAEC] text-[grey]">
         Document
        </span>
        <ImageList users={data.collaborators} stopImageCountAt={5}/>
      </div>
      <div className="w-full mt-2 text-[#322f2f]">
        {data.name}
      </div>
    </div>
  );
}

export default DocCard;

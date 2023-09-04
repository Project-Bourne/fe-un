import Image from "next/image";
import React, { useState } from "react";

function DocCard({ docCardClick }: any) {
  const [cardId, setCardId] = useState(null);
  const handleDocCardClick = (data) => {
    docCardClick(data);
    setCardId(data);
  };

  return (
    <div
      onClick={() => handleDocCardClick(1)}
      className={
        cardId === 1
          ? "bg-[#D1F1FA] border-[#4AC7ED] my-2 p-5 border-2 w-full cursor-pointer rounded-xl"
          : "w-full cursor-pointer rounded-xl bg-[#F9F9F9] hover:bg-[#D1F1FA] hover:border-[#4AC7ED] my-2 p-5 border-2 border-grey-300"
      }
    >
      <div className="flex items-center align-middle justify-between">
        <span className="bg-white rounded-2xl border py-1 px-2 border-[#E8EAEC] text-[grey]">
          Crawler
        </span>
        <span>
          <Image
            src={require(`../../../../public/icons/avatar-group.svg`)}
            alt="avatar"
          />
        </span>
      </div>
      <div className="w-full mt-2 text-[#322f2f]">
        Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn
        Ewa ati garri?
      </div>
    </div>
  );
}

export default DocCard;

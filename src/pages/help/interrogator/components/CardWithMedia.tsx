import React from "react";
import Image from "next/image";
import Video from "../../components/Video";

function CardWithMedia({ item }) {
  return (
    <div className="w-full border flex p-5 flex-col justify-start min-h-[fit-content] items-start bg-sirp-lightGrey rounded-[1rem]">
      <span className="bg-white rounded-2xl border py-1 px-2 border-[#E8EAEC] text-[grey]">
        {item.tag}
      </span>
      <span className="py-1 px-2 w-full">{item.title}</span>
      {item.image ? (
        <span className="py-1 px-2">
          <Image
            src={require(`../../../../assets/images/${item.image}`)}
            alt="settings tab"
            className="w-full"
            priority
          />
        </span>
      ) : (
        <span className="py-1 px-2">
          <Video />
        </span>
      )}
    </div>
  );
}

export default CardWithMedia;

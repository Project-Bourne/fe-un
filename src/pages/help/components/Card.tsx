import React from "react";
import Image from "next/image";
import Video from "./Video";

function Card({ data }) {
  return (
    <>
      {data.map((item, i) => (
        <div
          key={i}
          className="w-full border flex flex-col justify-center items-start bg-sirp-lightGrey rounded-[1rem] p-3"
        >
          <span className="bg-white rounded-2xl border py-1 px-2 border-[#E8EAEC] text-[grey]">
            {item.tag}
          </span>
          <span className="py-1 px-2 w-full">{item.title}</span>
          {item.image && (
            <span className="py-1 px-2">
              <Image
                src={require(`../../../assets/images/${item.image}`)}
                alt="settings tab"
                width={100}
                height={18}
                style={{ marginRight: 15 }}
                priority
              />
            </span>
          )}

          {item.video && (
            <span className="py-1 px-2 w-full">
              <Video />
            </span>
          )}
        </div>
      ))}
    </>
  );
}

export default Card;

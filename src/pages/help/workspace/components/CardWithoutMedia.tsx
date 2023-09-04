import React from "react";
import useTruncate from "../../../../components/custom-hooks/getTruncatedText";

function CardWithoutMedia({ item }) {
  return (
    <>
      <div className=" border w-full flex py-2 px-5 flex-col justify-start items-start h-[120px] bg-sirp-lightGrey min-h-[fit-content] rounded-[1rem]">
        <span className="bg-white rounded-2xl border py-1 px-2 border-[#E8EAEC] text-[grey]">
          {item.tag}
        </span>
        <span className="px-2 w-full font-bold my-2 text-gray-500">
          {useTruncate(item.title, 70)}
        </span>
      </div>
    </>
  );
}

export default CardWithoutMedia;

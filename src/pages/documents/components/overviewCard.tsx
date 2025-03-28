import Image from "next/image";
import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Tabs from "./tabs";
import Button from "../../../components/ui/Button";
import { useRouter } from "next/router";
import { useTruncate } from "@/components/custom-hooks";
import { useDispatch } from "react-redux";
import { setSingleDoc } from "@/redux/reducers/documents/documentReducer";

type Props = {
  backIcon?: boolean;
  goBack?: any;
  data?: any;
};

function OverviewCard({ backIcon, goBack, data }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = async () => {
    dispatch(setSingleDoc(data.data));
    console.log(data.data, "data");
    router.replace(`/documents/${data._id}`);
  };
  let snippet = () => {
    if (data?.data?.ops && data.data.ops.length > 0) {
      // Check if data.data.ops is defined and not an empty array
      return useTruncate(data?.data?.ops[0].insert, 1000);
    } else if (data?.data) {
      // If data.data.ops is not defined or empty, check if data.data is defined
      return useTruncate(data?.data, 1000);
    }
    // Return a default value or handle the case when data is undefined
    return "No content available";
  };

  return (
    <div className="w-full h-[100vh] p-5">
      {backIcon && (
        <Image
          className="flex align-middle justify-center mb-5"
          src={require("../../../../public/icons/back-arrow.svg")}
          alt="back image"
          width={18}
          height={18}
          priority
          onClick={goBack}
        />
      )}
      {/* Authors */}
      <div className="flex flex-col gap-2">
        <span className="text-[#6F7A82]">Author</span>
        <span className="text-3xl text-[#1D2022] font-bold">
          {data?.author?.name}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[#6F7A82]">Title</span>
        <span className="text-3xl text-[#1D2022] font-bold">{data?.name}</span>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <span className="text-[#6F7A82]">content</span>
        <span className="">{snippet()} ...</span>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <span className="text-[#6F7A82]">Tags & Keywords </span>
        <div className="flex gap-3 md-flex-col flex-row">
          {data?.keywords?.length > 0 &&
            data.keywords.map((el, i) => <Tabs value={el} key={i} />)}
        </div>
      </div>

      <hr className="w-100 my-5" />

      <div className="w-full">
        <Button
          value="Open Document"
          onClick={() => handleClick()}
          background="bg-sirp-primary"
          classNameStyle="text-white font-bold w-full py-3 flex items-center justify-center h-[50px]"
        />
      </div>
    </div>
  );
}

export default OverviewCard;

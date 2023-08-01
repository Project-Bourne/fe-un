import Image from "next/image";
import path from "path";
import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Tabs from "./tabs";
import Button from "../../../components/ui/Button";
import { useRouter } from "next/router";

function OverviewCard() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/documents/viewDocument");
  };

  return (
    <div className="w-full h-[100vh] p-5">
      {/* Authors */}
      <div className="flex flex-col gap-2">
        <span className="text-[#6F7A82]">Title</span>
        <span className="text-3xl text-[#1D2022] font-bold">
          22 Insightful quotes from our speakers (link to recording at the end)
        </span>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <span className="text-[#6F7A82]">Authors</span>
        <div className="grid grid-cols-2">
          <div className="flex items-center justify-start">
            <span>
              <Image
                src={require(`../../../assets/icons/Avatar.png`)}
                width={50}
                height={50}
                alt="plus"
              />
            </span>
            <div className="flex items-start justify-center flex-col ml-3">
              <span className="font-bold text-lg">Peter Duru</span>
              <span className="text-[#6F7A82]">Transcorp@gmail.com</span>
            </div>
          </div>
          <div>
            <Image
              src={require(`../../../assets/icons/avatar-group.svg`)}
              alt="avatar"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <span className="text-[#6F7A82]">Confidence </span>
        <div className="flex">
          <div className="w-[70px] h-[70px]">
            <CircularProgressbar
              value={76.6}
              text={"76.6%"}
              strokeWidth={10}
              styles={{
                path: {
                  stroke: "#4d98cd",
                },
                trail: {
                  stroke: "#d6d6d6",
                },
                text: {
                  fill: "#4d98cd",
                },
              }}
            />
          </div>
          <div className="flex items-start justify-center flex-col ml-3">
            <span className="font-bold text-lg">76.6% Confidence Level</span>
            <span className="text-[#4d98cd] border border-[#6F7A82] rounded-2xl mt-2 p-2">
              Review confidence
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <span className="text-[#6F7A82]">Source </span>
        <div className="flex">
          <Tabs value={"Twitter"} />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <span className="text-[#6F7A82]">Tags & Keywords </span>
        <div className="flex gap-3 md-flex-col flex-row">
          <Tabs value={"UI Design"} />
          <Tabs value={"Web3 design"} />
          <Tabs value={"Tutorials"} />
          <Tabs value={"Twitter"} />
        </div>
      </div>

      <hr className="w-100 my-5" />

      <div className="w-full">
        <Button
          value="Open Document"
          onClick={handleClick}
          background="bg-sirp-primary"
          classNameStyle="text-white font-bold w-full py-3 flex items-center justify-center h-[50px]"
        />
      </div>
    </div>
  );
}

export default OverviewCard;

import React from "react";
import Image from "next/image";

function RecentDocument() {
  return (
    <div className="border-t-2 mt-10">
      <h1 className="text-2xl font-bold px-5 py-5">Recent Documents</h1>
      <div className="m-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="row-span-2 p-4 rounded-[20px] border bg-[#F3F5F6]">
          <div className="flex align-middle justify-start">
            <span className="font-light my-3 rounded-[1rem] border py-1 px-5 bg-white">
              IRP
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-normal mb-3">
              Redesigned Naira: CBN launches Cash Swap Programme for rural and
              Corn Ewa ati garri
            </span>
            <span className="font-light my-3">Keywords</span>
            <div className="flex align-middle gap-4">
              <span className="lang rounded-lg bg-[#E8F8FD] border flex align-middle px-3 py-1">
                UI Design
              </span>
              <span className="lang rounded-lg bg-[#E8F8FD] border flex align-middle px-3 py-1">
                UI Design
              </span>
              <span className="lang rounded-lg bg-[#E8F8FD] border flex align-middle px-3 py-1">
                UI Design
              </span>
            </div>
          </div>
        </div>
        <div className="row-span-2 p-4 rounded-[20px] border bg-[#F3F5F6]">
          <div className="flex align-middle justify-start">
            <span className="font-light my-3 rounded-[1rem] border py-1 px-5 bg-white">
              Crawler
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-normal mb-3">
              Redesigned Naira: CBN launches Cash Swap Programme for rural and
              Corn Ewa ati garri
            </span>
            <span className="font-light my-3">Keywords</span>
            <div className="flex align-middle gap-4">
              <span className="lang rounded-lg bg-[#E8F8FD] border flex align-middle px-3 py-1">
                UI Design
              </span>
              <span className="lang rounded-lg bg-[#E8F8FD] border flex align-middle px-3 py-1">
                UI Design
              </span>
              <span className="lang rounded-lg bg-[#E8F8FD] border flex align-middle px-3 py-1">
                UI Design
              </span>
            </div>
          </div>
        </div>
        <div className="row-span-2 p-4 rounded-[20px] border bg-[#F3F5F6]">
          <div className="flex align-middle justify-start">
            <span className="font-light my-3 rounded-[1rem] border py-1 px-5 bg-white">
              Crawler
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-normal mb-3">
              Redesigned Naira: CBN launches Cash Swap Programme for rural and
              Corn Ewa ati garri
            </span>
            <span className="font-light my-3">Keywords</span>
            <div className="flex align-middle gap-4">
              <span className="lang rounded-lg bg-[#E8F8FD] border flex align-middle px-3 py-1">
                UI Design
              </span>
              <span className="lang rounded-lg bg-[#E8F8FD] border flex align-middle px-3 py-1">
                UI Design
              </span>
              <span className="lang rounded-lg bg-[#E8F8FD] border flex align-middle px-3 py-1">
                UI Design
              </span>
            </div>
          </div>
        </div>
        <div className="border flex items-center gap-2 cursor-pointer  bg-[#F3F5F6] justify-center py-2 mt-5 md:w-[31rem] w-[20rem]  h-[100%] rounded-[1rem] mx-5">
          <h2>Show all</h2>
          <Image
            src={require("../../../assets/icons/leftArro.svg")}
            alt="documents"
            className="cursor-pointer w-[2rem] h-[2rem] mt-2"
            width={10}
          />
        </div>
      </div>
    </div>
  );
}

export default RecentDocument;

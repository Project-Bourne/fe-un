import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui";

const FileUploadSection = ({ file, handleDeleteFile, isLoading }) => {
  return (
    <>
      <div className="p-10 flex align-middle items-center w-full flex-col justify-center">
        <div className="p-5 flex md:w-[50%] w-[100%] align-middle justify-between bg-sirp-lightGrey border-2 border-[E8EAEC] rounded-[15px]">
          <div className="flex align-middle items-center justify-center">
            <span className="rounded-full bg-sirp-primaryLess2 flex align-middle justify-center w-[40px] h-[40px]">
              <Image
                src={require(`../../../assets/icons/file.svg`)}
                alt="upload image"
                width={20}
                height={20}
                priority
              />
            </span>
            <div className="mx-4">
              <span>{file?.name}</span>
              <div>
                <span className="text-xs text-[#6B7280]">{file?.size}KB .</span>
                <span className="text-xs text-[#6B7280]">100% uploaded</span>
              </div>
            </div>
          </div>
          <span className="rounded-full bg-[#FEE2E2] flex align-middle justify-center w-[70px] h-[40px] cursor-pointer">
            <Image
              src={require(`../../../assets/icons/red-delete.svg`)}
              alt="upload image"
              width={18}
              height={18}
              priority
              onClick={handleDeleteFile}
            />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-5 justify-center mt-[2.2rem] md:w-[40rem] w-full">
        <Button
          classNameStyle="flex gap-x-1 items-center text-center justify-center mt-2 hover:text-sirp-primary text-white text-sm hover:bg-sirp-primaryLess2 mb-1"
          size="lg"
          background="bg-sirp-primary"
          type="submit"
          value={
            <div className="flex gap-3 text-[1rem] items-center justify-center py-5">
              Create workspace
            </div>
          }
        />
        <Button
          classNameStyle="flex border iteam-center justify-center text-center border-sirp-primary gap-x-1 items-center mt-2 mb-1 cursor-pointer rounded-[1rem]"
          size="sm"
          background="bg-white"
          value={
            <div className="flex gap-3 text-[1rem] text-sirp-primary items-center justify-center py-4">
              Skip
            </div>
          }
        />
      </div>
    </>
  );
};

export default FileUploadSection;

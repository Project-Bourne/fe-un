import React, { useState } from "react";
import Image from "next/image";

export interface ToastModel {
  message: any;
  addedText?: any | null;
  position?:
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"
    | "top-right"
    | "top-left"
    | "top-center";
  type: "success" | "error" | "warn" | "";
}

function CustomToast({ message, addedText, position, type }: ToastModel) {
  //   return and icon path based on the notification type
  const _toast_type = () => {
    if (type === "success")
      return require("../../../public/icons/toast.success.svg");
    if (type === "error")
      return require("../../../public/icons/toast.error.svg");
    // if(type === 'info') return '../../../'
    if (type === "warn") return require("../../../public/icons/toast.warn.svg");
  };

  //   return a position style based on position entered
  const _toast_position = () => {
    if (position === "bottom-right") return "bottom-7 md:right-7 right-0";
    if (position === "bottom-left") return "bottom-7 md:left-7 left-0";
    if (position === "bottom-center")
      return "bottom-[6rem] md:left-[30%] left-0 right-0 md:right-[30%]";
    if (position === "top-right") return "top-7 md:right-7 right-0";
    if (position === "top-left") return "top-7 md:left-7 left-0";
    if (position === "top-center")
      return "top-[2.5rem] md:left-[30%] left-0 right-0 md:right-[30%]";
  };

  return (
    <div
      className={`
            ${
              type === "success"
                ? "bg-[#F0FDF4] border-[#22C55E]"
                : type === "error"
                ? "bg-[#FAEAEC] border-[#B22735]"
                : "bg-[#FFFBE5] border-[#FFE033]"
            } 
                p-4 md:w-[40%] w-full rounded-md shadow-md shadow-sirp-lightGrey border-l-[1.4rem] border-y-[1px] border-r-[1px] absolute z-[9999999999] translate-y-0 opacity-100 ${
                  position ? _toast_position() : "top-5 right-5"
                }
        `}
    >
      <p className="flex justify-between items-center">
        <span className="text-[17px] font-bold">{message}</span>
        <Image src={_toast_type()} alt="toast icon" width={25} height={25} />
      </p>
      {addedText && <p className="text-[13px]">{addedText}</p>}
    </div>
  );
}

export default CustomToast;

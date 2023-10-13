import React from "react";
import Image from "next/image";
import { Button, CustomModal } from "@/components/ui";

function DeleteModal({ cancelblock, handleDelete, item }) {
  return (
    <>
      {/* <h1 className="font-semibold text-[24px] px-2 mb-3"> Delete Documents </h1> */}
      <div className="grid pb-1 pt-2 px-2">
        {/* <p className="text-sm mb-3 mt-5">
          Are you sure you want to delete
          {/* <span className="text-[#09495D]">{user?.firstName} {user?.lastName}</span> ? */}
        {/* </p> */}

        <Button
          value="No, don’t Delete"
          onClick={cancelblock}
          classNameStyle="p-2 rounded-md text-[#09495D] text-[14px] border-[1.2px] border-[#09495D]"
          background="bg-white"
        />
        <Button
          value="Yes, Delete"
          onClick={handleDelete}
          classNameStyle="p-2 rounded-md text-white text-[14px] border-[2px] border-[#EF4444] mt-3"
          background="bg-[#EF4444]"
        />
      </div>
    </>
  );
}

export default DeleteModal;

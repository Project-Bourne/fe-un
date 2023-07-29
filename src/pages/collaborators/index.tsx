import React, { useState } from "react";
import { Button, CustomModal } from "@/components/ui";
import Image from "next/image";
import AddWorkspace from "./modal pop up/AddWorkspacePopUp";
import TabLayout from "./components/TabLayout";

const index = () => {
  const [modalType, setModalType] = useState("");

  const handleModal = (type) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType("");
  };

  return (
    <div>
      <div className="flex justify-between pl-5 pr-2  py-3">
        <h1 className="text-[30px]">Workspaces</h1>
        <div className="flex gap-x-3 md:w-[25%] w-[45%] justify-end mr-5">
          {/* Button to open the AddWorkspace modal */}
          <Button
            className="flex gap-x-1 items-center"
            onClick={() => handleModal("AddWorkspace")}
            size="lg"
            background="bg-sirp-primary"
            value={
              <div className="flex gap-x-1 text-[12px] items-center justify-center">
                <Image
                  src={require("../../assets/icons/plus 1.svg")}
                  alt="add user"
                  width={14}
                  height={50}
                  className="self-center"
                  style={{ alignSelf: "center" }}
                  priority
                />
                <label className="text-white">Add workspace</label>
              </div>
            }
          />

          {/* Button to open the Invite Users modal */}
        </div>
      </div>

      {/* tab section  */}
      <TabLayout layout={1} />

      {/* Render the add workspace  modal */}
      {modalType === "AddWorkspace" && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={handleCloseModal}
        >
          <AddWorkspace onHandlAddeModal={handleCloseModal} />
        </CustomModal>
      )}
    </div>
  );
};

export default index;

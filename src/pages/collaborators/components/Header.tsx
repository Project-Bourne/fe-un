import { Button, CustomModal } from "@/components/ui";
import Image from "next/image";
import { useState } from "react";
import { HeaderModel } from "../models/users.module";
import Collaborate from "../modal pop up/CollabratePopUp";
import InviteUsers from "../modal pop up/InviteUsersPopUp";

function Header({ filter }: HeaderModel) {
  const [modalType, setModalType] = useState("");

  const handleModal = (type) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType("");
  };

  return (
    <>
      <div className="flex justify-between pl-5 pr-2  py-3">
        <h1 className="text-[30px]">Workspaces</h1>
        <div className="flex gap-x-3 md:w-[25%] w-[45%] justify-end mr-5">
          {/* Button to open the Collaborate modal */}
          <Button
            className="flex gap-x-1 items-center"
            onClick={() => handleModal("collaborate")}
            size="md"
            background="bg-sirp-primary"
            value={
              <div className="flex gap-x-1 text-[12px] items-center justify-center">
                <Image
                  src={require("../../../assets/icons/add-user.svg")}
                  alt="add user"
                  width={14}
                  height={14}
                  className="self-center"
                  style={{ alignSelf: "center" }}
                  priority
                />
                <label className="text-white">Add User</label>
              </div>
            }
          />

          {/* Button to open the Invite Users modal */}
          <Button
            className="flex gap-x-1 items-center"
            onClick={() => handleModal("invite")}
            size="md"
            background="bg-sirp-primary"
            value={
              <div className="flex gap-x-1 text-[12px] items-center justify-center">
                <Image
                  src={require("../../../assets/icons/add-user.svg")}
                  alt="add user"
                  width={14}
                  height={14}
                  className="self-center"
                  style={{ alignSelf: "center" }}
                  priority
                />
                <label className="text-white">Invite users</label>
              </div>
            }
          />
        </div>
      </div>

      {/* Render the Collaborate modal */}
      {modalType === "collaborate" && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative top-[10%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={handleCloseModal}
        >
          <Collaborate onHandleModal={handleCloseModal} />
        </CustomModal>
      )}

      {/* Render the Invite Users modal */}
      {modalType === "invite" && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative top-[10%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={handleCloseModal}
        >
          <InviteUsers onHandleModalTwo={handleCloseModal} />
        </CustomModal>
      )}
    </>
  );
}

export default Header;

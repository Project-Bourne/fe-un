import { Button, CustomModal } from "../../../components/ui";
import Image from "next/image";
import React, { useState } from "react";
import Collaborate from "../modalPopUp/CollabratePopUp";
import InviteUsers from "../modalPopUp/InviteUsersPopUp";

type HeaderProps = {
  workspaceId?: any;
  filter?: any;
};

function Header({ workspaceId }: HeaderProps) {
  const [modalType, setModalType] = useState(false);

  const handleModal = () => {
    setModalType(true);
  };

  const handleCloseModal = () => {
    setModalType(false);
  };

  return (
    <>
      <div className="flex justify-between pl-5 pr-2  py-3">
        <h1 className="text-[30px]">{workspaceId}</h1>
        <div className="flex gap-x-3 md:w-[25%] w-[45%] justify-end mr-5">
          {/* Button to open the Collaborate modal */}
          <Button
            classNameStyle="flex gap-x-1 items-center justify-center text-center"
            onClick={() => handleModal}
            size="md"
            background="bg-sirp-primary"
            value={
              <div className="flex gap-x-1 text-[12px] items-center justify-center">
                <Image
                  src={require("../../../../public/icons/plus1.svg")}
                  alt="add user"
                  width={14}
                  height={14}
                  className="self-center"
                  style={{ alignSelf: "center" }}
                  priority
                />
                <label className="text-white text-center">Add content</label>
              </div>
            }
          />
          {/* Button to open the  modal */}

          <Button
            classNameStyle="flex gap-x-1 items-center justify-center text-center"
            onClick={() => handleModal}
            size="md"
            background="bg-sirp-primary"
            value={
              <div className="flex gap-x-1 text-[12px] items-center justify-center">
                <Image
                  src={require("../../../../public/icons/add-user.svg")}
                  alt="add user"
                  width={14}
                  height={14}
                  className="self-center"
                  style={{ alignSelf: "center" }}
                  priority
                />
                <label className="text-white text-center">Add User</label>
              </div>
            }
          />

          {/* Button to open the Invite Users modal */}
        </div>
      </div>

      {/* Render the Collaborate modal */}
      {modalType && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={handleCloseModal}
        >
          <Collaborate onHandleModal={handleCloseModal} />
        </CustomModal>
      )}

      {/* Render the Invite Users modal */}
      {modalType && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={handleCloseModal}
        >
          <InviteUsers
            onHandleModalTwo={handleCloseModal}
            workspaceId={workspaceId}
          />
        </CustomModal>
      )}
    </>
  );
}

export default Header;

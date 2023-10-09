import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Tooltip } from "@mui/material";
import CustomModal from "./CustomModal";
import CollabModal from "./CollabModal";

type ImageListProps = {
  users: any[];
  stopImageCountAt: number;
};

function ImageList({ users, stopImageCountAt }: ImageListProps) {
  const [remainderCount, setRemainderCount] = useState(0);
  const [showCollabModal, setShowCollabModal] = useState(false);
  useEffect(() => {
    if (users.length > stopImageCountAt) {
      setRemainderCount(users.length - stopImageCountAt);
    }
  }, [users, stopImageCountAt]);

  const handleCloseModal = () => {
    setShowCollabModal(false);
  };

  return (
    <div className=" mt-3 flex items-center">
      <Tooltip title="Add new Collaborator">
        <div
          className="flex p-2 bg-sirp-primaryLess2 mr-5 rounded-lg"
          onClick={() => setShowCollabModal(true)}
        >
          <GroupAddIcon style={{ color: "#4582C4" }} />
        </div>
      </Tooltip>
      {users?.map((user, index) => (
        <Tooltip key={index} title={user?.email}>
          {index < stopImageCountAt && (
            <>
              <img
                src={user?.image}
                alt={user?.alt}
                className={`rounded-full border-[2px] h-[33px] w-[35px] -ml-[.8rem] "border-sirp-primaryBlue bg-red-100"`}
              />
            </>
          )}
        </Tooltip>
      ))}
      {showCollabModal && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={handleCloseModal}
        >
          {" "}
          <CollabModal users={users} setShowCollabModal={setShowCollabModal} />
        </CustomModal>
      )}
      {remainderCount > 0 && (
        <div className="border-[2px] border-sirp-primaryBlue bg-sirp-primaryLess2 h-[45px] w-[45px] rounded-full flex items-center justify-center -ml-[.8rem]">
          +{remainderCount}
        </div>
      )}
    </div>
  );
}

export default ImageList;

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Tooltip } from "@mui/material";
import CustomModal from "./CustomModal";
import CollabModal from "./CollabModal";
import { useSelector } from "react-redux";

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
    console.log("IL, Users", users);
  }, [users, stopImageCountAt]);

  const handleCloseModal = () => {
    setShowCollabModal(false);
  };
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );
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
        <Tooltip key={index} title={user?.email || userInfo?.email}>
          {index < stopImageCountAt && (
            <span>
              <img
                src={user?.image || userInfo?.image}
                alt={user?.alt}
                className={`rounded-full border-[2px] bg-white h-[33px] w-[42px] -ml-[.8rem] "border-sirp-primaryBlue bg-red-100"`}
              />
            </span>
          )}
        </Tooltip>
      ))}
      {/* {users?.map((user, index) => (
        <div key={index} className="relative group">
          <img
            src={user?.image}
            className={`rounded-full  border-[2px] bg-white h-[32px] w-[3px] -ml-[.8rem] cursor-pointer`}
          />
          <span className="absolute bottom-0 left-0 hidden group-hover:block bg-white text-sm rounded text-black p-1">
            {user?.email || userInfo?.email}
          </span>
        </div>
      ))} */}
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
        <Tooltip title="Add new Collaborator">
          <div
            onClick={() => setShowCollabModal(true)}
            className="border-[2px] border-sirp-primaryBlue cursor-pointer bg-sirp-primaryLess2 h-[45px] w-[45px] rounded-full flex items-center justify-center -ml-[.8rem]"
          >
            +{remainderCount}
          </div>
        </Tooltip>
      )}
    </div>
  );
}

export default ImageList;

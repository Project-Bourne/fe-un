import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import ChatMenu from "./ChatMenu";
import { useRouter } from "next/router";
import CallModal from "@/components/ui/CallModal";
import InviteCollaborators from "../StepperModal/InviteCollaborators";
import { CustomModal } from "@/components/ui";
import { Tooltip } from "@mui/material";
import CollabService from "@/services/collaborator.service";
import CollabModal from "@/components/ui/CollabModal";
import AuthService from "@/services/auth.service";

function Header(props) {
  const { showVideoCallModal, showAudioCallModal, status } = props;
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showCollabModal, setSowCollabModal] = useState(false);
  const { activeChat } = useSelector((state: any) => state.chats);
  const [collabs, setCollabs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getCollabs = async () => {
      if (activeChat?.uuid) {
        const collabs = await CollabService.getSpaceCollab(activeChat.uuid);

        // Check if collabs is defined and an iterable array
        if (collabs && Array.isArray(collabs)) {
          const spaceCollabPromises = collabs.map(async (el) => {
            const user = await AuthService.getusersbyId(el.userId);
            return user?.data;
          });

          const spaceCollaborators = await Promise.all(spaceCollabPromises);
          setCollabs(spaceCollaborators);
          console.log(spaceCollaborators, "docCollaborators");
        } else {
          // Handle the case when collabs is undefined or not an iterable array
          console.log("Collabs is undefined or not an iterable array");
        }
      }
    };

    getCollabs();
  }, [activeChat]);

  return (
    <div className="flex z-10 gap-x-1 md:gap-x-0 md:justify-between items-center md:px-7 px-3 py-[.5rem] md:py-[1.20rem] border-b-[1px] border-b-gray-100 shadow">
      {/* header bar  */}
      <div className="relative">
        {!activeChat?.spaceName ? (
          <div className="font-bold text-secondary text-lg leading-4">
            {activeChat?.firstName} {activeChat?.lastName}
          </div>
        ) : (
          <div className="font-bold text-secondary text-lg leading-4">
            {activeChat?.spaceName}
          </div>
        )}
      </div>
      <div className="flex gap-x-3 md:gap-x-[5rem]">
        <div className="hidden md:flex gap-x-3">
          {activeChat?.spaceName && (
            <Tooltip title="Invite Collaborators">
              <Image
                src={require("../../../../public/icons/plus.svg")}
                className="hover:cursor-pointer border border-sirp-primary rounded-full p-1"
                alt="video-call"
                width={35}
                height={25}
                onClick={() => setSowCollabModal(true)}
              />
            </Tooltip>
          )}
          <Tooltip title="Make a call">
            <Image
              src={require("../../../../public/icons/chat.phone.svg")}
              className="hover:cursor-pointer"
              alt="voice-call"
              width={37}
              height={37}
              onClick={() => setShowCallModal(true)}
            />
          </Tooltip>
        </div>
        <ChatMenu
          toggleMenu={toggleMenu}
          closeMenu={() => setToggleMenu(false)}
        />
        {showCallModal && <CallModal setShowCall={setShowCallModal} />}
        {showCollabModal && (
          <CustomModal
            style="bg-white md:w-[50%] w-[90%] relative rounded-xl mx-auto pt-3 px-3 pb-5"
            closeModal={() => setSowCollabModal(false)}
          >
            <CollabModal users={collabs} />
          </CustomModal>
        )}
      </div>
    </div>
  );
}

export default Header;

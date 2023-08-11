import React, { useEffect, useState } from "react";
import { CustomModal } from "@/components/ui";
import Image from "next/image";
import { useRouter } from "next/router";
import Service from "@/services/collaborator.service";
import { getWorkspace } from "../types";
import Loader from "@/components/ui/loader";
import { useSelector, useDispatch } from "react-redux";
import { setCollab, setSpaceId } from "@/redux/reducers/workspaceReducer";
import InviteUsersPopUp from "../modal pop up/InviteUsersPopUp";

type RecentWorkspaceProps = {
  onHandleModalTwo ?: any
}

function RecentWorkspace({ onHandleModalTwo }: RecentWorkspaceProps) {
  const service = new Service();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [workSpace, setWorkSpace] = useState<getWorkspace[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [workspaceId, setWorkspaceId] =useState('')


  useEffect(() => {
    const fetchWorkspaces = async () => {
      setLoading(true);
      try {
        const response = await service.getWorkspace();
        setWorkSpace(response);
        console.log(workSpace, "RecentWork");
        let createspace = useSelector((state: any) => state?.workSpace?.createSpace);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching workspaces:", error.message);
        setLoading(false);
      }
    };
    fetchWorkspaces();
  }, []);

  const openUserModal = (id) => {
    setWorkspaceId(id)
    dispatch(setSpaceId(id));
    setShowUserModal(true);
    console.log("modal", showUserModal);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    console.log("modal", closeUserModal);
  };

  const goToSingleWorkspace = (id) => {
    router.push(`/workspaces/workspaces/${id}`);
  };

  return (
    <>
      {workSpace.length < 1 ? (
        <div className="mx-auto my-10 h-[50vh] ">
          <div className="flex items-center justify-center">
            <Image
              src={require("../../../assets/icons/chat.empty.svg")}
              alt="empty-chats"
            />
          </div>
          <div className="grid gap-y-5 text-center">
            <div className="w-[20%] mx-auto grid gap-y-2">
              <h3 className="text-[17px] font-semibold my-5">
                No Workspace to display yet
              </h3>
              <p className="text-[15px] text-[#A1ADB5]">
                Your Workspaces will appear here when you create new Workspaces.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="font-bold mt-5 mx-5">Recent Collaborators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5 mx-5">
            {workSpace.map((item, index) => (
              <div
                key={index}
                className="border bg-sirp-secondary2 rounded-[1rem]"
              >
                <div className="flex flex-col py-4 px-4">
                  <div className="cursor-pointer hover:text-sirp-primary" onClick={() => goToSingleWorkspace(item.spaceName)}>
                    <h2 className="font-bold">{item.spaceName}</h2>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div
                    className="border mt-[1rem] w-100% pb-2 pt-2 capitalize text-center hover:bg-sirp-primary hover:text-white text-sirp-primary font-bold rounded-[1rem] border-sirp-primary  cursor-pointer"
                    onClick={()=>openUserModal(item.uuid)}
                  >
                    <span>Invite Collaborators</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </>
      )}
      {loading && (
        <div className="mx-auto my-auto h-[50vh]">
          <Loader />
        </div>
      )}
      {showUserModal && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={closeUserModal}
        >
          <InviteUsersPopUp onHandleModalTwo={closeUserModal} workspaceId={workspaceId} />
        </CustomModal>
      )}
    </>
  );
}

export default RecentWorkspace;

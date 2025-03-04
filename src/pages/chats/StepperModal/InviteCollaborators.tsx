import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { Checkbox } from "@mui/material";
import Image from "next/image";
import globalService from "@/services";
import CollabService from "@/services/collaborator.service";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SocketService from "../../../socket/chat.socket";
import Stages from "../components/Stepper";
import { userInfo } from "os";

/**
 * InviteCollaborators component for adding collaborators to workspaces
 *
 * @param {Object} props - Component props
 * @param {Function} props.setSowCollabModal - Function to control visibility of the modal
 * @returns {JSX.Element} The InviteCollaborators component
 */
const InviteCollaborators = ({ setSowCollabModal }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const createspace = useSelector(
    (state: any) => state?.workSpace?.createSpace,
  );
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );
  const userService = new globalService();
  const workspaceService = new CollabService();
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const { newWorkspace } = useSelector((state: any) => state.workSpace);

  useEffect(() => {
    // userService
    //   .getUsers()
    //   .then((data) => {
    //     setSuggestions(data.filter((suggestion) => suggestion.uuid !== userInfo?.uuid));
    //   })
    //   .catch((error) => {
    /**
     * Fetches users and filters out current user and existing collaborators
     */
    const fetchAndFilterUsers = async () => {
      try {
        const data = await userService.getUsers();

        // First filter out the current user
        let filteredUsers = data.filter(
          (suggestion) => suggestion.uuid !== userInfo?.uuid,
        );

        // If we have workspace data with collaborators, filter them out too
        if (newWorkspace?.collaborators) {
          const collaboratorIds = Array.isArray(newWorkspace.collaborators)
            ? newWorkspace.collaborators.map((collab) => collab.id || collab)
            : Object.keys(newWorkspace.collaborators);

          filteredUsers = filteredUsers.filter(
            (user) => !collaboratorIds.includes(user.uuid),
          );
        }

        setSuggestions(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAndFilterUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newWorkspace]);

  /**
   * Handle checkbox selection for users
   *
   * @param {Object} selected - The selected user object
   */
  const handleCheck = (selected) => {
    setSelectedSuggestions((prevSelected) => {
      // Toggle selection status
      if (prevSelected.includes(selected)) {
        return prevSelected.filter((selectedId) => selectedId !== selected);
      } else {
        return [...prevSelected, selected];
      }
    });
    if (selectedSuggestions.length < 1) {
      setIsDisabled(false);
    }
    console.log(selectedSuggestions);
  };

  /**
   * Handle the invite button click
   * Sends invitations to selected users for workspace
   */
  const handleInvite = async () => {
    // const useSocket = SocketService;
    const socketService = new SocketService();
    try {
      Promise.all(
        selectedSuggestions.map(async (suggestion) => {
          let collabData = {
            space: {
              id: newWorkspace?.uuid,
              name: newWorkspace?.name,
            },

            user: {
              id: suggestion?.uuid,
              username: suggestion?.email,
              designation: suggestion?.country,
            },

            inviter: {
              id: userInfo?.uuid,
              name: userInfo?.email,
            },
          };
          await socketService.joinWorkspace(collabData);
        }),
      );
      toast("Added Collaborators", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center pb-3">
        <h1 className="text-3xl font-bold ml-5 text-black">
          Add Collaborators
        </h1>
        <p className="text-[14px] ml-5">
          Fill the details below to add Collaborators
        </p>
      </div>
      <div className="h-full mb-[5rem] md:mb-0">
        <input
          type="search"
          name=""
          id=""
          className="border-b-2 w-full py-3 pl-4 outline-none"
          placeholder="Type name or email address"
        />
        <div className="pb-20 overflow-y-auto max-h-[50vh]">
          <p className="py-1 font-semibold text-gray-500 pl-4 text-sm">
            Suggestions
          </p>

          {suggestions?.map((suggestion) => (
            <div
              key={suggestion.uuid}
              className="flex items-center bg-sirp-dashbordb1 justify-between border mx-1 my-2 rounded-[1rem]"
            >
              <div className="ml-5 md:w-[25rem] w-[10rem]">
                <div className="flex gap-3 items-center my-1 cursor-pointer">
                  <div>
                    <p className="font-bold text-sm text-black">
                      {suggestion.firstName} {suggestion.lastName}
                    </p>
                    <p className="text-gray-500  text-sm">{suggestion.email}</p>
                  </div>
                </div>
              </div>
              <Checkbox
                checked={selectedSuggestions.includes(suggestion)}
                onChange={() => handleCheck(suggestion)}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center border-t gap-5 justify-center mt-[2.2rem]  w-[100%] absolute bottom-0 bg-white z-[3000]">
          <Button
            onClick={() => handleInvite()}
            classNameStyle="flex gap-x-1 items-center text-center justify-center mt-2 hover:text-sirp-primary text-white text-sm hover:bg-sirp-primaryLess2 mb-1"
            size="lg"
            disabled={isDisabled}
            background="bg-sirp-primary"
            // type="submit"
            value={
              <div className="flex gap-3 text-[1rem] items-center justify-center py-5">
                Add Collaborators
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default InviteCollaborators;

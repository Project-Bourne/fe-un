import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { Checkbox } from "@mui/material";
import Image from "next/image";
import globalService from "@/services";
import debounce from "lodash/debounce";
import CollabService from "@/services/collaborator.service";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SocketService from "../../socket/chat.socket";
import { useRouter } from "next/router";
import AuthService from "@/services/auth.service";
import chatEmpty from "../../../public/icons/chat.empty.svg";
import { setUsers } from "@/redux/reducers/users/userReducers";
import { setSingleDoc } from "@/redux/reducers/documents/documentReducer";

/**
 * InviteCollaborators component for adding collaborators to workspaces or documents
 *
 * @param {Object} props - Component props
 * @param {Function} props.setShowCollabModal - Function to control visibility of the modal
 * @returns {JSX.Element} The InviteCollaborators component
 */
const InviteCollaborators = ({ setShowCollabModal }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  const { pathname } = router;
  const createspace = useSelector(
    (state: any) => state?.workSpace?.createSpace,
  );
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );
  const userService = new globalService();
  const [query, setQuery] = useState("");
  const workspaceService = new CollabService();
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]);
  let users = useSelector((state: any) => state?.users?.allUsers);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const { newWorkspace } = useSelector((state: any) => state?.workSpace);
  const { singleDoc } = useSelector((state: any) => state?.docs);

  useEffect(() => {
    // Filter out users who are already invited to the doc
    let filteredUsers = users.filter(
      (suggestion) => suggestion.uuid !== userInfo?.uuid,
    );

    if (pathname.includes("/documents/") && singleDoc?.collaborators) {
      // If we're in a document context and have collaborators, filter them out
      const collaboratorIds = Array.isArray(singleDoc.collaborators)
        ? singleDoc.collaborators.map((collab) => collab.id || collab)
        : Object.keys(singleDoc.collaborators);

      filteredUsers = filteredUsers.filter(
        (user) => !collaboratorIds.includes(user.uuid),
      );
    }

    setSuggestions(filteredUsers);
  }, [users, singleDoc]);

  /**
   * Handle checkbox selection for users
   *
   * @param {Object} selected - The selected user object
   */
  const handleCheck = (selected) => {
    setSelectedSuggestions((prevSelected) => {
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
   * Sends invitations to selected users for workspace or document
   */
  const handleInvite = async () => {
    // const useSocket = SocketService;
    const socketService = new SocketService();
    try {
      if (pathname.includes("/chats")) {
        Promise.all(
          selectedSuggestions.map(async (suggestion) => {
            let collabData = {
              space: {
                id: newWorkspace?.uuid,
                name: newWorkspace?.spaceName,
              },
              user: {
                id: suggestion?.uuid,
                username: suggestion?.email,
                designation: suggestion?.country[0],
              },
              inviter: {
                id: userInfo?.uuid,
                name: userInfo.email,
              },
            };
            console.log(collabData, "collabData");
            await socketService.joinWorkspace(collabData);
          }),
        );
        setShowCollabModal(false);
      }

      if (pathname.includes("/documents/")) {
        console.log(selectedSuggestions, "selectedSuggestions");
        let newSuggestions = selectedSuggestions.map((el) => {
          return {
            id: el.uuid,
            email: el.email,
            username: `${el.firstName} ${el.lastName}`,
          };
        });
        console.log(newSuggestions, "newSuggestions");
        let collabData = {
          docId: singleDoc?._id,
          collabs: newSuggestions,
        };
        await socketService.joinDocument(collabData);
        setShowCollabModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Debounced function to search for users
   *
   * @param {string} query - The search query
   */
  const debouncedSearch = debounce(async (query) => {
    try {
      const response = await AuthService.queryUser(query);
      console.log(response, "query");
      dispatch(setUsers(response.data));
    } catch (error) {
      console.log(error);
    }
  }, 300);

  /**
   * Handle input change for the search field
   *
   * @param {Event} e - The input change event
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
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
          type="text"
          onChange={handleInputChange}
          className="border-b-2 w-full py-3 pl-4 outline-none"
          placeholder="Find User by Email or Name"
        />
        <div className="pb-20 overflow-y-auto max-h-[50vh]">
          <p className="py-1 font-semibold text-gray-500 pl-4 text-sm">
            Suggestions
          </p>
          {suggestions?.length > 0 ? (
            <>
              {suggestions?.map((suggestion) => (
                <div
                  key={suggestion.uuid}
                  className="flex items-center bg-sirp-dashbordb1 justify-between border mx-1 my-2 rounded-[1rem]"
                >
                  <div className="ml-5 md:w-[25rem] w-[10rem]">
                    <div className="flex gap-3 items-center my-1 cursor-pointer">
                      <div>
                        <p className="font-bold text-sm text-black capitalize">
                          {suggestion.firstName} {suggestion.lastName}
                        </p>
                        <p className="text-gray-500  text-sm">
                          {suggestion.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Checkbox
                    checked={selectedSuggestions.includes(suggestion)}
                    onChange={() => handleCheck(suggestion)}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className=" w-full h-full flex flex-col items-center justify-center my-5">
              <div className="mx-auto">
                <Image src={chatEmpty} alt="empty-chats" />
              </div>
              <div className="text-center">
                <div className="w-[80%] mx-auto">
                  <h3 className="text-[17px] font-semibold">
                    No Users to Show yet
                  </h3>
                </div>
              </div>
            </div>
          )}
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

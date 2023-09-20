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

const InviteCollaborators = (props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { stages, index, setIndex } = props;
  const createspace = useSelector(
    (state: any) => state?.workSpace?.createSpace,
  );
  const userService = new globalService();
  const workspaceService = new CollabService();
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const { newWorkspace } = useSelector((state: any) => state.workSpace);
  useEffect(() => {
    userService
      .getUsers()
      .then((data) => {
        setSuggestions(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

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
  const goBack = () => {
    setIndex(index - 1);
  };

  // Handle the invite button click
  const handleInvite = async () => {
    const useSocket = SocketService;
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
              id: "50bd293d-bd93-4557-bf86-c3bfefbc8917",
              name: "static.tokenx@gmail.com",
            },
          };
          await useSocket.joinWorkspace(collabData);
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

    // Increment the index (you may have other logic here)
    setIndex(index + 1);
  };

  //the skip button
  const handleInviteSkip = () => {
    setIndex(index + 1);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center pb-3">
        <h1 className="text-3xl font-bold ml-5 text-black">Add a workspace</h1>
        <p className="text-[14px] ml-5">
          Fill the details below to add a new workspace
        </p>
      </div>
      <Stages steps={stages} step={index} />
      <div
        className="flex cursor-pointer mx-5  mb-2 gap-2"
        // onClick={uploadFromCollabDocument}
        onClick={goBack}
      >
        <Image
          src={require("../../../../public/icons/arrow-narrow-left-blue.svg")}
          alt="upload image"
          width={20}
          height={20}
          priority
        />
        <span className="text-sirp-primary text-sm">Back</span>
        {/* <span className="text-sirp-primary text-sm">
                Select from collab documents
              </span> */}
      </div>
      <div className="h-full mb-[5rem] md:mb-0">
        <div className="border-b-2">
          <h1 className="text-sirp-primary border-b-2 border-sirp-primary md:w-[8rem] text-sm">
            Invite others
          </h1>
        </div>
        <input
          type="search"
          name=""
          id=""
          className="border-b-2 w-full py-3 pl-4 outline-none"
          placeholder="Type name or email address"
        />
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

        <div className="flex items-center gap-5 justify-center mt-[2.2rem]  w-[90%]">
          <Button
            onClick={handleInvite}
            classNameStyle="flex gap-x-1 items-center text-center justify-center mt-2 hover:text-sirp-primary text-white text-sm hover:bg-sirp-primaryLess2 mb-1"
            size="lg"
            disabled={isDisabled}
            background="bg-sirp-primary"
            type="submit"
            value={
              <div className="flex gap-3 text-[1rem] items-center justify-center py-5">
                Continue
              </div>
            }
          />
          <Button
            classNameStyle="flex border iteam-center justify-center text-center border-sirp-primary gap-x-1 items-center mt-2 mb-1 cursor-pointer rounded-[1rem]"
            size="sm"
            onClick={handleInviteSkip}
            background="bg-white"
            value={
              <div className="flex gap-3 text-[1rem] text-sirp-primary items-center justify-center py-4">
                Skip
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default InviteCollaborators;

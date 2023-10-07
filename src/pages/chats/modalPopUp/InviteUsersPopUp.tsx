import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui";
import { Checkbox } from "@mui/material";
import CollabService from "../../../services/collaborator.service";
import { useSelector, useDispatch } from "react-redux";
import globalService from "../../../services";
// import { setCollab } from "../../../redux/reducers/workspaceReducer";
import NotificationService from "../../../services/notification.service";

function InviteUsersPopUp({ onHandleModalTwo, workspaceId }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const userService = new globalService();
  const workspaceService = new CollabService();

  useEffect(() => {
    userService
      .getUsers()
      .then((data) => {
        setSuggestions(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        NotificationService.error({
          message: error?.error?.message,
          position: "top-right",
        });
      });
  }, []);

  const handleCheck = (selected) => {
    setSelectedSuggestions((prevSelected: any) => {
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

  // Handle the invite button click
  const handleInvite = async () => {
    // dispatch(setCollab(selectedSuggestions));
    try {
      Promise.all(
        selectedSuggestions.map(async (suggestion: any) => {
          let collabData = {
            userId: suggestion?.uuid,
            username: suggestion?.email,
            spaceId: workspaceId,
            designation: suggestion?.country,
          };
          await workspaceService.createCollab(collabData);
        }),
      );
      NotificationService.success({
        message: "Users invited",
        position: "bottom-right",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="border-b-2">
        <h1 className="text-sirp-primary border-b-2 py-3 border-sirp-primary md:w-[8rem] text-2xl">
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
      <p className="py-2 font-semibold text-gray-500 pl-4 text-[1.5rem]">
        Suggestions
      </p>
      <div className="max-h-[50vh] overflow-y-scroll">
        {suggestions.map((suggestion: any) => (
          <div
            key={suggestion?.uuid}
            className="flex items-center bg-sirp-dashbordb1 justify-between border mx-1 my-2 rounded-[1rem]"
          >
            <div className="ml-5 md:w-[25rem] w-[10rem]">
              <div className="flex gap-3 items-center my-5 cursor-pointer">
                {/* <Image
                src={suggestion.imageUrl}
                alt="documents"
                className="cursor-pointer"
                width={50}
              /> */}
                <div>
                  <p className="font-bold text-black">
                    {suggestion.firstName} {suggestion.lastName}
                  </p>
                  <p className="text-gray-500 text-sm capitalize">
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
      </div>

      <div className="flex items-center justify-end" onClick={handleInvite}>
        <Button
          classNameStyle="flex gap-x-1 items-center mt-10 mb-5 justify-center text-center cursor-pointer rounded-[1rem]"
          size="sm"
          disabled={isDisabled}
          background="bg-sirp-primary"
          value={
            <div className="flex gap-2 text-[1rem] items-center justify-center py-5">
              <label className="text-white text-center">Add users</label>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default InviteUsersPopUp;

import { Button } from "@/components/ui";
import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@mui/material";
import { useRouter } from "next/router";

const UploadfromCollab = (props) => {
  const initialSuggestions = [
    {
      id: 1,
      text: "Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri?",
      isChecked: false,
    },
    {
      id: 2,
      text: "Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri?",
      isChecked: false,
    },
    {
      id: 3,
      text: "Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri?",
      isChecked: false,
    },
  ];

  const router = useRouter();

  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const handleCheck = (id) => {
    setSuggestions((prevSuggestions) =>
      prevSuggestions.map((suggestion) =>
        suggestion.id === id
          ? { ...suggestion, isChecked: !suggestion.isChecked }
          : suggestion,
      ),
    );
  };

  const handleInvite = () => {
    const selectedSuggestions = suggestions.filter(
      (suggestion) => suggestion.isChecked,
    );
    router.replace("/collaborators/workspaces/2");
    console.log("Selected Suggestions:", selectedSuggestions);
  };

  // Determine if at least one checkbox is checked
  const isCreateButtonEnabled = suggestions.some(
    (suggestion) => suggestion.isChecked,
  );

  return (
    <div className="h-full mb-[5rem] md:mb-0">
      <input
        type="search"
        name=""
        id=""
        className="border-b-2 w-full py-3 pl-4 outline-none"
        placeholder="Search collab documents"
      />
      <p className="py-1 font-semibold text-gray-500 pl-4 text-sm">
        Suggestions
      </p>

      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="flex items-center bg-sirp-dashbordb1 justify-between border mx-1 my-2 rounded-[1rem]"
        >
          <div className="ml-5 md:w-[25rem] w-[10rem]">
            <div className="flex gap-3 items-center my-1 cursor-pointer">
              <div>
                <p className="font-bold text-sm text-black">
                  {suggestion.text}
                </p>
              </div>
            </div>
          </div>
          <Checkbox
            checked={suggestion.isChecked}
            onChange={() => handleCheck(suggestion.id)}
          />
        </div>
      ))}

      <div className="flex items-center gap-5 justify-center mt-[2.2rem] md:w-[40rem] w-full">
        <Button
          onClick={handleInvite}
          classNameStyle="flex gap-x-1 items-center text-center justify-center mt-2 hover:text-sirp-primary text-white text-sm hover:bg-sirp-primaryLess2 mb-1"
          size="lg"
          background="bg-sirp-primary"
          type="submit"
          value={
            <div className="flex gap-3 text-[1rem] items-center justify-center py-5">
              Create workspace
            </div>
          }
          // Disable the button if no box is checked
          disabled={!isCreateButtonEnabled}
        />
        <Button
          classNameStyle="flex border iteam-center justify-center text-center border-sirp-primary gap-x-1 items-center mt-2 mb-1 cursor-pointer rounded-[1rem]"
          size="sm"
          background="bg-white"
          value={
            <div className="flex gap-3 text-[1rem] text-sirp-primary items-center justify-center py-4">
              Skip
            </div>
          }
        />
      </div>
    </div>
  );
};

export default UploadfromCollab;

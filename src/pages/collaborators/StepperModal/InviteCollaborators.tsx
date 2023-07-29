import React, { useState } from "react";
import { Stages } from "../components";
import { Button } from "@/components/ui";
import { Checkbox } from "@mui/material";
import Image from "next/image";

const InviteCollaborators = (props) => {
  const { stages, index, setIndex } = props;

  // Refactor the suggestion data into a separate array to improve readability
  const initialSuggestions = [
    {
      id: 1,
      name: "Herry Chisome",
      email: "musba’uwaasiu@gmail.com",
      imageUrl: require("../../../assets/icons/Avatarmeta.svg"),
      isChecked: false,
    },
    {
      id: 2,
      name: "Mikel Obi",
      email: "anotherperson@gmail.com",
      imageUrl: require("../../../assets/icons/Avatarmeta.svg"),
      isChecked: false,
    },
    {
      id: 3,
      name: "John Doe",
      email: "anotherperson@gmail.com",
      imageUrl: require("../../../assets/icons/Avatarmeta.svg"),
      isChecked: false,
    },
  ];

  const [suggestions, setSuggestions] = useState(initialSuggestions);

  // Toggle the isChecked state when a checkbox is clicked
  const handleCheck = (id) => {
    setSuggestions((prevSuggestions) =>
      prevSuggestions.map((suggestion) =>
        suggestion.id === id
          ? { ...suggestion, isChecked: !suggestion.isChecked }
          : suggestion,
      ),
    );
  };

  // Handle the invite button click
  const handleInvite = () => {
    // Function to get the selected suggestions
    const getSelectedSuggestions = () => {
      return suggestions.filter((suggestion) => suggestion.isChecked);
    };

    // Get the selected suggestions
    const selectedSuggestions = getSelectedSuggestions();

    // Perform further actions with the selected suggestions
    console.log("Selected Suggestions:", selectedSuggestions);

    // Increment the index (you may have other logic here)
    setIndex(index + 1);
  };

  //the skip button
  const handleInviteSkip = () => {
    setIndex(index + 1);
  };

  return (
    <div>
      <Stages steps={stages} step={index} />

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

        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="flex items-center bg-sirp-dashbordb1 justify-between border mx-1 my-2 rounded-[1rem]"
          >
            <div className="ml-5 md:w-[25rem] w-[10rem]">
              <div className="flex gap-3 items-center my-1 cursor-pointer">
                <Image
                  src={suggestion.imageUrl}
                  alt="documents"
                  className="cursor-pointer"
                  width={50}
                />
                <div>
                  <p className="font-bold text-sm text-black">
                    {suggestion.name}
                  </p>
                  <p className="text-gray-500  text-sm">{suggestion.email}</p>
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
            id="submitButton"
            onClick={handleInvite}
            classNameStyle="flex gap-x-1 items-center text-center justify-center mt-2 hover:text-sirp-primary text-white text-sm hover:bg-sirp-primaryLess2 mb-1"
            size="lg"
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

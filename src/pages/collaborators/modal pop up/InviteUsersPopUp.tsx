import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui";
import { Checkbox } from "@mui/material";

function InviteUsersPopUp({ onHandleModalTwo }) {
  const [suggestions, setSuggestions] = useState([
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
  ]);

  const handleCheck = (id) => {
    setSuggestions((prevSuggestions) =>
      prevSuggestions.map((suggestion) => {
        if (suggestion.id === id) {
          return {
            ...suggestion,
            isChecked: !suggestion.isChecked,
          };
        }
        return suggestion;
      }),
    );
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

      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="flex items-center bg-sirp-dashbordb1 justify-between border mx-1 my-4 rounded-[1rem]"
        >
          <div className="ml-5 md:w-[25rem] w-[10rem]">
            <div className="flex gap-3 items-center my-5 cursor-pointer">
              <Image
                src={suggestion.imageUrl}
                alt="documents"
                className="cursor-pointer"
                width={50}
              />
              <div>
                <p className="font-bold text-black">{suggestion.name}</p>
                <p className="text-gray-500 text-sm">{suggestion.email}</p>
              </div>
            </div>
          </div>
          <Checkbox
            checked={suggestion.isChecked}
            onChange={() => handleCheck(suggestion.id)}
          />
        </div>
      ))}

      <div className="flex items-center justify-end">
        <Button
          onClick={onHandleModalTwo}
          className="flex gap-x-1 items-center mt-10 mb-5 cursor-pointer rounded-[1rem]"
          size="sm"
          background="bg-sirp-primary"
          value={
            <div className="flex gap-2 text-[1rem] items-center justify-center py-5">
              <label className="text-white">Add us</label>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default InviteUsersPopUp;

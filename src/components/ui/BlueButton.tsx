import React, { useState } from "react";
import Image from "next/image";

function BlueButton() {
  const [add, setAdd] = useState(false);
  return (
    <div>
      <button className="h-12 flex flex-row gap-2 w-44 justify-center hover:bg-sirp-primaryLess1 items-center cursor-pointer rounded-[1rem] bg-sirp-primary text-white font-bold">
        <Image
          src={require("../../assets/icons/plus 1.svg")}
          alt="documents"
          className="cursor-pointer ml-1"
          width={20}
          onClick={() => setAdd(!add)}
        />
        <p className="text-[14px]">Add content</p>
      </button>
    </div>
  );
}

export default BlueButton;

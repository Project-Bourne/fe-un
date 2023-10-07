import Image from "next/image";
import React from "react";
import NavBarItem from "./NavBarItem";
import { NavBarContents } from "@/utils/constants";

function NavBar() {
  return (
    <div className="w-[15vw] md:w-[20vw] h-full border-3 border-r bg-white py-10 md:p-10 fixed z-[20] navbar">
      <div className="flex flex-col items-center cursor-pointer mb-20">
        <Image
          src={require("../../../../public/svg/logo.svg")}
          alt="IRP Logo"
          width={50}
          height={50}
          className="md:mr-[20px]"
          priority
        />
        <h1 className="text-sirp-primary font-semibold text-[20px] hidden md:block">
          Collab Workspace
        </h1>
      </div>

      <div className="w-full mt-10">
        {NavBarContents.map((item, index) => (
          <NavBarItem item={item} index={index} key={index} />
        ))}
      </div>
    </div>
  );
}

export default NavBar;

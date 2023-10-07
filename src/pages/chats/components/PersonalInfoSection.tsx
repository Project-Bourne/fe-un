import React from "react";
import { Button, Input } from "../../../components/ui";
import Image from "next/image";
import { PersonalInformationModel } from "../../../models/users.module";

export default function PersonalInfoSection({
  blockUser,
}: PersonalInformationModel) {
  const handleDeleteUser = () => {};

  return (
    <div className="pt-4 w-full mt-3">
      <div className="flex flex-wrap justify-between w-full items-center">
        <h2 className="font-semibold text-[13px] px-8">Personal Information</h2>
        <div className="flex gap-x-5 px-8 md:mr-3">
          <Button
            value="Block User"
            background="white"
            classNameStyle="p-2 text-[12px] text-sirp-primary shadow-sm shadow-sirp-primary/[0.3] border-[1px] border-sirp-primary"
            size="lg"
            onClick={blockUser}
          />
          <Button
            background="white"
            classNameStyle="py-2.5 px-3 text-[12px] text-gray-600 shadow-sm shadow-gray-300/[0.3] border-[1px] border-gray-400"
            value={
              <Image
                src={require("../../../../public/icons/delete.svg")}
                alt="delete"
                height={35}
                width={35}
              />
            }
            size="sm"
          />
        </div>
      </div>
      <div className="grid w-full items-center my-4 border-b px-8 pb-7">
        {/* Name  */}
        <div className="flex md:flex-row flex-col mb-5 gap-x-[3.7rem]">
          <label htmlFor="firstname" className="text-[12px] text-sirp-grey">
            Name:
          </label>
          <div className="flex gap-x-7 md:w-[37.2%] w-full">
            <Input
              id="firstname"
              value="Fatima"
              type="text"
              classNameStyle="text-[13px] px-3"
            />
            <Input
              id="lastname"
              value="Abdulkadir"
              type="text"
              classNameStyle="text-[13px] px-3"
            />
          </div>
        </div>
        {/* email  */}
        <div className="md:flex md:flex-row gap-x-[3.7rem] md:w-[46%] w-full">
          <label htmlFor="email" className="text-[12px] text-sirp-grey">
            Email:
          </label>
          <Input
            type="email"
            classNameStyle="text-[13px] px-3"
            id="email"
            value="olivia@untitledui.com"
          />
        </div>
      </div>
    </div>
  );
}

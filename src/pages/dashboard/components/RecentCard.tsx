import React from "react";
import Image from "next/image";
function RecentCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5 mx-5">
      <div className="border bg-sirp-secondary2 rounded-[1rem]">
        <div className="flex justify-start gap-5 items-center py-4 px-4 border-b-2 pb-8">
          <Image
            src={require("../../../assets/icons/Frame 06.svg")}
            alt="documents"
            className="cursor-pointer"
            width={60}
          />
          <div>
            <h2 className="font-bold">400 Users</h2>
            <p className="text-sm text-gray-600">Total collaborators</p>
          </div>
        </div>
        <div className=" px-5 py-5">
          <h2 className="font-bold">Recent Collaborators</h2>
          <Image
            src={require("../../../assets/icons/groupAvatar.svg")}
            alt="documents"
            className="cursor-pointer mt-5"
            width={300}
          />
        </div>
      </div>
      <div className="border bg-sirp-secondary2 rounded-[1rem]">
        <div className="flex justify-start gap-5 items-center py-4 px-4 border-b-2 pb-8">
          <Image
            src={require("../../../assets/icons/Frame 012.svg")}
            alt="documents"
            className="cursor-pointer"
            width={70}
          />
          <div>
            <h2 className="font-bold">400 Docuements</h2>
            <p className="text-sm text-gray-600">Total Shared Documents</p>
          </div>
        </div>
        <div className=" px-5 py-5">
          <h2 className="font-bold">Recent Chat</h2>
          <Image
            src={require("../../../assets/icons/OnlineAvatar.svg")}
            alt="documents"
            className="cursor-pointer mt-5"
            width={90}
          />
        </div>
      </div>
    </div>
  );
}

export default RecentCard;

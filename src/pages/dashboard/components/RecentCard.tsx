import React from "react";
import Image from "next/image";
import { ImageList } from "@/components/ui";

const imageList = [
  {
    img: "../../../assets/images/user1.jpg",
    alt: "1",
    status: 0,
  },
  {
    img: "../../../assets/images/user1.jpg",
    alt: "1",
    status: 1,
  },
  {
    img: "../../../assets/images/user1.jpg",
    alt: "1",
    status: 1,
  },
  {
    img: "../../../assets/images/user1.jpg",
    alt: "1",
    status: 0,
  },
  {
    img: "../../../assets/images/user1.jpg",
    alt: "1",
    status: 0,
  },
  {
    img: "../../../assets/images/user1.jpg",
    alt: "1",
    status: 0,
  },
  {
    img: "../../../assets/images/user1.jpg",
    alt: "1",
    status: 1,
  },
  {
    img: "../../../assets/images/user1.jpg",
    alt: "1",
    status: 1,
  },
  {
    img: "../../../assets/images/user1.jpg",
    alt: "1",
    status: 0,
  },
  {
    img: "../../../assets/images/user1.jpg",
    alt: "1",
    status: 0,
  },
  {
    img: "../../../assets/images/user1.jpg",
    alt: "1",
    status: 0,
  },
  {
    img: "../../../assets/images/user1.jpg",
    alt: "1",
    status: 0,
  },
];

function RecentCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5 mx-5">
      <div className="border bg-sirp-secondary2 rounded-3xl">
        <div className="flex justify-start gap-5 items-center py-5 px-4 border-b-[1px] ">
          <Image
<<<<<<< HEAD
            src={require("../../../assets/icons/frame-06.svg")}
=======
            src={require("../../../assets/icons/frame06.svg")}
>>>>>>> 26618a9 (cleanup)
            alt="documents"
            className="cursor-pointer"
            width={60}
          />
          <div>
            <h2 className="font-bold">{400} Users</h2>
            <p className="text-sm text-gray-600">Total collaborators</p>
          </div>
        </div>
        <div className="px-7 py-4">
          <h2 className="font-bold">Recent Collaborators</h2>
          <ImageList users={imageList} stopImageCountAt={5} />
        </div>
      </div>

      <div className="border bg-sirp-secondary2 rounded-3xl">
        <div className="flex justify-start gap-5 items-center py-5 px-4 border-b-[1px] ">
          <Image
<<<<<<< HEAD
            src={require("../../../assets/icons/frame-012.svg")}
=======
            src={require("../../../assets/icons/frame012.svg")}
>>>>>>> 26618a9 (cleanup)
            alt="documents"
            className="cursor-pointer"
            width={70}
          />
          <div>
            <h2 className="font-bold">{400} Documents</h2>
            <p className="text-sm text-gray-600">Total Shared Documents</p>
          </div>
        </div>
        <div className="px-7 py-4">
          <h2 className="font-bold">Recent Chats</h2>
          <ImageList users={imageList} stopImageCountAt={3} />
        </div>
      </div>
    </div>
  );
}

export default RecentCard;

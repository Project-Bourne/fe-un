import React from "react";
import Image from "next/image";
import { ImageList } from "../../../components/ui";
import frame06 from "../../../../public/icons/frame-06.svg";
import frame012 from "../../../../public/icons/frame-012.svg";
import user1 from "../../../../public/images/user1.jpg";

const imageList = [
  {
    img: user1,
    alt: "1",
    status: 0,
  },
  {
    img: user1,
    alt: "1",
    status: 1,
  },
  {
    img: user1,
    alt: "1",
    status: 1,
  },
  {
    img: user1,
    alt: "1",
    status: 0,
  },
  {
    img: user1,
    alt: "1",
    status: 0,
  },
  {
    img: user1,
    alt: "1",
    status: 0,
  },
  {
    img: user1,
    alt: "1",
    status: 1,
  },
  {
    img: user1,
    alt: "1",
    status: 1,
  },
  {
    img: user1,
    alt: "1",
    status: 0,
  },
  {
    img: user1,
    alt: "1",
    status: 0,
  },
  {
    img: user1,
    alt: "1",
    status: 0,
  },
  {
    img: user1,
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
            src={frame06}
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
          <h2 className="font-bold">Recent Chats</h2>
          <ImageList users={imageList} stopImageCountAt={5} />
        </div>
      </div>

      <div className="border bg-sirp-secondary2 rounded-3xl">
        <div className="flex justify-start gap-5 items-center py-5 px-4 border-b-[1px] ">
          <Image
            src={frame012}
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
          <h2 className="font-bold">Recent Collaborators</h2>
          <ImageList users={imageList} stopImageCountAt={3} />
        </div>
      </div>
    </div>
  );
}

export default RecentCard;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RecentWork } from "@/utils/constants";

function RecentWorkspace() {
  const data = RecentWork;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5 mx-5">
      {data.map((item, index) => (
        <div key={index} className="border bg-sirp-secondary2 rounded-[1rem]">
          <div className="flex flex-col py-4 px-4 border-b-2">
            <div>
              <h2 className="font-bold">{item.maintext}</h2>
              <p className="text-sm text-gray-600">{item.subtext}</p>
            </div>
            <div className="border mt-[1rem] w-100% pb-2 pt-2 capitalize text-center hover:bg-sirp-primary hover:text-white text-sirp-primary font-bold rounded-[1rem] border-sirp-primary">
              <Link href={item.linkurl} className="cursor-pointer">
                <span>{item.linktext}</span>
              </Link>
            </div>
          </div>
          <div className="px-5 py-5">
            <h2 className="font-bold">{item.maintext2}</h2>
            <Image
              src={require(`../../../assets/icons/${item.icon}`)}
              alt="documents"
              className="cursor-pointer mt-5"
              width={300}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentWorkspace;

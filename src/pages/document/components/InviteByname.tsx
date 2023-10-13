import React from "react";
import Image from "next/image";

function InviteByname() {
  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex items-center border-b border-gray p-2">
          <div className="flex items-center mr-2 text-[8px] h-[26px] w-[106px] text-gray-400 justify-center bg-white border-gray-300 border p-1 rounded-full">
            <span>Musba’u Wasiu</span>
            <span className="ml-1">
              <Image
                src={require("../../../../public/icons/x.svg")}
                alt="userImage"
                width={8}
                height={8}
                className="rounded-full object-fill"
                priority
              />
            </span>
          </div>
          <input
            type="text"
            className="w-full h-full focus:outline-none"
            placeholder="Type name or email address"
          />
        </div>
        <div className="w-full p-4">
          <span className="text-gray-400 font-semibold">Suggestions</span>
          <div className="flex items-center w-full flex-col mt-3">
            <div className="flex  rounded-[1rem] mb-3 w-full bg-gray-100 hover:bg-sirp-primaryLess2 items-center cursor-pointer p-4 justify-between">
              <div className="text-sm flex items-center justify-start">
                <span className="mr-1">
                  <Image
                    src={require("../../../../public/images/user1.jpg")}
                    alt="userImage"
                    width={30}
                    height={30}
                    className="rounded-full object-fill"
                    priority
                  />
                </span>
                <div className="flex ml-4 flex-col items-start justify-center">
                  <span className="mr-1 font-bold">Musba’u Wasiu</span>
                  <span className="text-gray-400">Musba’uwaasiu@gmail.com</span>
                </div>
              </div>
              <div className="h-[20px] w-[20px] flex items-center justify-center">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="w-full h-full border-[3px] border-gray-300"
                />
              </div>
            </div>
            <div className="flex  rounded-[1rem] mb-3 w-full bg-gray-100 hover:bg-sirp-primaryLess2 items-center cursor-pointer p-4 justify-between">
              <div className="text-sm flex items-center justify-start">
                <span className="mr-1">
                  <Image
                    src={require("../../../../public/images/user1.jpg")}
                    alt="userImage"
                    width={30}
                    height={30}
                    className="rounded-full object-fill"
                    priority
                  />
                </span>
                <div className="flex ml-4 flex-col items-start justify-center">
                  <span className="mr-1 font-bold">Musba’u Wasiu</span>
                  <span className="text-gray-400">Musba’uwaasiu@gmail.com</span>
                </div>
              </div>
              <div className="h-[20px] w-[20px] flex items-center justify-center">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="w-full h-full border-[3px] border-gray-300"
                />
              </div>
            </div>
            <div className="flex  rounded-[1rem] mb-3 w-full bg-gray-100 hover:bg-sirp-primaryLess2 items-center cursor-pointer p-4 justify-between">
              <div className="text-sm flex items-center justify-start">
                <span className="mr-1">
                  <Image
                    src={require("../../../../public/images/user1.jpg")}
                    alt="userImage"
                    width={30}
                    height={30}
                    className="rounded-full object-fill"
                    priority
                  />
                </span>
                <div className="flex ml-4 flex-col items-start justify-center">
                  <span className="mr-1 font-bold">Musba’u Wasiu</span>
                  <span className="text-gray-400">Musba’uwaasiu@gmail.com</span>
                </div>
              </div>
              <div className="h-[20px] w-[20px] flex items-center justify-center">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="w-full h-full border-[3px] border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteByname;

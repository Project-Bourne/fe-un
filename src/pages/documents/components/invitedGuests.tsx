import React from "react";
import Image from "next/image";

function InvitedGuests() {
  return (
    <div>
      <div className="w-full">
        <div className="w-full">
          <div className="flex items-center border-b border-gray p-2">
            Inviting....
          </div>
          <div className="w-full p-4 h-[50vh] relative">
            <div className="grid grid-cols-3 gap-2 overflow-y-scroll mt-3">
              <div className="text-sm flex items-center bg-gray-100 p-3 h-[70px] rounded-[1rem] justify-start">
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
              <div className="text-sm flex items-center bg-gray-100 p-3 h-[70px] rounded-[1rem] justify-start">
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
              <div className="text-sm flex items-center bg-gray-100 p-3 h-[70px] rounded-[1rem] justify-start">
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
              <div className="text-sm flex items-center bg-gray-100 p-3 h-[70px] rounded-[1rem] justify-start">
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
              <div className="text-sm flex items-center bg-gray-100 p-3 h-[70px] rounded-[1rem] justify-start">
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
              <div className="text-sm flex items-center bg-gray-100 p-3 h-[70px] rounded-[1rem] justify-start">
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
              <div className="text-sm flex items-center bg-gray-100 p-3 h-[70px] rounded-[1rem] justify-start">
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
            </div>
            <div className="w-full border-t border-gray-200 bottom-0 absolute right-0 left-0 h-[15%] flex items-center justify-start">
              <input
                type="text"
                placeholder="Type name or email adderess"
                className="hfull w-full focus:outline-none placeholder:text-gray-400 placeholder:ml-3 font-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitedGuests;

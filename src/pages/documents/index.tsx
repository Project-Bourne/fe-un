import React, { useState } from "react";
import DocCard from "./components/docCards";
import OverviewCard from "./components/overviewCard";
import { useRouter } from "next/router";
import Image from "next/image";

function Documents() {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const handleClick = (num) => {
    // alert(num)
    setIsActive(true);
  };

  const redirect = () => {
    router.push("/documents/add-content");
  };

  return (
    <div>
      <div className="fixed -mt-2.5 md:w-[80%] w-[85%] bg-white flex justify-between items-center border-b border-gray-300  py-3 px-5">
        <h1 className="text-[#383E42] font-bold md:text-3xl text-xl">
          Documents
        </h1>
        <div className=" flex items-center justify-end">
          {/* filter group  */}
          <div className="flex items-center justify-center gap-3 md:mr-10 mr-5">
            <span>
              <Image
                src={require(`../../../public/icons/filter2.svg`)}
                alt="avatar"
              />
            </span>
            <span>Filter</span>
            <span>
              <Image
                src={require(`../../../public/icons/chevron-down.svg`)}
                alt="chevron-down"
              />
            </span>
          </div>

          <div
            className="border-2 border-[#B2CBE6] rounded-2xl shadow flex  items-center justify-center md:py-3 py-2 px-5"
            onClick={redirect}
          >
            <Image
              src={require("../../../public/icons/plus.svg")}
              width={16}
              height={16}
              alt="plus"
            />
            <span className="ml-2 text-[#4582C4] font-bold cursor-pointer">
              Add content
            </span>
          </div>
        </div>
      </div>

      <div
        className={`w-full h-[100vh] pt-[50px] grid ${
          isActive ? "md:grid-cols-2 grid-cols-1" : "grid-cols-1"
        }`}
      >
        <div
          className={` ${
            isActive && "border-r border-gray-300"
          }  overflow-y-auto  p-5`}
        >
          <div
            className={`grid gap-x-7 gap-y-3 ${
              !isActive ? "md:grid-cols-2 grid-cols-1" : "md:block hidden"
            } my-5`}
          >
            <DocCard docCardClick={handleClick} />
            <DocCard docCardClick={handleClick} />
            <DocCard docCardClick={handleClick} />
            <DocCard docCardClick={handleClick} />
            <DocCard docCardClick={handleClick} />
            <DocCard docCardClick={handleClick} />
            <DocCard docCardClick={handleClick} />
            <DocCard docCardClick={handleClick} />
          </div>
        </div>
        <>
          {isActive && (
            <div className={`w-full pt-[20px] pb-[50px] overflow-y-auto `}>
              <div className="pb-[50px]">
                <OverviewCard
                  backIcon={true}
                  goBack={() => setIsActive(false)}
                />
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default Documents;

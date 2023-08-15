import React, { useState } from "react";
import DocCard from "./components/docCards";
import OverviewCard from "./components/overviewCard";
import { useRouter } from "next/router";
import Image from "next/image";

function Documents() {
  const [isActive, setIsActive] = useState(false);
  const handleClick = (num) => {
    // alert(num)
    setIsActive(true);
  };
  const router = useRouter();
  const redirect = () => {
    router.push("/documents/add-content");
  };
  return (
    <div className="w-full h-[100vh]  grid grid-cols-2">
      <div className="border-r overflow-y-auto pb-[200px] border-gray-300 p-5">
        <h1 className="text-[#383E42] font-bold text-3xl">Documents</h1>
        <div className="grid my-5">
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
      <div className="w-full overflow-y-auto">
        <div className="border-b overflow-y-auto border-gray-300 flex items-center justify-end p-2">
          <div className="flex  items-center justify-center gap-3 mr-10">
            <span>
              <Image
                src={require(`../../assets/icons/filter2.svg`)}
                alt="avatar"
              />
            </span>
            <span>Filter</span>
            <span>
              <Image
                src={require(`../../assets/icons/chevron-down.svg`)}
                alt="chevron-down"
              />
            </span>
          </div>

          <div className="border-2 border-[#B2CBE6] rounded-2xl shadow flex  items-center justify-center py-3 px-5">
            <span>
              <Image
                src={require(`../../assets/icons/plus.svg`)}
                width={16}
                height={16}
                alt="plus"
              />
            </span>
            <span
              className="ml-2 text-[#4582C4] font-bold cursor-pointer"
              onClick={redirect}
            >
              Add content
            </span>
          </div>
        </div>
        {isActive && (
          <div className="w-full overflow-y-auto">
            <div>
              <OverviewCard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Documents;

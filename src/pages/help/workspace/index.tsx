import TrainingLayout from "@/layout/TrainingLayout";
import { ActivityCard } from "@/pages/collaborators/components/ActivityCard";
import { FAQS, LogData, QuickSearch } from "@/utils/constants";
import { SearchComp, FAQComp } from "../components";
import React from "react";
import Card from "./components/Card";
import { CardData } from "@/utils/constants";

const WorkspaceTraining = () => {
  return (
    <TrainingLayout>
      <div className="w-full overflow-y-scroll py-5">
        {/* Quick searches */}
        <div className="w-full flex flex-row flex-wrap items-center px-8">
          <p className="text-[13px] font-semibold mr-3">Quick searches: </p>

          {QuickSearch.map((item, index) => (
            <SearchComp
              item={item}
              index={index}
              key={index}
              list={QuickSearch}
            />
          ))}
        </div>
        {/* main */}
        <div className="grid md:flex flex-row  w-full items-start my-4 px-8">
          {/* Main */}
          <div className="w-full md:w-[70%] p-6 pb-5">
            <h2 className="text-[14px] font-semibold mb-2">
              Getting started with WorkSpace
            </h2>

            <div className="h-[400px] overflow-y-auto">
              <Card data={CardData} style="grid grid-cols-2 gap-2" />
            </div>
          </div>

          {/* FAQ */}
          <div className="w-full md:w-[18%] my-4 ml-5">
            <p className="text-[13px] text-black font-semibold">
              Getting Started with WorkSpace.
            </p>

            <div className="w-full mt-5">
              {FAQS.map((item, index) => (
                <FAQComp text={item} key={index} index={index} />
              ))}
            </div>
          </div>
        </div>
        {/* footer */}
        <div className="border-t-2 overflow-x-auto">
          <div className="mx-5 mt-5 text-[20px] font-semibold">
            Popular searches
          </div>
          <div className="inline-flex gap-2 my-5 mx-5 pr-5 md:w-[]">
            <div className=" border w-[400px] flex p-5 flex-col justify-start items-start bg-sirp-lightGrey min-h-[fit-content] rounded-[1rem]">
              <span className="bg-white rounded-2xl border py-1 px-2 border-[#E8EAEC] text-[grey]">
                SIRP
              </span>
              <span className="py-1 px-2 w-full">
                Redesigned Naira: CBN launches Cash Swap Programme for rural and
                Corn Ewa ati garri?
              </span>
            </div>
            <div className=" border w-[400px] flex p-5 flex-col justify-start items-start bg-sirp-lightGrey min-h-[fit-content] rounded-[1rem]">
              <span className="bg-white rounded-2xl border py-1 px-2 border-[#E8EAEC] text-[grey]">
                SIRP
              </span>
              <span className="py-1 px-2 w-full">
                Redesigned Naira: CBN launches Cash Swap Programme for rural and
                Corn Ewa ati garri?
              </span>
            </div>
            <div className=" border w-[400px] flex p-5 flex-col justify-start items-start bg-sirp-lightGrey min-h-[fit-content] rounded-[1rem]">
              <span className="bg-white rounded-2xl border py-1 px-2 border-[#E8EAEC] text-[grey]">
                SIRP
              </span>
              <span className="py-1 px-2 w-full">
                Redesigned Naira: CBN launches Cash Swap Programme for rural and
                Corn Ewa ati garri?
              </span>
            </div>
            <div className=" border w-[400px] flex p-5 flex-col justify-start items-start bg-sirp-lightGrey min-h-[fit-content] rounded-[1rem]">
              <span className="bg-white rounded-2xl border py-1 px-2 border-[#E8EAEC] text-[grey]">
                SIRP
              </span>
              <span className="py-1 px-2 w-full">
                Redesigned Naira: CBN launches Cash Swap Programme for rural and
                Corn Ewa ati garri?
              </span>
            </div>
            <div className=" border w-[400px] flex p-5 flex-col justify-start items-start bg-sirp-lightGrey min-h-[fit-content] rounded-[1rem]">
              <span className="bg-white rounded-2xl border py-1 px-2 border-[#E8EAEC] text-[grey]">
                SIRP
              </span>
              <span className="py-1 px-2 w-full">
                Redesigned Naira: CBN launches Cash Swap Programme for rural and
                Corn Ewa ati garri?
              </span>
            </div>
            <var>
              {" "}
              <div className=" border w-[400px] flex p-5 flex-col justify-start items-start bg-sirp-lightGrey min-h-[fit-content] rounded-[1rem]">
                <span className="bg-white rounded-2xl border py-1 px-2 border-[#E8EAEC] text-[grey]">
                  SIRP
                </span>
                <span className="py-1 px-2 w-full">
                  Redesigned Naira: CBN launches Cash Swap Programme for rural
                  and Corn Ewa ati garri?
                </span>
              </div>
            </var>
          </div>
        </div>
      </div>
    </TrainingLayout>
  );
};

export default WorkspaceTraining;

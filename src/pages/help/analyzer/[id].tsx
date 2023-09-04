import TrainingLayout from "../../../layout/TrainingLayout";
import { FAQS, QuickSearch } from "../../../utils/constants";
import React from "react";
import Video from "../components/Video";
import SearchComp from "../components/SearchComp";
import FAQComp from "../components/FAQ";

function CheckerDetails() {
  return (
    <TrainingLayout>
      {" "}
      <div className="w-full h-full overflow-y-scroll py-5">
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
          <div className="w-full md:w-[70%] p-6 pb-5 bg-gray-100 border rounded-[1rem]">
            <div className="h-[300px]">
              <Video />
            </div>
            <h1 className="font-bold text-lg mt-3">
              Get Started with Fact Checker
            </h1>
            <div className=" text-[14px] line-height-8 my-3 font-normal text-gray-500">
              Redesigned Naira: CBN launches Cash Swap Programme for rural
              Development This website is operated by Web3D Media Incorporated,
              a Delaware-based corporation with a registered address at 651 N
              Broad St, New Castle, Delaware United States. (“Company”).
            </div>
            <div>
              <div className="font-semibold text-[14px]">Interpretation: </div>
              <div className=" text-[14px] line-height-8 my-1 font-normal text-gray-500">
                Redesigned Naira: CBN launches Cash Swap Programme for rural
                Development This website is operated by Web3D Media
                Incorporated, a Delaware-based corporation with a registered
                address at 651 N Broad St, New Castle, Delaware United States.
                (“Company”).
              </div>
            </div>
            <div className="flex my-3 items-center justify-center w-[70%] mx-auto">
              <hr className=" w-[30%] border" />
              <div className="py-1 px-10 text-gray-500 rounded-full border-2">
                go to next tutorial
              </div>
              <hr className="w-[30%] border" />
            </div>
          </div>

          {/* FAQ */}
          <div className="w-full md:w-[18%] my-4 ml-5">
            <p className="text-[13px] text-black font-semibold">
              Getting Started with Fact Checker.
            </p>

            <div className="w-full mt-5">
              {FAQS.map((item, index) => (
                <FAQComp text={item} key={index} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </TrainingLayout>
  );
}

export default CheckerDetails;

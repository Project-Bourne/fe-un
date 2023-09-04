import TrainingLayout from "../../../layout/TrainingLayout";
import { FAQS, QuickSearch } from "../../../utils/constants";
import React from "react";
import Image from "next/image";
import CustomAccordion from "../components/CustomAccordion";
import SearchComp from "../components/SearchComp";
import FAQComp from "../components/FAQ";

const AllTraining = () => {
  return (
    <TrainingLayout>
      <div className="w-full h-full overflow-y-scroll py-5">
        <div className="px-8 font-bold">FAQs</div>
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
            <div className="w-full  border-dotted border-2 p-4 my-5 flex items-center rounded-[1rem]">
              <span>
                <Image
                  src={require("../../../../public/icons/search.svg")}
                  alt="search"
                  width={14}
                  height={14}
                />
              </span>
              <input
                type="text"
                className="p-1 pl-2 w-[500px] placeholder:text-grey-100 focus:outline-none"
                placeholder="Search FAQ"
              />
            </div>
            <div className="grid gap-2">
              <CustomAccordion />
              <CustomAccordion />
              <CustomAccordion />
              <CustomAccordion />
            </div>
          </div>

          {/* FAQ */}
          <div className="w-full md:w-[18%] my-4 ml-5">
            <p className="text-[13px] text-black font-semibold">Tutorials.</p>

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
};

export default AllTraining;

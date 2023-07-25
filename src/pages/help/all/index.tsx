import TrainingLayout from "@/layout/TrainingLayout";
import { ActivityCard } from "@/pages/collaborators/components/ActivityCard";
import { FAQS, LogData, QuickSearch } from "@/utils/constants";
import React from "react";
import { SearchComp, FAQComp } from "../components";
import Image from "next/image";
import { CardData } from "@/utils/constants";
import Card from "../components/Card";

const AllTraining = () => {
  return (
    <TrainingLayout>
      <div className="w-full h-full overflow-y-scroll py-5 px-8">
        {/* Quick searches */}
        <div className="w-full flex flex-row flex-wrap items-center">
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
        <div className="grid md:flex flex-row  w-full items-start my-4">
          {/* Main */}
          <div className="w-full md:w-[70%] p-6 pb-5">
            <h2 className="text-[14px] font-semibold mb-2">
              Getting started with IRP
            </h2>
            <div className="w-full grid md:grid-cols-2 gap-2">
              <Card data={CardData} />
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
        {/* footer */}
        <div></div>
      </div>
    </TrainingLayout>
  );
};

export default AllTraining;

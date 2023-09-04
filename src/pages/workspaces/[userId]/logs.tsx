import React from "react";
import { Breadcrumbs, Tab } from "../../../components/ui";
import ActivityCard from "../components/ActivityCard";
import Header from "../components/Header";
import { LogsData, TabHeaderData } from "@/utils/constants.workspace";

function Logs() {
  return (
    <>
      <Header filter={false} />
      <Tab tabHeaderContents={TabHeaderData} />
      <Breadcrumbs />
      <div className="pt-1 pb-5">
        {LogsData.map((log, index) => (
          <div key={index}>
            <div className="relative z-[10px] my-[3rem]">
              <hr />
              <div className="absolute text-[10px] text-[#6F7A82] -top-3.5 bg-gray-100 px-[30px] md:px-[100px] py-2 rounded-full left-[35%] md:left-[40%] mx-auto">
                {log.date}
              </div>
            </div>
            <ul>
              {log.data.map((item) => (
                <li key={item.id}>
                  <ActivityCard
                    time={item.time}
                    actionText={item.action}
                    activityText={item.activity}
                    docId={item.docId}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default Logs;

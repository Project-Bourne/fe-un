import React, { useState } from "react";
import { workspaceTab, workspaceGroupTab } from "@/utils/constants";
import RecentWorkspace from "./RecentWorkspace";
import Collaboration from "../workspaces/Collaboration";
import Article from "../workspaces/Article";
import Activites from "../workspaces/Activites";

function TabLayout({ layout }) {
  const tabLayoutOne = workspaceTab;
  const tabLayoutTwo = workspaceGroupTab;
  const [selectedTab, setSelectedTab] = useState(tabLayoutOne[0].id); // Initially select the first tab

  const handleClick = (id) => {
    setSelectedTab(id);
  };

  return (
    <div>
      <div className="flex flex-row gap-10 w-[100%] mt-5 border-b-2">
        {layout === 1
          ? tabLayoutOne.map((item, index) => (
              <div key={index} onClick={() => handleClick(item.id)}>
                <div
                  className={`${
                    item.id === selectedTab
                      ? "flex cursor-pointer border-b-2 w-[10rem]  border-sirp-primary pb-2"
                      : " w-[10rem] flex cursor-pointer"
                  }`}
                >
                  <h1
                    className={`${
                      item.id === selectedTab
                        ? "font-bold text-1xl text-sirp-primary px-5"
                        : "font-bold text-1xl text-gray-500 px-5"
                    }`}
                  >
                    {item.name}
                  </h1>
                </div>
              </div>
            ))
          : tabLayoutTwo.map((item, index) => (
              <div key={index} onClick={() => handleClick(item.id)}>
                <div
                  className={`${
                    item.id === selectedTab
                      ? "flex cursor-pointer border-b-2 md:w-[10rem] w-[2rem]  border-sirp-primary pb-2"
                      : " md:w-[10rem] w-[2rem] flex cursor-pointer"
                  }`}
                >
                  <h1
                    className={`${
                      item.id === selectedTab
                        ? "font-bold text-1xl text-sirp-primary px-5"
                        : "font-bold text-1xl text-gray-500 px-5"
                    }`}
                  >
                    {item.name}
                  </h1>
                </div>
              </div>
            ))}
      </div>
      {/* Conditionally render additional content based on selectedTab */}
      {layout === 1 ? (
        <div>
          {selectedTab === 1 && <RecentWorkspace />}
          {selectedTab === 2 && <Activites />}
        </div>
      ) : (
        <div>
          {selectedTab === 1 && <Article />}
          {selectedTab === 2 && <Activites />}
          {selectedTab === 3 && <Collaboration />}
        </div>
      )}
    </div>
  );
}

export default TabLayout;

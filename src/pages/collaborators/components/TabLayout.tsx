import React, { useState } from "react";
import { workspaceeSubData } from "@/utils/constants";
import RecentWorkspace from "./RecentWorkspace";
function TabLayout() {
  const data = workspaceeSubData;
  const [selectedTab, setSelectedTab] = useState(data[0].id); // Initially select the first tab
  const [showContent, setShowContent] = useState(false); // State to control showing additional content

  const handleClick = (id) => {
    setSelectedTab(id);
    setShowContent(false); // Reset the additional content when changing the selected tab
  };

  return (
    <div>
      <div className="flex flex-row gap-10 w-[100%] border-b-2">
        {data.map((item, index) => (
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
                    : "font-bold text-1xl px-5"
                }`}
              >
                {item.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
      {/* Conditionally render additional content based on selectedTab */}
      <div>
        {selectedTab === 1 && <RecentWorkspace />}
        {selectedTab === 2 && <h1>Saved</h1>}
      </div>
    </div>
  );
}

export default TabLayout;

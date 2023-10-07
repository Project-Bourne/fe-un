import React, { useState } from "react";
import DocCard from "../../../pages/documents/components/docCards";
import OverviewCard from "../../../pages/documents/components/overviewCard";

const Article = () => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = (num) => {
    // alert(num)
    setIsActive(true);
  };
  return (
    <div
      className={
        !isActive
          ? "grid w-full h-[100vh]"
          : "w-full h-[100vh]  grid grid-cols-2"
      }
    >
      <div className="border-r overflow-y-auto border-gray-300 p-5">
        <div className={isActive ? "grid my-5" : "grid grid-cols-2 gap-3"}>
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
      {isActive && (
        <div className="w-full overflow-y-auto">
          <div>
            <OverviewCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;

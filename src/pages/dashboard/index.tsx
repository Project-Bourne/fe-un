import React from "react";
import Card from "./components/Card";
import RecentCard from "./components/RecentCard";
import RecentDocument from "./components/RecentDocument";

const index = () => {
  return (
    <div className="h-[100vh] w-full overflow-y-auto pb-[8rem]">
      <h1>
        Welcome Oluanrawaju
      </h1>
      <Card/>
      <RecentCard/>
      <RecentDocument/>
    </div>
  );
};

export default index;

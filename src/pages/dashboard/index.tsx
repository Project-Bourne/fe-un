import React from "react";
import Card from "./components/Card";
import RecentCard from "./components/RecentCard";
import RecentDocument from "./components/RecentDocument";

const index = () => {
  return (
    <div className="h-full overflow-y-scroll mt-[10rem]">
      <h1 className="text-black text-2xl pl-10 font-bold">
        Welcome Oluanrawaju
      </h1>
      <Card/>
      <RecentCard/>
      <RecentDocument/>
    </div>
  );
};

export default index;

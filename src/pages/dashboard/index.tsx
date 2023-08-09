import React from "react";
import Card from "./components/Card";
import RecentCard from "./components/RecentCard";
import RecentDocument from "./components/RecentDocument";

const index = () => {
  return (
    <div className="h-[100vh] w-full overflow-y-auto pb-[8rem]">
      <h1 className="md:text-[34px] text-[26px] font-bold px-5">Welcome Olanrewaju!</h1>
      <Card />
      <RecentCard />
      <RecentDocument />
    </div>
  );
};

export default index;

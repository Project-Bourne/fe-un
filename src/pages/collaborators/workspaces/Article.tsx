import React from "react";
import Image from "next/image";
import DocCard from "@/pages/documents/components/docCards";
import OverviewCard from "@/pages/documents/components/overviewCard";
import { useRouter } from "next/router";

const Article = () => {
  const router = useRouter();
  const redirect = () => {
    router.push("/documents/add-content");
  };
  return (
    <div className="w-full h-[100vh]  grid grid-cols-2">
      <div className="border-r overflow-y-auto border-gray-300 p-5">
        <div className="grid my-5">
          <DocCard />
          <DocCard />
          <DocCard />
          <DocCard />
          <DocCard />
          <DocCard />
          <DocCard />
          <DocCard />
        </div>
      </div>
      <div className="w-full overflow-y-auto">
        <div>
          <OverviewCard />
        </div>
      </div>
    </div>
  );
};

export default Article;

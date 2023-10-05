import React from "react";
import { Header } from "@/components/layouts";

function CallLayout({ children }) {
  return (
    <div className="bg-white w-[100vw] h-[100vh] z-30 relative flex flex-col">
      {/* Layout header */}
      <Header />

      {/* Content */}
      <div className="mt-[100px] flex-grow">{children}</div>
    </div>
  );
}

export default CallLayout;

import React, { useState } from "react";
import Image from "next/image";

function CustomAccordion() {
  const [showContent, setShowContent] = useState(false);
  const openContent = () => {
    setShowContent(true);
  };
  const closeContent = () => {
    setShowContent(false);
  };

  return (
    <div className="border bg-gray-100 p-5 rounded-[1rem]">
      <div className="flex items-center justify-between mb-3">
        <span className="bg-white rounded-2xl border-2 py-1 px-2 border-[#E8EAEC] text-[grey]">
          Chisom
        </span>

        {showContent ? (
          <span onClick={closeContent}>
            <Image
              src={require(`../../../assets/icons/upcaret.svg`)}
              alt="settings tab"
              width={20}
              height={20}
              priority
            />
          </span>
        ) : (
          <span onClick={openContent}>
            <Image
              src={require(`../../../assets/icons/downcaret.svg`)}
              alt="settings tab"
              width={20}
              height={20}
              priority
            />
          </span>
        )}
      </div>
      <div className="mx-2 font-semibold">
        Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn
        Ewa ati garri?
      </div>
      {showContent && (
        <div className="mx-2 my-4 font-normal text-gray-400">
          {" "}
          Redesigned Naira: CBN launches Cash Swap Programme for rural
          Development This website is operated by Web3D Media Incorporated, a
          Delaware-based corporation with a registered address at 651 N Broad
          St, New Castle, Delaware United States. (“Company”). Redesigned Naira:
          CBN launches Cash Swap Programme for rural and Corn Ewa ati garri?
        </div>
      )}
    </div>
  );
}

export default CustomAccordion;

import React from "react";

const BlinkingRedDot = () => {
  return (
    <div
      className={`w-[15px] h-[15px] rounded-full bg-red-500 animate-pulse`}
    ></div>
  );
};

export default BlinkingRedDot;

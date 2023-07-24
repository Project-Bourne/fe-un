import CustomCard from "@/components/ui/CustomCard";
import React from "react";

function Card() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5 mx-5">
      <CustomCard
        imgSrc={require("../../../assets/icons/collabImport1.svg")}
        imgSrc2={require("../../../assets/icons/CollabImport2.svg")}
        mainText={"1200"}
        subText={"Total import from IRP"}
        mainText2={"123444"}
        subText2={"Total import from IRP"}
        classes={"flex py-5 px-5 gap-5 cursor-pointer"}
        classes2={
          "border-l-[1px] border-opacity-5 border-black flex py-5 px-5 gap-5 cursor-pointer"
        }
        layoutCount={2}
      />
      <CustomCard
        imgSrc={require("../../../assets/icons/CollabCall.svg")}
        mainText={"Start a Call"}
        subText={
          "Send a video/audio call request to collaborator(s), your call will start when the collaborator(s) accepts your call request"
        }
        classes={
          "flex py-[0.86rem] px-5 gap-5 rounded-[1rem] bg-sirp-secondary2 border border-sirp-dashboard1 cursor-pointer"
        }
        layoutCount={1}
      />
    </div>
  );
}

export default Card;

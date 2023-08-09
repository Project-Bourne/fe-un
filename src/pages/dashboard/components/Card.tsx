import CustomCard from "@/components/ui/CustomCard";
import React from "react";

function Card() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5 mx-5">
      <CustomCard
        imgSrc={require("../../../assets/icons/collabImport1.svg")}
        imgSrc2={require("../../../assets/icons/CollabImport2.svg")}
        mainText={`${200} Documents`}
        subText={"Total import from IRP"}
        mainText2={`${40} Documents`}
        subText2={"Total import from IRP"}
        classes={" py-7 px-5 gap-5 cursor-pointer flex items-center"}
        classes2={
          "md:border-l-[2px] border-t-[2px] md:border-t-0 border-opacity-5 border-black py-7 px-5 gap-5 cursor-pointer flex items-center"
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
          "flex py-[1.35rem] px-5 gap-5 rounded-3xl bg-sirp-secondary2 border border-sirp-dashboard1 cursor-pointer items-center"
        }
        layoutCount={1}
      />
    </div>
  );
}

export default Card;

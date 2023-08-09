import React from "react";
import Image from "next/image";
import { CustomCardModal } from "@/models/ui/components.models";

function CustomCard(props: CustomCardModal) {
  const {
    layoutCount,
    classes,
    classes2,
    imgSrc,
    mainText,
    subText,
    imgSrc2,
    mainText2,
    subText2,
    children, // Added children prop to include additional content
  } = props;

  return (
    <div>
      {layoutCount === 1 ? (
        <div className={classes}>
          <Image src={imgSrc} alt="Card" width={60} height={30} />
          <div>
            <h2 className="font-bold">{mainText}</h2>
            <p className="text-sm text-gray-600">{subText}</p>
          </div>
          {children} {/* Render additional content */}
        </div>
      ) : (
        <div className="rounded-3xl md:flex gap-x-5 bg-sirp-dashboardcola">
          <div className={classes}>
            <Image src={imgSrc} alt="Card" width={60} height={30} />
            <div>
              <h2 className="font-bold">{mainText}</h2>
              <p className="text-sm text-gray-600">{subText}</p>
            </div>
          </div>
          <div className={classes2}>
            <Image src={imgSrc2} alt="Card" width={60} height={30} />
            <div>
              <h2 className="font-bold">{mainText2}</h2>
              <p className="text-sm text-gray-600">{subText2}</p>
            </div>
          </div>
          {children} {/* Render additional content */}
        </div>
      )}
    </div>
  );
}

export default CustomCard;

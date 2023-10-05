import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

type ImageListProps = {
  users: any[];
  stopImageCountAt: number;
};

function ImageList({ users, stopImageCountAt }: ImageListProps) {
  const [remainderCount, setRemainderCount] = useState(0);
  useEffect(() => {
    if (users.length > stopImageCountAt) {
      setRemainderCount(users.length - stopImageCountAt);
    }
  }, [users, stopImageCountAt]);


  return (
    <div className="flex mt-3">
      {users?.map((user, index) => (
        <React.Fragment key={index}>
          {index < stopImageCountAt && (
            <>
              <img
                src={user.image}
                alt={user.alt}
                className={`rounded-full border-[2px] h-[33px] w-[45px] -ml-[.8rem] 
                                    ${user.status === 0
                    ? "border-sirp-primaryBlue"
                    : "border-sirp-gray"
                  }
               `}
              />
            </>
          )}
        </React.Fragment>
      ))}
      {remainderCount > 0 && (
        <div className="border-[2px] border-sirp-primaryBlue bg-sirp-primaryLess2 h-[45px] w-[45px] rounded-full flex items-center justify-center -ml-[.8rem]">
          +{remainderCount}
        </div>
      )}
    </div>
  );
}

export default ImageList;

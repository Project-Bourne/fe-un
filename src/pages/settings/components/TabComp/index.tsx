import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "../../../../styles/global.css";
import Link from "next/link";

type TabCompType = {
  item: {
    name: string;
    icon: string;
    id: number;
    route: string;
    selectedIcon: string;
  };
  index: number;
  route: string;
};

const TabComp = ({ item, index, route }: TabCompType) => {
  const router = useRouter();

  // States
  const [path, setPath] = useState("");

  // Functions
  const updatePath = (e: any) => {
    // e.preventDefault();
    setPath(item.route);
    // console.log(route, path, route, `${path}` == `${route}`, )
    router.push(
      {
        pathname: item.route,
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  return (
    <div
      className={
        item.route == router.pathname
          ? "md:px-8 px-3 pt-3 flex flex-row items-center border-b-2 border-sirp-primary pb-2 md:pb-3 mb-[-2px] cursor-pointer"
          : "md:px-8 px-3  pt-3 flex items-center pb-3 mb-[-2px] cursor-pointer text-sirp-grey"
      }
      onClick={updatePath}
    >
      <Image
        src={
          router.pathname == item.route
            ? require(`../../../../assets/icons/${item.selectedIcon}`)
            : require(`../../../../assets/icons/${item.icon}`)
        }
        // item.route.includes(route) ? require(`../../../../assets/icons/on.${item.icon}`) :
        alt="settings tab"
        width={18}
        height={18}
        style={{ marginRight: 15 }}
        priority
      />

      <h2
        className={
          router.pathname == item.route
            ? "text-[12px] font-semibold text-sirp-primary"
            : "text-[12px] font-semibold "
        }
      >
        {item.name}
      </h2>
    </div>
  );
};

export default TabComp;

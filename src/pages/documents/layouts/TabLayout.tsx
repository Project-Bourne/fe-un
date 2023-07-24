import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import InviteByname from '../components/InviteByname'
import InviteByPhone from '../components/InviteByPhone'

type LayoutType = {
  children: ReactNode;
};

const TabLayout = ({ children, showTitle, data }: any) => {
  const [selectedTab, setSelectedTab] = useState(data[0].id); // Initially select the first tab

  const handleClick = (id) => {
    setSelectedTab(id);
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      {showTitle === false ? null : (
        <div className="flex flex-row w-full py-7 px-7 items-center justify-between">
          <h1 className="text-[18px] font-semibold">Profile Settings</h1>
        </div>
      )}

      {/* Settings tabs */}
      <div className="w-[100%] flex flex-row items-center border-b overscroll-y-auto">
        {data?.map((item, index) => (
          <div
            className={`${selectedTab === item.id
                ? 'px-8 pt-3 flex flex-row items-center border-b-2 border-sirp-primary pb-3 mr-10 mb-[-2px] cursor-pointer'
                : 'px-8 pt-3 flex flex-row items-center border-b pb-3 mr-15 mb-[-2px] cursor-pointer text-sirp-grey'
              }`}
            onClick={() => handleClick(item.id)}
            key={index}
          >
            <h2 className={selectedTab === item.id ? 'text-[12px] font-semibold text-sirp-primary' : 'text-[12px] font-semibold'}>
              {item.name}
            </h2>
          </div>
        ))}
      </div>
       {/* Conditionally render children based on selectedTab */}
       {selectedTab === 1 && <InviteByname />}
      {selectedTab === 2 && <InviteByPhone />}
      {/* Add more conditions for other tabs as needed */}
    </div>
  );
};

export default TabLayout;

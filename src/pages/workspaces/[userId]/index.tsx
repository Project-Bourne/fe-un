import { Breadcrumbs, Tab } from "@/components/ui";
import { Button, CustomModal } from "@/components/ui";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  ActivityLogSection,
  Header,
  PersonalInfoSection,
  ProfileSection,
} from "../components";
import { TabHeaderData } from "../utils/constants";

function UserDetails() {
  const [toggleModal, setToggleModal] = useState(false);

  const BlockUserModal = () => {
    return (
      <>
        <h1 className="font-semibold text-[24px] px-2 mb-3"> Block user </h1>
        <div className="grid pb-5 pt-2 px-2">
          <p className="text-sm mb-3">
            Are you sure you want to delete the user{" "}
            <span className="text-[#09495D]">Peter Duru</span> ?
          </p>
          <div className="px-5 py-1.5 flex gap-x-3.5 rounded-md bg-[#45C6ED] mb-4">
            <Image
              src={require("../../../assets/images/user1.jpg")}
              alt="user"
              className="rounded-full"
              width={35}
            />
            <div className="grid text-sm">
              <p className="font-semibold">Peter Duru</p>
              <p className="text-[12.5px] text-[#545C62]">
                Transcorp@gmail.com
              </p>
            </div>
          </div>
          <Button
            value="No, don’t block user"
            classNameStyle="p-2 rounded-md text-[#09495D] text-[14px] border-[1.2px] border-[#09495D]"
            background="bg-white"
          />
          <Button
            value="Yes, block user"
            classNameStyle="p-2 rounded-md text-white text-[14px] border-[2px] border-[#EF4444] mt-3"
            background="bg-[#EF4444]"
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="pb-7">
        <Header filter={false} />
        <Tab tabHeaderContents={TabHeaderData} />
        <Breadcrumbs />
        <PersonalInfoSection blockUser={() => setToggleModal(true)} />
        <ProfileSection />
        <ActivityLogSection />
      </div>
      {toggleModal && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setToggleModal(false)}
        >
          <BlockUserModal />
        </CustomModal>
      )}
    </>
  );
}

export default UserDetails;

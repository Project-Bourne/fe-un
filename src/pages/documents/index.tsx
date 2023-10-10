import React, { useEffect, useState } from "react";
import DocCard from "./components/docCards";
import OverviewCard from "./components/overviewCard";
import { useRouter } from "next/router";
import Image from "next/image";
import { CustomModal } from "@/components/ui";
import CreateDocument from "./components/createDoc";
import SocketService from "../../socket/chat.socket";
import { useSelector } from "react-redux";
import chatEmpty from "../../../public/icons/chat.empty.svg";

function Documents() {
  const [isActive, setIsActive] = useState("");
  const router = useRouter();
  const [singleData, setSingleData] = useState({});
  const [createDocModal, setCreateDocModal] = useState(false);
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );
  const { allDocs } = useSelector((state: any) => state?.docs);
  const [singleDoc, setSingleDoc] = useState({});
  useEffect(() => {
    const fetchHistory = async () => {
      const useSocket = SocketService;
      await useSocket.getDocHistory({ uuid: userInfo?.uuid });
    };
    fetchHistory();
  }, []);

  const handleClick = (num) => {
    console.log(allDocs, "alldocs");
    setIsActive(num);
    const clickedDoc = allDocs.find((el) => el._id === num);
    console.log(clickedDoc, "clickedDoc");
    setSingleData(clickedDoc);
  };
  const handleCloseModal = () => {
    setCreateDocModal(false);
  };
  return (
    <div>
      <div className="fixed -mt-2.5 md:w-[80%] w-[85%] bg-white flex justify-between items-center border-b border-gray-300  py-3 px-5 documents">
        <h1 className="text-[#383E42] font-bold md:text-3xl text-xl">
          Documents
        </h1>
        <div className=" flex items-center justify-end">
          <div
            className="border-2 border-[#B2CBE6] rounded-2xl shadow flex  items-center justify-center md:py-3 py-2 px-5"
            onClick={() => setCreateDocModal(true)}
          >
            <Image
              src={require("../../../public/icons/plus.svg")}
              width={16}
              height={16}
              alt="plus"
            />
            <span className="ml-2 text-[#4582C4] font-bold cursor-pointer">
              New Document
            </span>
          </div>
        </div>
      </div>
      {createDocModal && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={handleCloseModal}
        >
          <CreateDocument />
        </CustomModal>
      )}
      <div
        className={`w-full h-[100vh] pt-[50px] grid ${
          isActive ? "md:grid-cols-2 grid-cols-1" : "grid-cols-1"
        }`}
      >
        <div
          className={`${
            isActive && "border-r border-gray-300"
          }  overflow-y-auto  p-5`}
        >
          <div
            className={`grid gap-x-7 gap-y-3 pb-[150px] ${
              !isActive ? "md:grid-cols-2 grid-cols-1" : "md:block hidden"
            } my-5`}
          >
            {allDocs?.map((el, i) => (
              <DocCard
                docCardClick={handleClick}
                data={el}
                key={i}
                isActive={isActive}
              />
            ))}
            {allDocs?.length < 1 && (
              <div className="flex  flex-col justify-center w-[100vw] h-[60vh]">
                <div className="mx-auto">
                  <Image src={chatEmpty} alt="empty-chats" />
                </div>
                <div className="text-center">
                  <h3 className="text-[17px] font-semibold">
                    No Documents yet
                  </h3>

                  <p className="text-[15px] text-[#A1ADB5]">
                    Your documents will appear here, click the button to create
                    new Doc
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <>
          {isActive && (
            <div className={`w-full pt-[20px] pb-[50px] overflow-y-auto `}>
              <div className="pb-[50px]">
                <OverviewCard
                  backIcon={true}
                  goBack={() => setIsActive("")}
                  data={singleData}
                />
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default Documents;

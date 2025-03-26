import React, { useEffect, useState } from "react";
import DocCard from "./components/docCards";
import OverviewCard from "./components/overviewCard";
import { useRouter } from "next/router";
import Image from "next/image";
import { CustomModal } from "@/components/ui";
import CreateDocument from "./components/createDoc";
import SocketService from "../../socket/chat.socket";
import { useDispatch, useSelector } from "react-redux";
import chatEmpty from "../../../public/icons/chat.empty.svg";
import { setComments } from "@/redux/reducers/chat/chatReducer";
import { setSingleDoc } from "@/redux/reducers/documents/documentReducer";
import { toast } from "react-toastify";

/**
 * Documents list page component
 * Handles displaying all documents and navigation to individual documents
 * @returns {JSX.Element} The documents list component
 */
function Documents() {
  const [isActive, setIsActive] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [singleData, setSingleData] = useState({});
  const [createDocModal, setCreateDocModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { userInfo } = useSelector((state: any) => state?.auth);
  const { allDocs } = useSelector((state: any) => state?.docs);

  /**
   * Initialize document list and clear document state
   */
  useEffect(() => {
    const initializeDocuments = async () => {
      setIsLoading(true);
      try {
        // Clear any existing document state
        dispatch(setComments([]));
        dispatch(setSingleDoc(null));

        // Fetch document history
        const socketService = new SocketService();
        await socketService.getDocHistory({ uuid: userInfo?.uuid });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching documents:", error);
        toast.error("Failed to load documents");
        setIsLoading(false);
      }
    };

    initializeDocuments();
  }, [allDocs, dispatch, userInfo?.uuid]);

  /**
   * Handle clicking on a document in the list
   * @param {string} docId - The ID of the clicked document
   */
  const handleClick = (docId) => {
    if (!docId) return;

    const clickedDoc = allDocs.find((doc) => doc._id === docId);
    if (clickedDoc) {
      setIsActive(docId);
      setSingleData(clickedDoc);
      // Set the document in state before navigation
      dispatch(setSingleDoc(clickedDoc));
    }
  };

  /**
   * Handle navigating to full document view
   * @param {Object} doc - The document to view
   */
  const handleViewDocument = (doc) => {
    if (!doc?._id) return;

    // Set document state before navigation
    dispatch(setSingleDoc(doc));
    router.push(`/documents/${doc._id}`);
  };

  const handleCloseModal = () => {
    setCreateDocModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sirp-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed -mt-2.5 md:w-[80%] w-[85%] bg-white flex justify-between items-center border-b border-gray-300 py-3 px-5 documents">
        <h1 className="text-[#383E42] font-bold md:text-3xl text-xl">
          Documents
        </h1>
        <div className="flex items-center justify-end">
          <div
            className="border-2 border-[#B2CBE6] rounded-2xl shadow flex items-center justify-center md:py-3 py-2 px-5 cursor-pointer hover:bg-sirp-primaryLess2"
            onClick={() => setCreateDocModal(true)}
          >
            <Image
              src={require("../../../public/icons/plus.svg")}
              width={16}
              height={16}
              alt="plus"
            />
            <span className="ml-2 text-[#4582C4] font-bold">New Document</span>
          </div>
        </div>
      </div>

      {createDocModal && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={handleCloseModal}
        >
          <CreateDocument
            setCreateDocModal={() => setCreateDocModal(false)}
            handleCloseModal={handleCloseModal}
          />
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
          } overflow-y-auto p-5`}
        >
          {allDocs?.length > 0 ? (
            <div
              className={`grid gap-x-7 gap-y-3 pb-[150px] ${
                !isActive ? "md:grid-cols-2 grid-cols-1" : "md:block hidden"
              } my-5`}
            >
              {allDocs?.map((doc, i) => (
                <DocCard
                  key={doc._id || i}
                  docCardClick={handleClick}
                  data={doc}
                  isActive={isActive}
                  onViewDocument={() => handleViewDocument(doc)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-[60vh]">
              <div>
                <Image src={chatEmpty} alt="empty-chats" />
              </div>
              <div className="text-center">
                <h3 className="text-[17px] font-semibold">No Documents yet</h3>
                <p className="text-[15px] text-[#A1ADB5]">
                  Your documents will appear here. Click the button to create a
                  new Doc.
                </p>
              </div>
            </div>
          )}
        </div>

        {isActive && (
          <div className="w-full pt-[20px] pb-[50px] overflow-y-auto">
            <div className="pb-[50px]">
              <OverviewCard
                backIcon={true}
                goBack={() => setIsActive("")}
                data={singleData}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Documents;

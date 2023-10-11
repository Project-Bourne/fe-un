import React, { useEffect, useState } from "react";
import Image from "next/image";
import Docs from "../components/Docs";
import CallModal from "@/components/ui/CallModal";
import ImageList from "@/components/ui/ImageList";
import { useRouter } from "next/router";
import SocketService from "../../../socket/chat.socket";
import socketio from "@/utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setSingleDoc } from "@/redux/reducers/documents/documentReducer";
import AuthService from "@/services/auth.service";
import DocumentService from "@/services/document.service";
import { useTruncate } from "@/components/custom-hooks";
import { setComments } from "@/redux/reducers/chat/chatReducer";

const viewDocument = () => {
  const [selectedTab, setSelectedTab] = useState(null); // Initially select the first tab
  const [showComments, setShowComments] = useState(false);
  const router = useRouter();
  const [showCall, setShowCall] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [documentsBar, setDocumentsBar] = useState([]);
  const { singleDoc } = useSelector((state: any) => state?.docs);
  const { id } = router.query;

  useEffect(() => {
    const fetchCollaborators = async () => {
      if (id) {
        const document = await DocumentService.getDoc(id);
        dispatch(setSingleDoc(document));
        if (
          singleDoc?.collaborators &&
          Array.isArray(singleDoc.collaborators)
        ) {
          const docCollabPromises = singleDoc.collaborators.map(async (el) => {
            console.log(el, "el chisommm");
            const user = await AuthService.getusersbyId(el.uuid);
            return user?.data;
          });

          const docCollaborators = await Promise.all(docCollabPromises);
          setUsers(docCollaborators);
        }
      }
    };
    fetchCollaborators();
  }, [id]);

  useEffect(() => {
    const getComments = async () => {
      const useSocket = SocketService;
      dispatch(setComments([]));
      await useSocket.getComments({
        docId: singleDoc?._id,
        spaceId: singleDoc?.spaceId,
      });
    };
    getComments();
  }, []);

  useEffect(() => {
    socketio.on("receive-comment", async (res) => {
      console.log("receive-comment", res);
      const useSocket = SocketService;
      await useSocket.getComments({
        docId: singleDoc?._id,
        spaceId: singleDoc?.spaceId,
      });
    });

    socketio.on("retrieved-comments-in-doc", async (res) => {
      let response = JSON.parse(res);
      console.log("retrieved-comments-in-doc", response);
      dispatch(setComments(response.data));
    });
  }, [socketio]);

  useEffect(() => {
    if (singleDoc?.spaceId) {
      setDocumentsBar([
        // {
        //   name: "Share",
        //   icon: "share.svg",
        //   id: 1,
        // },
        // {
        //   name: "Comment",
        //   icon: "comments.svg",
        //   id: 2,
        // },
        {
          name: "Call",
          icon: "call.svg",
          id: 3,
        },
        {
          name: "Comments",
          icon: "chat.svg",
          id: 4,
        },
      ]);
    } else {
      setDocumentsBar([
        {
          name: "Call",
          icon: "call.svg",
          id: 3,
        },
      ]);
    }
  }, []);

  const handleClick = (id) => {
    setSelectedTab(id);
    if (id === 1) {
      setShowComments(false);
      setShowChat(false);
      setShowCall(false);
      setShowShare(true);
    }
    if (id === 2) {
      setShowComments(true);
      setShowChat(false);
      setShowCall(false);
      setShowShare(false);
    }
    if (id == 3) {
      setShowComments(false);
      setShowCall(true);
      setShowChat(false);
      setShowShare(false);
    }
    if (id == 4) {
      setShowComments(false);
      setShowChat(true);
      setShowCall(false);
      setShowShare(false);
    }
  };

  return (
    <div className="w-full h-full doc overflow-y-auto">
      <div className=" flex items-center  justify-between  border-b-[1px] border-b-gray-100 w-full px-5 py-3 docs">
        <div className="flex items-center">
          <span className="text-3xl text-[#1D2022] font-bold capitalize">
            {useTruncate(singleDoc?.name, 20)}
          </span>
        </div>
        <div>
          <ImageList users={users} stopImageCountAt={5} />
        </div>
        <div className=" flex items-center">
          {documentsBar?.map((item) => (
            <div
              key={item.id}
              className={` ${
                selectedTab === item.id
                  ? "flex items-center mr-5 bg-sirp-primaryLess2 p-1 rounded-lg cursor-pointer"
                  : "flex items-center mr-5 p-1 cursor-pointer rounded-lg"
              }`}
              onClick={() => handleClick(item.id)}
            >
              <span className="mr-2">
                <Image
                  src={require(`../../../../public/icons/${item.icon}`)}
                  alt=""
                />
              </span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <Docs
        showComments={showComments}
        setShowComments={setShowComments}
        setShowChat={setShowChat}
        showChat={showChat}
        setShowShare={setShowShare}
        showShare={showShare}
      />
      {showCall && <CallModal setShowCall={setShowCall} />}
    </div>
  );
};

export default viewDocument;

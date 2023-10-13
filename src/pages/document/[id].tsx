import React, { useEffect, useState } from "react";
import Image from "next/image";
import Docs from "./components/Docs";
import CallModal from "@/components/ui/CallModal";
import ImageList from "@/components/ui/ImageList";
import { useRouter } from "next/router";
import SocketService from "../../socket/chat.socket";
import socketio from "@/utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setSingleDoc } from "@/redux/reducers/documents/documentReducer";
import AuthService from "@/services/auth.service";
import DocumentService from "@/services/document.service";
import { useTruncate } from "@/components/custom-hooks";
import { setComments } from "@/redux/reducers/chat/chatReducer";
import EditableText from "./components/EditText";
import { Cookies } from "react-cookie";
import NotificationService from "@/services/notification.service";

const viewDocument = () => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const router = useRouter();
  const [showCall, setShowCall] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [documentsBar, setDocumentsBar] = useState([]);
  const { singleDoc } = useSelector((state: any) => state?.docs);
  const { comments } = useSelector((state: any) => state?.chats);
  const { id } = router.query;
  const cookies = new Cookies();
  const token = cookies.get("deep-access");
  const headers = {
    "deep-token": token,
  };
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );

  const createDoc = async (data) => {
    try {
      const useSocket = SocketService;
      let docData = {
        name: useTruncate(data, 20),
        author: {
          id: userInfo?.uuid,
          name: userInfo?.email,
        },
      };
      await useSocket.createDoc(docData);
      socketio.once("load-doc", (res) => {
        let data = JSON.parse(res);
        console.log("load-doc", data);
        dispatch(setSingleDoc(data?.data?.data));
        toast("Document Created", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        //
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (typeof id === "string") {
        try {
          const [routeId, routeName] = id.split("&");
          let url;

          switch (routeName) {
            case "summarizer":
              url = `http://192.81.213.226:81/82/summary/${routeId}`;
              break;
            case "translator":
              url = `http://192.81.213.226:81/83/translation/${routeId}`;
              break;
            case "irp":
              url = `http://192.81.213.226:81/84/fact/${routeId}`;
              break;
            case "factcheck":
              url = `http://192.81.213.226:81/84/fact/${routeId}`;
              break;
            case "deepchat":
              url = `http://192.81.213.226:81/85/deepchat/${routeId}`;
              break;
            case "analyzer":
              url = `http://192.81.213.226:81/81/analysis/${routeId}`;
              break;
            case "interrogator":
              url = `http://192.81.213.226:81/837/interrogator/${routeId}`;
              break;
            case "collab":
              url = `http://192.81.213.226:81/86/api/v1/${routeId}`;
              break;
            default:
              throw new Error("Invalid routeName");
          }

          const response = await fetch(url, {
            method: "GET",
            headers: headers,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response?.json();
          switch (routeName) {
            case "translator":
              createDoc(data?.data?.textTranslation);
              break;
            case "factcheck":
              createDoc(data?.data?.confidence?.content);
              break;
            case "irp":
              createDoc(data?.data?.confidence?.content);
              break;
            case "analyzer":
              createDoc(data?.data?.text);
              break;
            case "interrogator":
            case "collab":
            case "deepchat":
              break;
            default:
              break;
          }
          setLoading(false);
        } catch (error: any) {
          NotificationService.error({
            message: "Error!",
            addedText: <p>{`${error.message}, please try again`}</p>,
            position: "top-center",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

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
            const user = await AuthService.getusersbyId(el.id);
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
        docId: res?.doc?.id,
        spaceId: res?.spaceId,
      });
    });

    socketio.on("doc-updated", async (res) => {
      console.log("doc-updata", res);
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
      setShowChat(true);
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
          {/* <span className="text-3xl text-[#1D2022] font-bold capitalize">
            {useTruncate(singleDoc?.name, 20)}
          </span> */}
          <EditableText initialText={singleDoc?.name} />
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
                  src={require(`../../../public/icons/${item.icon}`)}
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

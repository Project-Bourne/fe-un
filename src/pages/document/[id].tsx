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
import { extractContent } from "@/utils/documentHelpers";
import Spinner from "@/components/Spinner";
import { stripMarkdown } from "@/utils/stripMarkdown";
import DocumentPreview from "@/components/DocumentPreview";

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

  const createDoc = async (markdownContent: string) => {
    try {
      let docData = {
        name: useTruncate(stripMarkdown(markdownContent), 20),
        author: {
          id: userInfo?.uuid,
          name: userInfo?.email,
        },
        data: {
          ops: [{ insert: markdownContent }],
        },
      };
      const socketService = new SocketService();
      await socketService.createDoc(docData);
      socketio.once("load-doc", async (res) => {
        let data = JSON.parse(res);
        console.log("load-doc", data.data);
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

        await socketService.updateDoc(data?.data);
        // console.log("Doc: ", )
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
          }, 3000);
        });

        router.replace(`/documents/${data?.data?._id}`);
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
              // url = `http://192.81.213.226:81/82/summary/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_SUMMARIZER_API_ROUTE}/summary/${routeId}`;
              break;
            case "translator":
              // url = `http://192.81.213.226:81/83/translation/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_TRANSLATOR_API_ROUTE}/translation/${routeId}`;
              break;
            case "irp":
              // url = `http://192.81.213.226:81/84/fact/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_FACT_CHECKER_API_ROUTE}/fact/${routeId}`;
              break;
            case "factcheck":
              // url = `http://192.81.213.226:81/84/fact/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_FACT_CHECKER_API_ROUTE}/fact/${routeId}`;
              break;
            case "deepchat":
              // url = `http://192.81.213.226:81/85/deepchat/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_DEEP_CHAT_API_ROUTE}/deepchat/${routeId}`;
              break;
            case "analyser":
              // url = `http://192.81.213.226:81/81/analysis/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_ANALYZER_API_ROUTE}/analysis/${routeId}`;
              break;
            case "interrogator":
              // url = `http://192.81.213.226:81/87/interrogation/message/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_INTERROGATOR_API_ROUTE}/interrogation/message/${routeId}`;
              break;
            case "collab":
              // url = `http://192.81.213.226:86/api/v1/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_COLLAB_API_PORT}/api/v1/${routeId}`;
              break;
            case "digest":
              // url = `http://192.81.213.226:81/81/analysis/${routeId}`;
              url = `http://${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}:${process.env.NEXT_PUBLIC_IRP_API_PORT}/${process.env.NEXT_PUBLIC_FACT_CHECKER_API_ROUTE}/digest/${routeId}`;
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
          const rawContent = extractContent(routeName, data);
          const isImportOperation = [
            "translator",
            "summarizer",
            "factcheck",
            "irp",
            "analyser",
            "interrogator",
            "digest",
          ].includes(routeName);

          if (isImportOperation) {
            if (singleDoc && singleDoc._id) {
              // const updatedDoc = await DocumentService.updateDocContent(
              //   singleDoc._id,
              //   rawContent,
              //   headers,
              // );
              // dispatch(setSingleDoc(updatedDoc));
              toast("Document Updated", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              router.push(`/documents/${singleDoc._id}`);
            } else {
              createDoc(rawContent);
            }
          } else {
            // For non-import operations like collab and deepchat, retain original behavior
            if (routeName === "collab" || routeName === "deepchat") {
              // Do nothing as per original implementation
            } else {
              createDoc(rawContent);
            }
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
        const document: any = await DocumentService.getDoc(id);
        dispatch(setSingleDoc(document));
        if (
          (singleDoc?.collaborators || document?.collaborators) &&
          Array.isArray(singleDoc?.collaborators || document?.collaborators)
        ) {
          const docCollabPromises = (
            singleDoc?.collaborators || document?.collaborators
          ).map(async (el) => {
            console.log(el, "el chisommm");
            const user = await AuthService.getusersbyId(el.id);
            return user?.data;
          });

          const docCollaborators = await Promise.all(docCollabPromises);
          dispatch(setSingleDoc(document));
          setUsers(docCollaborators);
        }
      }
    };
    fetchCollaborators();
  }, [id]);

  useEffect(() => {
    const getComments = async () => {
      const socketService = new SocketService();
      dispatch(setComments([]));
      await socketService.getComments({
        docId: singleDoc?.id,
        spaceId: singleDoc?.spaceId,
      });
    };
    getComments();
  }, []);

  useEffect(() => {
    socketio.on("receive-comment", async (res) => {
      console.log("receive-comment", res);
      const socketService = new SocketService();
      await socketService.getComments({
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full h-full doc overflow-y-auto">
      <div className=" flex items-center  justify-between  border-b-[1px] border-b-gray-100 w-full px-5 py-3 docs">
        <div className="flex items-center">
          <div className="text-3xl text-[#1D2022] font-bold capitalize">
            {stripMarkdown(singleDoc?.name || "")}
          </div>
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
      <DocumentPreview />
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

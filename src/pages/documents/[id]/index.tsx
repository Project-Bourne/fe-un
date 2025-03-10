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
import { setComments } from "@/redux/reducers/chat/chatReducer";
import EditableText from "../components/EditText";
// import setCollaborators  from "@/redux/reducers/users/userReducers";

const viewDocument = () => {
  const [selectedTab, setSelectedTab] = useState(null); // Initially select the first tab
  const [showComments, setShowComments] = useState(true);
  const router = useRouter();
  const [showCall, setShowCall] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [users, setUsers] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const dispatch = useDispatch();
  const documentsBar = [
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
  ];
  const { singleDoc } = useSelector((state: any) => state?.docs);
  const { comments } = useSelector((state: any) => state?.chats);
  const { id } = router.query;
  useEffect(() => {
    dispatch(setComments([]));
    dispatch(setSingleDoc(null));
  }, []);

  useEffect(() => {
    console.log("Users", users);
  }, [users]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      if (!id) return;
      const document = await DocumentService.getDoc(id);
      console.log("DOC", document);
      dispatch(setSingleDoc(document));
      let collabs = [];
      if (singleDoc?.collaborators && Array.isArray(singleDoc.collaborators)) {
        // const docCollabPromises = document.collaborators.map(async (el) => {
        //   console.log(el, "el chisommm");
        //   const user = await AuthService.getusersbyId(el.id);
        //   return user?.data;
        // });
        // const docCollaborators = await Promise.all(docCollabPromises);

        for (const key in document.collaborators) {
          if (
            Object.prototype.hasOwnProperty.call(document.collaborators, key)
          ) {
            const collaborator = document.collaborators[key];
            collabs.push(collaborator);
          }
        }
        collabs.forEach(async (collabID) => {
          const user = await AuthService.getusersbyId(collabID);
          setCollaborators([...collaborators, user]);
        });
        setUsers(collabs);
        // setCollaborators(collabs);
      }
    };
    fetchCollaborators();

    // Load document from socket using the id in query params
    // useEffect(() => {
    /**
     * Loads the document from socket service using the document ID from URL params
     * This ensures real-time synchronization of document data
     */
    const loadDocumentFromSocket = async () => {
      if (!id) return;

      try {
        // Initialize socket connection for this document
        const socketService = new SocketService();

        // Request the document content from the server
        await socketService.getDoc({
          docId: id,
        });

        console.log("Document loaded via socket connection", id);
      } catch (error) {
        console.error("Error loading document from socket:", error);
      }
    };

    loadDocumentFromSocket();

    // Cleanup function to leave the document room when component unmounts
    // return () => {
    //   if (id && socketio) {
    //     socketio.emit("leave-doc", { docId: id });
    //   }
    // };
    // }, [id, socketio]);
  }, [id, socketio]);

  useEffect(() => {
    const getComments = async () => {
      const socketService = new SocketService();
      dispatch(setComments([]));
      await socketService.getComments({
        docId: singleDoc?._id,
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
      });
    });

    socketio.on("doc-updated", async (res) => {
      let response = JSON.parse(res);
      console.log("doc-updata", response.data);
      dispatch(setSingleDoc(response.data));
    });

    socketio.on("retrieved-comments-in-doc", async (res) => {
      let response = JSON.parse(res);
      console.log("retrieved-comments-in-doc", response);
      dispatch(setComments(response.data));
    });
  }, [socketio]);

  const handleClick = (id) => {
    setSelectedTab(id);
    if (id == 3) {
      setShowComments(false);
      setShowCall(true);
    }
    if (id == 4) {
      setShowComments(true);
      setShowCall(false);
    }
  };

  return (
    <div className="w-full h-full doc overflow-y-auto">
      <div className=" flex items-center  justify-between  border-b-[1px] border-b-gray-100 w-full px-5 py-3 docs">
        <div className="flex items-center">
          <EditableText initialText={singleDoc?.name} />
        </div>
        {/* <div>
        </div> */}
        <div className=" flex flex-row gap-x-3 items-center justify-end">
          <ImageList users={collaborators} stopImageCountAt={5} />
          {documentsBar?.map((item) => (
            <div
              key={item?.id}
              className={` ${
                selectedTab === item?.id
                  ? "flex items-center mr-5 bg-sirp-primaryLess2 p-1 rounded-lg cursor-pointer"
                  : "flex items-center mr-5 p-1 cursor-pointer rounded-lg"
              }`}
              onClick={() => handleClick(item?.id)}
            >
              <span className="mr-2">
                <Image
                  src={require(`../../../../public/icons/${item?.icon}`)}
                  alt=""
                />
              </span>
              <span>{item?.name}</span>
            </div>
          ))}
        </div>
      </div>
      <Docs showComments={showComments} setShowComments={setShowComments} />
      {showCall && <CallModal setShowCall={setShowCall} />}
    </div>
  );
};

export default viewDocument;

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
const backIcon = require("../../../../public/icons/back-arrow.svg");

/**
 * Document view component that handles real-time collaboration and document display
 * Handles both imported documents and existing documents from the list
 * @returns {JSX.Element} The document view component
 */
const viewDocument = () => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [showComments, setShowComments] = useState(true);
  const [showCall, setShowCall] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [users, setUsers] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { singleDoc } = useSelector((state: any) => state?.docs);
  const { comments } = useSelector((state: any) => state?.chats);
  const { userInfo } = useSelector((state: any) => state?.auth);

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

  /**
   * Initialize document state and socket connection
   * Handles both imported documents and documents from list
   */
  useEffect(() => {
    const initializeDocument = async () => {
      if (!id) return;
      setIsLoading(true);

      try {
        // Only clear comments on initial load
        dispatch(setComments([]));

        // Check if we need to fetch the document
        if (!singleDoc || singleDoc._id !== id) {
          const document = await DocumentService.getDoc(id);
          if (document) {
            dispatch(setSingleDoc(document));
          } else {
            toast.error("Document not found");
            router.push("/documents");
            return;
          }
        }

        // Initialize socket connection
        const socketService = new SocketService();
        await socketService.getDoc({ docId: id });
        await socketService.getComments({
          docId: id,
          spaceId: singleDoc?.spaceId,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing document:", error);
        toast.error("Failed to load document");
        setIsLoading(false);
      }
    };

    initializeDocument();

    // Cleanup function
    return () => {
      if (id && socketio) {
        socketio.emit("leave-doc", { docId: id });
      }
    };
  }, [id]);

  // Cleanup document state when leaving the page
  useEffect(() => {
    return () => {
      dispatch(setSingleDoc(null));
      dispatch(setComments([]));
    };
  }, []);

  /**
   * Handle collaborator loading and management
   */
  useEffect(() => {
    const loadCollaborators = async () => {
      if (!singleDoc?.collaborators) return;

      try {
        const collabs = [];
        if (Array.isArray(singleDoc.collaborators)) {
          const collaboratorPromises = singleDoc.collaborators.map(
            async (collab) => {
              const userId = collab.id || collab;
              const user = await AuthService.getusersbyId(userId);
              return user?.data;
            },
          );

          const loadedCollaborators = await Promise.all(collaboratorPromises);
          setCollaborators(loadedCollaborators.filter(Boolean));
        } else {
          // Handle object-style collaborators
          for (const key in singleDoc.collaborators) {
            if (
              Object.prototype.hasOwnProperty.call(singleDoc.collaborators, key)
            ) {
              const collaborator = singleDoc.collaborators[key];
              const user = await AuthService.getusersbyId(collaborator);
              if (user?.data) {
                collabs.push(user.data);
              }
            }
          }
          setCollaborators(collabs);
        }
      } catch (error) {
        console.error("Error loading collaborators:", error);
      }
    };

    loadCollaborators();
  }, [singleDoc?.collaborators]);

  /**
   * Socket event handlers for real-time updates
   */
  useEffect(() => {
    const handleReceiveComment = async (res) => {
      const socketService = new SocketService();
      await socketService.getComments({
        docId: res?.doc?.id || id,
        spaceId: singleDoc?.spaceId,
      });
    };

    const handleDocUpdate = (res) => {
      try {
        const response = JSON.parse(res);
        if (response?.data) {
          dispatch(setSingleDoc(response.data));
        }
      } catch (error) {
        console.error("Error handling doc update:", error);
      }
    };

    const handleRetrievedComments = (res) => {
      try {
        const response = JSON.parse(res);
        if (response?.data) {
          dispatch(setComments(response.data));
        }
      } catch (error) {
        console.error("Error handling comments:", error);
      }
    };

    // Socket event listeners
    socketio.on("receive-comment", handleReceiveComment);
    socketio.on("doc-updated", handleDocUpdate);
    socketio.on("retrieved-comments-in-doc", handleRetrievedComments);

    // Cleanup listeners on unmount
    return () => {
      socketio.off("receive-comment", handleReceiveComment);
      socketio.off("doc-updated", handleDocUpdate);
      socketio.off("retrieved-comments-in-doc", handleRetrievedComments);
    };
  }, [id, singleDoc?.spaceId]);

  const handleClick = (id) => {
    setSelectedTab(id);
    if (id === 3) {
      setShowComments(false);
      setShowCall(true);
    }
    if (id === 4) {
      setShowComments(true);
      setShowCall(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sirp-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full doc overflow-y-auto">
      <div className="flex items-center justify-between border-b-[1px] border-b-gray-100 w-full px-5 py-3 docs">
        <div className="flex items-center gap-x-4">
          <button
            onClick={() => router.push("/documents")}
            className="text-gray-600 hover:text-gray-800"
          >
            <Image src={backIcon} alt="back" width={24} height={24} />
          </button>
          <EditableText initialText={singleDoc?.name} />
        </div>
        <div className="flex flex-row gap-x-3 items-center justify-end">
          <ImageList users={collaborators} stopImageCountAt={5} />
          {documentsBar?.map((item) => (
            <div
              key={item?.id}
              className={`${
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

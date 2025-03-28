import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import socketio from "@/utils/socket";
import { useDispatch, useSelector } from "react-redux";
import SocketService from "../../../socket/chat.socket";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useCalculateTime } from "@/components/custom-hooks";
import chatReceived from "../../../../public/icons/chat.received.svg";
import chatRead from "../../../../public/icons/chat.read.svg";
import DownloadIcon from "@mui/icons-material/Download";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useRouter } from "next/router";
import Link from "next/link";
import ReactDOMServer from "react-dom/server";
import { toast } from "react-toastify";
import { Tooltip } from "@mui/material";
import { setSingleDoc } from "@/redux/reducers/documents/documentReducer";
import chatEmpty from "../../../../public/icons/chat.empty.svg";

function MessagesDisplay() {
  const { selectedChat, activeChat } = useSelector(
    (state: any) => state?.chats,
  );
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );
  const [senderData, setSenderData] = useState(null);

  useEffect(() => {
    // Update read status when messages are loaded
    if (selectedChat?.length > 0 && userInfo?.uuid) {
      const unreadMessages = selectedChat.filter((msg) => {
        if (msg) {
          return msg.message?.read === 0 && msg.sender !== userInfo.uuid;
        }
      });

      if (unreadMessages.length > 0) {
        const useSocket = new SocketService();
        useSocket.readMsg({ senderId: userInfo.uuid });
      }
    }
  }, [selectedChat, userInfo]);

  const scrollToBottom = () => {
    // Scroll to the bottom of the container
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  const createDoc = async (event, text, name) => {
    event.preventDefault();
    try {
      const useSocket = new SocketService();
      const docData = {
        name: name,
        data: {
          ops: [{ insert: text }],
        },
        author: {
          id: userInfo?.uuid,
          name: userInfo?.email,
        },
        spaceId: activeChat.uuid,
      };
      await useSocket.createDoc(docData);
      socketio.on("load-doc", (res) => {
        const data = JSON.parse(res);
        setId(data?.data?._id);
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
      });
    } catch (error) {
      console.error("Error creating document:", error);
      toast.error("Failed to create document");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const replaceURLsInText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
      return ReactDOMServer.renderToString(
        (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sirp-primary underline"
          >
            {url}
          </a>
        ) as any,
      );
    });
  };

  const documentView = (message) => {
    const textArr = message?.message?.text.split(",");
    return (
      <>
        <div
          className={`${
            message?.sender.id !== activeChat?.uuid
              ? "float-right mr-3 rounded-l-xl rounded-tr-3xl bg-[#E9F1F9] "
              : "float-left ml-3 rounded-r-xl rounded-tl-3xl bg-sirp-dashbordb1 "
          }
   text-sirp-grey font-light shadow p-3  md:p-3 text-[14px] max-w-[400px] w-auto  mt-[3rem]`}
        >
          <div className="flex gap-x-3">
            <div>
              <p className="text-[12.5px] font-semibold border-b mb-2 text-sirp-primary">
                {message?.sender?.name}
              </p>
              <p className="text-[12.5px] font-semibold">{textArr[0]}</p>
              <p className="text-[11px] tracking-wide">{textArr[1]} KB</p>
              <p className="">{textArr[2]}</p>
            </div>

            <div className="flex items-center justify-end  gap-x-3">
              {message?.message?.doc == 1 && (
                <Tooltip title="Edit File">
                  <BorderColorIcon
                    style={{
                      fontSize: "13px",
                      marginBottom: "0",
                      color: "#1293BA",
                      cursor: "pointer",
                    }}
                    onClick={(e) => createDoc(e, textArr[4], textArr[0])}
                  />
                </Tooltip>
              )}
              <Tooltip title="Download file">
                <a href={textArr[3]} download>
                  <DownloadIcon
                    style={{
                      fontSize: "15px",
                      position: "relative",
                      top: "1.5",
                      color: "#1293BA",
                      cursor: "pointer",
                    }}
                  />
                </a>
              </Tooltip>
            </div>
          </div>
        </div>
      </>
    );
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }

      const now = new Date();
      const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

      if (diffInHours < 24) {
        // Today - show time only
        return date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      } else if (diffInHours < 48) {
        // Yesterday
        return `Yesterday ${date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}`;
      } else {
        // Other dates
        return date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  return (
    <div
      className="relative h-[65vh] md:h-[56.8vh] overflow-y-auto"
      ref={messagesEndRef}
    >
      {selectedChat.length < 1 ||
        (!selectedChat.data && (
          <div className="grid gap-y-10 mt-[2rem] md:mt-[5rem]">
            <div className="mx-auto">
              <Image src={chatEmpty} alt="empty-chats" />
            </div>
            <div className="grid gap-y-5 text-center">
              <div className="md:w-[20%] w-[100%] mx-auto grid gap-y-2">
                <h3 className="text-[17px] font-semibold">Start chatting</h3>
              </div>
            </div>
          </div>
        ))}
      <ul className="md:pb-[3rem] pb-[7rem]">
        {selectedChat?.map((message) => {
          if (!message?.message?.text) return null;

          const isOwnMessage = message?.sender?.id !== activeChat?.uuid;
          const formattedDate = formatDate(
            message?.updatedAt || message?.createdAt,
          );

          return (
            <div key={message._id}>
              <li>
                {message?.message?.doc == 1 || message?.message?.img == 1 ? (
                  documentView(message)
                ) : (
                  <div
                    className={`${
                      isOwnMessage
                        ? "float-right mr-3 rounded-l-xl rounded-tr-3xl bg-[#E9F1F9]"
                        : "float-left ml-3 rounded-r-xl rounded-tl-3xl bg-sirp-dashbordb1"
                    } text-sirp-grey shadow p-3 text-[16px] font-normal max-w-[400px] w-auto mt-[3rem]`}
                  >
                    {activeChat.spaceName && (
                      <p className="text-[12.5px] font-semibold border-b mb-2 text-sirp-primary">
                        {message?.sender?.name}
                      </p>
                    )}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: replaceURLsInText(message?.message?.text),
                      }}
                    />
                  </div>
                )}
                <div className="clear-both table">
                  <div
                    className={`${
                      isOwnMessage ? "absolute right-2" : "absolute left-2"
                    } flex gap-x-2 p-2 items-center`}
                  >
                    <div className="text-[11px] font-light">
                      {formattedDate}
                    </div>
                    {isOwnMessage && (
                      <div>
                        {message?.message?.read === 0 ? (
                          <DoneIcon
                            style={{
                              color: "#4582C4",
                              fontWeight: "100",
                              fontSize: "18px",
                            }}
                          />
                        ) : (
                          <DoneAllIcon
                            style={{
                              color: "#4582C4",
                              fontWeight: "100",
                              fontSize: "18px",
                            }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default MessagesDisplay;

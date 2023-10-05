import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import socketio from "@/utils/socket";
import { useDispatch, useSelector } from "react-redux";
import SocketService from "../../../socket/chat.socket";
// import { setAllMessages } from "@/redux/reducers/chat/chatReducer";
import { MessageModel } from "../../../models/chat.model";
import { useCalculateTime } from "@/components/custom-hooks";
import chatReceived from "../../../../public/icons/chat.received.svg";
import chatRead from "../../../../public/icons/chat.read.svg";
import DownloadIcon from '@mui/icons-material/Download';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useRouter } from "next/router";
import Link from "next/link";
import { Tooltip } from "@mui/material";

function MessagesDisplay() {
  const { selectedChat, activeChat } = useSelector(
    (state: any) => state?.chats,
  );
  const router = useRouter()
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // Scroll to the bottom of the container
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const documentView = (message) => {
    const textArr = message?.message?.text.split(',')
    return <div
      className={`${message?.sender !== activeChat?.uuid
        ? "float-right mr-3 rounded-l-xl rounded-tr-3xl bg-[#E9F1F9] "
        : "float-left ml-3 rounded-r-xl rounded-tl-3xl bg-sirp-dashbordb1 "
        }
   text-sirp-grey font-light shadow p-3  md:p-3 text-[14px] max-w-[400px] w-auto  mt-[3rem]`}
    >
      <div className="flex gap-x-3">
        <div>
          <p className="text-[12.5px] font-semibold">{textArr[0]}</p>
          <p className="text-[11px] tracking-wide">{textArr[1]} KB</p>
          <p className="">{textArr[2]}</p>
        </div>

        <div className="flex items-end gap-x-3">
          {message?.message?.doc == 1 &&

            <Tooltip title="Edit File">
              <BorderColorIcon style={{ fontSize: "13px", marginBottom: "0", color: "#1293BA", cursor: "pointer" }} />
            </Tooltip>
          }
          <Tooltip title="Download file">
            <a href={textArr[3]} download>
              <DownloadIcon style={{ fontSize: "15px", position: "relative", top: "1.5", color: "#1293BA", cursor: "pointer" }} />
            </a>
          </Tooltip>

        </div>
      </div>
    </div>
  }

  return (
    <div
      className=" relative h-[65vh] md:h-[56.8vh] overflow-y-auto"
      ref={messagesEndRef}
    >
      <ul className="md:pb-[3rem] pb-[7rem]">
        {selectedChat?.map((message) => {
          return message?.message?.text ? (
            <li key={message._id}>
              {message?.message?.doc == 1 || message?.message?.img == 1 ?
                documentView(message)
                :
                <div
                  className={`${message?.sender !== activeChat?.uuid
                    ? "float-right mr-3 rounded-l-3xl rounded-tr-3xl bg-[#E9F1F9] "
                    : "float-left ml-3 rounded-r-3xl rounded-tl-3xl bg-sirp-dashbordb1 "
                    }
                 text-sirp-grey font-light shadow p-3  md:p-5 text-[14px] max-w-[400px] w-auto  mt-[3rem]`}
                >
                  <p>{message?.message?.text}</p>
                </div>
              }
              <div className="clear-both table">
                {/*  */}
                {/* <div
                  className={`${message?.sender !== activeChat?.uuid
                    ? "absolute right-2"
                    : "absolute left-2"
                    } flex gap-x-2 p-2`}
                >
                  <div className="text-[11px] font-light">
                    {useCalculateTime(message?.updatedAt)}{" "}
                  </div>
                  <Image
                    src={message?.message?.read === 0 ? chatReceived : chatRead}
                    alt="status"
                    height={17}
                    width={17}
                  />
                </div> */}
              </div>
            </li>
          ) : message.content_type === "audio" ? (
            <div
              key={message.id}
              className={`${message.action === "sent"
                ? "float-right mr-3 clear-both"
                : "float-left ml-3 clear-both"
                } text-sirp-grey font-light text-[14px] max-w-[400px] w-auto  mt-[1rem]`}
            >
              <audio src={message.content} controls></audio>
            </div>
          ) : (
            <div className="mt-[3rem]">New Message type?</div>
          );
        })}
      </ul>
    </div>
  );
}

export default MessagesDisplay;

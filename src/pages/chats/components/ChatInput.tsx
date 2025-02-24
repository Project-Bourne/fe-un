import React from "react";
import { AudioRecorderComponent, CustomEmoji } from "../../../components/ui";
import { Emoji, EmojiStyle } from "emoji-picker-react";
// import { SearchInput } from "@/components/ui/Input";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AttachmentPopups from "./AttachmentPopups";
import SocketService from "../../../socket/chat.socket";
import { useSelector, useDispatch } from "react-redux";
import socketio from "@/utils/socket";
import { anotherone } from "@/redux/reducers/chat/chatReducer";
import { toast } from "react-toastify";

function ChatInput(props) {
  const dispatch = useDispatch();
  const [isSending, setIsSending] = useState(false);

  //Socket emitter
  useEffect(() => {
    if (!socketio) return;

    socketio.on("msg-sent", () => {
      console.log("Message sent successfully");
    });

    return () => {
      socketio.off("msg-sent");
    };
  }, []);

  const { showUploadPopup, showAttachment, setShowAttachment, showAudioFile } =
    props;
  const [toggleEmoji, setToggleEmoji] = useState<boolean>(false);
  const [toggleAudio, setToggleAudio] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState(false);
  const [textValue, setTextValue] = useState("");

  const { userInfo } = useSelector((state: any) => state?.auth);
  const { activeChat } = useSelector((state: any) => state?.chats);

  const handleRecordedAudio = (data) => {
    showAudioFile(data);
  };

  const handleEmojiClick = (emoji) => {
    setTextValue((prevState) => prevState + emoji);
  };

  const formatMessageData = (text: string) => {
    return {
      data: text,
      doc: false,
      img: false,
      timestamp: new Date().toISOString(),
      sender: {
        id: userInfo?.uuid,
        name: userInfo?.email,
      },
    };
  };

  const handleSendMessage = async () => {
    if (!textValue.trim()) {
      toast.warning("Please enter a message");
      return;
    }

    if (!userInfo?.uuid || !activeChat?.uuid) {
      toast.error("Missing user or chat information");
      return;
    }

    try {
      setIsSending(true);
      console.log("Sending message:", {
        type: activeChat?.spaceName ? "workspace" : "direct",
        to: activeChat.uuid,
        content: textValue,
      });

      const messageData = formatMessageData(textValue);
      const socketService = new SocketService();

      if (activeChat?.spaceName) {
        await socketService.sendMessageSpace({
          ...messageData,
          spaceId: activeChat.uuid,
        });
      } else {
        await socketService.sendMessage({
          ...messageData,
          uuid: activeChat.uuid,
        });
      }

      dispatch(
        anotherone({
          message: {
            text: textValue,
            doc: 0,
            img: 0,
            read: 0,
            status: false,
          },
        }),
      );

      setTextValue("");
      setIsTyping(false);
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="absolute bg-white z-10 bottom-0 w-full py-3 border-t-[1px] border-t-[#F9F9F9]">
        <form
          className="flex relative justify-center w-[95%] mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <div className="md:w-[7%] rounded-l-full border-r-0  bg-[#F9FBFE] focus:border-[#F9FBFE] outline-none flex justify-center">
            <Image
              src={require("../../../../public/icons/chat.attachment.svg")}
              alt="attachment"
              width={35}
              height={35}
              style={{ width: "auto", height: "auto" }}
              className="py-2 px-2 hover:cursor-pointer"
              onClick={showUploadPopup}
              priority
            />
            <AttachmentPopups
              showAttachment={showAttachment}
              setShowAttachment={setShowAttachment}
            />
          </div>
          <div className="w-[68%] flex items-center h-15 border-0 ">
            <textarea
              className={`w-full h-full py-3.5 px-1 md:pr-3 font-light border-l-0 text-[13px] bg-[#F9FBFE] focus:border-[#F9FBFE] outline-none resize-none`}
              placeholder="Type message here"
              rows={1}
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value);
                setIsTyping(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isSending}
            />
          </div>
          <div className="flex justify-between gap-x-1 md:gap-x-2  md:w-[14%] bg-[#F9FBFE] rounded-r-full">
            <Image
              src={require("../../../../public/icons/chat.emoji.svg")}
              alt="emoji"
              width={25}
              height={25}
              style={{ width: "auto", height: "auto" }}
              onClick={() => setToggleEmoji((prevState) => !prevState)}
              className="px-[0.15rem] hover:cursor-pointer"
              priority
            />
            {/* <Image
              src={require("../../../../public/icons/chat.mic.svg")}
              alt="audio"
              width={25}
              height={25}
              className="px-[0.15rem] rounded-full hover:cursor-pointer"
              onClick={() => setToggleAudio((prevState) => !prevState)}
              priority
            /> */}
            <Image
              src={require("../../../../public/icons/chat.send.svg")}
              alt="send"
              width={50}
              height={50}
              style={{ width: "auto", height: "auto" }}
              className={`${
                !isTyping || isSending
                  ? "bg-[#B9C1C7] pointer-events-none"
                  : "bg-sirp-primary hover:cursor-pointer"
              } p-2 md:p-3 my-auto rounded-full h[40px] w-[40px] md:h-[50px] md:w-[50px]`}
              onClick={!isSending && isTyping ? handleSendMessage : undefined}
              priority
            />
          </div>
        </form>
      </div>

      {/* emoji selection popup    */}
      <CustomEmoji
        closeEmojiDisplay={() => setToggleEmoji(false)}
        selectedEmoji={handleEmojiClick}
        toggleEmoji={toggleEmoji}
      />
      {/* audio recorder popup  */}
      <AudioRecorderComponent
        toggleAudio={toggleAudio}
        setToggleAudio={setToggleAudio}
        handleRecordedAudio={handleRecordedAudio}
      />
    </>
  );
}

export default ChatInput;

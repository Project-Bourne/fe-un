import React from "react";
import { AudioRecorderComponent, CustomEmoji } from "../../../components/ui";
import { Emoji, EmojiStyle } from "emoji-picker-react";
// import { SearchInput } from "@/components/ui/Input";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AttachmentPopups from "./AttachmentPopups";
import SocketService from "../../../socket/chat.socket";
import { useSelector } from "react-redux";
import socketio from "@/utils/socket";

function ChatInput(props) {
  //Socket emitter
  useEffect(() => {
    socketio.on("msg-sent", () => {
      console.log("Message SENT");
    });
  }, [socketio]);

  const { showUploadPopup, showAttachment, setShowAttachment, showAudioFile } =
    props;
  const [toggleEmoji, setToggleEmoji] = useState<boolean>(false);
  const [toggleAudio, setToggleAudio] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState(false);
  const [textValue, setTextValue] = useState("");
  const { singleDoc } = useSelector((state: any) => state?.docs);
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );
  const handleRecordedAudio = (data) => {
    showAudioFile(data);
  };
  const { activeChat } = useSelector((state: any) => state.chats);
  const handleEmojiClick = (emoji) => {
    // Get the emoji from the emojiObject and concatenate with textarea text
    setTextValue((prevState) => prevState + emoji);
  };

  const handleSendMessage = async () => {
    try {
      console.log({ uuid: activeChat.uuid, data: textValue }, "text");
      const useSocket = SocketService;
      await useSocket.sendComment({
        spaceId: singleDoc.spaceId,
        data: textValue,
        docType: "text",
        doc: singleDoc._id,
      });
      setTextValue("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-white z-10 bottom-0 w-full py-3 border-t-[1px] border-t-[#F9F9F9]">
        <form className="flex relative justify-center w-[95%] mx-auto">
          <div className="md:w-[7%] rounded-l-full border-r-0  bg-[#F9FBFE] focus:border-[#F9FBFE] outline-none flex justify-center">
            <Image
              src={require("../../../../public/icons/chat.attachment.svg")}
              alt="attachment"
              width={35}
              height={35}
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
              className={`w-full h-full py-3.5 px-1 md:pr-3 font-light border-l-0 text-[13px] bg-[#F9FBFE] focus:border-[#F9FBFE] outline-none resize-none `}
              placeholder="Type message here"
              rows={1}
              value={textValue}
              onChange={(e) => {
                setTextValue(e.target.value);
                setIsTyping(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevents adding a new line (default behavior for Enter key)
                  handleSendMessage(); // Call your sendMessage function here
                }
              }}
            />
          </div>
          <div className="flex justify-between gap-x-1 md:gap-x-2  md:w-[14%] bg-[#F9FBFE] rounded-r-full">
            <Image
              src={require("../../../../public/icons/chat.emoji.svg")}
              alt="emoji"
              width={25}
              height={25}
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
              className={`${
                !isTyping ? "bg-[#B9C1C7]" : "bg-sirp-primary"
              } p-2 md:p-3 my-auto rounded-full h[40px] w-[40px] md:h-[50px] md:w-[50px] hover:cursor-pointer`}
              onClick={handleSendMessage}
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

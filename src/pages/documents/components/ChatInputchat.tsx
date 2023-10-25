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
        // spaceId: singleDoc.spaceId,
        data: textValue,
        docType: 0,
        doc: {
          id: singleDoc._id,
          name: singleDoc.name,
        },
      });
      setTextValue("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" absolute bottom-[210px] w-full items-center bg-white h-[80px] border-l">
      <form className="flex justify-center mt-5">
        {/* <div className="md:w-[7%] rounded-l-full border-r-0  bg-[#F9FBFE] focus:border-[#F9FBFE] outline-none flex justify-center"></div> */}
        <div className="w-[80%] flex items-center justify-center h-15 border-0 relative  rounded-l-full">
          <textarea
            className={`w-full h-full p-5 font-light text-[13px] bg-[#EEF4FB] focus:border-[#4070be] outline-none resize-none`}
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
        <div className="flex justify-between w-[20%] bg-[#EEF4FB] rounded-r-full">
          <Image
            src={require("../../../../public/icons/chat.emoji.svg")}
            alt="emoji"
            width={20}
            height={20}
            onClick={() => setToggleEmoji((prevState) => !prevState)}
            className="px-[0.15rem] hover:cursor-pointer"
            priority
          />
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
    </div>
  );
}

export default ChatInput;

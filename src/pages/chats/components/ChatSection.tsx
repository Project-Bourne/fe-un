import { useEffect, useState } from "react";
import {
  EmojiStyle,
//   SkinTones,
//   Theme,
//   Categories,
  EmojiClickData,
  Emoji,
//   SuggestionMode,
//   SkinTonePickerLocation
} from "emoji-picker-react";
import { Header } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { MessagesDisplay } from "./MessagesDisplay";


function ChatSection(props) {
    // const { messages  } = props;
    const [allMessages, setAllMessages] = useState<any>(props.messages)
    const [showAttachment, setShowAttachment ] =  useState(false);
    const [audioFile, setAudioFile] = useState('');

    useEffect(() => {
      if(audioFile){
        setAllMessages(audioFile);
      }
    }, [audioFile])

    // header component methods 
    const showVideoCallModal = () => {}
    const showAudioCallModal = () => {}

    // chat input component methods 
    const showChatEmoji= () => {}
    const showUploadPopup = () => { setShowAttachment(prevState => !prevState) }

    const showAudioFile = (data: Blob) => {
      let newMessage = {
        id: 0,
        time_sent: '12:09',
        date_sent: '15/07/2023',
        status: 'read',
        content: data,
        content_type: 'audio',
        action: 'sent'
      }
      let msgArr = allMessages;
      msgArr.push(newMessage);
      setAudioFile(msgArr);
    }


    // props 
    const headerProps = { showVideoCallModal, showAudioCallModal };
    const chatInputProps = { showUploadPopup, showAttachment,  };

    return (
        <>
            <Header {...headerProps} />
            <MessagesDisplay messages={allMessages} />
            <ChatInput 
              {...chatInputProps} 
              showAudioFile={showAudioFile}
              setShowAttachment = {() => setShowAttachment(false)}
              />
        </>
    )
}

export default ChatSection;
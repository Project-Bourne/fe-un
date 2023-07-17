import { SearchInput } from "@/components/ui/Input";
import Image from "next/image";
import { useState } from "react";

function ChatDisplay(props) {
    const { messages  } = props;
    const [ showAttachment, setShowAttachment ] =  useState(false);

    const status = 'online';
    const value = '';


    const showVideoCallModal = () => {}
    const showAudioCallModal = () => {}
    const showChatEmoji= () => {}
    const showUploadPopup = () => { setShowAttachment(prevState => !prevState) }

   const Header = () => { 
        return( 
            <div className="flex z-10 gap-x-1 md:gap-x-0 md:justify-between items-center md:px-7 px-3 py-[1.20rem] border-b-[1px] border-b-gray-100 shadow">
                {/* header bar  */}
                <div className="relative">
                    <div className={`absolute ml-9 mt-[0.07rem] z-10 h-[12px] w-[12px] rounded-full  ${status === 'online' ? 'bg-sirp-online' : 'bg-sirp-offline'}`}></div>
                    <div className={`rounded-full p-[2.5px] ${status === 'online' ? 'bg-gradient-to-r from-red-500 to-yellow-400 ' : 'bg-sirp-offline'}`}>
                        <Image
                            src={require('../../../assets/images/user1.jpg')}
                            alt={'user'}
                            className="rounded-full border-[4px] border-white h-[43px] w-[43px]" />
                    </div>
                </div>
                <div className="flex gap-x-3 md:gap-x-[5rem]">
                    <div className="flex gap-x-2">
                        {/* search input */}
                        <SearchInput />
                        {/* options dropdown  */}
                        <div className="h-[40px] w-[45px] md:w-[60px] rounded-full bg-sirp-lightGrey flex justify-center items-center hover:cursor-pointer">
                            <Image
                                src={require('../../../assets/icons/chat.collapse.svg')}
                                alt='collapse-btn'
                            />
                        </div>
                    </div>
                    <div className="flex gap-x-3">
                        <Image
                            src={require('../../../assets/icons/chat.camera.svg')}
                            className="hover:cursor-pointer"
                            alt='collapse-btn'
                            width={37}
                            height={37}
                            onClick={showVideoCallModal}
                        />
                        <Image
                            src={require('../../../assets/icons/chat.phone.svg')}
                            className="hover:cursor-pointer"
                            alt='collapse-btn'
                            width={37}
                            height={37}
                            onClick={showAudioCallModal}
                        />
                    </div>
                </div>
            </div>
        )
    }

    const ChatInput = () => { 
        return( 
            <div className="absolute bg-white z-10 bottom-0 w-full py-4 border-t-[1px] border-t-[#F9F9F9]">
                <div className="flex justify-center w-[95%] mx-auto">
                    <div
                        className="w-[7%] rounded-l-full border-r-0  bg-[#F9FBFE] focus:border-[#F9FBFE] outline-none flex justify-center">
                        <Image
                            src={require("../../../assets/icons/chat.attachment.svg")}
                            alt="attachment"
                            width={35}
                            height={35}
                            className='py-2 px-2 hover:cursor-pointer'
                            onClick={showUploadPopup}
                            priority
                        /> 
                        { showAttachment && 
                            <div className="grid gap-y-3 bg-transparent absolute -mt-[7rem]">
                                 <Image 
                                    src={require('../../../assets/icons/chat.image-upload.svg')}
                                    alt="upload-image"
                                    className="drop-shadow-lg hover:cursor-pointer"
                                    height={40}
                                    width={40}
                                />
                                <Image 
                                    src={require('../../../assets/icons/chat.doc-upload.svg')}
                                    alt="upload-doc"
                                    className="ml-1 drop-shadow-lg hover:cursor-pointer"
                                    height={34}
                                    width={34}
                                />
                            </div>
                        }
                    </div>
                    <textarea
                        className={`w-[68%] py-2 pl-1 pr-3 font-light border-l-0 items-center text-[14px] leading-7 bg-[#F9FBFE] focus:border-[#F9FBFE] outline-none resize-none `}
                        placeholder="Type message here"
                        // onChange={}
                        rows={1}
                    >{value}</textarea>
                    <div className="flex justify-between gap-x-2  md:w-[14%] bg-[#F9FBFE] rounded-r-full">
                        <Image
                            src={require("../../../assets/icons/chat.emoji.svg")}
                            alt="emoji"
                            width={25}
                            height={25}
                            className='px-[0.15rem] hover:cursor-pointer'
                            priority
                        /> 
                        <Image
                            src={require("../../../assets/icons/chat.mic.svg")}
                            alt="audio"
                            width={25}
                            height={25}
                            className='px-[0.15rem] rounded-full hover:cursor-pointer'
                            priority
                        /> 
                        <Image
                            src={require("../../../assets/icons/chat.send.svg")}
                            alt="send"
                            className='bg-[#B9C1C7] p-3 my-auto rounded-full h-[50px] w-[50px] hover:cursor-pointer'
                            priority
                        /> 
                    </div>
                </div>
            </div>
        )
    }

    const ChatMain = () => {
        return(
            <div className="bg-[#F9F9F9] relative h-[92.5vh] md:h-[55.7vh] overflow-y-auto">
                <ul className="md:pb-[3rem] pb-[7rem]">
                    {messages.map((message) => (
                        <li key={message.id}>
                            <div className={`${message.action === 'sent' ? 'float-right mr-3 rounded-l-3xl rounded-tr-3xl bg-[#E9F1F9] ' : 'float-left ml-3 rounded-r-3xl rounded-tl-3xl bg-sirp-dashbordb1 '} text-sirp-grey font-light shadow  p-5 text-[14px] max-w-[450px] w-auto  mt-[3rem]`}>
                                <p>{message.content}</p>
                            </div>
                            <div className="clear-both table">
                            {/*  */}
                                <div className={`${message.action === 'sent' ? 'absolute right-2' : 'absolute left-2'} flex gap-x-2 p-2`}>
                                    <div className="text-[11px] font-light">{message.time_sent}  </div>
                                    <Image 
                                        src={
                                        message.status === 'sent' ? require('../../../assets/icons/chat.sent.svg') :
                                        message.status === 'delivered' ? require('../../../assets/icons/chat.received.svg') :
                                        message.status === 'read' ? require('../../../assets/icons/chat.read.svg') :
                                        null
                                        } 
                                        alt='status'
                                        height={17}
                                        width={17}
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }


    return (
        <>
            <Header />
            <ChatMain />
            <ChatInput />
        </>
    )
}

export default ChatDisplay;
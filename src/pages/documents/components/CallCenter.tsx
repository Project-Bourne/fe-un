import React, { useState } from "react";
import Image from "next/image";
import CallGroup from './CallGroup';
import Caller from './Caller'
import InCallChats from './InCallChats'
import InCallParticipants from './InCallParticipants'
import ShareDetails from './ShareDetails'

const callType = [
  {
    id: 1,
    type: "Video",
    icon: "videochat.svg",
  },
  {
    id: 2,
    type: "EndCall",
    icon: "end-call.svg",
  },
  {
    id: 3,
    type: "Audio",
    icon: "audiochat.svg",
  },
  {
    id: 4,
    type: "Presentation",
    icon: "presention-chart.svg",
  },
];

function CallCenter({ setshowCallScreen }) {
  const [callId, setCallId] = useState(null);
  const [activeScreen, setActiveScreen] = useState(undefined);

  const handleCallType = (id) => {
    setCallId(id);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'inCallChats':
        return (
          <InCallChats setActiveScreen={setActiveScreen}/>
        )
      case 'inCallParticipants':
        return (
          <InCallParticipants setActiveScreen={setActiveScreen}/>
        )
      case 'shareDetails':
        return (
          <ShareDetails setActiveScreen={setActiveScreen}/>
        )
    }
  }


  const showParticipants = () => {
    setActiveScreen('inCallParticipants')
  }

  const showChats = () => {
    setActiveScreen('inCallChats')
  }

  const showShare = () => {
    setActiveScreen('shareDetails')
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-[#0C1927] relative">
      {/* video player of both thhe creator and the invited */}
      <div className="w-full h-full flex items-center justify-center relative">
        {/* invited guests */}
        <div className="">
          <CallGroup />
        </div>
        {/* call initiator */}
        <div>
          <Caller />
        </div>
        {activeScreen && <div className="bg-white rounded-[1rem] h-[80%] w-[30%] absolute right-[10px] bottom-[100px]">
          {renderScreen()}
        </div>}
      </div>
      <div className="fixed bottom-0 right-0 left-0 bg-[#021217] h-[100px]">
        <div className="w-full h-full grid grid-cols-3">
          <div></div>
          <div className="flex items-center justify-center">
            {callType.map((item, i) => (
              <span
                onClick={() => handleCallType(item.id)}
                className={`${item.id === callId
                  ? "bg-sirp-primary flex items-center justify-center cursor-pointer w-[70px] h-[70px] rounded-full border-white border-[.2rem] mr-5"
                  : "flex items-center justify-center w-[70px] h-[70px] cursor-pointer rounded-full border-white border-[.2rem] mr-5"
                  }`}
              >
                <Image
                  className="flex align-middle justify-center"
                  src={require(`../../../assets/icons/${item.icon}`)}
                  alt="upload image"
                  width={25}
                  height={25}
                  priority
                />
              </span>
            ))}
          </div>
          <div className="flex items-center justify-end gap-5 mr-5">
            <div className="flex items-center justify-center cursor-pointer" onClick={showParticipants}>
              <span className='mr-1'>
                <Image
                  src={require("../../../assets/icons/paticipant.svg")}
                  alt="userImage"
                  width={20}
                  height={20}
                  className='rounded-full object-fill'
                  priority
                />
              </span>
              <span className='text-white ml-2'>Participants</span>
            </div>
            <div className="flex items-center justify-center cursor-pointer" onClick={showChats}>
              <span className='mr-1'>
                <Image
                  src={require("../../../assets/icons/chat.svg")}
                  alt="userImage"
                  width={20}
                  height={20}
                  className='rounded-full object-fill'
                  priority
                />
              </span>
              <span className='text-white ml-2'>Chat</span>
            </div>
            <div className="flex items-center justify-center cursor-pointer" onClick={showShare}>
              <span className='mr-1'>
                <Image
                  src={require("../../../assets/icons/share.svg")}
                  alt="userImage"
                  width={20}
                  height={20}
                  className='rounded-full object-fill'
                  priority
                />
              </span>
              <span className='text-white ml-2'>Share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallCenter;

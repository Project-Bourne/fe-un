import React, { useState, useEffect } from "react";
import Image from "next/image";
import InviteUsers from "./InviteUsers";
import CallCenter from "./CallCenter";
import InvitedGuests from "./invitedGuests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const callType = [
    {
        id: 1,
        type: "Video",
        icon: "videochat.svg",
    },
    {
        id: 2,
        type: "Audio",
        icon: "audiochat.svg",
    },
    {
        id: 3,
        type: "Presentation",
        icon: "presention-chart.svg",
    },
];

const CallModal = ({ setShowCall }) => {
    const [callId, setCallId] = useState(null);
    const [activeScreen, setActiveScreen] = useState("callScreen");

    const handleCallType = (id) => {
        setCallId(id);
    };

    const handleCall = (id) => {
        if (!id) {
            toast("Choose a call type", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            setActiveScreen("invites");
        }
    };

    useEffect(() => {
        console.log(activeScreen); // This will log the updated value of activeScreen whenever it changes
    }, [activeScreen]);

    const handleInviting = () => {
        setActiveScreen("inviting");
        console.log("New activeScreen:", activeScreen);
    };

    const handleCancelRequests = () => {
        setActiveScreen("caller");
    };

    const CallScreen = () => {
        setActiveScreen("callScreen");
    };

    const renderScreen = () => {
        switch (activeScreen) {
            case "caller":
                return (
                    <div className="bg-cover bg-center relative rounded-[1rem] w-[800px] h-[500px] border-[8px] border-gray-300" style={{
                        backgroundImage: "url('/avatar.jpg')",
                        objectFit: "cover",
                    }}>
                        {/* ... Rest of the content for "caller" ... */}
                        <div
                            className="absolute top-0 right-5 text-[30px]"
                            onClick={() => setShowCall(false)}
                        >
                            <button> &times; </button>
                        </div>
                        <div className="bg-black absolute bottom-0 right-0 left-0 h-[150px] rounded-t-[1rem] rounde-b">
                            <div className="flex items-center justify-center h-full">
                                {callType.map((item, i) => (
                                    <span
                                        onClick={() => handleCallType(item.id)}
                                        className={`${item.id === callId
                                            ? "bg-sirp-primary flex items-center justify-center w-[70px] h-[70px] rounded-full border-white border-[.2rem] mr-5"
                                            : "flex items-center justify-center w-[70px] h-[70px] rounded-full border-white border-[.2rem] mr-5"
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
                        </div>
                    </div>
                );

            case "invites":
                return (
                    <div className="bg-white relative rounded-[1rem] w-[800px] h-[500px] border-[8px] border-gray-300">
                        {/* ... Rest of the content for "invites" ... */}
                        <div
                            className="absolute top-0 right-5 text-[30px]"
                            onClick={() => setShowCall(false)}
                        >
                            <button> &times; </button>
                        </div>
                        <div>
                            <InviteUsers />
                        </div>
                    </div>
                );

            case "inviting":
                return (
                    <div className="bg-white relative rounded-[1rem] w-[800px] h-[500px] border-[8px] border-gray-300">
                        <div className="absolute top-0 right-5 text-[30px]" onClick={() => setShowCall(false)}>
                            <button> &times; </button>
                        </div>
                        <div>
                            <InvitedGuests />
                        </div>
                    </div>
                );

            case "callScreen":
                return (
                    <CallCenter setshowCallScreen={setActiveScreen} />
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed z-[1020] flex items-center justify-center backdrop-blur-sm w-full h-[100vh] top-0 left-0 bottom-0 bg-[#747474]/[0.1] backdrop-brightness-50">
            <div className="grid">
                {renderScreen()}
                {/* Start Call or Send Call Request Button */}
                {!activeScreen.includes("inviting") && (
                    <div className="flex items-center justify-center mt-20 rounded-[1rem] w-[800px] cursor-pointer">
                        {activeScreen === "caller" && (
                            <div
                                className="bg-sirp-primary text-white font-bold w-[25%] p-2 hover:bg-[#6497CE] rounded-[1rem] flex items-center justify-center"
                                onClick={() => handleCall(callId)}
                            >
                                <div className="bg-[#6497CE] text-white font-bold w-[95%] p-3 rounded-[1rem] flex items-center justify-center">
                                    <span>
                                        <Image
                                            className="flex align-middle justify-center"
                                            src={require(`../../../assets/icons/start-call.svg`)}
                                            alt="upload image"
                                            width={25}
                                            height={25}
                                            priority
                                        />
                                    </span>
                                    <span className="ml-3 font-normal">Start Call</span>
                                </div>
                            </div>
                        )}
                        {activeScreen === "invites" && (
                            <div
                                className="bg-sirp-primary text-white font-bold w-[25%] p-2 hover:bg-[#6497CE] rounded-[1rem] flex items-center justify-center"
                                onClick={handleInviting}
                            >
                                <div className="bg-[#6497CE] text-white font-bold w-[95%] p-3 rounded-[1rem] flex items-center justify-center">
                                    <span>
                                        <Image
                                            className="flex align-middle justify-center"
                                            src={require(`../../../assets/icons/start-call.svg`)}
                                            alt="upload image"
                                            width={25}
                                            height={25}
                                            priority
                                        />
                                    </span>
                                    <span
                                        className="font-normal ml-3 w-full text-xs"
                                    >
                                        Send Call request
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeScreen === "inviting" && (
                    <div className="flex items-center justify-center mt-20 rounded-[1rem] w-[800px] cursor-pointer">
                        <div
                            className="text-[#6497CE] bg-white font-bold py-2 px-5 mr-3 rounded-[1rem] border border-[#6497CE] flex items-center justify-center"
                            onClick={handleCancelRequests}
                        >
                            Cancel Requests
                        </div>
                        <div
                            className="bg-sirp-primary text-white font-bold w-[25%] p-3 hover:bg-[#6497CE] rounded-[1rem] flex items-center justify-center"
                            onClick={CallScreen}
                        >
                            <div className="bg-[#6497CE] text-white font-bold w-[95%] p-2 rounded-[1rem] flex items-center justify-center">
                                <span>
                                    <Image
                                        className="flex align-middle justify-center"
                                        src={require(`../../../assets/icons/start-call.svg`)}
                                        alt="upload image"
                                        width={25}
                                        height={25}
                                        priority
                                    />
                                </span>
                                <span  className="font-normal ml-3 w-full text-xs">Sending request</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default CallModal;


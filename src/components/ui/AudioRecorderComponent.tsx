import Image from "next/image";
import { useEffect, useState } from "react";
import { Recorder } from "vmsg";
import BlinkingRedDot from "./BlinkingRedDot";

// const recorder = new Recorder({
//   wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm",
// });

const AudioRecorderComponent = ({
  toggleAudio,
  setToggleAudio,
  handleRecordedAudio,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Blob | string>("");

  const startRecording = async () => {
    // try {
    //   await recorder.initAudio();
    //   await recorder.initWorker();
    //   recorder.startRecording();
    //   setIsRecording(true);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // const stopRecording = async () => {
  // };

  const sendRecording = () => {
    // const blob = await recorder.stopRecording();
    // setRecording(URL.createObjectURL(blob));
    // console.log(blob);
    // setIsRecording(false);
  };

  // useEffect(() => {
  // if (!recording) {
  //   return;
  // }
  // handleRecordedAudio(recording);
  // setRecording(null);
  // setToggleAudio(false);
  // console.log(recording)

  // return () =>  {
  //   setRecording(null)
  // }
  // }, [recording])

  if (!toggleAudio) {
    return null;
  }

  return (
    <>
      <div className="absolute z-10 flex md:top-[35.4rem] right-8 md:w-[27%] gap-x-5 bg-white py-2 px-4 shadow-md rounded-full">
        {!isRecording ? (
          <>
            <button onClick={startRecording} className="w-[10%]">
              <Image
                src={require("../../assets/icons/chat.mic.svg")}
                alt="start"
                width={25}
              />
            </button>

            <div className="w-[70%] border-[1px] border-gray-400 h-[0.05rem] my-auto"></div>
          </>
        ) : (
          <div className="flex gap-x-3 w-[70%] items-center">
            <BlinkingRedDot />
            <p className="text-[13px] tracking-2">recording</p>
          </div>
        )}

        <div className="w-[20%] flex justify-between">
          {/* {isRecording && (
            <button onClick={stopRecording}>
              <Image
                src={require("../../assets/icons/audio.stop.svg")}
                alt="delete"
                width={13}
              />
            </button>
          )} */}
          <button
            onClick={sendRecording}
            className={`${!isRecording && "pointer-events-none"}`}
          >
            <Image
              src={require("../../assets/icons/audio.send.svg")}
              alt="send"
              width={20}
            />
          </button>
        </div>
      </div>
      <div id="audio"></div>
    </>
  );
};

export default AudioRecorderComponent;

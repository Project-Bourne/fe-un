import { useState, useEffect } from "react";
import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";

function useRecorderPermission(recordingType: RecordRTC.Options["type"]) {
  const [recorder, setRecorder] = useState<any>();
  useEffect(() => {
    getPermissionInitializeRecorder();
  }, []);
  const getPermissionInitializeRecorder = async () => {
    let stream = await (navigator as any).mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    let recorder = new RecordRTCPromisesHandler(stream, {
      type: recordingType,
    });
    setRecorder(recorder);
  };
  return recorder;
}

export default useRecorderPermission;

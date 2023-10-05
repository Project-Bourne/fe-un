import { useCallback, useEffect, useState } from "react";
import Quill from "quill"
import "quill/dist/quill.snow.css";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import socketio from "../../../utils/socket";
import SocketService from "../../../socket/chat.socket";

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["blockquote", "code-block"],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ align: [] }],
  [{ size: ["small", false, "large", "huge"] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function TextEditor() {
  const ReactQuill = dynamic(() => import("quill"), {
    ssr: false, // Ensure Quill is not imported on the server side
  });
  const useSocket = SocketService;
  const router = useRouter();
  const { id: documentId } = router.query;
  // const [socket, setSocket] = useState<Socket | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);


  // // connect to socket
  // useEffect(() => {
  //   const s = io("http://192.81.213.226:86/", {
  //     autoConnect: false,
  //     // path: "/86"
  //   });
  //   setSocket(s)
  //   return () => {
  //     s.disconnect()
  //   }
  // }, [])



  useEffect(() => {
    if (!socketio || !quill || !documentId) return
    socketio.once("load-doc", document => {
      quill.setContents(document)
      quill.enable()
    })
    SocketService.getDoc({ id: documentId })
    // socketio.emit("get-doc", { id: documentId })
  }, [socketio, quill, documentId])



  // save document changes at interval
  useEffect(() => {
    if (!socketio || !quill) return
    const interval = setInterval(() => {
      SocketService.saveDoc( quill.getContents())
      // socketio.emit("save-doc", quill.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socketio, quill])


  // react to the update events
  useEffect(() => {
    if (socketio == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    
    socketio.on("updated-doc-changes", handler)

    return () => {
      socketio.off("updated-doc-changes", handler)
    }
  }, [socketio, quill])


  // this is the update document functionality
  useEffect(() => {
    if (socketio == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      SocketService.updateChanges(delta)
      // socketio.emit("doc-update-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socketio, quill])


  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    // Ensure Quill is loaded only on the client side
    import("quill").then((Quill) => {
      const editor = document.createElement("div");
      wrapper.innerHTML = "";
      wrapper.append(editor);
      const q = new Quill.default(editor, {
        theme: "snow",
        modules: { toolbar: TOOLBAR_OPTIONS },
      })
      q.disable()
      q.setText("Loading...")
      setQuill(q)
    });
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
}

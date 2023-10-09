import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import socketio from "../../../utils/socket";
import SocketService from "../../../socket/chat.socket";
import { useDispatch, useSelector } from "react-redux";
import { setSingleDoc } from "@/redux/reducers/documents/documentReducer";
import { Console } from "console";

const SAVE_INTERVAL_MS = 500;
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
  const { singleDoc } = useSelector((state: any) => state?.docs);
  const useSocket = SocketService;
  const router = useRouter();
  const { id: documentId } = router.query;
  const [quill, setQuill] = useState<Quill | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!socketio || !quill || !documentId) return;
    console.log(singleDoc, "singleDoc");
    socketio.once("load-doc", (document) => {
      let data = JSON.parse(document);
      dispatch(setSingleDoc(data.data));
      console.log(data.data.data.ops[0].insert, "document", data.data);
      quill.setContents(data.data.data);
      quill.enable();
    });

    SocketService.getDoc({ id: documentId });
  }, [socketio, quill, documentId]);

  // save document changes at interval
  useEffect(() => {
    if (!socketio || !quill) return;
    const interval = setInterval(() => {
      SocketService.saveDoc(quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socketio, quill]);

  // react to the update events
  useEffect(() => {
    if (socketio == null || quill == null) return;

    const handler = (delta) => {
      console.log(delta, "delta");
      quill.updateContents(delta);
    };
    // console.log(handler(), 'handler')
    socketio.on("updated-doc-changes", handler);

    return () => {
      socketio.off("updated-doc-changes", handler);
    };
  }, [socketio, quill]);

  // this is the update document functionality
  useEffect(() => {
    if (socketio == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      SocketService.updateChanges(delta);
    };
    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [socketio, quill]);

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
      });
      q.disable();
      q.setText("Loading...");
      setQuill(q);
    });
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
}

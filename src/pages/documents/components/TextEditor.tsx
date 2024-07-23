import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import socketio from "../../../utils/socket";
import SocketService from "../../../socket/chat.socket";
import { useDispatch, useSelector } from "react-redux";
import {
  setSingleDoc,
  setPrintContent,
} from "@/redux/reducers/documents/documentReducer";
import PrintIcon from "@mui/icons-material/Print";
import ReactDOM from "react-dom";
import { Tooltip } from "@mui/material";
import { setComments } from "@/redux/reducers/chat/chatReducer";

export default function TextEditor() {
  const ReactQuill = dynamic(() => import("quill"), {
    ssr: false,
  });
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );
  useEffect(() => {
    dispatch(setComments(null));
    dispatch(setSingleDoc(null));
  }, []);
  const [cursorData, setCursorData] = useState({ index: 0, length: 0 });
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
      if (
        data &&
        data.data &&
        data.data.data &&
        data.data.data.ops &&
        data.data.data.ops.length > 0
      ) {
        dispatch(setSingleDoc(data.data));
        quill.setContents(data.data.data);
        quill.enable();
      } else {
        dispatch(setSingleDoc(data.data));
        quill.setContents(data.data.data);
        quill.enable();
      }
    });

    SocketService.getDoc({ id: documentId });
  }, [socketio, quill, documentId]);

  const SAVE_INTERVAL_MS = 3000;

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

  const handlePrint = () => {
    if (quill) {
      const editorContent = quill.root.innerHTML;
      const watermarkHTML = `
      <div class="watermark">DEEP SOUL</div>
    `;

      const printHTML = `
      <html>
      <head>
        <style>
          .watermark {
            position: fixed;
            top: 300;
            left: 300;
            width: 100%;
            height: 100%;
            text-align: center;
            transform: rotate(-45deg);
            font-size: 80px;
            opacity: 0.2; /* Adjust the opacity as needed */
            pointer-events: none; /* Allow clicks through the watermark */
          }
        </style>
      </head>
      <body>
        <div class="quill-editor-print">${editorContent}</div>
        ${watermarkHTML}
      </body>
      </html>
    `;

      const printWindow = window.open("", "_blank", "width=600,height=600");
      printWindow.document.open();
      printWindow.document.write(printHTML);
      printWindow.document.close();

      // Wait for the content to load, then trigger the print dialog
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  };

  useEffect(() => {
    if (quill) {
      const print = document.querySelector(".print-icon");
      if (print) {
        print.addEventListener("click", handlePrint);
      }
    }
  }, [quill]);

  // save document changes at interval
  useEffect(() => {
    if (!socketio || !quill) return;
    const interval = setInterval(() => {
      const content = quill.getContents();
      console.log(content, "contentcontent");
      SocketService.saveDoc(content);
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socketio, quill]);

  useEffect(() => {
    if (!socketio || !quill || !documentId) return;

    const updateCursor = () => {
      if (!documentId) return;
      if (quill) {
        const selection = quill.getSelection();
        console.log(selection, "selection");
        if (selection) {
          const { index, length } = selection;
          SocketService.updateCursor({
            user: { uuid: userInfo?.uuid, name: userInfo?.email },
            docId: documentId,
            cursorData: { index, length },
          });
          setCursorData({ index, length });
        }
      }
    };
    quill.on("selection-change", updateCursor);
    socketio.on("doc-cursor-update", (data) => {
      console.log(data, "cursor");
      renderCursor(
        data.user.id,
        data.user.name,
        data.cursorData.index,
        data.cursorData.length,
      );
    });
  }, [socketio, quill]);

  const renderCursor = (userId, username, index, length) => {
    console.log(userId, index, length, "renderCursor");
    const cursorContainer = document.querySelector(".container") as HTMLElement;
    cursorContainer.style.position = "relative";

    if (cursorContainer) {
      const existingCursor = cursorContainer.querySelector(`#cursor-${userId}`);
      if (existingCursor) {
        (existingCursor as HTMLElement).innerHTML = username;
        (existingCursor as HTMLElement).style.background = "#E8F8FD";
        (existingCursor as HTMLElement).style.padding = "2px 5px";
        (existingCursor as HTMLElement).style.borderRadius = "5px";
        (existingCursor as HTMLElement).style.position = "absolute";

        // Adjust the offsets for more accurate positioning
        const xOffset = 5; // Adjust this value as needed
        const yOffset = 90; // Adjust this value as needed

        (existingCursor as HTMLElement).style.left = `${
          quill.getBounds(index, length).left + xOffset
        }px`;
        (existingCursor as HTMLElement).style.top = `${
          quill.getBounds(index, length).top + yOffset
        }px`;
      } else {
        const cursor = document.createElement("span");
        cursor.id = `cursor-${userId}`;
        (cursor as HTMLElement).style.background = "#E8F8FD";
        (cursor as HTMLElement).innerHTML = username;
        (cursor as HTMLElement).style.padding = "2px 5px";
        (cursor as HTMLElement).style.borderRadius = "5px";
        (cursor as HTMLElement).style.position = "absolute";

        // Adjust the offsets for more accurate positioning
        const xOffset = 5; // Adjust this value as needed
        const yOffset = 90; // Adjust this value as needed

        (cursor as HTMLElement).style.left = `${
          quill.getBounds(index, length).left + xOffset
        }px`;
        (cursor as HTMLElement).style.top = `${
          quill.getBounds(index, length).top + yOffset
        }px`;
        cursorContainer.appendChild(cursor);
      }
    }
  };

  // const removeCursor = (userId) => {
  //   const cursorContainer = document.querySelector(
  //     ".cursor-container",
  //   ) as HTMLElement;
  //   const cursorToRemove = cursorContainer.querySelector(`#cursor-${userId}`);
  //   if (cursorToRemove) {
  //     cursorContainer.removeChild(cursorToRemove);
  //   }
  // };
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
      console.log(delta, "delta");
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
    import("quill").then((Quill) => {
      const editor = document.createElement("div");
      const print = document.createElement("div");
      print.setAttribute("class", "print-icon");
      const printIcon = (
        <Tooltip title="Preview and Print Document" className="">
          <PrintIcon style={{ fontSize: 30, color: "white" }} />
        </Tooltip>
      ); // Adjust the font size as needed

      // Append the Material-UI PrintIcon component to the print div
      ReactDOM.render(printIcon, print);

      wrapper.innerHTML = "";
      wrapper.appendChild(editor);
      wrapper.appendChild(print);
      const q = new Quill.default(editor, {
        theme: "snow",
        modules: {
          toolbar: TOOLBAR_OPTIONS,
        },
      });

      q.disable();
      setQuill(q);
    });
  }, []);

  return <div className="container relative" ref={wrapperRef}></div>;
}

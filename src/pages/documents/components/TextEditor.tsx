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
import { Tooltip, Button, CircularProgress } from "@mui/material";
import { setComments } from "@/redux/reducers/chat/chatReducer";
import { stripMarkdown } from "@/utils/stripMarkdown";
import RefreshIcon from "@mui/icons-material/Refresh";

/**
 * TextEditor Component
 * A collaborative rich text editor component with real-time synchronization capabilities
 * @component
 * @returns {JSX.Element} The rendered TextEditor component
 */
export default function TextEditor() {
  const ReactQuill = dynamic(() => import("quill"), {
    ssr: false,
  });
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth,
  );
  // useEffect(() => {
  //   dispatch(setComments(null));
  //   dispatch(setSingleDoc(null));
  // }, []);
  const [cursorData, setCursorData] = useState({ index: 0, length: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const { singleDoc } = useSelector((state: any) => state?.docs);
  const router = useRouter();
  const { id: documentId } = router.query;
  const [quill, setQuill] = useState<Quill | null>(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   socketService.getDoc({ id: documentId })
  // }, [])

  const socketService = new SocketService();

  /**
   * Handles manual fetching of document
   * @async
   * @function handleFetchDocument
   */
  const handleFetchDocument = async () => {
    if (!documentId || isLoading) return;

    setIsLoading(true);
    try {
      await socketService.getDoc({ id: documentId });
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!socketio || !quill || !documentId) return;
    console.log(singleDoc, "singleDoc");

    if (singleDoc) {
      quill.setContents(singleDoc.data);
      quill.enable();
    }

    const socket = new SocketService();

    // Actively fetch the document when quill is ready
    socketService.getDoc({ id: documentId });

    socketio.once("load-doc", async (document) => {
      let data = JSON.parse(document);

      console.log("TextEditor: ", data);

      if (
        data &&
        data.data &&
        data.data.data &&
        data.data.data.ops &&
        data.data.data.ops.length > 0
      ) {
        console.log("checking...");
        // console.log(quill.setContent(), quill)
        dispatch(setSingleDoc(data.data));
        const copiedData = JSON.parse(JSON.stringify(data));
        const insert = data.data.data.ops[0].insert;
        copiedData.data.data.ops[0].insert = stripMarkdown(insert);
        if (insert) {
          console.log(insert, "document", data.data);
          await quill.setContents(copiedData.data.data);
          quill.enable();
        }
      }
    });
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
      socketService.saveDoc(content);
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
          socketService.updateCursor({
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

    // const cursorContainer = document.querySelector(".container") as HTMLElement;
    // cursorContainer.style.position = "relative";

    // if (cursorContainer) {
    //   const existingCursor = cursorContainer.querySelector(`#cursor-${userId}`);
    //   if (existingCursor) {
    //     (existingCursor as HTMLElement).innerHTML = username;
    //     (existingCursor as HTMLElement).style.background = "#E8F8FD";
    //     (existingCursor as HTMLElement).style.padding = "2px 5px";
    //     (existingCursor as HTMLElement).style.borderRadius = "5px";
    //     (existingCursor as HTMLElement).style.position = "absolute";

    //     // Adjust the offsets for more accurate positioning
    //     const xOffset = 5; // Adjust this value as needed
    //     const yOffset = 90; // Adjust this value as needed

    //     (existingCursor as HTMLElement).style.left = `${
    //       quill.getBounds(index, length).left + xOffset
    //     }px`;
    //     (existingCursor as HTMLElement).style.top = `${
    //       quill.getBounds(index, length).top + yOffset
    //     }px`;
    //   } else {
    //     const cursor = document.createElement("span");
    //     cursor.id = `cursor-${userId}`;
    //     (cursor as HTMLElement).style.background = "#E8F8FD";
    //     (cursor as HTMLElement).innerHTML = username;
    //     (cursor as HTMLElement).style.padding = "2px 5px";
    //     (cursor as HTMLElement).style.borderRadius = "5px";
    //     (cursor as HTMLElement).style.position = "absolute";

    //     // Adjust the offsets for more accurate positioning
    //     const xOffset = 5; // Adjust this value as needed
    //     const yOffset = 90; // Adjust this value as needed

    //     (cursor as HTMLElement).style.left = `${
    //       quill.getBounds(index, length).left + xOffset
    //     }px`;
    //     (cursor as HTMLElement).style.top = `${
    //       quill.getBounds(index, length).top + yOffset
    //     }px`;
    //     cursorContainer.appendChild(cursor);
    //   }

    // Find the Quill editor container within the wrapper div
    const wrapperDiv = document.querySelector(
      ".container.relative",
    ) as HTMLElement;
    if (!wrapperDiv || !quill) return;

    // Find the Quill editor inside the wrapper
    const editorContainer = wrapperDiv.querySelector(
      ".ql-container",
    ) as HTMLElement;
    if (!editorContainer) return;

    // Generate a consistent color based on userId
    const getColorFromId = (id) => {
      // List of pleasant, accessible colors for cursors
      const colors = [
        "#3498db", // blue
        "#2ecc71", // green
        "#e74c3c", // red
        "#9b59b6", // purple
        "#f39c12", // orange
        "#1abc9c", // teal
        "#d35400", // dark orange
        "#8e44ad", // dark purple
      ];

      // Simple hash function to get consistent color for same user
      const hash = id.split("").reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);

      return colors[Math.abs(hash) % colors.length];
    };

    const userColor = getColorFromId(userId);

    // Look for existing cursor within the wrapper div
    const existingCursor = wrapperDiv.querySelector(
      `#cursor-${userId}`,
    ) as HTMLElement;

    // Get bounds from Quill for positioning
    const bounds = quill.getBounds(index, length);

    // Create cursor blink keyframes if they don't exist
    if (!document.getElementById("cursor-animations")) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "cursor-animations";
      styleSheet.textContent = `
            @keyframes cursorBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;
      document.head.appendChild(styleSheet);
    }

    if (existingCursor) {
      // Update existing cursor
      const cursorLine = existingCursor.querySelector(
        ".cursor-line",
      ) as HTMLElement;
      const cursorLabel = existingCursor.querySelector(
        ".cursor-label",
      ) as HTMLElement;

      // Update position
      existingCursor.style.left = `${bounds.left}px`;
      existingCursor.style.top = `${bounds.top + editorContainer.offsetTop}px`;
      existingCursor.style.height = `${bounds.height}px`;

      // Update label text
      if (cursorLabel) {
        cursorLabel.textContent = username;
      }

      // Reset animation if cursor line exists
      if (cursorLine) {
        cursorLine.style.animation = "none";
        setTimeout(() => {
          cursorLine.style.animation = "cursorBlink 1.5s infinite";
        }, 10);
      }
    } else {
      // Create new cursor elements
      const cursorElement = document.createElement("div");
      cursorElement.id = `cursor-${userId}`;

      // Create cursor line (the actual cursor)
      const cursorLine = document.createElement("div");
      cursorLine.className = "cursor-line";

      // Create label for username
      const cursorLabel = document.createElement("div");
      cursorLabel.className = "cursor-label";

      // Style the cursor container
      Object.assign(cursorElement.style, {
        position: "absolute",
        left: `${bounds.left}px`,
        top: `${bounds.top + editorContainer.offsetTop}px`,
        height: `${bounds.height}px`,
        zIndex: "1000",
        pointerEvents: "none",
        transition: "all 0.1s ease",
      });

      // Style the cursor line
      Object.assign(cursorLine.style, {
        position: "absolute",
        width: "2px",
        height: "100%",
        backgroundColor: userColor,
        animation: "cursorBlink 1.5s infinite",
      });

      // Style the label
      Object.assign(cursorLabel.style, {
        position: "absolute",
        top: "-22px",
        left: "0",
        padding: "2px 6px",
        borderRadius: "3px",
        fontSize: "12px",
        fontWeight: "500",
        color: "white",
        backgroundColor: userColor,
        whiteSpace: "nowrap",
        opacity: "0.9",
        transform: "translateX(-50%)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        transition: "opacity 0.2s ease",
      });

      // Set label text
      cursorLabel.textContent = username;

      // Add elements to DOM
      cursorElement.appendChild(cursorLine);
      cursorElement.appendChild(cursorLabel);
      wrapperDiv.appendChild(cursorElement);
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
      socketService.updateChanges(delta);
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
      ReactDOM.render(printIcon as any, print);

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

  return (
    <div className="container relative">
      {!singleDoc && documentId && (
        <div className="flex justify-center items-center p-4 bg-gray-100 rounded-md mb-4">
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchDocument}
            disabled={isLoading}
            startIcon={
              isLoading ? <CircularProgress size={20} /> : <RefreshIcon />
            }
            style={{
              textTransform: "none",
              backgroundColor: "#1976d2",
              color: "white",
              padding: "8px 16px",
            }}
          >
            {isLoading ? "Fetching Document..." : "Load Document"}
          </Button>
        </div>
      )}
      <div ref={wrapperRef}></div>
    </div>
  );
}

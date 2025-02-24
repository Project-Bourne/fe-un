/**
 * @file OneOnOneChat.tsx
 * @description A one-on-one chat component that loads previous messages and subscribes to new messages in real-time.
 */

import React, { useEffect, useState, useRef } from "react";
import socketInstance from "@/utils/socketInstance";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import socketio from "@/utils/socket";

/**
 * Interface representing a chat message.
 * @typedef {object} ChatMessage
 * @property {string} id - Unique identifier of the message.
 * @property {string} text - The content of the message.
 * @property {string} senderId - The sender's identifier.
 * @property {string} createdAt - Timestamp of when the message was created.
 */
interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  createdAt: string;
}

/**
 * OneOnOneChat component renders a real-time one-on-one chat interface.
 * It loads previous messages and subscribes to new ones through socket events.
 *
 * @returns {JSX.Element} The rendered one-on-one chat component.
 */
const OneOnOneChat: React.FC = (): JSX.Element => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { userInfo } = useSelector((state: any) => state.auth);
  const { selectedChat, activeChat } = useSelector((state: any) => state.chats);

  /**
   * Scrolls to the bottom of the chat window.
   */
  const scrollToBottom = (): void => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Formats the message data for sending
   * @param {string} messageText - The message text to be sent
   * @returns {Object} Formatted message object
   */
  const formatMessageData = (messageText: string) => {
    const timestamp = new Date().toISOString();
    return {
      uuid: activeChat?.uuid,
      data: messageText,
      doc: false,
      img: false,
      timestamp,
      sender: {
        id: userInfo?.uuid,
        name: userInfo?.email,
      },
    };
  };

  /**
   * Handles sending a new message.
   * Includes comprehensive error handling and logging.
   */
  const handleSend = async (
    event?: React.KeyboardEvent<HTMLInputElement>,
  ): Promise<void> => {
    // If triggered by keypress, only proceed if it's Enter
    if (event && event.key !== "Enter") return;

    if (!input.trim() || !userInfo?.uuid || !activeChat?.uuid) {
      if (!input.trim()) {
        toast.warning("Please enter a message");
      } else if (!userInfo?.uuid) {
        toast.error("User information not available");
      } else if (!activeChat?.uuid) {
        toast.error("Chat information not available");
      }
      return;
    }

    try {
      setIsSending(true);
      console.log("Sending message:", {
        type: activeChat?.spaceName ? "workspace" : "direct",
        to: activeChat.uuid,
        content: input,
      });

      const messageData = formatMessageData(input);

      if (activeChat?.spaceName) {
        // Send workspace message
        await socketInstance.sendMessageSpace({
          ...messageData,
          spaceId: activeChat.uuid,
        });
        console.log("Workspace message sent successfully");
      } else {
        // Send direct message
        await socketInstance.sendMessage(messageData);
        console.log("Direct message sent successfully");
      }

      setInput("");
      scrollToBottom();
    } catch (error: any) {
      console.error("Failed to send message:", error);
      toast.error(
        `Failed to send message: ${error.message || "Unknown error occurred"}`,
      );
    } finally {
      setIsSending(false);
    }
  };

  /**
   * Loads previous chat messages from the server.
   * Replace the dummy implementation with your actual API call to fetch chat history.
   * @returns {Promise<void>}
   */
  const loadMessages = async (): Promise<void> => {
    try {
      if (!userInfo?.uuid || !activeChat?.uuid) return;

      if (activeChat?.spaceName) {
        // Load workspace messages
        await socketInstance.getSelectedspace({
          spaceId: activeChat.uuid,
          uuid: userInfo.uuid,
          page: 0,
        });
      } else {
        // Load direct messages
        await socketInstance.getSelectedMsg({
          userId: userInfo.uuid,
          uuid: activeChat.uuid,
          page: 0,
        });
      }
    } catch (error: any) {
      toast.error(`Failed to load messages: ${error.message}`);
    }
  };

  // Load messages when chat selection changes
  useEffect(() => {
    if (activeChat?.uuid) {
      loadMessages();
      // Mark messages as read when opening chat
      if (userInfo?.uuid) {
        socketInstance.readMsg({ senderId: userInfo.uuid });
      }
    }
  }, [activeChat?.uuid]);

  useEffect(() => {
    if (!socketio) return;

    // Handle direct messages
    socketio.on("new-message", async (message) => {
      if (!userInfo?.uuid) return;

      if (message?.space) {
        await socketInstance.getSelectedspace({
          spaceId: message.space.uuid,
          uuid: message.sender.id,
        });
      } else {
        await socketInstance.getSelectedMsg({
          userId: userInfo.uuid,
          uuid: message.userId,
        });
      }
      scrollToBottom();
    });

    // Handle workspace messages
    socketio.on("msg-sent-space", async (res) => {
      if (activeChat?.spaceName && activeChat?.uuid === res?.space?.uuid) {
        await socketInstance.getSelectedspace({
          spaceId: res.space.uuid,
          uuid: userInfo?.uuid,
        });
      }
    });

    // Handle direct message sent confirmation
    socketio.on("msg-sent", async (res) => {
      if (!activeChat?.spaceName && activeChat?.uuid === res?.sender?.id) {
        await socketInstance.getSelectedMsg({
          userId: userInfo?.uuid,
          uuid: res.sender.id,
        });
      }
    });

    // Handle selected messages update
    socketio.on("all-msgs-selected", (res) => {
      try {
        const data = JSON.parse(res);
        if (data.data?.length > 0) {
          setMessages(data.data);
          scrollToBottom();
        }
      } catch (error) {
        console.error("Error parsing messages:", error);
      }
    });

    return () => {
      socketio.off("new-message");
      socketio.off("msg-sent-space");
      socketio.off("msg-sent");
      socketio.off("all-msgs-selected");
    };
  }, [socketio, activeChat, userInfo]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full p-4 bg-white shadow rounded">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 ${
              msg.senderId === userInfo?.uuid ? "text-right" : "text-left"
            }`}
          >
            <span className="inline-block p-2 rounded bg-gray-200">
              {msg.text}
            </span>
            <div className="text-xs text-gray-500">
              {new Date(msg.createdAt).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="flex items-center">
        <input
          type="text"
          className="flex-1 border rounded p-2 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => handleSend(e)}
          disabled={isSending}
        />
        <button
          className={`${
            isSending ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded px-4 py-2 transition-colors`}
          onClick={() => handleSend()}
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default OneOnOneChat;

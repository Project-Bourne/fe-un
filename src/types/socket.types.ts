/**
 * @file socket.types.ts
 * @description Type definitions for socket events and payloads
 */

import { Socket } from "socket.io-client";

/**
 * Socket connection status
 */
export enum SocketConnectionStatus {
  CONNECTED = "connected",
  DISCONNECTED = "disconnected",
  ERROR = "error",
}

/**
 * Socket event names
 */
export enum SocketEvents {
  UPDATE_DATA = "update-data",
  GET_RECENT_CHATS = "get-recent-chats",
  CREATE_SPACE = "create-space",
  JOIN_SPACE = "join-space",
  GET_MSGS_SELECTED = "get-msgs-selected",
  GET_MSGS_SELECTED_SPACE = "get-msgs-selected-space",
  NEW_MESSAGE = "new-message",
  READ_MESSAGE = "read-message",
  GET_DOC = "get-doc",
  GET_DOCS_BY_ID = "get-docs-by-id",
  SEND_MSG = "send-msg",
  SEND_COMMENT = "send-comment",
  SEND_MSG_SPACE = "send-msg-space",
  GET_ALL_SPACES_BY_ID = "get-all-spaces-by-id",
  READ_MSG = "read-msg",
  UPDATE_CURSOR = "update-cursor",
  UPDATE_DOC = "update-doc",
  DOC_UPDATE_CHANGES = "doc-update-changes",
  LEAVE_DOC = "leave-doc",
  SAVE_DOC = "save-doc",
}

/**
 * Base interface for all socket payloads
 */
export interface BaseSocketPayload {
  uuid?: string;
}

/**
 * Workspace related interfaces
 */
export interface WorkspacePayload extends BaseSocketPayload {
  space?: {
    id: string;
    name: string;
  };
  user?: {
    id: string;
    username: string;
    designation?: string;
  };
  inviter?: {
    id: string;
    name: string;
  };
}

/**
 * Message related interfaces
 */
export interface MessagePayload extends BaseSocketPayload {
  messageId?: string;
  content?: string;
  timestamp?: string;
  sender?: {
    id: string;
    name: string;
  };
  docType?: number;
  docId?: string;
  spaceId?: string;
}

/**
 * Document related interfaces
 */
export interface DocumentPayload extends BaseSocketPayload {
  docId?: string;
  name?: string;
  content?: string;
  author?: {
    id: string;
    name: string;
  };
}

/**
 * Cursor position interface
 */
export interface CursorPayload extends BaseSocketPayload {
  position: {
    x: number;
    y: number;
  };
  userId: string;
  documentId: string;
}

/**
 * Selected message criteria interface
 */
export interface SelectedMessageCriteria extends BaseSocketPayload {
  userId?: string;
  messageId?: string;
  spaceId?: string;
  limit?: number;
  offset?: number;
}

/**
 * Socket error interface
 */
export interface SocketError {
  code: string;
  message: string;
  details?: any;
}

/**
 * Socket instance interface extending Socket
 */
export interface ISocket extends Socket {
  connected: boolean;
  disconnected: boolean;
}

/**
 * Socket connection options
 */
export interface SocketConnectionOptions {
  autoConnect?: boolean;
  reconnection?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  timeout?: number;
  extraHeaders?: Record<string, string>;
}

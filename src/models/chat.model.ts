export interface ChatItemModel {
  chat: ItemModel;
  onClick?: any;
}

interface ItemModel {
  uuid: string;
  status?: string;
  userId: number | string;
  firstName?: string;
  lastName?: string;
  image?: string;
  messages?: any;
  newMessagesCount?: number;
}

export interface MessageModel {
  createdAt: string;
  message: {
    read: number;
    readBy: any[];
    text: string;
  };
  sender: string;
  space: { status: number };
  updatedAt: string;
  users: string[];
  __v: number;
  _id: string;
}

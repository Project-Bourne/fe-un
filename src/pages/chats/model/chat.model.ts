export default interface ChatItemModel {
  chat: ItemModel
  onClick?: () => void;
}

interface ItemModel {
  status?: string;
  uuid: number | string;
  firstName?: string;
  lastName?: string;
  img?: string;
  message?: {
    type: string;
    content: {} | string;
    count: number;
  };
}

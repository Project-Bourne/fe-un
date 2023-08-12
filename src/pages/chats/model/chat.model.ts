export default interface ChatItemModel {
  id: number;
  name: string;
  message: {
    type: string;
    content: {} | string;
    count: number;
  };
  status: string;
  onClick: () => void;
}

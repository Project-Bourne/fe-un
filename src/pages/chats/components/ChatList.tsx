import ChatItem from "./ChatItem";

function ChatList({ chatsData, handleClick, listMobileDisplay }) {
  return (
    <div
      className={`${listMobileDisplay} md:block  h-[100%] overflow-y-auto border-r-[1px] border-r-gray-100 transition duration-500 ease-in-out`}
    >
      {chatsData?.map((chat) => (
        <ChatItem {...chat} key={chat.id} onClick={handleClick} />
      ))}
    </div>
  );
}

export default ChatList;

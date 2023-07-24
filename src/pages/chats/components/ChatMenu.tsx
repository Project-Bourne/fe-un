import { useOnClickOutside } from "@/components/custom-hooks";
import { useRef } from "react";

function ChatMenu({ toggleMenu, closeMenu }) {
  const menuRef = useRef();
  useOnClickOutside(menuRef, closeMenu);

  if (!toggleMenu) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      className="absolute right-0 md:right-[8.5rem] top-[4rem] z-30 grid rounded-2xl py-[6px] bg-white shadow-md"
    >
      <button className="px-[30px] py-[7px] text-[14px] hover:bg-sirp-lightGrey">
        Clear messages
      </button>
      <button className="px-[30px] py-[7px] text-[14px] hover:bg-sirp-lightGrey">
        Share chats
      </button>
      <button className="px-[30px] py-[7px] text-[14px] hover:bg-sirp-lightGrey">
        Report user
      </button>
      <button className="px-[30px] py-[7px] text-[14px] hover:bg-sirp-lightGrey">
        Delete chat
      </button>
      <button className="px-[30px] py-[7px] text-[14px] hover:bg-sirp-lightGrey block md:hidden">
        Voice call
      </button>
      <button className="px-[30px] py-[7px] text-[14px] hover:bg-sirp-lightGrey  block md:hidden">
        Voice call
      </button>
    </div>
  );
}

export default ChatMenu;

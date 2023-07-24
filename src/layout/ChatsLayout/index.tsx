import { SearchInput } from "@/components/ui/Input";
import Image from "next/image";

type LayoutType = {
  children: React.ReactNode;
};

function ChatsLayout(props: LayoutType) {
  const { children } = props;
  return (
    <div className="grid w-full h-full">
      {/* header  */}
      <div className="flex gap-x-2 md:gap-x-0 md:justify-between md:px-7 px-3 pb-4 border-b-[1px] border-b-gray-100">
        <h1 className="text-[20px] md:text-[27px] font-semibold pt-3">Chats</h1>
        <div className="flex gap-2">
          {/* search input */}
          {/* <SearchInput /> */}
          {/* options dropdown  */}
          {/* <div className="h-[40px] w-[60px] rounded-full bg-sirp-lightGrey flex justify-center items-center hover:cursor-pointer">
                        <Image
                            src={require('../../assets/icons/chat.collapse.svg')}
                            alt='collapse-btn'
                        />
                    </div> */}
        </div>
      </div>

      {/* body  */}
      <div>{children} </div>
    </div>
  );
}

export default ChatsLayout;

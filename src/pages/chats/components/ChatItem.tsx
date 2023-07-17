import { useTruncate } from "@/components/custom-hooks";
import Image from "next/image";
import { useState } from "react";
import { ChatItemModel } from "../model/chat.model";


function ChatItem(props: ChatItemModel) {
    const { name, message, status, onClick } = props;

    return(
        <div onClick={onClick} className="flex justify-between px-3 py-4 bg-white shadow hover:cursor-pointer hover:bg-sirp-lightGrey">
            <div className="flex gap-x-3">
                <div className="relative">
                    <div className={`absolute ml-9 mt-[0.07rem] z-10 h-[12px] w-[12px] rounded-full  ${status === 'online' ? 'bg-sirp-online' : 'bg-sirp-offline'}`}></div>
                    <div className={`rounded-full p-[2.5px] ${status === 'online' ? 'bg-gradient-to-r from-red-500 to-yellow-400 ' : 'bg-sirp-offline'}`}>
                        <Image
                            src={require('../../../assets/images/user1.jpg')}
                            alt={'user'}
                            className="rounded-full border-[4px] border-white h-[43px] w-[43px]" />
                    </div>
                </div>
                <div className="grid">
                    <h4 className="mb-0">{ useTruncate(name, 22) }</h4>
                    <p className="text-[14px] font-light">{ message.type === 'string' ? useTruncate(message.content, 30) : message.content }</p>
                </div>
            </div>
            <div className="rounded-full bg-sirp-primary py-[3px] w-[25px] my-auto text-white text-center items-center text-[12px] font-semibold">{message.count}</div>
        </div>
    )
}

export default ChatItem;
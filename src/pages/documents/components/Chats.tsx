import React from 'react'
import Image from 'next/image'
import ChatCard from './ChatCard'


function Chats({ setShowChat }) {
    const closeChats = () => {
        setShowChat(false)
    }
    return (
        <div>
            <div className='w-full h-full'>
                <div className='w-full'>
                    <div className='flex justify-between border-b p-3'>
                        <span className='font-bold'>Chats</span>
                        <div className='cursor-pointer' onClick={closeChats}>
                            <Image
                                src={require("../../../assets/icons/x.svg")}
                                alt="userImage"
                                width={20}
                                height={20}
                                className='rounded-full object-fill'
                                priority
                            />
                        </div>
                    </div>
                    <div className='m-3 pb-20'>
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats
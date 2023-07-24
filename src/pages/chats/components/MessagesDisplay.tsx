import Image from "next/image";

export const MessagesDisplay = ({ messages }) => {
    
    return(
        <div className="bg-[#F9F9F9] relative h-[65vh] md:h-[56.8vh] overflow-y-auto">
            <ul className="md:pb-[3rem] pb-[7rem]">
                {messages.map((message) =>  {
                  return  message?.content_type === 'string' ?
                    (
                        <li key={message.id}>
                            <div className={`${message.action === 'sent' ? 'float-right mr-3 rounded-l-3xl rounded-tr-3xl bg-[#E9F1F9] ' : 'float-left ml-3 rounded-r-3xl rounded-tl-3xl bg-sirp-dashbordb1 '} text-sirp-grey font-light shadow p-3  md:p-5 text-[14px] max-w-[400px] w-auto  mt-[3rem]`}>
                                <p>{message.content}</p>
                            </div>
                            <div className="clear-both table">
                            {/*  */}
                                <div className={`${message.action === 'sent' ? 'absolute right-2' : 'absolute left-2'} flex gap-x-2 p-2`}>
                                    <div className="text-[11px] font-light">{message.time_sent}  </div>
                                    <Image 
                                        src={
                                            message.status === 'sent' ? require('../../../assets/icons/chat.sent.svg') :
                                            message.status === 'delivered' ? require('../../../assets/icons/chat.received.svg') :
                                            message.status === 'read' ? require('../../../assets/icons/chat.read.svg') : null
                                        } 
                                        alt='status'
                                        height={17}
                                        width={17}
                                    />
                                </div>
                            </div>
                        </li>
                        ) : message.content_type === 'audio' ?
                        (
                            <div key={message.id} className={`${message.action === 'sent' ? 'float-right mr-3 clear-both' : 'float-left ml-3 clear-both'} text-sirp-grey font-light text-[14px] max-w-[400px] w-auto  mt-[1rem]`}>
                                <audio src={message.content} controls ></audio>
                            </div>
                        ) : 
                        (
                            <div className="mt-[3rem]">New Message type?</div>
                        )

                    }
                    
                )}
            </ul>
        </div>
    )
}
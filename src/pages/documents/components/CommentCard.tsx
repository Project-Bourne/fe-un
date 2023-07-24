import React from 'react'
import Image from 'next/image'

function CommentCard() {
    return (
        <div className='bg-white my-3 shadow rounded-[10px] border-l-[5px] border-l-[#EEF4FB]'>
            {/* header */}
            <div className='flex border-b items-center p-2 justify-between'>
                <div className='text-sm flex flex-wrap'>
                    <span className='mr-1'>
                        <Image
                            src={require("../../../assets/images/user1.jpg")}
                            alt="userImage"
                            width={20}
                            height={20}
                            className='rounded-full object-fill'
                            priority
                        />
                    </span>

                    <span className='mr-1'>Musba’u Wasiu</span>
                    <span className='text-gray-400'>Jan 13</span>
                </div>
                <div>
                    <Image
                        src={require("../../../assets/images/user1.jpg")}
                        alt="userImage"
                        width={18}
                        height={18}
                        className='rounded-full object-fill'
                        priority
                    />
                </div>
            </div>
            {/* content */}
            <div className='flex items-center p-2 justify-start text-gray-400 text-sm'>
                I am leaving a comment here as a demo comment to demo on the collab work space for both the respondents and the senders
            </div>
        </div>
    )
}

export default CommentCard
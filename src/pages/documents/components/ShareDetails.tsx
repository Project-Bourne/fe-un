import React from 'react'
import Image from 'next/image'

function ShareDetails({setActiveScreen}) {
  return (
    <div>  <div className='flex items-center justify-between h-[20px] border-b p-7'>
      <span className='font-bold '>In-call Participants</span>
      <span>
        <Image
          src={require(`../../../assets/icons/x.svg`)}
          alt="upload image"
          width={18}
          height={18}
        />
      </span>
    </div>ShareDetails</div>
  )
}

export default ShareDetails
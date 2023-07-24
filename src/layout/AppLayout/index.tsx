import React from 'react'
import "./style.css"
import { Header, NavBar } from '@/components/layouts';

function AppLayout({children}) {

    return (
        <div className='bg-white w-full h-[100vh] z-30 relative flex flex-row overflow-y-scroll'>
            {/* Nav Bar Component */}
            <NavBar/>

            <div className='bg-white w-full md:w-[80vw] ml-[15vw] md:ml-[20vw] h-full'>
                {/* Layout header */}
                <Header/>

                {/* wrapper childer */}
                <div className='mt-[120px]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AppLayout; 
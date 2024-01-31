import React from 'react'

function MobileUnavailable() {
    return (
        <div className='p-2 w-screen h-screen bg-white flex justify-center items-center absolute top-0 z-[99990] md:hidden'>
            <p className='text-black font-medium uppercase'>Không hỗ trợ thiết bị di động</p>
        </div>
    )
}

export default MobileUnavailable
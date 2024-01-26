function Avatar() {
    return (
        <div className='w-10 h-10 rounded-full text-amber-500 font-extrabold flex items-center justify-center bg-slate-400 relative overflow-hidden'>
            <div className='absolute -bottom-3 w-6 aspect-square bg-slate-50 rounded-[1rem_1rem_0_0]'></div>
            <div className='absolute top-3 w-3 aspect-square bg-slate-50 rounded-full'></div>
        </div>
    )
}

export default Avatar
import { getFirstLetters } from '../utils'

function Avatar({ username }: { username: string }) {
    const letter = getFirstLetters(username)
    return (
        <div className='w-10 h-10 rounded-full text-amber-500 font-extrabold flex items-center justify-center' style={{ backgroundColor: "#ae2827" }}>
            {letter}
        </div>
    )
}

export default Avatar
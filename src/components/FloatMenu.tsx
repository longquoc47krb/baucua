import { useRef, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoIosStats } from 'react-icons/io';
import { IoVolumeHigh, IoVolumeMuteSharp } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdCube } from "react-icons/io";
function FloatMenu() {
    const [play, setPlay] = useState(false);
    const location = useLocation();
    const currentPathname = location?.pathname;
    const audioRef = useRef(null);
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("currentUser");
        // Reload the window
        window.location.reload();

        // Navigate to the specified path
        window.location.href = "/sign-in"
    }
    const playBackgroundMusic = () => {
        if (audioRef) {
            if (play) {
                // If music is currently playing, pause it
                audioRef?.current.pause();
            } else {
                // If music is currently paused, play it
                audioRef?.current.play();
            }

            // Toggle the play state
            setPlay(!play);
        }

    }
    return (
        <div className="absolute right-3 top-4 flex-col items-center z-50 h-[86%] justify-between flex">
            <audio ref={audioRef}>
                <source src="/audio/nhactet.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div className='flex flex-col items-center'>
                {currentPathname === "/" ? <button className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-200" onClick={() => navigate("/stats")}>
                    <IoIosStats className=" bg-red-700 rounded-xl p-2 w-10 h-10" />
                    <span className="text-red-700">Thống kê</span>
                </button> : <button className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-200" onClick={() => navigate("/")}>
                    <IoMdCube className=" text-red-700 bg-white rounded-xl p-2 w-10 h-10" />
                    <span className="text-white">Bầu Cua</span>
                </button>}
                <button className="flex flex-col items-center mt-2 cursor-pointer hover:scale-110 transition-transform duration-200" onClick={logout}>
                    <FaSignOutAlt className={`${currentPathname === "/" ? "bg-red-700 text-white" : "text-red-700 bg-white"}  rounded-xl p-2 w-10 h-10`} />
                    <span className={`${currentPathname === "/" ? "text-red-700" : "text-white"}`}>Đăng xuất</span>
                </button>
            </div>
            <button className="flex flex-col items-center mt-2 cursor-pointer hover:scale-110 transition-transform duration-200" onClick={playBackgroundMusic}>
                {play ? <IoVolumeHigh className={`${currentPathname === "/" ? "bg-red-700" : "bg-white text-red-700"}  rounded-xl p-2 w-10 h-10`} /> : <IoVolumeMuteSharp className={`${currentPathname === "/" ? "bg-red-700" : "bg-white text-red-700"}  rounded-xl p-2 w-10 h-10`} />}
                <span className={`${currentPathname === "/" ? "text-red-700" : " text-white"}`}>Nhạc nền</span>
            </button>
        </div>
    )
}

export default FloatMenu
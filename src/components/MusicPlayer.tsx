/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { backgroundSound } from '../common/sound';
import { MdSkipPrevious, MdSkipNext, MdPlayArrow, MdPause } from "react-icons/md";
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@uidotdev/usehooks';

const MusicPlayer = () => {
    const mobileDevice = useMediaQuery("only screen and (max-width : 768px)");
    const desktopDevice = useMediaQuery("only screen and (min-width: 1024px) and (max-width: 1439px)");
    const largeDesktopDevice = useMediaQuery("only screen and (min-width: 1440px)");
    // console.log({ mobileDevice, desktopDevice, largeDesktopDevice })
    const [isPlaying, setIsPlaying] = useState(false);
    const playlistRef = useRef<HTMLDivElement>(null)
    const [currentSongIndex, setCurrentSongIndex] = useState(Math.floor(Math.random() * backgroundSound.length));
    const audioRef = useRef(null);
    const location = useLocation()
    const pathname = location.pathname;
    const TOP_RIGHT = !mobileDevice && pathname === "/" || pathname === "/sign-in" || pathname === "/sign-up";
    const TOP_LEFT = largeDesktopDevice && pathname === "/" || pathname === "/sign-in" || pathname === "/sign-up";
    const handleMusicPlayerPosition = () => {
        if (TOP_RIGHT) {
            return "top-6 -right-2"
        }
        else {
            return "bottom-4 left-6"
        }
    }
    const handleSongEnd = () => {
        // Play the next song when the current song ends
        switchToNextSong()

    };
    const switchToPrevSong = () => {
        if (currentSongIndex === 0) {
            setCurrentSongIndex(backgroundSound.length - 1);
        } else {
            setCurrentSongIndex((prevIndex) => (prevIndex - 1) % backgroundSound.length);
        }
    }
    const switchToNextSong = () => {
        if (currentSongIndex === backgroundSound.length - 1) {
            setCurrentSongIndex(0);
        } else {
            setCurrentSongIndex((prevIndex) => (prevIndex + 1) % backgroundSound.length);
        }
    }
    const pauseCurrentSong = () => {
        audioRef.current.pause();
        setIsPlaying(false)
    }
    const playCurrentSong = () => {
        audioRef.current.play();
        setIsPlaying(true)
    }
    useEffect(() => {
        if (TOP_RIGHT) {
            playlistRef.current?.classList.add("slide-in-left")
        } else {
            playlistRef.current?.classList.add("slide-in-up")
        }
        const timeoutId = setTimeout(() => {
            if (TOP_RIGHT) {
                playlistRef.current?.classList.remove("slide-in-left")
            } else {
                playlistRef.current?.classList.remove("slide-in-up")
            }
        }, 1000); // 60000 milliseconds = 1 minute

        // Cleanup: Clear the timeout in case the component unmounts before the timeout
        return () => {
            clearTimeout(timeoutId);
        };
    }, [location])
    useEffect(() => {
        // Change the audio source when the current song index changes
        if (audioRef.current) {
            audioRef.current.src = backgroundSound[currentSongIndex].path;
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true)
        }

    }, [currentSongIndex]);
    const musicPlayerClass = classNames("absolute flex items-center gap-x-2 z-[9999] p-4 music-player", handleMusicPlayerPosition())
    return (
        <div className={musicPlayerClass} ref={playlistRef}>
            <audio ref={audioRef} onEnded={handleSongEnd}>
                Your browser does not support the audio tag.
            </audio>
            {/* <IoIosPlay className='inline-block text-red-700 mr-2 ml-0' /><span className="text-red-700 text-left">Đang phát</span> */}
            <img src={backgroundSound[currentSongIndex].thumbnail} className="w-16 aspect-square rounded-full rotate hover:scale-110 transition-all duration-200" />
            <div className="w-full">
                <div className="marquee-container w-full">
                    <p className="marquee text-[#eabd68] capitalize text-sm">{backgroundSound[currentSongIndex].title}</p></div>
                <div className='flex items-center gap-x-4 text-[#eabd68] relative'>
                    <MdSkipPrevious onClick={switchToPrevSong} className='hover:scale-105 duration-300 transition-transform cursor-pointer text-3xl' />
                    {!isPlaying ? <MdPlayArrow className='hover:scale-105 duration-300 transition-transform cursor-pointer text-4xl' onClick={playCurrentSong} /> : <MdPause className='hover:scale-105 duration-300 transition-transform cursor-pointer text-4xl' onClick={pauseCurrentSong} />}
                    <MdSkipNext onClick={switchToNextSong} className='hover:scale-105 duration-300 transition-transform cursor-pointer text-3xl' />
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;

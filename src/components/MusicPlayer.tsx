/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query';
import { useMediaQuery } from '@uidotdev/usehooks';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { MdPause, MdPlayArrow, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { getSong } from '../api/musicApi';
import { useAuthContext } from '../config/context/useAuthContext';

const MusicPlayer = ({ isSmallDevice, playlistData }: { isSmallDevice: boolean, playlistData: any }) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const { data: song } = useQuery({
        queryKey: ["song", currentSongIndex],
        queryFn: () => getSong(playlistData[currentSongIndex]?.id),
        enabled: true,
        retry: true,
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 32
    })
    const { currentUser } = useAuthContext()
    console.log({ id: currentUser })
    const [isPlaying, setIsPlaying] = useState(false);
    const playlistRef = useRef<HTMLDivElement>(null)
    const audioRef = useRef(null);
    const location = useLocation()
    const pathname = location.pathname;
    const TOP_RIGHT = !isSmallDevice && pathname === "/" || pathname === "/sign-in" || pathname === "/sign-up";
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
            setCurrentSongIndex(playlistData?.length - 1);
        } else {
            setCurrentSongIndex((prevIndex) => (prevIndex - 1) % playlistData?.length);
        }
    }
    const switchToNextSong = () => {
        if (currentSongIndex === playlistData?.length - 1) {
            setCurrentSongIndex(0);
        } else {
            setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlistData?.length);
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
    const handleAutoNextSong = () => {
        setTimeout(() => {
            if (!song && playlistData) {
                switchToNextSong()
            }
        }, 5000)

    }
    useEffect(() => {
        // Change the audio source when the current song index changes
        if (audioRef.current) {
            audioRef.current.src = song;
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true)
            handleAutoNextSong()
        }


    }, [currentSongIndex, song]);
    // Progress bar for audio track
    const musicPlayerClass = classNames("absolute flex items-center gap-x-2 z-[9999] p-4 music-player", handleMusicPlayerPosition())
    if (!playlistData) return null;
    if (isSmallDevice) {
        return <div className='absolute top-[24dvh] right-6 m-0 w-12 invisible'>
            <audio ref={audioRef} onEnded={handleSongEnd}>Your browser does not support the audio tag.
            </audio>
            <img src={playlistData[currentSongIndex]?.thumbnail ?? ""} className="w-12 aspect-square rounded-full rotate hover:scale-110 transition-all duration-200" />
            <div className="marquee-container">
                <p className="marquee  text-[#d50505] capitalize text-sm">{playlistData[currentSongIndex]?.title}</p>
            </div>
            <div className='flex items-center gap-x-2 text-[#d50505] relative'>
                <MdSkipPrevious onClick={switchToPrevSong} className='hover:scale-105 duration-300 transition-transform cursor-pointer text-sm' />
                {!isPlaying ? <MdPlayArrow className='hover:scale-105 duration-300 transition-transform cursor-pointer text-sm' onClick={playCurrentSong} /> : <MdPause className='hover:scale-105 duration-300 transition-transform cursor-pointer text-sm' onClick={pauseCurrentSong} />}
                <MdSkipNext onClick={switchToNextSong} className='hover:scale-105 duration-300 transition-transform cursor-pointer text-sm' />
            </div>
        </div>
    }
    return (
        <div className={musicPlayerClass} ref={playlistRef}>
            <audio ref={audioRef} onEnded={handleSongEnd}>Your browser does not support the audio tag.
            </audio>
            {/* <IoIosPlay className='inline-block text-red-700 mr-2 ml-0' /><span className="text-red-700 text-left">Đang phát</span> */}
            <img src={playlistData[currentSongIndex]?.thumbnail ?? ""} className="w-16 aspect-square rounded-full rotate hover:scale-110 transition-all duration-200" />
            <div className="w-full">
                <div className="marquee-container w-full">
                    <p className="marquee text-[#eabd68] capitalize text-sm">{playlistData[currentSongIndex]?.title}</p></div>
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

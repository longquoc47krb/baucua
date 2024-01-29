/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../common/interface";
import { correctPaths, incorrectPaths, playRandomSound } from "../common/sound";
import BettingTable from "../components/BettingTable";
import FloatMenu from "../components/FloatMenu";
import RollDice from "../components/RollDice";
import UserBalance from "../components/UserBalance";
import { bettedSelector, calculateTotalBetMoney, compareAndCalculateDiffAmount, diffAmountCalculateCompletedSelector, diffAmountSelector, endGameSelector, gameHistorySelector, openSelector, resetAll, resultMsgSelector, rolledSelector, totalAmountReceivedSelector } from '../redux/reducers/game';
import { updateCoinAfterRoll } from "../redux/reducers/player";
import { saveGameHistoryToDB, updateUserInLocalStorage } from "../utils";
function GameScreen() {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const dispatch = useDispatch()
    const soundEffectRef = useRef<HTMLAudioElement | null>(null);
    const betted = useSelector(bettedSelector);
    const rolled = useSelector(rolledSelector);
    const open = useSelector(openSelector);
    const diffAmount = useSelector(diffAmountSelector);
    const totalAmountReceived = useSelector(totalAmountReceivedSelector);
    const diffAmountCalculateCompleted = useSelector(diffAmountCalculateCompletedSelector);
    const endGame = useSelector(endGameSelector);
    const result = useSelector(resultMsgSelector)
    const gameHistory = useSelector(gameHistorySelector)
    const user = useSelector((state: IState) => state?.player.user)
    const bowlRef = useRef<HTMLImageElement>(null);
    const [isLoading, setIsLoading] = useState(0);

    useEffect(() => {
        if (betted && rolled && open) {
            dispatch(compareAndCalculateDiffAmount());
            dispatch(calculateTotalBetMoney())
        }
    }, [betted, rolled, open]);
    useEffect(() => {
        if (betted && rolled && open && diffAmountCalculateCompleted && endGame) {
            dispatch(updateCoinAfterRoll({ diffAmount: totalAmountReceived }));
            if (diffAmount < 0) {
                playRandomSound(soundEffectRef, incorrectPaths)
            } else {
                playRandomSound(soundEffectRef, correctPaths)
            }
        }
    }, [diffAmountCalculateCompleted, endGame]);
    // Update user in localStorage
    useEffect(() => {
        if (betted && rolled && open && diffAmount && diffAmountCalculateCompleted) {
            localStorage.setItem('currentUser', JSON.stringify(user))
            updateUserInLocalStorage(user.username, user)
        }
    }, [user]);
    // Return result through toast
    useEffect(() => {
        if (betted && rolled && open && endGame && diffAmountCalculateCompleted) {
            if (diffAmount > 0) {
                toast.success(<p dangerouslySetInnerHTML={{ __html: result }}></p>, {
                    style: {
                        border: '1px solid #eabd68',
                        padding: '16px',
                        color: 'black',
                        background: '#faefdb'
                    },
                    iconTheme: {
                        primary: '#65a30d',
                        secondary: '#FFFAEE',
                    },
                    duration: 5000
                });
            } else if (diffAmount < 0) {
                toast.error(<p dangerouslySetInnerHTML={{ __html: result }}></p>, {
                    style: {
                        border: '1px solid #eabd68',
                        padding: '16px',
                        color: 'black',
                        background: '#faefdb'
                    },
                    iconTheme: {
                        primary: '#d93029',
                        secondary: '#FFFAEE',
                    },
                    duration: 5000
                });
            } else if (diffAmount === 0) {
                toast.success(<p dangerouslySetInnerHTML={{ __html: result }}></p>, {
                    style: {
                        border: '1px solid #eabd68',
                        padding: '16px',
                        color: 'black',
                        background: '#faefdb'
                    },
                    iconTheme: {
                        primary: '#65a30d',
                        secondary: '#FFFAEE',
                    },
                    icon: '🤝🏻',
                    duration: 5000
                });
            }

        }

    }, [endGame, diffAmount, diffAmountCalculateCompleted])
    const newGame = () => {
        if (open) {
            bowlRef?.current?.classList.remove("open");
            bowlRef?.current?.classList.add("close");
        }
        if (endGame && betted) {
            saveGameHistoryToDB(diffAmount, user.username, gameHistory, dispatch);
        }
        dispatch(resetAll())
    }
    if (isSmallDevice) {
        return (
            <div>
                <audio ref={soundEffectRef} className="hidden" />
                <Toaster position="bottom-center"
                    reverseOrder={true} />
                <UserBalance />
                {/* <GiHamburgerMenu className="text-red-700 text-2xl absolute top-4 right-10 z-10" onClick={() => setOpenDrawer(!openDrawer)} /> */}
                <div className='game-screen'
                    style={{
                        backgroundImage: `url('/images/background.jpg')`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <FloatMenu newGame={newGame} />
                    <RollDice newGame={newGame} ref={bowlRef} />
                    <BettingTable />
                </div>
            </div>
        )
    }
    // const client_email = import.meta.env.VITE_CLIENT_EMAIL;
    // const private_key = import.meta.env.VITE_PRIVATE_KEY;
    // const sheet_id = import.meta.env.VITE_SHEET_ID;
    return (
        <div>
            <audio ref={soundEffectRef} className="hidden" />
            <Toaster position="bottom-center"
                reverseOrder={true} />
            <div className='p-2 h-screen relative game-screen'
                style={{
                    backgroundImage: `url('/images/background.jpg')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <UserBalance />
                <FloatMenu newGame={newGame} />
                <div className="flex items-center justify-between mt-2">
                    <BettingTable />
                    <RollDice newGame={newGame} ref={bowlRef} />
                </div>
            </div>
        </div>
    )
}

export default GameScreen
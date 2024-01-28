/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../common/interface";
import { correctPaths, incorrectPaths, playRandomSound } from "../common/sound";
import BettingTable from "../components/BettingTable";
import FloatMenu from "../components/FloatMenu";
import RollDice from "../components/RollDice";
import UserBalance from "../components/UserBalance";
import { bettedSelector, calculateTotalBetMoney, compareAndCalculateDiffAmount, diffAmountCalculateCompletedSelector, diffAmountSelector, endGameSelector, gameHistorySelector, openSelector, resetAll, resultMsgSelector, rolledSelector, saveGameHistory, totalAmountReceivedSelector } from '../redux/reducers/game';
import { updateCoinAfterRoll } from "../redux/reducers/player";
import { updateUserInLocalStorage } from "../utils";
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
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log({ vh })
    // Compare and calculate result and return diffAmount for user
    useEffect(() => {
        if (betted && rolled && open) {
            dispatch(compareAndCalculateDiffAmount());
            dispatch(calculateTotalBetMoney())
        }
    }, [betted, rolled, open]);
    useEffect(() => {
        if (betted && rolled && open && diffAmount && diffAmountCalculateCompleted && endGame) {
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
                    icon: '🤝🏻'
                });
            }

        }

    }, [endGame, diffAmount, diffAmountCalculateCompleted])
    const saveGameHistoryFunc = () => {
        const stats = {
            moneyEarned: diffAmount > 0 ? diffAmount : 0,
            moneyLost: diffAmount < 0 ? diffAmount : 0,
            status: diffAmount > 0 ? "won" : (diffAmount < 0 ? "loss" : "draw"),
            username: user.username
        };
        // Add the new history to the list
        const updatedStats = [...gameHistory, stats];
        // Update localStorage with the updated user list
        dispatch(saveGameHistory(updatedStats))
    };
    const newGame = () => {

        endGame && saveGameHistoryFunc()
        if (open) {
            bowlRef?.current?.classList.remove("open");
            bowlRef?.current?.classList.add("close");
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
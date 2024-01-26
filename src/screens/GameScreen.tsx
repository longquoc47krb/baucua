/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { correctPaths, incorrectPaths, playRandomSound } from "../common/sound";
import BettingTable from "../components/BettingTable";
import FloatMenu from "../components/FloatMenu";
import RollDice from "../components/RollDice";
import UserBalance from "../components/UserBalance";
import { bettedSelector, bonusCalculateCompletedSelector, bonusSelector, calculateTotalBetMoney, compareAndCalculateBonus, endGameSelector, gameHistorySelector, openSelector, resetAll, resultMsgSelector, rolledSelector, saveGameHistory, totalAmountReceivedSelector } from '../redux/reducers/game';
import { updateCoinAfterRoll } from "../redux/reducers/player";
import { updateUserInLocalStorage } from "../utils";
import { IState } from "../common/interface";
function GameScreen() {
    const dispatch = useDispatch()
    const soundEffectRef = useRef<HTMLAudioElement | null>(null);
    const betted = useSelector(bettedSelector);
    const rolled = useSelector(rolledSelector);
    const open = useSelector(openSelector);
    const bonus = useSelector(bonusSelector);
    const totalAmountReceived = useSelector(totalAmountReceivedSelector);
    const bonusCalculateCompleted = useSelector(bonusCalculateCompletedSelector);
    const endGame = useSelector(endGameSelector);
    const result = useSelector(resultMsgSelector)
    const gameHistory = useSelector(gameHistorySelector)
    const user = useSelector((state: IState) => state?.player.user)
    const bowlRef = useRef<HTMLImageElement>(null);
    // Compare and calculate result and return bonus for user
    useEffect(() => {
        if (betted && rolled && open) {
            dispatch(compareAndCalculateBonus());
            dispatch(calculateTotalBetMoney())
        }
    }, [betted, rolled, open]);
    useEffect(() => {
        if (betted && rolled && open && bonus && bonusCalculateCompleted && endGame) {
            dispatch(updateCoinAfterRoll({ bonus: totalAmountReceived }));
            if (bonus < 0) {
                playRandomSound(soundEffectRef, incorrectPaths)
            } else {
                playRandomSound(soundEffectRef, correctPaths)
            }
        }
    }, [bonusCalculateCompleted, endGame]);
    // Update user in localStorage
    useEffect(() => {
        if (betted && rolled && open && bonus && bonusCalculateCompleted) {
            localStorage.setItem('currentUser', JSON.stringify(user))
            updateUserInLocalStorage(user.username, user)
        }
    }, [user]);
    // Return result through toast
    useEffect(() => {
        if (betted && rolled && open && endGame && bonusCalculateCompleted) {
            if (bonus > 0) {
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
            } else if (bonus < 0) {
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
            } else if (bonus === 0) {
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

    }, [endGame, bonus, bonusCalculateCompleted])
    const saveGameHistoryFunc = () => {
        const stats = {
            moneyEarned: bonus > 0 ? bonus : 0,
            moneyLost: bonus < 0 ? bonus : 0,
            status: bonus > 0 ? "won" : (bonus < 0 ? "loss" : "draw"),
            username: user.username
        };
        // Add the new history to the list
        const updatedStats = [...gameHistory, stats];
        // Update localStorage with the updated user list
        dispatch(saveGameHistory(updatedStats))
    };
    const newGame = () => {

        saveGameHistoryFunc()
        if (open) {
            bowlRef?.current?.classList.remove("open");
            bowlRef?.current?.classList.add("close");
        }
        dispatch(resetAll())
    }
    return (
        <div>
            <audio ref={soundEffectRef} className="hidden" />
            <Toaster position="bottom-center"
                reverseOrder={true} />
            <UserBalance />
            <div className='flex justify-center items-start pt-20 p-2 h-screen relative'
                style={{
                    backgroundImage: `url('/images/background.jpg')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <FloatMenu newGame={newGame} />
                <BettingTable />
                <RollDice newGame={newGame} ref={bowlRef} />
            </div>
        </div>
    )
}

export default GameScreen
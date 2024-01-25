/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { correctPaths, incorrectPaths, playRandomSound } from "../common/sound";
import BettingTable from "../components/BettingTable";
import FloatMenu from "../components/FloatMenu";
import RollDice from "../components/RollDice";
import { bettedSelector, bonusCalculateCompletedSelector, bonusSelector, calculateTotalBetMoney, compareAndCalculateBonus, endGameSelector, openSelector, resultSelector, rolledSelector, totalAmountReceivedSelector } from '../redux/reducers/game';
import { updateCoinAfterRoll } from "../redux/reducers/player";
import { updateUserInLocalStorage } from "../utils";
import UserBalance from "../components/UserBalance";
function GameScreen() {
    const dispatch = useDispatch()
    const incorrectRef = useRef<HTMLAudioElement | null>(null);
    const betted = useSelector(bettedSelector);
    const rolled = useSelector(rolledSelector);
    const open = useSelector(openSelector);
    const bonus = useSelector(bonusSelector);
    const totalAmountReceived = useSelector(totalAmountReceivedSelector);
    const bonusCalculateCompleted = useSelector(bonusCalculateCompletedSelector);
    const endGame = useSelector(endGameSelector);
    const result = useSelector(resultSelector)
    const user = useSelector(state => state?.player.user)
    // Compare and calculate result and return bonus for user
    useEffect(() => {
        if (betted && rolled && open) {
            dispatch(compareAndCalculateBonus());
            dispatch(calculateTotalBetMoney());
        }
    }, [betted, rolled, open]);
    useEffect(() => {
        if (betted && rolled && open && bonus && bonusCalculateCompleted) {
            dispatch(updateCoinAfterRoll({ bonus: totalAmountReceived }));
            if (bonus < 0) {
                playRandomSound(incorrectRef, incorrectPaths)
            } else {
                playRandomSound(incorrectRef, correctPaths)
            }
        }
    }, [bonusCalculateCompleted]);
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
    return (
        <div>
            <audio ref={incorrectRef} className="hidden" />
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
                <FloatMenu />
                <BettingTable />
                <RollDice />
                U</div>
        </div>
    )
}

export default GameScreen
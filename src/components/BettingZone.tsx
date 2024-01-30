/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useAuthContext } from '../config/context/useAuthContext';
import { calculateTotalBetMoney, decreaseBetMoneyCoin, endGameSelector, increaseBetMoneyCoin, rolledSelector, setBetted, totalBetMoneySelector, updateSpecificBetMoneyCoin } from '../redux/reducers/game';
import { addCoins, coinSelector, subtractCoins } from '../redux/reducers/player';
import { convertLargeNumberFormat } from '../utils';
import BettingLevelDropdown from './BettingLevelDropdown';
interface BettingZoneProps {
    item: {
        label: string,
        path: string
    };
}
function BettingZone({ item }: BettingZoneProps) {
    const [isAllIn, setIsAllIn] = useState(false);
    const [isApiCallInProgress, setApiCallInProgress] = useState(false);
    const betMoneyItem = useSelector((state: any) => state.game.betMoney.find((i: any) => i.name === item.label));
    const [bettingLevel, setBettingLevel] = useState(betMoneyItem.betLevel);
    const rolled = useSelector(rolledSelector);
    const endGame = useSelector(endGameSelector);
    const afterRollDiceItem = useSelector((state: any) => state.game.afterRollDices.find((i: any) => i.name === item.label));
    const userBalance = useSelector(coinSelector);
    const totalBetMoney = useSelector(totalBetMoneySelector);
    const { currentUser } = useAuthContext()
    const dispatch = useDispatch();

    const decreaseBettingStakes = async () => {
        if (betMoneyItem.coin >= bettingLevel) {
            if (!endGame) {
                dispatch(addCoins(bettingLevel))
            }
            dispatch(decreaseBetMoneyCoin({
                name: betMoneyItem.name,
                amount: bettingLevel
            }))
        }
    };
    const increaseBettingStakes = () => {
        if (bettingLevel > userBalance) {
            toast.error('Mức cược lớn hơn số dư.', {
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
        }
        if (userBalance > 0 && bettingLevel <= userBalance && !endGame) {

            try {
                // Update user coin and wait for it to complete
                dispatch(subtractCoins(bettingLevel));
                dispatch(increaseBetMoneyCoin({
                    name: betMoneyItem.name,
                    amount: bettingLevel
                }));

            } catch (error) {
                console.error('Error updating user coin:', error.message);
                // Handle the error appropriately
            }
        }


    };
    const throttleIncreaseStake = useCallback(async () => {
        if (isApiCallInProgress) {
            return;
        }
        setApiCallInProgress(true);
        try {
            if (userBalance > 0 && bettingLevel <= userBalance && !endGame) {
                console.log('API call success!');
                increaseBettingStakes()
            }

        } catch (error) {
            console.error('API call error:', error);

        } finally {
            setApiCallInProgress(false);
        }
    }, [isApiCallInProgress, bettingLevel])
    const handleAllIn = () => {
        if (!isAllIn) {
            if (userBalance > 0) {
                if (!endGame) {
                    dispatch(subtractCoins(userBalance));
                }
                dispatch(updateSpecificBetMoneyCoin({
                    name: betMoneyItem.name,
                    coin: userBalance
                }));

            } else {
                toast.error("Không đủ số dư để tất tay rồi :))))", {
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
                return;
            }
        } else {
            clearBettingStakes()
        }
        setIsAllIn(!isAllIn);
    };
    const clearBettingStakes = (e?: any) => {
        e && e?.stopPropagation()
        if (!endGame) {
            dispatch(addCoins(betMoneyItem.coin))
        }
        dispatch(updateSpecificBetMoneyCoin({
            name: betMoneyItem.name,
            coin: 0
        }))

    };
    useEffect(() => { dispatch(calculateTotalBetMoney()) }, [betMoneyItem])
    useEffect(() => {
        if (totalBetMoney > 0) {
            dispatch(setBetted(true))
        } else {
            dispatch(setBetted(false))
        }
    }, [totalBetMoney])
    const renderBackground = () => {
        if (betMoneyItem.coin > 0) {
            if (!endGame) {
                return "bg-yellow-300";
            } else if (betMoneyItem.coin > 0 && afterRollDiceItem.quantity > 0) {
                return "blinking";
            } else if (betMoneyItem.coin > 0 && afterRollDiceItem.quantity == 0) {
                return "bg-yellow-300 loss";
            }
        } else {
            return "";
        }
    }
    // bg-[#faefdb]
    const bettingClass = classNames('bg-[#faefdb] betting-zone', renderBackground());

    return (
        <div className={bettingClass}>
            {betMoneyItem.coin > 0 && <FaTrashCan className="absolute button-3d md:text-white text-red-500 text-sm w-10 h-10 p-3 md:text-3xl md:w-14 md:h-14 md:p-2 cursor-pointer top-0 left-0" onClick={clearBettingStakes} id='rollDice' />}
            <BettingLevelDropdown onChooseBettingLevel={setBettingLevel} betMoneyItem={betMoneyItem} />
            {/* <p id="rollDice" className='bg-red-600 p-3 text-sm rounded-full absolute top-3 right-3 button-3d' onClick={handleChooseBettingLevel}>{convertLargeNumberFormat(bettingLevel)}</p> */}
            <img src={item.path} className='cursor-pointer' />
            {
                rolled ? <div className='px-2 w-full'>
                    <div className='flex items-center gap-x-4 justify-center text-gray-900 w-full'>
                        <button className='px-4 py-2 rounded-md button-3d disabled:bg-[#aa8136] flex-1 disabled:cursor-not-allowed flex justify-center btn-minus-plus' onClick={decreaseBettingStakes} disabled={endGame}><FaMinus className='text-xs md:text-base' /></button>
                        <p className='flex-1'>{convertLargeNumberFormat(betMoneyItem?.coin)}</p>
                        <button className='px-4 py-2 rounded-md button-3d flex-1 disabled:bg-[#aa8136] disabled:cursor-not-allowed flex justify-center btn-minus-plus' onClick={increaseBettingStakes} disabled={endGame}><FaPlus className='text-xs md:text-base' /></button>
                    </div>
                    <div className='flex items-center gap-x-4 justify-center mt-2 text-gray-900 w-full'>
                        <button id="rollDice" className='p-1 md:p-2 rounded-md button-3d flex-1 disabled:bg-[#5a0909] disabled:cursor-not-allowed flex justify-center text-sm button-3d uppercase' onClick={handleAllIn} disabled={endGame}>Tất tay</button>
                    </div>


                </div>
                    : <p className="text-gray-900 italic px-2 py-2 text-xs md:text-base lg:text-lg">Rung xí ngầu trước khi đặt cược</p>
            }
        </div >
    )
}

export default BettingZone

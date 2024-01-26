/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { calculateTotalBetMoney, decreaseBetMoneyCoin, endGameSelector, increaseBetMoneyCoin, rolledSelector, setBetted, totalBetMoneySelector, updateSpecificBetMoneyCoin } from '../redux/reducers/game';
import { addCoins, coinSelector, subtractCoins } from '../redux/reducers/player';
import { convertLargeNumberFormat } from '../utils';
import { bettingLevels } from '../common/constants';
interface BettingZoneProps {
    item: {
        label: string,
        path: string
    };
}
function BettingZone({ item }: BettingZoneProps) {
    const [isAllIn, setIsAllIn] = useState(false);
    const [step, setStep] = useState(bettingLevels[0]);
    const rolled = useSelector(rolledSelector);
    const endGame = useSelector(endGameSelector);
    const betMoneyItem = useSelector((state: any) => state.game.betMoney.find((i: any) => i.name === item.label));
    const afterRollDiceItem = useSelector((state: any) => state.game.afterRollDices.find((i: any) => i.name === item.label));
    const userBalance = useSelector(coinSelector);
    const totalBetMoney = useSelector(totalBetMoneySelector);
    const dispatch = useDispatch();
    const decreaseBettingStakes = () => {
        if (betMoneyItem.coin >= step) {
            dispatch(decreaseBetMoneyCoin({
                name: betMoneyItem.name,
                amount: step
            }))
            if (!endGame) {

                dispatch(addCoins(step))
            }
        }
    };
    const increaseBettingStakes = () => {
        dispatch(increaseBetMoneyCoin({
            name: betMoneyItem.name,
            amount: step
        }))
        if (!endGame) {
            dispatch(subtractCoins(step))
        }
    };
    const handleAllIn = () => {
        if (!isAllIn) {
            dispatch(updateSpecificBetMoneyCoin({
                name: betMoneyItem.name,
                coin: userBalance
            }))
            if (!endGame) {
                dispatch(subtractCoins(userBalance))
            }
        } else {
            dispatch(updateSpecificBetMoneyCoin({
                name: betMoneyItem.name,
                coin: 0
            }))
            if (!endGame) {
                dispatch(addCoins(betMoneyItem.coin))
            }
        }
        setIsAllIn(!isAllIn);
    }
    const clearBettingStakes = (e: any) => {
        e.stopPropagation()
        dispatch(updateSpecificBetMoneyCoin({
            name: betMoneyItem.name,
            coin: 0
        }))
        if (!endGame) {
            dispatch(addCoins(betMoneyItem.coin))
        }
    };
    const handleStep = () => {
        const indexOfStep = bettingLevels.indexOf(step);
        if (indexOfStep !== -1) {
            // Check if there is a next step in the array
            if (indexOfStep < bettingLevels.length - 1) {
                // Update the step to the next one
                const nextStep = bettingLevels[indexOfStep + 1];
                setStep(nextStep);
            } else {
                // If the current step is the last one, you may want to handle this case
                const firstStep = bettingLevels[0];
                setStep(firstStep);
            }
        } else {
            // If the current step is not in the array, handle accordingly
            // For now, let's return the current step itself
            setStep(bettingLevels[indexOfStep]);
        }
    }
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
                return "bg-[#ff0000]";
            }
        } else {
            return "";
        }
    }
    const bettingClass = classNames('relative p-4 bg-[#faefdb] border-2 border-[#eabd68] w-[280px] flex items-center flex-col min-h-[40vh]', renderBackground());
    return (
        <div className={bettingClass}>
            {betMoneyItem.coin > 0 && <FaTrashCan className="absolute button-3d text-white text-4xl h-12 w-12 p-2 cursor-pointer top-0 left-0" onClick={clearBettingStakes} id='rollDice' />}
            <p id="rollDice" className='bg-red-600 p-3 text-sm rounded-full absolute top-3 right-3 button-3d' onClick={handleStep}>{convertLargeNumberFormat(step)}</p>
            <img src={item.path} className='w-[20vh] h-[20vh] cursor-pointer object-cover object-center' />
            {
                rolled ? <div className='px-2 w-full'>
                    <div className='flex items-center gap-x-4 justify-center mt-2 text-gray-900 w-full'>
                        <button className='px-4 py-2 rounded-md button-3d disabled:bg-[#aa8136] flex-1 disabled:cursor-not-allowed flex justify-center' onClick={decreaseBettingStakes} disabled={endGame}><FaMinus /></button>
                        <p className='flex-1'>{convertLargeNumberFormat(betMoneyItem?.coin)}</p>
                        <button className='px-4 py-2 rounded-md button-3d flex-1 disabled:bg-[#aa8136] disabled:cursor-not-allowed flex justify-center' onClick={increaseBettingStakes} disabled={endGame}><FaPlus /></button>
                    </div>
                    <div className='flex items-center gap-x-4 justify-center mt-2 text-gray-900 w-full'>
                        <button id="rollDice" className='p-2 rounded-md button-3d flex-1 disabled:bg-[#aa8136] disabled:cursor-not-allowed flex justify-center text-sm button-3d uppercase' onClick={handleAllIn} disabled={endGame}>Tất tay</button>
                    </div>


                </div>
                    : <p className="text-gray-900 italic px-2 py-2">Rung xí ngầu trước khi đặt cược</p>
            }
        </div >
    )
}

export default BettingZone

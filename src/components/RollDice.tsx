import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bettedSelector, bonusSelector, endGameSelector, openSelector, resetAll, setEndGame, setOpen, setRolled, updateAfterRollDices } from '../redux/reducers/game';
import { countOccurrencesAndCompare } from '../utils';
import Bowl from './Bowl';
import Dice from './Dice';
import Dish from './Dish';

function RollDice() {
    const [dices, setDices] = useState([0, 0, 0])
    const bowlRef = useRef<HTMLImageElement>(null);
    const user = useSelector(state => state.player.user);
    const audioRef = useRef(null);
    const dispatch = useDispatch();
    const open = useSelector(openSelector);
    const bonus = useSelector(bonusSelector);
    const betted = useSelector(bettedSelector);
    const endGame = useSelector(endGameSelector)
    const rollDice = () => {
        playRollDiceSound()
        const newDices = dices.map(() => Math.floor(Math.random() * 6));
        setDices(newDices);
        dispatch(setRolled(true))
        const interval = setInterval(() => {
            const randomDices = dices.map(() => Math.floor(Math.random() * 6));
            setDices(randomDices);
        }, 10);
        // Adjust the interval based on your preferences
        // Delay the update after 2 seconds
        const dice1 = Math.floor(Math.random() * 6);
        const dice2 = Math.floor(Math.random() * 6);
        const dice3 = Math.floor(Math.random() * 6);
        setTimeout(() => {
            clearInterval(interval);
            setDices([dice1, dice2, dice3]);
        }, 500);

        // Shake animation
        if (open) {
            bowlRef?.current?.classList.remove("open")
            bowlRef?.current?.classList.add("close")
            bowlRef?.current?.classList.add("shake")
            bowlRef?.current?.classList.remove("close")
            dispatch(setOpen(false));
        } else {
            bowlRef?.current?.classList.remove("close")
            bowlRef?.current?.classList.add("shake")
        }
        countOccurrencesAndCompare([dice1, dice2, dice3]).map((item) => dispatch(updateAfterRollDices({
            name: item.name,
            quantity: item.quantity
        })))

        // dispatch(updateAfterRollDices())
        setTimeout(() => bowlRef?.current?.classList.remove("shake"), 500);
    };

    const toggleBowl = () => {
        if (open) {
            bowlRef?.current?.classList.remove("open");
            bowlRef?.current?.classList.add("close");
        } else {
            bowlRef?.current?.classList.remove("close");
            bowlRef?.current?.classList.add("open");
            dispatch(setEndGame(true))
        }
        dispatch(setOpen(!open));
    }
    const saveGameHistory = () => {
        const stats = {
            moneyEarned: bonus > 0 ? bonus : 0,
            moneyLost: bonus < 0 ? bonus : 0,
            status: bonus > 0 ? "won" : (bonus < 0 ? "loss" : "draw"),
            username: user.username
        };
        // Get existing history from localStorage
        const statsFromStorage = JSON.parse(localStorage.getItem('gameHistory')) || [];
        // Add the new history to the list
        const updatedStats = [...statsFromStorage, stats];
        // Update localStorage with the updated user list
        localStorage.setItem('gameHistory', JSON.stringify(updatedStats));
    };
    const newGame = () => {

        saveGameHistory()
        if (open) {
            bowlRef?.current?.classList.remove("open");
            bowlRef?.current?.classList.add("close");
        }
        dispatch(resetAll())
    }

    const playRollDiceSound = () => {
        // Play the audio when the button is clicked
        audioRef.current.play();
    };
    return (
        <div className='w-[500px] h-fit relative'>
            <audio ref={audioRef}>
                <source src="/audio/roll-dice.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div className="h-[450px]">
                <Bowl ref={bowlRef} />
                <Dish />
                {dices.map((dice, index) => <Dice index={index + 1} diceKey={dice} />)}
            </div>
            <div className="flex items-center justify-center gap-x-4">
                {betted && <button id="openBowl" className=' uppercase button-3d font-semibold text-2xl rounded-md px-4 py-2 z-20 disabled:bg-amber-900 bg-amber-500' onClick={toggleBowl}>{open ? "Đậy nắp" : "Mở nắp"}</button>}
                {!endGame && <button id="rollDice" className=' uppercase button-3d font-semibold text-2xl rounded-md px-4 py-2 z-20 disabled:bg-red-900' onClick={rollDice}>Rung</button>}
                {/* {endGame && <button className=' uppercase bg-lime-600 text-white font-semibold text-2xl rounded-md px-4 py-2 z-20' onClick={newGame}>Ván mới</button>} */}
                {endGame && <button id="newGame" className='uppercase button-3d font-semibold text-2xl rounded-md px-4 py-2 z-20' onClick={newGame}>Ván mới</button>}
            </div>
        </div>

    )
}

export default RollDice
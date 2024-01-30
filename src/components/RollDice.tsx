/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bettedSelector, endGameSelector, openSelector, setEndGame, setOpen, setRolled, updateAfterRollDices } from '../redux/reducers/game';
import { addCoins } from '../redux/reducers/player';
import { countOccurrencesAndCompare } from '../utils';
import Bowl from './Bowl';
import Dice from './Dice';
import Dish from './Dish';
interface RollDiceProps {
    newGame: () => void;
}
const RollDice = forwardRef<HTMLImageElement, RollDiceProps>((props, ref) => {
    const [dices, setDices] = useState([Math.floor(Math.random() * 6), Math.floor(Math.random() * 6), Math.floor(Math.random() * 6)])
    const audioRef = useRef(null);
    const dishRef = useRef<HTMLImageElement>(null)
    const dispatch = useDispatch();
    const open = useSelector(openSelector);
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
            if (ref) {
                ref?.current?.classList.remove("open")
                ref?.current?.classList.add("close")
                ref?.current?.classList.add("shake")
                dishRef.current?.classList.add("shake");
                ref?.current?.classList.remove("close")
            }
            dispatch(setOpen(false));
        } else {
            ref?.current?.classList.remove("close")
            ref?.current?.classList.add("shake");
            dishRef.current?.classList.add("shake");
        }
        countOccurrencesAndCompare([dice1, dice2, dice3]).map((item) => dispatch(updateAfterRollDices({
            name: item.name,
            quantity: item.quantity
        })))

        // dispatch(updateAfterRollDices())
        setTimeout(() => { ref?.current?.classList.remove("shake"); dishRef.current?.classList.remove("shake"); }, 1000);
    };

    const toggleBowl = () => {
        if (open) {
            ref?.current?.classList.remove("open");
            ref?.current?.classList.add("close");
        } else {
            ref?.current?.classList.remove("close");
            ref?.current?.classList.add("open");
            dispatch(setEndGame(true))
        }
        dispatch(setOpen(!open));
    }
    const playRollDiceSound = () => {
        // Play the audio when the button is clicked
        audioRef.current.play();
    };
    return (
        <div className='roll-dice-container'>
            <audio ref={audioRef}>
                <source src="/audio/roll-dice.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div className="relative roll-dice-content">
                <Bowl ref={ref} />
                <Dish ref={dishRef} />
                {dices.map((dice, index) => <Dice index={index + 1} diceKey={dice} />)}
            </div>
            <div className="flex items-center justify-center gap-x-4 roll-dice-buttons">
                {betted && <button id="openBowl" className=' uppercase button-3d font-semibold text-2xl rounded-md px-4 py-2 z-20 disabled:bg-amber-900 bg-amber-500' onClick={toggleBowl}>{open ? "Úp" : "Lật"}</button>}
                {!endGame && <button id="rollDice" className=' uppercase button-3d font-semibold text-2xl rounded-md px-4 py-2 z-20 disabled:bg-red-900' onClick={rollDice}>Xóc</button>}
                {endGame && <button id="newGame" className='uppercase button-3d font-semibold text-2xl rounded-md px-4 py-2 z-20' onClick={props.newGame}>Ván mới</button>}
            </div>
        </div>

    )
})

export default RollDice;
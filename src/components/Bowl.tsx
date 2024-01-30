/* eslint-disable react-refresh/only-export-components */
import { LegacyRef, forwardRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setIsCheated } from "../redux/reducers/cheat";
import { IState } from '../common/interface';
import { addCoins } from "../redux/reducers/player";
import { updateUserCoin } from "../api/firebaseApi";
import { useAuthContext } from "../config/context/useAuthContext";
import { BOWL_TAP_NUMBER } from "../common/constants";
import { endGameSelector } from "../redux/reducers/game";
interface BowlProps {
    transparent?: boolean;
}
function Bowl(props: BowlProps, ref: LegacyRef<HTMLImageElement> | undefined) {
    const [bowlCount, setBowlCount] = useState(0)
    const [transparent, setTransparent] = useState(false);
    const dispatch = useDispatch()
    const { currentUser } = useAuthContext()
    const endGame = useSelector(endGameSelector)
    const cheated = useSelector((state: IState) => state.cheat.isCheated)
    const handleClick = () => {
        setBowlCount(prevCount => prevCount + 1);
    }
    useEffect(() => {
        if (bowlCount === BOWL_TAP_NUMBER) {
            dispatch(setIsCheated(true));
            setTransparent(true)
            setBowlCount(0)
        }
    }, [bowlCount])
    useEffect(() => {
        if (endGame) {
            setTransparent(false)
        }
    }, [endGame])

    return (
        <img src="/images/bowl.png" className={`bowl circle close cursor-pointer`} ref={ref} style={{ opacity: transparent ? 0.5 : 1 }} onClick={handleClick} />
    )
}

export default forwardRef(Bowl); 
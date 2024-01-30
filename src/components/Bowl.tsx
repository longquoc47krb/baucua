/* eslint-disable react-refresh/only-export-components */
import { LegacyRef, forwardRef, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setIsCheated } from "../redux/reducers/cheat";
import { IState } from '../common/interface';
import { addCoins } from "../redux/reducers/player";
import { updateUserCoin } from "../api/firebaseApi";
import { useAuthContext } from "../config/context/useAuthContext";
import { BOWL_TAP_NUMBER } from "../common/constants";
interface BowlProps {
    transparent: boolean;
}
function Bowl({ transparent }: BowlProps, ref: LegacyRef<HTMLImageElement> | undefined) {
    const [bowlCount, setBowlCount] = useState(0)
    const dispatch = useDispatch()
    const { currentUser } = useAuthContext()
    console.log("bowl count:" + bowlCount)
    const cheated = useSelector((state: IState) => state.cheat.isCheated)
    const handleClick = () => {
        setBowlCount(prevCount => prevCount + 1);
    }
    useEffect(() => {
        if (bowlCount === BOWL_TAP_NUMBER) {
            console.log("set cheat: true")
            dispatch(setIsCheated(true));
            setBowlCount(0)
        }
    }, [bowlCount])
    useEffect(() => {
        if (cheated) {
            const updateCoinFunc = async () => {
                console.log("add coin: 1000000")
                dispatch(addCoins(1000000));
                dispatch(setIsCheated(false));
                await updateUserCoin(currentUser.id, 1000000)
            }
            updateCoinFunc()
        }
    }, [cheated])

    return (
        <img src="/images/bowl.png" className={`bowl circle close cursor-pointer`} ref={ref} style={{ opacity: transparent ? 0.5 : 1 }} onClick={handleClick} />
    )
}

export default forwardRef(Bowl); 
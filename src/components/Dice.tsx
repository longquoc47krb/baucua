import { diceResource } from "../common/constants";

interface DiceProps {
    index: number;
    diceKey: number;
}
function Dice({ index, diceKey }: DiceProps) {
    return (
        <div className={`dice flex justify-center items-center dice-3d`} id={`dice-${index}`} >
            <img src={diceResource[diceKey].path} />
        </div>
    )
}

export default Dice
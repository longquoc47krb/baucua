import { diceResource } from "../common/constants";

interface DiceProps {
    index: number;
    diceKey: number;
}
function Dice({ index, diceKey }: DiceProps) {
    return (
        <div className={`dice abs-center flex justify-center items-center circle dice-3d`} id={`dice-${index}`} >
            <img src={diceResource[diceKey].path} className="w-12 h-12" />
        </div>
    )
}

export default Dice
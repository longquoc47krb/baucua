/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { bettingLevels } from "../common/constants";
import { convertLargeNumberFormat } from "../utils";
import { useDispatch } from 'react-redux';
import { updateBetLevel } from "../redux/reducers/game";
import { IBetMoneyItem } from "../common/interface";

const BettingLevelDropdown = ({ onChooseBettingLevel, betMoneyItem }: { onChooseBettingLevel: any, betMoneyItem: IBetMoneyItem }) => {
    const [bettingLevel, setBettingLevel] = React.useState<number | any>(betMoneyItem.betLevel);
    const dispatch = useDispatch()
    return (
        <div className="flex justify-end w-full items-center betting-level-dropdown">
            <label htmlFor="bettingLevel" className="text-black betLevel-label">Mức cược:</label>
            <select
                id="bettingLevel"
                className="bg-transparent w-min outline-none text-red-600 betLevel-select"
                value={bettingLevel}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    dispatch(updateBetLevel({ name: betMoneyItem.name, betLevel: Number(e.target.value) }));
                    setBettingLevel(Number(e.target.value));
                    onChooseBettingLevel(Number(e.target.value))
                }}
            >
                {bettingLevels.map((level) => (
                    <option key={level} value={level} className="px-4 py-2">
                        <span className="px-4 py-2">{convertLargeNumberFormat(level)}</span>
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BettingLevelDropdown;

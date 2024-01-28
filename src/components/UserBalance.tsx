import { FaCoins } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { IState } from "../common/interface";
import Odometer from 'react-odometerjs';

function UserBalance() {
    const user = useSelector((state: IState) => state.player.user);
    return (
        <div className="gap-x-2 px-4 py-2 rounded-lg button-3d flex items-center user-balance" id="tagname">
            <p className='pr-2 border-r border-r-[#eabd68] text-[#ffdc9c]'>{user.name}</p>
            <Odometer
                className='font-semibold text-[#ffdc9c] odometer-text'
                format="(,ddd).dd"
                duration={1000 * 5}
                value={user.coin}
            />
            <FaCoins className="text-[#ffdc9c]" />
        </div>
    )
}

export default UserBalance
import { FaCoins } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { formatNumberWithCommas } from '../utils/index';

function UserBalance() {
    const user = useSelector((state) => state.player.user);
    return (
        <div className="gap-x-2 px-4 py-2 rounded-lg button-3d absolute z-50 top-4 left-2 flex items-center" id="tagname">
            <p className='pr-2 border-r border-r-[#eabd68] text-[#ffdc9c]'>{user.name}</p>
            <p className='text-xl font-semibold text-[#ffdc9c]'>{formatNumberWithCommas(user.coin)}</p>
            <FaCoins className="text-[#ffdc9c]" />
        </div>
    )
}

export default UserBalance
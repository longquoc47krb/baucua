import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import { FaCoins } from "react-icons/fa";
import { HiMiniTrophy } from "react-icons/hi2";
import { IoFlashOutline, IoFlash } from "react-icons/io5";
import { IStats, IUser } from "../common/interface";
import { formatNumberWithCommas } from "../utils";
interface UserProfileProps {
    user: IUser;
    coin: number;
    stats: IStats
}
const UserProfileComponent = ({ user, coin, stats }: UserProfileProps) => {
    const renderWinRate = (value: number) => {
        const gameCount = stats.wonCount + stats.lossCount + stats.drawCount;
        const rate = (value / gameCount) * 100;
        if (rate >= 65) {
            return <span className="text-green-600 font-semibold">{rate.toFixed(2).replace(/\.0+$/, '')}%</span>
        } else if (rate >= 50 && rate < 65) {
            return <span className="text-yellow-500 font-semibold">{rate.toFixed(2).replace(/\.0+$/, '')}%</span>
        } else if (rate < 50) {
            return <span className="text-red-500 font-semibold">{rate.toFixed(2).replace(/\.0+$/, '')}%</span>
        } else {
            return <span className="text-red-500 font-semibold">0%</span>
        }
    }
    return (
        <div className="flex items-start flex-col p-4 rounded-lg bg-black/50 flex-1 leading-8">
            <p className="text-[#eabd68] mb-4 uppercase text-2xl">Thành tích cá nhân</p>
            <p className='pr-2 uppercase text-4xl'>{user.name}</p>
            <div className="flex items-center gap-x-4">
                <FaCoins className="text-[#eabd68]" />
                <p className='text-xl font-semibold text-[#eabd68]'>{formatNumberWithCommas(coin)}</p>
            </div>
            <div className="flex items-center gap-x-4">
                <div className="flex items-center">
                    <div className="bg-green-500 w-2 h-2 m-0 mr-2"></div>
                    <span>Thắng: {stats?.wonCount}</span>
                </div>
                <div className="flex items-center">
                    <div className="bg-yellow-500 w-2 h-2 m-0 mr-2"></div>
                    <span>Hoà: {stats?.drawCount}</span>
                </div>
                <div className="flex items-center">
                    <div className="bg-red-600 w-2 h-2 m-0 mr-2"></div>
                    <span>Thua: {stats?.lossCount}</span>
                </div>
            </div>
            <div className="flex items-center gap-x-4">
                <HiMiniTrophy className="text-amber-400" />
                <span>Tỉ lệ thắng: {renderWinRate(stats?.wonCount)}</span>
            </div>
            <div className="flex items-center gap-x-4">
                <IoFlashOutline className="text-amber-500" />
                <span>Chuỗi thắng hiện tại: {stats?.currentStreak}</span>
            </div>
            <div className="flex items-center gap-x-4">
                <IoFlash className="text-amber-500" />
                <span>Chuỗi thắng dài nhất: {stats?.maxStreak}</span>
            </div>
            <div className="flex items-center gap-x-4">
                <AiOutlineRise className="text-green-500" />
                <p>Số tiền thắng: <span className="text-green-500">+{formatNumberWithCommas(stats?.totalMoneyEarned ?? 0)}</span></p>
            </div>
            <div className="flex items-center gap-x-4">
                <AiOutlineFall className="text-red-500" />
                <p>Số tiền thua: <span className="text-red-500">{formatNumberWithCommas(stats?.totalMoneyLost ?? 0)}</span></p>
            </div>
        </div>
    );
};

export default UserProfileComponent;

import { chain, countBy, filter } from "lodash";
import { Toaster } from "react-hot-toast";
import { AiOutlineFall, AiOutlineRise } from "react-icons/ai";
import { FaCoins } from "react-icons/fa6";
import { HiMiniTrophy } from "react-icons/hi2";
import { IoFlash, IoFlashOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Avatar from "../components/Avatar";
import FloatMenu from "../components/FloatMenu";
import Table from "../components/Table";
import { formatNumberWithCommas } from "../utils";
function StatsScreen() {
    const history = JSON.parse(localStorage.getItem("gameHistory")) ?? []
    const userList = JSON.parse(localStorage.getItem("userList")) ?? []
    const username = useSelector((state) => state.player.user.username);
    const user = useSelector((state) => state.player.user);
    const coin = useSelector((state) => state.player.user.coin);
    const totalMoneyEarned = chain(history)
        .filter({ username })
        .sumBy('moneyEarned')
        .value();
    const totalMoneyLost = chain(history)
        .filter({ username })
        .sumBy('moneyLost')
        .value();
    const gameStatusCounts = countBy(filter(history, { username }), 'status');
    const wonCount = gameStatusCounts['won'] || 0;
    const lossCount = gameStatusCounts['loss'] || 0;
    const drawCount = gameStatusCounts['draw'] || 0;
    const gameCount = wonCount + lossCount + drawCount;

    const wonStreaks = chain(history)
        .filter({ username, status: 'won' })
        .reduce(
            (result) => {
                if (result.currentStreak === 0) {
                    // Start of a new streak
                    result.currentStreak = 1;
                } else {
                    // Continue the streak
                    result.currentStreak++;
                }
                result.maxStreak = Math.max(result.maxStreak, result.currentStreak);
                return result;
            },
            { currentStreak: 0, maxStreak: 0 }
        )
        .value();
    const renderWinRate = (value) => {
        const rate = (value / gameCount) * 100; // number.toFixed(2).replace(/\.0+$/, '')
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
    const rankingData = userList.map(user => {
        const userStats = history.filter(entry => entry.username === user.username);

        const wonCount = userStats.filter(entry => entry.status === 'won').length;
        const totalGames = userStats.length;
        const wonRate = totalGames === 0 ? 0 : (wonCount / totalGames) * 100;

        const wonStreaks = userStats.reduce(
            (result, entry) => {
                if (entry.status === 'won') {
                    result.currentStreak++;
                    result.maxStreak = Math.max(result.maxStreak, result.currentStreak);
                } else {
                    result.currentStreak = 0;
                }
                return result;
            },
            { currentStreak: 0, maxStreak: 0 }
        );

        const balance = user.coin;

        return {
            name: user.name,
            username: user.username,
            wonRate: wonRate.toFixed(2),
            wonStreak: wonStreaks.maxStreak,
            balance: balance.toFixed(2),
        };
    });
    console.log({ rankingData })
    return (
        <div>
            {/* <audio ref={incorrectRef} className="hidden" /> */}
            <Toaster position="bottom-center"
                reverseOrder={true} />
            <div className='flex flex-col items-center pt-6 p-2 h-screen relative'
                style={{
                    // backgroundImage: `url('/images/background.jpg')`,
                    backgroundColor: "#d50505",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <img src="/images/pattern.jpg" className='absolute h-full w-full object-cover top-0 left-0 opacity-15' />
                <FloatMenu />
                <div className="flex items-start gap-x-8 relative px-4 py-2 rounded-lg leading-8 w-full pr-[10vw]">

                    <div className="flex items-start flex-col p-4 rounded-lg bg-black/50 flex-1">
                        <p className="text-[#eabd68] mb-4 uppercase text-2xl">Thành tích cá nhân</p>
                        <div className="flex items-center gap-x-4">
                            <Avatar username={username} />
                            <p className='pr-2 uppercase'>{user.name}</p>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <FaCoins className="text-[#eabd68]" />
                            <p className='text-xl font-semibold text-[#eabd68]'>{formatNumberWithCommas(coin)}</p>

                        </div>
                        <div className="flex items-center gap-x-4">
                            <div className="flex items-center">
                                <div className="bg-green-500 w-2 h-2 m-0 mr-2"></div>
                                <span>Thắng: {wonCount}</span>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-yellow-500 w-2 h-2 m-0 mr-2"></div>
                                <span>Hoà: {drawCount}</span>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-red-600 w-2 h-2 m-0 mr-2"></div>
                                <span>Thua: {lossCount}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <HiMiniTrophy className="text-amber-400" />
                            <span>Tỉ lệ thắng: {renderWinRate(wonCount)}</span>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <IoFlashOutline className="text-amber-500" />
                            <span>Chuỗi thắng hiện tại: {wonStreaks.currentStreak}</span>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <IoFlash className="text-amber-500" />
                            <span>Chuỗi thắng dài nhất: {wonStreaks.maxStreak}</span>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <AiOutlineRise className="text-green-500" />
                            <p>Số tiền thắng: <span className="text-green-500">+{formatNumberWithCommas(totalMoneyEarned)}</span></p>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <AiOutlineFall className="text-red-500" />
                            <p>Số tiền thua: <span className="text-red-500">{formatNumberWithCommas(totalMoneyLost)}</span></p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                        <p className="text-[#eabd68] mb-4 uppercase text-2xl">Bảng Xếp Hạng</p>
                        <Table data={rankingData} />
                    </div>
                </div>
                {/* <Pie data={data} options={options} /> */}
            </div>
        </div>
    )
}

export default StatsScreen
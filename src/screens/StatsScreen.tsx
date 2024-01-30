/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { chain, countBy, filter } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { getGameHistory, getUserList } from "../api/firebaseApi";
import { IRankingDataItem, IStats, IWinStreak } from '../common/interface';
import FloatMenu from "../components/FloatMenu";
import Table from "../components/Table";
import UserProfileComponent from "../components/UserProfileComponent";
import { useAuthContext } from "../config/context/useAuthContext";
import { getWinStreakAndMoneyEarned } from "../utils";
function StatsScreen() {
    const [stats, setStats] = useState<IStats>({
        currentStreak: 0,
        drawCount: 0,
        lossCount: 0,
        wonCount: 0,
        maxStreak: 0,
        totalMoneyEarned: 0,
        totalMoneyLost: 0,
    })
    const [userList, setUserList] = useState([])
    const [gameHistory, setGameHistory] = useState([])
    const { currentUser } = useAuthContext()
    const { username } = currentUser;
    const totalMoneyEarned = chain(gameHistory)
        .filter({ username })
        .sumBy('moneyEarned')
        .value();
    const totalMoneyLost = chain(gameHistory)
        .filter({ username })
        .sumBy('moneyLost')
        .value();
    const gameStatusCounts = countBy(filter(gameHistory, { username }), 'status');
    const wonCount = gameStatusCounts['won'] || 0;
    const lossCount = gameStatusCounts['loss'] || 0;
    const drawCount = gameStatusCounts['draw'] || 0;
    const [wonStreaks, setWonStreaks] = useState<IWinStreak | null>(null);
    useEffect(() => {
        // Function to compute wonStreaks
        const winStreakResponse = getWinStreakAndMoneyEarned(gameHistory, username);
        setWonStreaks(winStreakResponse)
    }, [gameHistory, username]);
    const rankingData = useMemo(() => {
        return userList?.map((user) => {
            const userStats = gameHistory.filter((entry) => entry.username === user?.username);

            const wonCount = userStats.filter((entry) => entry.status === 'won').length;
            const totalGames = userStats.length;
            const wonRate = totalGames === 0 ? 0 : (wonCount / totalGames) * 100;

            const wonStreaks = getWinStreakAndMoneyEarned(userStats, user?.username);

            const balance = user?.coin;

            return {
                name: user?.name,
                wonRate: wonRate.toFixed(2),
                wonStreak: wonStreaks?.maxWinStreak,
                balance,
            };
        });
    }, [userList, gameHistory, username]);
    const userStats = gameHistory.filter((entry) => entry.username === username).reverse();
    const wonStreaksSs = getWinStreakAndMoneyEarned(userStats, username);
    console.log({ gameHistory, userStats, wonStreaksSs })
    const sortedRankingData = rankingData.sort((a: IRankingDataItem, b: IRankingDataItem) => {
        // Sort by balance with highest priority
        const balanceComparison = parseFloat(b.balance) - parseFloat(a.balance);
        const wonRateComparison = parseFloat(b.wonRate) - parseFloat(a.wonRate);
        const wonStreakComparison = b.wonStreak - a.wonStreak;
        // If balance is the same, sort by wonRate
        if (balanceComparison === 0) {
            if (wonRateComparison === 0) {
                return wonStreakComparison
            }
            return wonRateComparison;
        }

        return balanceComparison;
    });
    useEffect(() => {
        setStats({
            wonCount,
            drawCount,
            lossCount,
            currentStreak: wonStreaks?.currentWinStreak,
            maxStreak: wonStreaks?.maxWinStreak,
            totalMoneyEarned,
            totalMoneyLost
        })
    }, [gameHistory, wonStreaks, username])

    useEffect(() => {
        const fetchData = async () => {
            const [userListResponse, gameHistoryResponse] = await Promise.all([
                getUserList(),
                getGameHistory()
            ]);
            setUserList(userListResponse);
            setGameHistory(gameHistoryResponse.sort((a, b) => a?.date - b?.date));
        }
        fetchData()
    }, [])
    console.log({ userList })
    return (
        <div>
            {/* <audio ref={incorrectRef} className="hidden" /> */}
            <div className='flex flex-col items-center pt-6 p-2 h-screen relative overflow-hidden'
                style={{
                    backgroundColor: "#ab0a0a",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <img src="/images/pattern.jpg" className='absolute h-full w-full object-cover top-0 left-0 opacity-5' />
                <FloatMenu />
                <div className="flex items-start gap-x-8 relative px-4 py-2 rounded-lg leading-8 w-full pr-[10vw] stats-container">
                    <UserProfileComponent user={currentUser} coin={currentUser?.coin} stats={stats} />
                    <div className="flex flex-col items-center flex-1">
                        <p className="text-[#eabd68] mb-4 uppercase text-2xl">Bảng Xếp Hạng</p>
                        <Table data={sortedRankingData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsScreen
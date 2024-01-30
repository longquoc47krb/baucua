/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiMiniTrophy } from 'react-icons/hi2';
import { convertLargeNumberFormat, formatNumberWithCommas } from '../utils';
import { useSelector } from 'react-redux';
import { IState, IUser } from '../common/interface';
import { useEffect } from 'react';

function Table({ data }: { data: any }) {
    const currentUser = useSelector((state: IState) => state.player.user)
    const renderRankNo = (value: any) => {
        if (value === 0) {
            return <span className='text-amber-400 text-left'>🏆</span>
        } else if (value > 0 && value < 3) {
            return <span className='text-amber-400 text-left'>{value + 1}</span>
        } else {
            return <span className='text-gray-300 text-left'>{value + 1}</span>
        }
    }
    useEffect(() => {
        const userIndex = data.findIndex((user: IUser) => user.name === currentUser.name);
        console.log({ userIndex, data, currentUser })
        const row = document.getElementById(`ranking-row-${userIndex}`)
        row?.classList.add("highlight-row");
    }, [currentUser, data])
    return (
        <div className="table-container mx-auto overflow-x-auto rounded-md">

            <table className="bg-black/50 overflow-hidden rounded-md w-full">
                <thead className="bg-[#eabd68] text-[#4f390f]">
                    <tr>
                        <th className="py-2 px-4">#</th>
                        <th className="py-2 px-4 whitespace-nowrap">Tên</th>
                        <th className="py-2 px-4 whitespace-nowrap">Tỉ lệ thắng</th>
                        <th className="py-2 px-4 whitespace-nowrap">Chuỗi thắng (Max)</th>
                        <th className="py-2 px-4 whitespace-nowrap">Tổng tài sản</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.slice(0, 10).map((item: any, index: number) => <tr id={`ranking-row-${index}`} className='ranking-row'>
                            <td className="py-2 px-4 whitespace-nowrap flex justify-center items-center">{renderRankNo(index)}</td>
                            <td className="py-2 px-4 whitespace-nowrap">{item.name}</td>
                            <td className="py-2 px-4 whitespace-nowrap">{item.wonRate}%</td>
                            <td className="py-2 px-4 whitespace-nowrap">{item.wonStreak}</td>
                            <td className="py-2 px-4 whitespace-nowrap">{formatNumberWithCommas(item.balance)}</td>
                        </tr>)
                    }

                </tbody>
            </table>

        </div>
    )
}

export default Table
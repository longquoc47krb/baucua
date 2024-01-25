/* eslint-disable @typescript-eslint/no-explicit-any */
import { HiMiniTrophy } from 'react-icons/hi2';
import { convertLargeNumberFormat } from '../utils';

function Table({ data }: { data: any }) {
    const renderRankNo = (value: any) => {
        if (value === 0) {
            return <HiMiniTrophy className={'text-amber-400'} />
        } else if (value > 0 && value < 3) {
            return <span className='text-amber-400'>{value + 1}</span>
        } else {
            return <span className='text-gray-300'>{value + 1}</span>
        }
    }
    return (
        <div className="min-w-[60vw] mx-auto">

            <table className="min-w-full bg-black/50 border border-gray-300 rounded-md overflow-hidden">
                <thead className="bg-[#eabd68] text-[#4f390f]">
                    <tr>
                        <th className="py-2 px-4 border-b">#</th>
                        <th className="py-2 px-4 border-b">Tên</th>
                        <th className="py-2 px-4 border-b">Tên đăng nhập</th>
                        <th className="py-2 px-4 border-b">Tỉ lệ thắng</th>
                        <th className="py-2 px-4 border-b">Chuỗi thắng</th>
                        <th className="py-2 px-4 border-b">Tổng tài sản</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item: any, index: number) => <tr>
                            <td className="py-2 px-4 border-b">{renderRankNo(index)}</td>
                            <td className="py-2 px-4 border-b">{item.name}</td>
                            <td className="py-2 px-4 border-b">{item.username}</td>
                            <td className="py-2 px-4 border-b">{item.wonRate}%</td>
                            <td className="py-2 px-4 border-b">{item.wonStreak}</td>
                            <td className="py-2 px-4 border-b">{convertLargeNumberFormat(item.balance)}</td>
                        </tr>)
                    }

                </tbody>
            </table>

        </div>
    )
}

export default Table
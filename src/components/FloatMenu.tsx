import { FaSignOutAlt } from 'react-icons/fa';
import { IoIosStats, IoMdCube } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { openSelector, resetAll, resetDiffAmount, totalBetMoneySelector } from '../redux/reducers/game';
import { addCoins, logout } from '../redux/reducers/player';
interface FloatMenuProps {
    newGame?: () => void;
}
function FloatMenu({ newGame }: FloatMenuProps) {
    const location = useLocation();
    const currentPathname = location?.pathname;
    const open = useSelector(openSelector)
    const betMoney = useSelector(totalBetMoneySelector)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const discardGame = () => {
        if (!open) {
            dispatch(addCoins(betMoney))
        }
        if (newGame) {

            newGame()
        }
    }
    const handleLogout = () => {
        discardGame()
        localStorage.removeItem("accessToken");
        dispatch(logout())
        dispatch(resetDiffAmount())
        dispatch(resetAll())
        navigate("/sign-in")
    }
    const handleGoToStats = () => {
        discardGame()
        navigate("/stats")
    }
    return (
        <div className="absolute right-3 bottom-4 flex-col items-center z-50 justify-between flex float-menu-container">
            <div className='flex flex-col items-center'>
                {currentPathname === "/" ? <button className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-200" onClick={handleGoToStats}>
                    <IoIosStats className=" bg-red-700 rounded-xl p-2 w-10 h-10" />
                    <span className="text-red-700">Thống kê</span>
                </button> : <button className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-200" onClick={() => navigate("/")}>
                    <IoMdCube className=" text-red-700 bg-white rounded-xl p-2 w-10 h-10" />
                    <span className="text-white">Bầu Cua</span>
                </button>}
                <button className="flex flex-col items-center mt-2 cursor-pointer hover:scale-110 transition-transform duration-200" onClick={handleLogout}>
                    <FaSignOutAlt className={`${currentPathname === "/" ? "bg-red-700 text-white" : "text-red-700 bg-white"}  rounded-xl p-2 w-10 h-10`} />
                    <span className={`${currentPathname === "/" ? "text-red-700" : "text-white"}`}>Đăng xuất</span>
                </button>
            </div>
        </div>
    )
}

export default FloatMenu
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from '../common/interface';
import { addUserToList } from "../redux/reducers/player";
import { lowercaseAndRemoveWhitespace, uppercaseFirstLetter } from "../utils";
// import { GoogleSpreadsheet } from "google-spreadsheet";
// import { JWT } from 'google-auth-library';
const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleRegister = () => {
        if (username && password && name) {
            const newUser: IUser = {
                name: uppercaseFirstLetter(name),
                username: lowercaseAndRemoveWhitespace(username),
                password,
                coin: 10000000,
            };
            // Get existing user list from localStorage
            const userListString = localStorage.getItem('userList')
            const userListFromStorage = userListString ? JSON.parse(userListString) : [];
            const isUserExist = userListFromStorage.find((user: IUser) => user.username === newUser.username);
            if (isUserExist) {
                toast.error('Người dùng đã tồn tại, vui lòng chọn tên đăng nhập khác.', {
                    style: {
                        border: '1px solid #eabd68',
                        padding: '16px',
                        color: 'black',
                        background: '#faefdb'
                    },
                    iconTheme: {
                        primary: '#d93029',
                        secondary: '#FFFAEE',
                    },
                });
                return;
            }
            // Add the new user to the list
            const updatedUserList = [...userListFromStorage, newUser];
            dispatch(addUserToList(newUser))
            // Update localStorage with the updated user list
            localStorage.setItem('userList', JSON.stringify(updatedUserList));
            toast.success('Đăng ký thành công.', {
                style: {
                    border: '1px solid #eabd68',
                    padding: '16px',
                    color: 'black',
                    background: '#faefdb'
                },
                iconTheme: {
                    primary: '#d93029',
                    secondary: '#FFFAEE',
                },
            });
            navigate("/sign-in")
        } else {
            toast.error('Không được để trống.', {
                style: {
                    border: '1px solid #eabd68',
                    padding: '16px',
                    color: 'black',
                    background: '#faefdb'
                },
                iconTheme: {
                    primary: '#d93029',
                    secondary: '#FFFAEE',
                },
            });
        }

    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="flex items-center justify-center h-screen" style={{
            backgroundImage: `url('/images/background.jpg')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        }}><Toaster position="bottom-center"
            reverseOrder={true} />
            <div className="shadow-md rounded-md w-96 overflow-hidden relative bg-red-700 min-w-[40vw] auth-container">
                <img src="/images/pattern.jpg" className='absolute h-full object-cover top-0 left-0 opacity-15' />
                <h2 className="text-2xl font-semibold mb-6 text-amber-200 pt-8">Đăng ký</h2>
                <form className="p-8 relative">
                    <div className="mb-4 flex items-start flex-col">
                        <label className="block text-sm font-bold mb-2 text-amber-200" htmlFor="name">
                            Họ & Tên
                        </label>
                        <input
                            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-amber-300 bg-white text-red-700"
                            type="text"
                            id="name"
                            placeholder="Nhập họ tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex items-start flex-col">
                        <label className="block text-sm font-bold mb-2 text-amber-200" htmlFor="username">
                            Tên đăng nhập
                        </label>
                        <input
                            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-amber-300 bg-white text-red-700"
                            type="text"
                            id="username"
                            placeholder="Nhập tên đăng nhập"
                            value={username}
                            onChange={(e) => {
                                const username = e.target.value.trim()
                                setUsername(username)
                            }}
                        />
                    </div>
                    <div className="mb-4 flex items-start flex-col">
                        <label className="block text-sm font-bold mb-2 text-amber-200" htmlFor="password">
                            Password
                        </label>
                        <div className="relative w-full">
                            <input
                                className="text-red-700 border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-amber-300 bg-white"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button
                        className="button-3d px-4 py-2 mt-4 rounded-md hover:bg-amber-400 focus:outline-none focus:ring focus:border-amber-300 w-full"
                        type="button"
                        onClick={handleRegister}
                    >
                        Đăng ký
                    </button>
                </form>
                <p className='mb-8 relative'>Đã có tài khoản? <Link className='text-amber-300' to={"/sign-in"}>Đăng nhập ngay</Link></p>
            </div>
        </div>
    );
};

export default RegisterScreen;
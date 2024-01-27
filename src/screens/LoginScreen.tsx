/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from '../common/interface';
import { useDispatch, useSelector } from 'react-redux';
import { login, userListSelector } from '../redux/reducers/player';
const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const userList = useSelector(userListSelector)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleKeyDown = (e: any) => {
        // Check if the Enter key is pressed (key code 13)
        console.log("Enter")
        if (e.key === 'Enter') {
            // Perform your action here
            handleLogin()
        }
    };
    const handleLogin = () => {
        // Retrieve user list from localStorage
        // Find the user with the given username and password
        const user = userList.find((u: IUser) => u.username === username && u.password === password);
        if (user) {
            // Call the onLogin function with the authenticated user
            localStorage.setItem('currentUser', JSON.stringify(user));
            dispatch(login({ username, password }))
            navigate("/")
        } else {
            // Handle authentication failure
            toast.error('Tên đăng nhập hoặc mật khẩu không đúng.', {
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
        }}>
            <Toaster position="bottom-center"
                reverseOrder={true} />
            <div className="shadow-md rounded-md w-96 overflow-hidden relative bg-red-700 min-w-[40vw]">
                <img src="/images/pattern.jpg" className='absolute h-full object-cover top-0 left-0 opacity-15' />
                <h2 className="text-2xl font-semibold mb-6 relative pt-8 text-amber-200">Đăng nhập</h2>
                <form className='p-8 relative'>
                    <div className="mb-4 flex items-start flex-col">
                        <label className="block text-amber-200 text-sm font-bold mb-2 " htmlFor="username">
                            Tên đăng nhập
                        </label>
                        <input
                            className="text-red-700 border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-amber-300 bg-white"
                            type="text"
                            id="username"
                            placeholder="Điền tên đăng nhập dzô"
                            value={username}
                            onChange={(e) => {
                                const username = e.target.value.trim()
                                setUsername(username)
                            }}
                        />
                    </div>
                    <div className="mb-4 flex items-start flex-col">
                        <label className="block text-amber-200 text-sm font-bold mb-2" htmlFor="password">
                            Mật khẩu
                        </label>
                        <div className="relative w-full">
                            <input
                                className="text-red-700 border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-amber-300 bg-white"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Điền mật khẩu dzô"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash className='top-[14px] right-1' /> : <FaEye className='top-[14px] right-1' />}
                            </button>
                        </div>
                    </div>
                    <button
                        className="button-3d px-4 py-2 mt-4 rounded-md hover:bg-amber-400 focus:outline-none focus:ring focus:border-amber-300 w-full"
                        type="button"
                        onClick={handleLogin}
                        onKeyDown={handleKeyDown}
                    >
                        Đăng nhập
                    </button>
                </form>
                <p className='mb-8 relative'>Chưa có tài khoản hả? <Link className='text-amber-300' to={"/sign-up"}>Đăng ký ngay</Link></p>
            </div>
        </div>
    );
};

export default LoginScreen;

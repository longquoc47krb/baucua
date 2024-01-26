import { useSelector } from "react-redux";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import { IState } from "../common/interface";
import GuestRoute from "../components/GuestRoute";
import MusicPlayer from "../components/MusicPlayer";
import PrivateRoutes from "../components/PrivateRoute";
import GameScreen from "./GameScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import StatsScreen from "./StatsScreen";

const Layout = () => {
    const token = useSelector((state: IState) => state.player.user);
    console.log({ token })
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<GuestRoute isAuth={!!token} />}>
                        <Route path={"/sign-in"} element={<LoginScreen />} />
                        <Route path={"/sign-up"} element={<RegisterScreen />} />
                    </Route>
                    <Route element={<PrivateRoutes isAuth={!!token} />}>
                        <Route path={"/"} element={<GameScreen />} />
                        <Route path={"/stats"} element={<StatsScreen />} />
                    </Route>
                </Routes>
                <MusicPlayer />
            </BrowserRouter>
        </>
    )
}

export default Layout
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import { getPlaylist } from "../api/musicApi";
import GuestRoute from "../components/GuestRoute";
import MusicPlayer from "../components/MusicPlayer";
import PetalFalling from "../components/PetalFalling";
import PrivateRoutes from "../components/PrivateRoute";
import { AuthProvider } from "../config/context/useAuthContext";
import GameScreen from "./GameScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import StatsScreen from "./StatsScreen";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../redux/reducers/player";
import MobileUnavailable from "./MobileUnavailable";

const Layout = () => {
    const token = useSelector(currentUserSelector);
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const { data: playlistData } = useQuery({
        queryKey: ["playlist"],
        queryFn: () => getPlaylist("6BF69WB7"), // playlist id: 6BF69WB7
        enabled: true,
        staleTime: 1000 * 60 * 60 * 12,
        gcTime: 1000 * 60 * 60 * 20,
        // onSuccess: (data) => {
        //     // Assuming data is an array, you can update the currentSongIndex here
        //     const randomIndex = Math.floor(Math.random() * data.length);
        //     setCurrentSongIndex(randomIndex);
        // }
    })
    return (
        <>
            <AuthProvider>
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
                    <MobileUnavailable />
                    <MusicPlayer playlistData={playlistData} isSmallDevice={isSmallDevice} />
                    <PetalFalling />
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default Layout
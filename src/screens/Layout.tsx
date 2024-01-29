import { useSelector } from "react-redux";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import { IState } from "../common/interface";
import GuestRoute from "../components/GuestRoute";
import MusicPlayer from "../components/MusicPlayer";
import PetalFalling from "../components/PetalFalling";
import PrivateRoutes from "../components/PrivateRoute";
import GameScreen from "./GameScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import StatsScreen from "./StatsScreen";
import { useQuery } from "@tanstack/react-query";
import { getPlaylist } from "../api/musicApi";
import { useMediaQuery } from "@uidotdev/usehooks";

const Layout = () => {
    const token = useSelector((state: IState) => state.player.user);
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
                <MusicPlayer playlistData={playlistData} isSmallDevice={isSmallDevice} />
                <PetalFalling />
            </BrowserRouter>

        </>
    )
}

export default Layout
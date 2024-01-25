import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestRoute from "./components/GuestRoute";
import PrivateRoutes from "./components/PrivateRoute";
import GameScreen from "./screens/GameScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import StatsScreen from "./screens/StatsScreen";
function App() {
  const token = localStorage.getItem('currentUser');
  console.log({ token })
  return (
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
    </BrowserRouter>
  )
}

export default App

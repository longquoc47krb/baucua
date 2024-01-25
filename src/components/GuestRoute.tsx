import { Outlet, Navigate } from "react-router-dom";

function GuestRoute({ isAuth }: { isAuth: boolean }) {
    return isAuth ? <Navigate to="/" /> : <Outlet />;
}
export default GuestRoute;

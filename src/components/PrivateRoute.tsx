import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes({ isAuth }: { isAuth: boolean }) {
    return isAuth ? <Outlet /> : <Navigate to="/sign-in" />;
}
export default PrivateRoutes;

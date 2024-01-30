/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from "firebase/firestore";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { IState } from "../../common/interface";
import { diffAmountCalculateCompletedSelector, endGameSelector } from '../../redux/reducers/game';
import { setUser } from "../../redux/reducers/player";
import { lowercaseAndRemoveWhitespace } from "../../utils";
import { database } from "../firebase";

export const AuthContext = createContext<any>({
    currentUser: null,
});
AuthContext.displayName = "AuthContext";

export function useAuthContext() {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: JSX.Element;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const token = localStorage.getItem("accessToken") ?? null;
    const [currentUser, setCurrentUser] = useState(null);
    const diffAmountCalculateCompleted = useSelector(diffAmountCalculateCompletedSelector)
    const endGame = useSelector(endGameSelector);
    const cheat = useSelector((state: IState) => state.cheat.isCheated)
    const dispatch = useDispatch()
    const fetchUser = async () => {
        const decoded = jwtDecode(token);
        console.log({ decoded })
        const userQuery = query(collection(database, "users"), where("username", "==", lowercaseAndRemoveWhitespace(decoded?.username)));
        const userDoc = await getDocs(userQuery).then((response) => response.docs[0]);
        const user = userDoc.data();
        setCurrentUser({
            ...user,
            id: userDoc.id
        })
        dispatch(setUser({
            ...user,
            id: userDoc.id
        }))
    }
    useEffect(() => {
        if (token && !endGame) {
            fetchUser();
        }

    }, [dispatch, token, endGame, diffAmountCalculateCompleted])
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

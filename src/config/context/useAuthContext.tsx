/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from "firebase/firestore";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../redux/reducers/player";
import { lowercaseAndRemoveWhitespace } from "../../utils";
import { database } from "../firebase";
import { endGameSelector, gameSelector, diffAmountCalculateCompletedSelector } from '../../redux/reducers/game';
import { IState } from "../../common/interface";

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
    const cheat = useSelector((state: IState) => state.cheat.isCheated)
    const dispatch = useDispatch()
    useEffect(() => {
        if (token) {

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
            fetchUser();
        }

    }, [dispatch, token, diffAmountCalculateCompleted, cheat])
    console.log({ currentUser })
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

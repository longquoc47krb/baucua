/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, query, where } from "firebase/firestore";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector, setUser } from "../../redux/reducers/player";
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
    const currentUser = useSelector(currentUserSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!currentUser && token) {

            const fetchUser = async () => {
                const decoded = jwtDecode(token);
                console.log({ decoded })
                const userQuery = query(collection(database, "users"), where("username", "==", lowercaseAndRemoveWhitespace(decoded?.username)));
                const userDoc = await getDocs(userQuery).then((response) => response.docs[0]);
                const user = userDoc.data();
                dispatch(setUser({
                    ...user,
                    id: userDoc.id
                }))
            }
            fetchUser();
        }

    }, [currentUser, dispatch, token])
    console.log({ currentUser })
    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

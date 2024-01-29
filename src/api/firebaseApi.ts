import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { IGameHistory, IUser } from "../common/interface";
import { database } from "../config/firebase";
import { lowercaseAndRemoveWhitespace } from "../utils";

export async function registerAccount(user: IUser) {
    try {
        await addDoc(collection(database, "users"), user);
        return 'success'
    }
    catch (err) {
        return 'fail'
    }

}
export async function loginAccount(username: string, password: string) {
    try {
        const userQuery = query(collection(database, "users"), where("username", "==", lowercaseAndRemoveWhitespace(username)), where("password", "==", password));
        console.log({ userQuery })
        const userSnapshot = await getDocs(userQuery);
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        return userData;
    } catch (err) {
        console.log(err)
        return null
    }
}
export async function getUserList() {
    try {
        var userList = [];
        const userQuery = query(collection(database, "users"));
        console.log({ userQuery })
        const userSnapshot = await getDocs(userQuery);
        userSnapshot.forEach((doc) => {
            // Access document data using doc.data()
            const documentData = doc.data();
            userList.push(documentData)
        });
        return userList;
    } catch (err) {
        return []
    }
}
export async function saveGameHistory(game: IGameHistory) {
    try {
        await addDoc(collection(database, "game_history"), game);
        return 'success'
    }
    catch (err) {
        return 'fail'
    }
}
export async function getGameHistory() {
    try {
        var gameHistory = [];
        const gameQuery = query(collection(database, "game_history"));
        console.log({ gameQuery })
        const gameSnapshot = await getDocs(gameQuery);
        gameSnapshot.forEach((doc) => {
            // Access document data using doc.data()
            const documentData = doc.data();
            gameHistory.push(documentData)
        });
        return gameHistory;
    } catch (err) {
        return []
    }
}
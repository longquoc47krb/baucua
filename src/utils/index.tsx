/* eslint-disable @typescript-eslint/no-explicit-any */
import { diceResource } from "../common/constants";
import { IUser } from "../common/interface";

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
export function getFirstLetters(str: string) {
    const words = str.split(' '); // Split the string into an array of words
    const firstLetters = words.map(word => word.charAt(0)); // Get the first letter of each word
    return firstLetters.join(''); // Join the first letters into a new string
}
export function formatNumberWithCommas(number: any) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function convertLargeNumberFormat(num: number) {
    const absNum = Math.abs(num);
    const symbols = ['', 'K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'];
    const tier = Math.log10(absNum) / 3 | 0;
    if (tier === 0) return num;

    const suffix = symbols[tier];
    const scale = Math.pow(10, tier * 3);

    const scaledNumber = num / scale;

    // Adjust the number of decimal places based on the scale
    const formattedNumber = scaledNumber.toLocaleString(undefined, { maximumFractionDigits: scaledNumber < 10 ? 2 : 1 });

    if (num < 0) {
        return -formattedNumber + suffix
    }
    return formattedNumber + suffix;
}
function countOccurrences(inputArray: any[]) {
    return inputArray.reduce((acc, num: number) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    }, {});
}
export function countOccurrencesAndCompare(inputArray: number[]) {
    // Count occurrences of each number in the input array
    const occurrences = countOccurrences(inputArray);
    // Compare occurrences with the predefined dictionary
    const result = diceResource.map((item, index) => ({
        name: item.label,
        quantity: occurrences[index] || 0,
    }));

    return result;
}
export const updateUserInLocalStorage = (usernameToUpdate: string, updatedUserProperties: any) => {
    // Retrieve user list from localStorage
    const userListString = localStorage.getItem('userList');
    const userList = userListString ? JSON.parse(userListString) : [];

    // Find the index of the user to update
    const userIndex = userList.findIndex((user: IUser) => user.username === usernameToUpdate);

    if (userIndex !== -1) {
        // Create an updated user object
        const updatedUser = {
            ...userList[userIndex],  // Keep existing properties
            ...updatedUserProperties, // Update the specified properties
        };

        // Update the user in the user list
        userList[userIndex] = updatedUser;

        // Update localStorage with the updated user list
        localStorage.setItem('userList', JSON.stringify(userList));

        return true; // Indicate successful update
    }

    return false; // Indicate user not found
};
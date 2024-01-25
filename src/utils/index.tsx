import { diceResource } from "../common/constants";

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
export function getFirstLetters(str) {
    const words = str.split(' '); // Split the string into an array of words
    const firstLetters = words.map(word => word.charAt(0)); // Get the first letter of each word
    return firstLetters.join(''); // Join the first letters into a new string
}
export function formatNumberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function convertLargeNumberFormat(value: number) {
    if (value >= 1e9) {
        return (value / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (value >= 1e6) {
        return (value / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1e3) {
        return (value / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        return value.toString();
    }
}
function countOccurrences(inputArray) {
    return inputArray.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
    }, {});
}
export function countOccurrencesAndCompare(inputArray: number[]) {
    // Count occurrences of each number in the input array
    const occurrences = countOccurrences(inputArray);
    console.log({ inputArray, occurrences })
    // Compare occurrences with the predefined dictionary
    const result = diceResource.map((item, index) => ({
        name: item.label,
        quantity: occurrences[index] || 0,
    }));

    return result;
}
export const updateUserInLocalStorage = (usernameToUpdate, updatedUserProperties) => {
    // Retrieve user list from localStorage
    const userList = JSON.parse(localStorage.getItem('userList')) || [];

    // Find the index of the user to update
    const userIndex = userList.findIndex((user) => user.username === usernameToUpdate);

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
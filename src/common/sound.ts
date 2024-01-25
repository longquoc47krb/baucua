/* eslint-disable @typescript-eslint/no-explicit-any */
function getRandomItemFromArray(array: string[]) {
    // Generate a random index within the range of the array length
    const randomIndex = Math.floor(Math.random() * array.length);

    // Return the random item from the array
    return array[randomIndex];
}

// initialize sounds

export const congratsSound =
    'https://www.chosic.com/wp-content/uploads/2021/12/fm-freemusic-cheerful-whistling.mp3';
export const backgroundSound = [
    'https://www.chosic.com/wp-content/uploads/2021/08/FastFeelBananaPeel-320bit.mp3',
    'https://www.chosic.com/wp-content/uploads/2022/06/Pixel-Peeker-Polka-faster.mp3',
    'https://www.chosic.com/wp-content/uploads/2022/06/Sneaky-Snitch.mp3',
    'https://www.chosic.com/wp-content/uploads/2021/02/Monkeys-Spinning-Monkeys.mp3',
    'https://www.chosic.com/wp-content/uploads/2021/08/ByeByeBrain320bit.mp3',
    'https://www.chosic.com/wp-content/uploads/2021/02/Fluffing-a-Duck.mp3',
];
export const correctPaths = [
    'https://www.myinstants.com/media/sounds/suiiiiiiiiiii.mp3',
    'https://www.myinstants.com/media/sounds/money-soundfx.mp3',
    'https://www.myinstants.com/media/sounds/kha-banh-ao-that-day.mp3',
];
export const incorrectPaths = [
    'https://www.myinstants.com/media/sounds/ua-j-zo.mp3',
    'https://www.myinstants.com/media/sounds/y2mate-mp3cut_d1tt0z9.mp3',
    'https://www.myinstants.com/media/sounds/huh_37bAoRo.mp3',
];
export const playRandomSound = (ref: any, array: string[]) => {
    const random = getRandomItemFromArray(array);
    if (ref.current) {
        ref.current.src = random;
        ref.current.play();
    }
};
export const playMusic = (
    ref: any,
    audioUrl: string,
    volume?: number = 1,
    loop?: boolean = false,
) => {
    if (ref.current) {
        ref.current.src = audioUrl;
        ref.current.play();
        ref.current.volume = volume;
        ref.current.loop = loop;
    }
};
export const stopMusic = (ref: any) => {
    if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0; // Reset the playback position
    }
};

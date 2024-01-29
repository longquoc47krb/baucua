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
    { "title": "Ngay-Xuan-Long-Phung-Sum-Vay-Bich-Phuong", "path": "https://drive.google.com/uc?export=download&id=1dCjozE8MNetLiG3w51nmbOJMhJWBaW_p" },
    { "title": "Nam-Qua-Da-Lam-Gi-Noo-Phuoc-Thinh", "path": "https://drive.google.com/uc?export=download&id=1Pp-0tx6xRybyR31oQKnV6O-ZVwpVC9qy" },
    { "title": "Mot-Nam-Moi-Binh-An-Son-Tung-MTP", "path": "https://drive.google.com/uc?export=download&id=1Uw2LnFI_dkYXx7FNLA2wdKtKWtBYepux" },
    { "title": "Ve-Nha-An-Tet-JustaTee-BigDaddy", "path": "https://drive.google.com/uc?export=download&id=1Dmmyj_ACFfQXXNQOv5p-JNX8K1O_8pzo" },
    { "title": "Lang-Nghe-Mua-Xuan-Ve-Bang-Kieu", "path": "https://drive.google.com/uc?export=download&id=1SPhWJAkWO9udFra8RWmDZ8Ogd499ZDUq" },
    { "title": "Roi-Nang-Cai-Ly-Nal", "path": "https://drive.google.com/uc?export=download&id=1aiAAyoiuUkyVNvGFvRx7e0m4BFWM7jOH" },
    { "title": "Di-De-Tro-Ve-SOOBIN", "path": "https://drive.google.com/uc?export=download&id=19K0uIj6HE_B0EIVmzdll7tfuMZghTWZE" },
    { "title": "Se-Hua-Di-Cung-Nhau-Di-De-Tro-Ve-3-SOOBIN-Da-LAB", "path": "https://drive.google.com/uc?export=download&id=17W4jnir1-qMGfOh2wV3Hf9HQzrPEi9NS" },
    { "title": "Tet-Dong-Moi-Vui-Duc-Phuc-GDucky", "path": "https://drive.google.com/uc?export=download&id=1cMCuDQ4AKWyHihXfXHgFZmjzC_jsSYhI" },
    { "title": "Ngay-Tet-Que-Em-V-Music-Ai-Phuong-Tieu-Chau-Nhu-Quynh-Bao-Anh-Yen-Chi", "path": "https://drive.google.com/uc?export=download&id=1IpN5yexDIgSJcyIcwP2KeU-gGv4SKUzI" },
    { "title": "Tet-Ve-Som-Nhe-Di-De-Tro-Ve-4-Phan-Manh-Quynh", "path": "https://drive.google.com/uc?export=download&id=1UaWXBxvpW8wSuCqWruzl4zfPsk9Uw1Oi" },
    { "title": "Nhu-Hoa-Mua-Xuan-Phung-Khanh-Linh-Wren-Evens", "path": "https://drive.google.com/uc?export=download&id=1wEVmN68_TAi-XiSQG8PrxnRV6MjyUXsq" },
    { "title": "Bao-Lau-Chua-Ve-Nha-DatKaa", "path": "https://drive.google.com/uc?export=download&id=1jET6xif7bAr40vvCDU5HjrQM84ryKWqZ" },
    { "title": "Em-Chao-Tet-Bich-Phuong", "path": "https://drive.google.com/uc?export=download&id=1R2T54UrcZh2k2TcYiI4-3VvwUEugxI8E" },
    { "title": "Mua-Xuan-Oi-Bich-Phuong", "path": "https://drive.google.com/uc?export=download&id=11YC1D3YWzHF-gOfLCyxuXcHKgv75D23s" },
    { "title": "Thi-Tham-Mua-Xuan", "path": "https://drive.google.com/uc?export=download&id=1vTMeYUKDVadMV-sF0wg94gTZBPMJjoqs" },
    { "title": "Chuyen-Cu-Bo-Qua-3-Truc-Nhan-Ricky-Star", "path": "https://drive.google.com/uc?export=download&id=1_HQOoVzKyqsmnNf08N26lyyi59wLbsuQ" },
    { "title": "Nghi-Don-Tet-Ricky-Star-Min", "path": "https://drive.google.com/uc?export=download&id=1hl0kaKZR-MkWA8ivt4N9wiCmsS_RBmIS" },
    { "title": "Doan-Xuan-Ca-Bich-Phuong", "path": "https://drive.google.com/uc?export=download&id=1nSiEFQzhnD_reS_eWvuI6SlNDrhbsyoD" },
    { "title": "Tuoi-Gi-Ma-Chang-Thich-Li-Xi-Bich-Phuong-Binh-Gold", "path": "https://drive.google.com/uc?export=download&id=1DVT2Ei2zs2q9b-sE7O51MRoR_MvCoPx9" },
    { "title": "Tet-Nay-Con-Se-Ve-Bui-Cong-Nam", "path": "https://drive.google.com/uc?export=download&id=1fDGY2AmvO3A9_4zCJhwbAmhaX5eN9S89" }


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

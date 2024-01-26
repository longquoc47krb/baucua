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
    {
        title: "Ngày xuân Long Phụng sum vầy - Bích Phương",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/covers/f/3/f3d05e53dc31c48a8459b1006f5722bc_1484884603.jpg",
        path: "https://vnso-pt-14-tf-a320-zmp3.zmdcdn.me/4d41198b4d5ba9accab461cdc313891a?authen=exp=1706414131~acl=/4d41198b4d5ba9accab461cdc313891a/*~hmac=61c39282fb2c72c2d44523e5c06a721a"
    },
    {
        title: "Gieo quẻ - Hoàng Thuỳ Linh",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/2/a/5/4/2a54c9326166419c4e88cd466a0d7c6a.jpg",
        path: "https://zmp3-audio-s4-zstorage.zmdcdn.me/e9852bd9069cefc2b68d/Gieo_Que.mp3?authen=exp=1706838120~acl=/e9852bd9069cefc2b68d/*~hmac=ffe8d1c96bed23221d91a7a00b4e3d9d"
    },
    {
        title: "Năm qua đã làm gì - Noo Phước Thịnh",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/c/c/e/b/ccebb4cede2a60d5af59c0cb642e2ea6.jpg",
        path: "https://vnso-zn-5-tf-a320-zmp3.zmdcdn.me/82a4430f2b5c56656134a8495d92eb90?authen=exp=1706415139~acl=/82a4430f2b5c56656134a8495d92eb90/*~hmac=b66c1b09842d096136e87c4dc9c32894"
    },
    {
        title: "Năm mới bình an - Sơn Tùng MTP",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/2/7/7/e/277ef3a66a67413690578905dbb85451.jpg",
        path: "https://vnso-pt-14-tf-a320-zmp3.zmdcdn.me/419d792482e1678c9f1b7a1e50c292f3?authen=exp=1706415668~acl=/419d792482e1678c9f1b7a1e50c292f3/*~hmac=974961200c2e0059c23f23c8819f83f0"
    },
    {
        title: "Đi để trở về - Soobin Hoàng Sơn",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/covers/7/9/799e9e176dcb79e3406d48930ce108cf_1483416113.jpg",
        path: "https://vnso-zn-10-tf-a320-zmp3.zmdcdn.me/2e37567a802e8eeae9c3d4bb228562d6?authen=exp=1706426389~acl=/2e37567a802e8eeae9c3d4bb228562d6/*~hmac=4c82a509fea947332c320a0a399b0716"
    },
    {
        title: "Nâng cái ly - Nal",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/8/4/4/7/844758780c2ff39faebaebaf0626a665.jpg",
        path: "https://vnso-zn-24-tf-a320-zmp3.zmdcdn.me/d79933b1e5db1182498319478e53b79e?authen=exp=1706426629~acl=/d79933b1e5db1182498319478e53b79e/*~hmac=bf0f0328a6d1bb9b677e92886da76f25"
    },
    {
        title: "Giai điệu mùa xuân - Noo Phước Thịnh",
        thumbnail: "https://avatar-ex-swe.nixcdn.com/song/2018/02/08/b/b/c/8/1518086217798_640.jpg",
        path: "https://vnso-zn-15-tf-a320-zmp3.zmdcdn.me/42129cccf5b084a1100837a6a5cf59c7?authen=exp=1706426578~acl=/42129cccf5b084a1100837a6a5cf59c7/*~hmac=c285dd9b441fdd97f76bffa22c6ecd09"
    },
    {
        title: "Tuổi gì mà chẳng thích lì xì - Bích Phương ft. Bình Gold",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/6/8/f/d/68fde02b7fd382509c2d73427f2cc217.jpg",
        path: "https://vnso-zn-5-tf-a320-zmp3.zmdcdn.me/0014b6063984ecc4756cb12bd620b1e5?authen=exp=1706426864~acl=/0014b6063984ecc4756cb12bd620b1e5/*~hmac=ecc58e3b3b17a201504a199d1c6f92f8"
    },
    {
        title: "Thế là tết - Đức Phúc ft Hoà Minzy",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/b/7/d/e/b7de0db88fa35fe6588e85701ad90d2a.jpg",
        path: "https://vnso-zn-15-tf-a320-zmp3.zmdcdn.me/1640ec686cf9cfbe9dd9946aaa10f158?authen=exp=1706433700~acl=/1640ec686cf9cfbe9dd9946aaa10f158/*~hmac=634899f3f6f2eced27531c4e16e0d528"
    },
    {
        title: "NGHỈ ĐÓN TẾT!? - Ricky Star ft. Min",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/d/5/f/e/d5fe65efeb1d433f892bae81c4637510.jpg",
        path: "https://vnso-zn-5-tf-a320-zmp3.zmdcdn.me/856bcec19f3e1a01d71f197c65e86ab0?authen=exp=1706426927~acl=/856bcec19f3e1a01d71f197c65e86ab0/*~hmac=11c96f38e59b019ec63669edd5366de3"
    },
    {
        title: "Đợi chờ đừng cáu - Phan Mạnh Quỳnh ft. Hoàng Thuỳ Linh",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/4/f/6/3/4f6354b0b033668b96a4448dd08ca105.jpg",
        path: "https://vnso-zn-24-tf-a320-zmp3.zmdcdn.me/5c46fcbd79b0a9bd4374b81f43e21be0?authen=exp=1706426725~acl=/5c46fcbd79b0a9bd4374b81f43e21be0/*~hmac=0fddac8893b28055a092ebe4d514f371"
    },
    {
        title: "Chuyện cũ mình bỏ qua 3 - Trúc Nhân ft. Ricky Star",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/c/d/6/0/cd6059f61190c6963d0b38f0e1b203b9.jpg",
        path: "https://vnso-pt-15-tf-a320-zmp3.zmdcdn.me/c55c39f2eb50b7012f30cd59578db8fd?authen=exp=1706426692~acl=/c55c39f2eb50b7012f30cd59578db8fd/*~hmac=88d98a43739bfa1f818884185e7bfab2"
    },
    {
        title: "Mùa xuân ơi - Bích Phương",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/covers/f/3/f3d05e53dc31c48a8459b1006f5722bc_1484884603.jpg",
        path: "https://vnso-zn-15-tf-a320-zmp3.zmdcdn.me/5ca5e8dccdab718be28995942a038a34?authen=exp=1706426674~acl=/5ca5e8dccdab718be28995942a038a34/*~hmac=8f7265c1ebf9b4e8438cc6fd86a28640"
    },
    {
        title: "Em chào Tết - Bích Phương",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/avatars/d/f/a/c/dfac6bfb871fbfcd40aa384b0a872114.jpg",
        path: "https://vnso-zn-24-tf-a320-zmp3.zmdcdn.me/d36a036c168c52352e2f9d0ca893988a?authen=exp=1706427026~acl=/d36a036c168c52352e2f9d0ca893988a/*~hmac=5231e8783942b5549282f42db7497374"
    },
    {
        title: "Tết hà há ha - Trúc Nhân",
        thumbnail: "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/f/7/3/f/f73ff9df9309aea3146c7994f957bd77.jpg",
        path: "https://vnso-pt-15-tf-a320-zmp3.zmdcdn.me/77885ae7dc36c2587aff35fdb5b5b6cf?authen=exp=1706427402~acl=/77885ae7dc36c2587aff35fdb5b5b6cf/*~hmac=83a1791b5e873d3b572f45345d36a5e2"
    }
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

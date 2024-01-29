/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../config/axiosClient";

export const getPlaylist = async (id: string) => {
    try {
        const response = await axiosClient.get("/detailplaylist", {
            params: {
                id
            }
        });
        const playlistRaw = response.data.song.items.map((song: any) => ({
            id: song.encodeId,
            title: `${song.title} - ${song.artistsNames}`,
            thumbnail: song.thumbnail,
        }))
        return playlistRaw;
    } catch (error) {
        return null
    }
}
export const getSong = async (id: string) => {
    try {
        const response = await axiosClient.get("/song", {
            params: {
                id
            }
        });
        if (response?.err !== 0) {
            return null;
        }
        return response.data[128];
    } catch (error) {
        return null
    }
}
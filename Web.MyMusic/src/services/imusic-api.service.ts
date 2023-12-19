import { MusicResponse } from "../types/music-response";

export interface IMusicApiService {
    getMusic(id: string): Promise<[MusicResponse, Error]>;
    deleteMusic(id: string): Promise<[void, Error]>;
}

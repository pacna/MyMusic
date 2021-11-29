import { SongResponse } from "./responses/SongResponse.interface";
import { SongFn } from "./TopNav.interface";

export interface SongProps {
    songFn: SongFn;
    id: string;
    song: SongResponse;
    soundWave: boolean;
    key: string;
}

export interface SongStates {
    isFav: boolean;
}
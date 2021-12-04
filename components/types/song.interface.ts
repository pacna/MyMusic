import { SongResponse } from "./responses/song-response.interface";
import { SongFn } from "./top-nav.interface";

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
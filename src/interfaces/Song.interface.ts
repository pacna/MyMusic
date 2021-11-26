import { SongResponse } from "./App.interface";
import { SongFn } from "./TopNav.interface";

export interface SongProps {
    songFn: SongFn;
    id: string;
    showGif: string;
    song: SongResponse;
    soundWave: boolean;
    key: string;
}

export interface SongStates {
    isFav: boolean;
}
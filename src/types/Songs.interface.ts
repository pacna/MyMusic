import { SongFn } from './TopNav.interface';
import { SongResponse } from "./responses/SongResponse.interface";

export interface SongsProps {
    songs: Array<SongResponse>
    songFn: SongFn
    soundWave: boolean;
}

export interface SongsStates {
    musicPath: string;
    visible: boolean;
    showGif: string;
}
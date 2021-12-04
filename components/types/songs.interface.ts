import { SongFn } from './top-nav.interface';
import { SongResponse } from "./responses/song-response.interface";

export interface SongsProps {
    songs: Array<SongResponse>
    songFn: SongFn
    soundWave: boolean;
}

export interface SongsStates {
    musicPath: string;
    visible: boolean;
}
import { ArtistResponse, SongData } from '.';
import { SongResponse } from './App.interface';

export interface TopNavStates {
    toggle: boolean;
    searchOpen: boolean;
    favOpen: boolean;
}

export interface TopNavProps {
    songs: SongResponse[]
    artists: ArtistResponse[]
    songFn: SongFn
}

export interface SongFn {
    getSongPath: () => SongData
    setSongPath: (path: string, id: string, visible: boolean) => void
}
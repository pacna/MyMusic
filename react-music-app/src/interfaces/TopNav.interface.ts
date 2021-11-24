import { Artist, SongData } from '.';
import { Song } from './App.interface';

export interface TopNavStates {
    toggle: boolean;
    searchOpen: boolean;
    favOpen: boolean;
}

export interface TopNavProps {
    songs: Song[]
    artists: Artist[]
    songFn: SongFn
}

export interface SongFn {
    getSongPath: () => SongData
    setSongPath: (path: string, id: string, visible: boolean) => void
}
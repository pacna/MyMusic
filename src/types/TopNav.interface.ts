import { SongData } from "./App.interface";
import { SongResponse, ArtistResponse } from "./responses";


export interface TopNavStates {
    toggle: boolean;
    favOpen: boolean;
}

export interface TopNavProps {
    songs: SongResponse[];
    artists: ArtistResponse[];
    songFn: SongFn;
}

export interface SongFn {
    getSongPath: () => SongData;
    setSongPath: (path: string, id: string, visible: boolean) => void;
    openSearchDialog: () => void;
}
import { Song } from "./App.interface";
import { SongFn } from "./TopNav.interface";

export interface SearchDialogProps {
    songFn: SongFn;
    open: boolean;
    closeSearchDialog: () => void;
    songs: Array<Song>
}

export interface SearchDialogStates {
    open: boolean;
    input: string;
}
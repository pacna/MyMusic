import { SongResponse } from "./responses/song-response.interface";
import { SongFn } from "./top-nav.interface";

export interface SearchDialogProps {
    songFn: SongFn;
    open: boolean;
    closeSearchDialog: () => void;
    songs: Array<SongResponse>
}

export interface SearchDialogStates {
    open: boolean;
    input: string;
}
import { SongResponse } from "./responses/SongResponse.interface";
import { SongFn } from "./TopNav.interface";

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
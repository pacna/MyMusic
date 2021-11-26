import { SongFn } from "./TopNav.interface";

export interface FavoritesDialogProps {
    songFn: SongFn;
    open: boolean;
    closeFavDialog: () => void
}

export interface FavoritesDialogStates {
    open: boolean;
    favorites: Array<Favorite>
}

export interface Favorite {
    title: string;
    artist: string;
    length: string;
    path: string;
    favorite: boolean;
    _id: string;
}
import { FavoriteResponse } from "./responses/FavoriteResponse.interface";
import { SongFn } from "./TopNav.interface";

export interface FavoritesDialogProps {
    songFn: SongFn;
    open: boolean;
    closeFavDialog: () => void
}

export interface FavoritesDialogStates {
    open: boolean;
    favorites: Array<FavoriteResponse>
}
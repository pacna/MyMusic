import { FavoriteResponse } from "./responses/favorite-response.interface";
import { SongFn } from "./top-nav.interface";

export interface FavoritesDialogProps {
    songFn: SongFn;
    open: boolean;
    closeFavDialog: () => void
}

export interface FavoritesDialogStates {
    open: boolean;
    favorites: Array<FavoriteResponse>
}
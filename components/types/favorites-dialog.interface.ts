import { FavoriteResponse } from "./responses/favorite-response.interface";
import { SongFn } from "./top-nav.interface";

export interface FavoritesDialogProps {
  open: boolean;
  closeFavDialog: () => void;
}

export interface FavoritesDialogStates {
  open: boolean;
  favorites: Array<FavoriteResponse>;
}

// Self
import { UpdateMusicRequest } from "./update-music-request";

export interface AddMusicRequest extends UpdateMusicRequest {
    isFavorite: boolean;
}

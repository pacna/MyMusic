import { SongPutRequest } from "./song-put-request";

export type SongFavoritePatchRequest = Pick<SongPutRequest, "isFavorite">;

import {
    CollectionResponse,
    SongFavoritePatchRequest,
    SongResponse,
    SongSearchRequest,
} from "../types";

export interface IMusicApiService {
    searchSongs(
        request: SongSearchRequest
    ): Promise<[CollectionResponse<SongResponse>, Error]>;
    getSong(id: string): Promise<[SongResponse, Error]>;
    updateFavoriteSong(
        id: string,
        request: SongFavoritePatchRequest
    ): Promise<[SongResponse, Error]>;
    deleteSong(id: string): Promise<[void, Error]>;
}

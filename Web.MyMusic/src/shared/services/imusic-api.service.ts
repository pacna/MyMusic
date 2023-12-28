import {
    CollectionResponse,
    SongFavoritePatchRequest,
    SongPostRequest,
    SongPutRequest,
    SongResponse,
    SongSearchRequest,
} from "../types";

export interface IMusicApiService {
    searchSongs(
        request: SongSearchRequest
    ): Promise<[CollectionResponse<SongResponse>, Error]>;
    createSong(request: SongPostRequest): Promise<[SongResponse, Error]>;
    getSong(id: string): Promise<[SongResponse, Error]>;
    updateSong(
        id: string,
        request: SongPutRequest
    ): Promise<[SongResponse, Error]>;
    updateFavoriteSong(
        id: string,
        request: SongFavoritePatchRequest
    ): Promise<[SongResponse, Error]>;
    deleteSong(id: string): Promise<[void, Error]>;
}

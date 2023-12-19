import { CollectionResponse, SongResponse } from "../types";

export interface IMusicApiService {
    searchSongs(): Promise<[CollectionResponse<SongResponse>, Error]>;
    getSong(id: string): Promise<[SongResponse, Error]>;
    deleteSong(id: string): Promise<[void, Error]>;
}

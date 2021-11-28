import { SongResponse } from "./SongResponse.interface";

export interface ArtistResponse {
    artist: string;
    albums: Array<Album>
}

export interface Album {
    title: string;
    songs: Array<SongResponse>
}
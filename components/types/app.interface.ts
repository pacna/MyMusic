import { ArtistResponse } from "./responses/artist-response.interface";
import { SongResponse } from "./responses/song-response.interface";

export interface AppProps {}

export interface AppStates {
    artists: Array<ArtistResponse>;
    songs: Array<SongResponse>;
    songData: SongData;
    searchOpen: boolean;
}

export interface SongData {
    path: string;
    id: string;
    visible: boolean;
}
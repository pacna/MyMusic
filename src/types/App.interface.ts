import { ArtistResponse } from "./responses/ArtistResponse.interface";
import { SongResponse } from "./responses/SongResponse.interface";

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
export interface AppProps {}

export interface AppStates {
    artists: Array<ArtistResponse>;
    songs: Array<SongResponse>;
    songData: SongData
}

export interface SongData {
    path: string;
    id: string;
    visible: boolean;
}

export interface SongResponse {
    title: string;
    artist: string;
    length: string;
    path: string;
    favorite: boolean;
    _id: string;
}

export interface ArtistResponse {
    artist: string;
    albums: Array<Album>
}

export interface Album {
    title: string;
    songs: Array<SongResponse>
}
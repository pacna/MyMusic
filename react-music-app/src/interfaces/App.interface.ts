export interface AppProps {}

export interface AppStates {
    artists: Array<Artist>;
    songs: Array<Song>;
    songData: SongData
}

export interface SongData {
    path: string;
    id: string;
    visible: boolean;
}

export interface Song {
    title: string;
    artist: string;
    length: string;
    path: string;
    favorite: boolean;
}

export interface Artist {
    artist: string;
    albums: Array<Album>
}

export interface Album {
    name: string;
    songs: Array<Song>
}
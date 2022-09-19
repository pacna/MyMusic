// types
import { MusicResponse } from "../../../services/types/api/music-response";

export interface Album {
  title: string;
  songs: AlbumSong[];
}

export interface AlbumSong extends Pick<MusicResponse, "title" | "path"> {}

import { SongPostRequest } from "./song-post-request";

export type SongPutRequest = SongPostRequest & { length: number };

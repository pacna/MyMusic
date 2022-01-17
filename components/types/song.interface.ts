import { SongResponse } from "./api/song-response.interface";
import { SongFn } from "./custom/song-fn.interface";

export interface SongProps {
  songFn: SongFn;
  id: string;
  song: SongResponse;
  soundWave: boolean;
  key: string;
}

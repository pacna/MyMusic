// types
import { SongResponse } from "./api/song-response.interface";

export interface SongProps {
  id: string;
  song: SongResponse;
  soundWave: boolean;
}

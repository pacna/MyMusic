import { SongData } from "./song-data.interface";

export interface SongFn {
  getSongPath: () => SongData;
  setSongPath: (path: string, id: string, visible: boolean) => void;
  openSearchDialog: () => void;
}

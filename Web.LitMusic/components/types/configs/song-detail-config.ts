// Types
import { Song } from "../customs/song";

export interface SongDetailConfig {
    id: string;
    song: Song;
    openEditMenu(id: string): void;
    searchMusic(): void;
}

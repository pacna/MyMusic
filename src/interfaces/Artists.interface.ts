import { ArtistResponse } from './App.interface';
import { SongFn } from './TopNav.interface';

export interface ArtistsProps {
    songFn: SongFn;
    artists: Array<ArtistResponse>
}
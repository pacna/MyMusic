import { ArtistResponse } from './responses/ArtistResponse.interface';
import { SongFn } from './TopNav.interface';

export interface ArtistsProps {
    songFn: SongFn;
    artists: Array<ArtistResponse>
}
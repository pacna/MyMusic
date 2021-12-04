import { ArtistResponse } from './responses/artist-response.interface';
import { SongFn } from './top-nav.interface';

export interface ArtistsProps {
    songFn: SongFn;
    artists: Array<ArtistResponse>
}
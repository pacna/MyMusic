import { CollectionResponse, SongResponse } from "../types";
import { BaseApiService } from "./base-api.service";
import { IMusicApiService } from "./imusic-api.service";

export class MusicApiService
    extends BaseApiService
    implements IMusicApiService
{
    private readonly songSegment: string = "/v1/song";

    async searchSongs(): Promise<[CollectionResponse<SongResponse>, Error]> {
        return this.get(this.songSegment);
    }

    async getSong(id: string): Promise<[SongResponse, Error]> {
        return this.get<SongResponse>(`${this.songSegment}/${id}`);
    }

    async deleteSong(id: string): Promise<[void, Error]> {
        return this.delete(`${this.songSegment}/${id}`);
    }
}
